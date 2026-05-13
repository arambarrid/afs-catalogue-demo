import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { requestQuote, type QuoteFormState } from "./actions";

const initialState: QuoteFormState = { status: "idle" };

type ValidFields = {
  productSlug: string;
  name: string;
  email: string;
  company?: string;
  quantity: string | number;
  notes?: string;
};

function buildFormData(fields: Partial<ValidFields> = {}): FormData {
  const valid: ValidFields = {
    productSlug: "led-bar-pro-48",
    name: "Jane Surveyor",
    email: "jane@example.com",
    company: "Acme Mining",
    quantity: 5,
    notes: "Needs delivery to Karratha.",
  };
  const merged: ValidFields = { ...valid, ...fields };

  const fd = new FormData();
  fd.set("productSlug", merged.productSlug);
  fd.set("name", merged.name);
  fd.set("email", merged.email);
  if (merged.company !== undefined) fd.set("company", merged.company);
  fd.set("quantity", String(merged.quantity));
  if (merged.notes !== undefined) fd.set("notes", merged.notes);
  return fd;
}

async function run(fields: Partial<ValidFields> = {}): Promise<QuoteFormState> {
  const promise = requestQuote(initialState, buildFormData(fields));
  await vi.runAllTimersAsync();
  return promise;
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(console, "log").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("requestQuote — happy paths", () => {
  it("returns success state for a valid submission", async () => {
    const result = await run();
    expect(result).toEqual({
      status: "success",
      productName: "LED Bar Pro 48",
      quantity: 5,
    });
  });

  it("accepts a minimal submission with optional fields omitted", async () => {
    const result = await run({ company: "", notes: "" });
    expect(result.status).toBe("success");
  });

  it("coerces a numeric string quantity", async () => {
    const result = await run({ quantity: "12" });
    if (result.status !== "success") throw new Error("expected success");
    expect(result.quantity).toBe(12);
  });
});

describe("requestQuote — field validation", () => {
  it("rejects a name shorter than 2 characters", async () => {
    const result = await run({ name: "A" });
    if (result.status !== "error") throw new Error("expected error");
    expect(result.fieldErrors.name).toBeTruthy();
  });

  it("rejects an invalid email", async () => {
    const result = await run({ email: "not-an-email" });
    if (result.status !== "error") throw new Error("expected error");
    expect(result.fieldErrors.email).toBeTruthy();
  });

  it("accepts an omitted company (empty string)", async () => {
    const result = await run({ company: "" });
    expect(result.status).toBe("success");
  });

  it("rejects a company longer than 120 characters", async () => {
    const result = await run({ company: "x".repeat(121) });
    if (result.status !== "error") throw new Error("expected error");
    expect(result.fieldErrors.company).toBeTruthy();
  });

  it("rejects quantity of 0", async () => {
    const result = await run({ quantity: 0 });
    if (result.status !== "error") throw new Error("expected error");
    expect(result.fieldErrors.quantity).toBeTruthy();
  });

  it("accepts quantity of 1 (lower bound)", async () => {
    const result = await run({ quantity: 1 });
    expect(result.status).toBe("success");
  });

  it("accepts quantity of 1000 (upper bound)", async () => {
    const result = await run({ quantity: 1000 });
    expect(result.status).toBe("success");
  });

  it("rejects quantity of 1001", async () => {
    const result = await run({ quantity: 1001 });
    if (result.status !== "error") throw new Error("expected error");
    expect(result.fieldErrors.quantity).toBeTruthy();
  });

  it("rejects a non-integer quantity", async () => {
    const result = await run({ quantity: "3.5" });
    if (result.status !== "error") throw new Error("expected error");
    expect(result.fieldErrors.quantity).toBeTruthy();
  });

  it("rejects a non-numeric quantity", async () => {
    const result = await run({ quantity: "abc" });
    if (result.status !== "error") throw new Error("expected error");
    expect(result.fieldErrors.quantity).toBeTruthy();
  });

  it("accepts an omitted notes field (empty string)", async () => {
    const result = await run({ notes: "" });
    expect(result.status).toBe("success");
  });

  it("rejects notes longer than 500 characters", async () => {
    const result = await run({ notes: "x".repeat(501) });
    if (result.status !== "error") throw new Error("expected error");
    expect(result.fieldErrors.notes).toBeTruthy();
  });

  it("reports multiple field errors at once", async () => {
    const result = await run({ name: "", email: "bad", quantity: 0 });
    if (result.status !== "error") throw new Error("expected error");
    expect(result.fieldErrors.name).toBeTruthy();
    expect(result.fieldErrors.email).toBeTruthy();
    expect(result.fieldErrors.quantity).toBeTruthy();
  });
});

describe("requestQuote — product lookup", () => {
  it("returns a form-level error when the slug is unknown", async () => {
    const result = await run({ productSlug: "nonexistent-product" });
    if (result.status !== "error") throw new Error("expected error");
    expect(result.formError).toBeTruthy();
    expect(result.fieldErrors).toEqual({});
  });
});
