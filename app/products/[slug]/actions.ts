"use server";

import { z } from "zod";
import { getProductBySlug } from "@/lib/products";

const QuoteRequestSchema = z.object({
  productSlug: z.string().min(1),
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  quantity: z.coerce
    .number({ message: "Quantity must be a number." })
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1.")
    .max(1000, "For orders over 1000 units, please contact sales directly."),
  notes: z.string().trim().max(500, "Notes must be 500 characters or fewer.").optional().or(z.literal("")),
});

export type QuoteFormState =
  | { status: "idle" }
  | {
      status: "error";
      fieldErrors: Partial<Record<keyof z.infer<typeof QuoteRequestSchema>, string>>;
      formError?: string;
    }
  | {
      status: "success";
      productName: string;
      quantity: number;
    };

export async function requestQuote(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const raw = {
    productSlug: formData.get("productSlug"),
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") ?? "",
    quantity: formData.get("quantity"),
    notes: formData.get("notes") ?? "",
  };

  const parsed = QuoteRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof z.infer<typeof QuoteRequestSchema>, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        (fieldErrors as Record<string, string>)[key] = issue.message;
      }
    }
    return { status: "error", fieldErrors };
  }

  const product = getProductBySlug(parsed.data.productSlug);
  if (!product) {
    return {
      status: "error",
      fieldErrors: {},
      formError: "We couldn't find that product. Please refresh and try again.",
    };
  }

  // Simulate I/O latency. A real implementation would persist the request
  // and dispatch a notification — out of scope for this demo.
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("[demo] quote request received:", {
    product: product.name,
    ...parsed.data,
  });

  return {
    status: "success",
    productName: product.name,
    quantity: parsed.data.quantity,
  };
}
