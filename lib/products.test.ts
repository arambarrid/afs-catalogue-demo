import { describe, expect, it } from "vitest";
import {
  CATEGORY_LABELS,
  PRODUCTS,
  getAllCategories,
  getProductBySlug,
  type ProductCategory,
} from "./products";

describe("getProductBySlug", () => {
  it("returns the product for a known slug", () => {
    const product = getProductBySlug("led-bar-pro-48");
    expect(product).toBeDefined();
    expect(product?.name).toBe("LED Bar Pro 48");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProductBySlug("not-a-real-slug")).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(getProductBySlug("")).toBeUndefined();
  });

  it("is case-sensitive", () => {
    expect(getProductBySlug("LED-BAR-PRO-48")).toBeUndefined();
  });
});

describe("getAllCategories", () => {
  it("returns a deduplicated list of categories", () => {
    const result = getAllCategories();
    expect(result).toEqual(Array.from(new Set(result)));
  });

  it("returns only categories that appear in PRODUCTS", () => {
    const result = new Set(getAllCategories());
    const expected = new Set(PRODUCTS.map((p) => p.category));
    expect(result).toEqual(expected);
  });

  it("contains every category that has at least one product", () => {
    const categoriesInUse = new Set<ProductCategory>(PRODUCTS.map((p) => p.category));
    for (const cat of categoriesInUse) {
      expect(getAllCategories()).toContain(cat);
    }
  });
});

describe("CATEGORY_LABELS", () => {
  it("has a label for every category used in PRODUCTS", () => {
    for (const product of PRODUCTS) {
      expect(CATEGORY_LABELS[product.category]).toBeTruthy();
    }
  });
});
