import { describe, expect, it } from "vitest";
import { filterProducts, type Filters } from "./search";
import type { Product } from "./products";

const baseFilters: Filters = {
  query: "",
  category: "all",
  inStockOnly: false,
};

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    slug: "test-product",
    name: "Test Product",
    category: "led-lighting",
    shortDescription: "A short description.",
    longDescription: "A longer description with more detail.",
    priceAud: 100,
    inStock: true,
    specs: [],
    imageColor: "#000",
    ...overrides,
  };
}

describe("filterProducts", () => {
  describe("happy paths", () => {
    it("matches by product name", () => {
      const products = [
        makeProduct({ slug: "a", name: "LED Bar Pro 48" }),
        makeProduct({ slug: "b", name: "Amber Beacon" }),
      ];
      const result = filterProducts(products, { ...baseFilters, query: "LED Bar" });
      expect(result.map((p) => p.slug)).toEqual(["a"]);
    });

    it("matches by short description", () => {
      const products = [
        makeProduct({ slug: "a", shortDescription: "Magnetic base beacon" }),
        makeProduct({ slug: "b", shortDescription: "Bolt-on strobe" }),
      ];
      const result = filterProducts(products, { ...baseFilters, query: "magnetic" });
      expect(result.map((p) => p.slug)).toEqual(["a"]);
    });

    it("matches by long description", () => {
      const products = [
        makeProduct({ slug: "a", longDescription: "Polycarbonate dome housing" }),
        makeProduct({ slug: "b", longDescription: "Steel bracket assembly" }),
      ];
      const result = filterProducts(products, { ...baseFilters, query: "polycarbonate" });
      expect(result.map((p) => p.slug)).toEqual(["a"]);
    });

    it("filters by category", () => {
      const products = [
        makeProduct({ slug: "a", category: "led-lighting" }),
        makeProduct({ slug: "b", category: "warning-beacons" }),
        makeProduct({ slug: "c", category: "warning-beacons" }),
      ];
      const result = filterProducts(products, { ...baseFilters, category: "warning-beacons" });
      expect(result.map((p) => p.slug)).toEqual(["b", "c"]);
    });

    it("filters by inStockOnly", () => {
      const products = [
        makeProduct({ slug: "a", inStock: true }),
        makeProduct({ slug: "b", inStock: false }),
        makeProduct({ slug: "c", inStock: true }),
      ];
      const result = filterProducts(products, { ...baseFilters, inStockOnly: true });
      expect(result.map((p) => p.slug)).toEqual(["a", "c"]);
    });

    it("combines query, category, and stock filters", () => {
      const products = [
        makeProduct({ slug: "a", name: "Amber LED", category: "led-lighting", inStock: true }),
        makeProduct({ slug: "b", name: "Amber Beacon", category: "warning-beacons", inStock: true }),
        makeProduct({ slug: "c", name: "Amber Beacon Lite", category: "warning-beacons", inStock: false }),
      ];
      const result = filterProducts(products, {
        query: "amber",
        category: "warning-beacons",
        inStockOnly: true,
      });
      expect(result.map((p) => p.slug)).toEqual(["b"]);
    });
  });

  describe("edges", () => {
    it("returns all products when query is empty", () => {
      const products = [makeProduct({ slug: "a" }), makeProduct({ slug: "b" })];
      const result = filterProducts(products, baseFilters);
      expect(result).toHaveLength(2);
    });

    it("returns all products when query is whitespace-only", () => {
      const products = [makeProduct({ slug: "a" }), makeProduct({ slug: "b" })];
      const result = filterProducts(products, { ...baseFilters, query: "   " });
      expect(result).toHaveLength(2);
    });

    it("is case-insensitive", () => {
      const products = [makeProduct({ slug: "a", name: "LED Bar Pro" })];
      const result = filterProducts(products, { ...baseFilters, query: "led bar pro" });
      expect(result).toHaveLength(1);
    });

    it("matches partial words (substring match)", () => {
      const products = [makeProduct({ slug: "a", name: "Reflective Tape Amber" })];
      const result = filterProducts(products, { ...baseFilters, query: "flect" });
      expect(result).toHaveLength(1);
    });

    it("trims surrounding whitespace from query", () => {
      const products = [makeProduct({ slug: "a", name: "Beacon" })];
      const result = filterProducts(products, { ...baseFilters, query: "  beacon  " });
      expect(result).toHaveLength(1);
    });
  });

  describe("empty results", () => {
    it("returns empty array when no products provided", () => {
      const result = filterProducts([], { ...baseFilters, query: "anything" });
      expect(result).toEqual([]);
    });

    it("returns empty array when no products match", () => {
      const products = [makeProduct({ slug: "a", name: "Beacon" })];
      const result = filterProducts(products, { ...baseFilters, query: "nonexistent" });
      expect(result).toEqual([]);
    });

    it("returns empty array when category filter matches nothing", () => {
      const products = [makeProduct({ slug: "a", category: "led-lighting" })];
      const result = filterProducts(products, { ...baseFilters, category: "fleet-decals" });
      expect(result).toEqual([]);
    });

    it("returns empty array when inStockOnly filters everything out", () => {
      const products = [
        makeProduct({ slug: "a", inStock: false }),
        makeProduct({ slug: "b", inStock: false }),
      ];
      const result = filterProducts(products, { ...baseFilters, inStockOnly: true });
      expect(result).toEqual([]);
    });
  });
});
