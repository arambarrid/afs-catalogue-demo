import type { Product, ProductCategory } from "./products";

export type Filters = {
  query: string;
  category: ProductCategory | "all";
  inStockOnly: boolean;
};

export function filterProducts(products: Product[], filters: Filters): Product[] {
  const q = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }
    if (filters.inStockOnly && !product.inStock) {
      return false;
    }
    if (q.length === 0) {
      return true;
    }
    const haystack = [
      product.name,
      product.shortDescription,
      product.longDescription,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
