import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORY_LABELS,
  PRODUCTS,
  getProductBySlug,
} from "@/lib/products";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-slate-600 hover:text-slate-900"
      >
        ← Back to catalogue
      </Link>

      <div className="grid gap-8 sm:grid-cols-2">
        <div
          className="flex h-64 items-center justify-center rounded-lg sm:h-full"
          style={{ backgroundColor: product.imageColor }}
        >
          <span
            className="text-center text-sm font-semibold uppercase tracking-wider text-white/80"
            style={{ mixBlendMode: "difference" }}
          >
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {CATEGORY_LABELS[product.category]}
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {product.name}
          </h1>
          <p className="text-base text-slate-700">{product.longDescription}</p>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-slate-900">
              ${product.priceAud.toLocaleString("en-AU")}
            </span>
            <span
              className={
                "rounded-full px-2 py-0.5 text-xs font-medium " +
                (product.inStock
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-200 text-slate-600")
              }
            >
              {product.inStock ? "In stock" : "Backorder"}
            </span>
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            className="mt-2 inline-flex w-fit items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {product.inStock ? "Request a quote" : "Notify me"}
          </button>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Specifications
        </h2>
        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between border-b border-slate-200 py-2 text-sm"
            >
              <dt className="text-slate-500">{spec.label}</dt>
              <dd className="font-medium text-slate-900">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
