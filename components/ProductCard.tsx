import Link from "next/link";
import type { Product } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/products";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-slate-400 hover:shadow-md"
    >
      <div
        className="flex h-40 items-center justify-center"
        style={{ backgroundColor: product.imageColor }}
      >
        <span
          className="text-center text-xs font-semibold uppercase tracking-wider text-white/80"
          style={{ mixBlendMode: "difference" }}
        >
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-700">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-slate-600">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-slate-900">
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
      </div>
    </Link>
  );
}
