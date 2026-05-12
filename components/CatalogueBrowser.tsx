"use client";

import { useMemo, useState } from "react";
import type { Product, ProductCategory } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/products";
import { filterProducts, type Filters } from "@/lib/search";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
};

const ALL_CATEGORIES: ProductCategory[] = [
  "led-lighting",
  "warning-beacons",
  "reflective-signage",
  "reflective-tape",
  "fleet-decals",
];

export function CatalogueBrowser({ products }: Props) {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    category: "all",
    inStockOnly: false,
  });

  const visible = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4">
        <input
          type="search"
          value={filters.query}
          onChange={(e) =>
            setFilters((f) => ({ ...f, query: e.target.value }))
          }
          placeholder="Search products..."
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              category: e.target.value as Filters["category"],
            }))
          }
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          <option value="all">All categories</option>
          {ALL_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))
            }
            className="h-4 w-4 rounded border-slate-300"
          />
          In stock only
        </label>
      </div>

      <p className="text-sm text-slate-600">
        {visible.length} of {products.length} products
      </p>

      {visible.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
          No products match the current filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
