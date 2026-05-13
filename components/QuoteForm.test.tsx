import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { QuoteFormState } from "@/app/products/[slug]/actions";

vi.mock("@/app/products/[slug]/actions", () => ({
  requestQuote: vi.fn<
    (prev: QuoteFormState, formData: FormData) => Promise<QuoteFormState>
  >(),
}));

import { QuoteForm } from "./QuoteForm";
import { requestQuote } from "@/app/products/[slug]/actions";

const mockRequestQuote = vi.mocked(requestQuote);

function getInput(container: HTMLElement, name: string): HTMLElement {
  const el = container.querySelector<HTMLElement>(`[name="${name}"]`);
  if (!el) throw new Error(`No form control with name="${name}"`);
  return el;
}

afterEach(() => {
  mockRequestQuote.mockReset();
});

describe("QuoteForm — static rendering", () => {
  it("shows the product name in the prompt copy", () => {
    render(<QuoteForm productSlug="led-bar-pro-48" productName="LED Bar Pro 48" inStock />);
    expect(screen.getByText(/LED Bar Pro 48/)).toBeInTheDocument();
  });

  it("renders a hidden input with the product slug", () => {
    const { container } = render(
      <QuoteForm productSlug="led-bar-pro-48" productName="LED Bar Pro 48" inStock />,
    );
    const hidden = container.querySelector<HTMLInputElement>(
      'input[type="hidden"][name="productSlug"]',
    );
    expect(hidden?.value).toBe("led-bar-pro-48");
  });

  it("renders all input fields with the expected labels", () => {
    const { container } = render(
      <QuoteForm productSlug="x" productName="Product" inStock />,
    );
    expect(screen.getByText("Your name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText(/company/i)).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText(/notes/i)).toBeInTheDocument();
    expect(getInput(container, "name")).toBeInTheDocument();
    expect(getInput(container, "email")).toBeInTheDocument();
    expect(getInput(container, "company")).toBeInTheDocument();
    expect(getInput(container, "quantity")).toBeInTheDocument();
    expect(getInput(container, "notes")).toBeInTheDocument();
  });

  it("enables the submit button with 'Request a quote' when in stock", () => {
    render(<QuoteForm productSlug="x" productName="Product" inStock />);
    const button = screen.getByRole("button", { name: /request a quote/i });
    expect(button).toBeEnabled();
  });

  it("disables the submit button with 'Notify me' when out of stock", () => {
    render(<QuoteForm productSlug="x" productName="Product" inStock={false} />);
    const button = screen.getByRole("button", { name: /notify me/i });
    expect(button).toBeDisabled();
  });
});

describe("QuoteForm — submit interactions", () => {
  it("renders field errors when the action returns an error state", async () => {
    mockRequestQuote.mockResolvedValueOnce({
      status: "error",
      fieldErrors: {
        name: "Please enter your full name.",
        email: "Please enter a valid email address.",
      },
    });

    const user = userEvent.setup();
    const { container } = render(
      <QuoteForm productSlug="x" productName="Product" inStock />,
    );

    await user.type(getInput(container, "name"), "A");
    await user.type(getInput(container, "email"), "bad");
    await user.click(screen.getByRole("button", { name: /request a quote/i }));

    await waitFor(() => {
      expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
      expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    });
    expect(mockRequestQuote).toHaveBeenCalledTimes(1);
  });

  it("renders a form-level error when the action returns one", async () => {
    mockRequestQuote.mockResolvedValueOnce({
      status: "error",
      fieldErrors: {},
      formError: "We couldn't find that product. Please refresh and try again.",
    });

    const user = userEvent.setup();
    const { container } = render(
      <QuoteForm productSlug="x" productName="Product" inStock />,
    );

    await user.type(getInput(container, "name"), "Jane Surveyor");
    await user.type(getInput(container, "email"), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /request a quote/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/we couldn't find that product/i),
      ).toBeInTheDocument();
    });
  });

  it("renders the success state when the action returns success", async () => {
    mockRequestQuote.mockResolvedValueOnce({
      status: "success",
      productName: "LED Bar Pro 48",
      quantity: 7,
    });

    const user = userEvent.setup();
    const { container } = render(
      <QuoteForm productSlug="led-bar-pro-48" productName="LED Bar Pro 48" inStock />,
    );

    await user.type(getInput(container, "name"), "Jane Surveyor");
    await user.type(getInput(container, "email"), "jane@example.com");
    await user.clear(getInput(container, "quantity"));
    await user.type(getInput(container, "quantity"), "7");
    await user.click(screen.getByRole("button", { name: /request a quote/i }));

    await waitFor(() => {
      expect(screen.getByText(/quote request received/i)).toBeInTheDocument();
      expect(screen.getByText(/7 × LED Bar Pro 48/)).toBeInTheDocument();
    });
  });
});
