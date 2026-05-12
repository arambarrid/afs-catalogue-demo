"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  requestQuote,
  type QuoteFormState,
} from "@/app/products/[slug]/actions";

type Props = {
  productSlug: string;
  productName: string;
  inStock: boolean;
};

const initialState: QuoteFormState = { status: "idle" };

function SubmitButton({ inStock }: { inStock: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || !inStock}
      className="inline-flex w-fit items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      {pending ? "Sending..." : inStock ? "Request a quote" : "Notify me"}
    </button>
  );
}

export function QuoteForm({ productSlug, productName, inStock }: Props) {
  const [state, formAction] = useActionState(requestQuote, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        <p className="font-semibold">Quote request received.</p>
        <p className="mt-1">
          We&apos;ll get back to you about {state.quantity} ×{" "}
          {state.productName}. (Demo: nothing is actually sent.)
        </p>
      </div>
    );
  }

  const fieldErrors =
    state.status === "error" ? state.fieldErrors : ({} as const);
  const formError = state.status === "error" ? state.formError : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-3" noValidate>
      <input type="hidden" name="productSlug" value={productSlug} />
      <p className="text-sm text-slate-600">
        Request pricing for{" "}
        <span className="font-medium text-slate-900">{productName}</span>.
      </p>

      <Field label="Your name" name="name" error={fieldErrors.name}>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClasses(!!fieldErrors.name)}
        />
      </Field>

      <Field label="Email" name="email" error={fieldErrors.email}>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClasses(!!fieldErrors.email)}
        />
      </Field>

      <Field
        label="Company (optional)"
        name="company"
        error={fieldErrors.company}
      >
        <input
          name="company"
          type="text"
          autoComplete="organization"
          className={inputClasses(!!fieldErrors.company)}
        />
      </Field>

      <Field label="Quantity" name="quantity" error={fieldErrors.quantity}>
        <input
          name="quantity"
          type="number"
          inputMode="numeric"
          min={1}
          max={1000}
          defaultValue={1}
          required
          className={inputClasses(!!fieldErrors.quantity)}
        />
      </Field>

      <Field label="Notes (optional)" name="notes" error={fieldErrors.notes}>
        <textarea
          name="notes"
          rows={3}
          maxLength={500}
          className={inputClasses(!!fieldErrors.notes)}
        />
      </Field>

      {formError ? (
        <p className="text-sm text-red-700">{formError}</p>
      ) : null}

      <SubmitButton inStock={inStock} />
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-800">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-700">{error}</span> : null}
    </label>
  );
}

function inputClasses(hasError: boolean): string {
  return (
    "w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 " +
    (hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
      : "border-slate-300 focus:border-slate-500 focus:ring-slate-500")
  );
}
