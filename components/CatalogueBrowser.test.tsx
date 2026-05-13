import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CatalogueBrowser } from "./CatalogueBrowser";
import type { Product } from "@/lib/products";

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    slug: "test-product",
    name: "Test Product",
    category: "led-lighting",
    shortDescription: "A short description.",
    longDescription: "A longer description.",
    priceAud: 100,
    inStock: true,
    specs: [],
    imageColor: "#000",
    ...overrides,
  };
}

const products: Product[] = [
  makeProduct({
    slug: "led-bar",
    name: "LED Bar Pro",
    category: "led-lighting",
    inStock: true,
  }),
  makeProduct({
    slug: "amber-beacon",
    name: "Amber Beacon",
    category: "warning-beacons",
    inStock: true,
  }),
  makeProduct({
    slug: "ped-warning",
    name: "Pedestrian Warning Sign",
    category: "reflective-signage",
    inStock: false,
  }),
];

describe("CatalogueBrowser", () => {
  it("renders all products initially", () => {
    render(<CatalogueBrowser products={products} />);
    expect(screen.getByText("LED Bar Pro")).toBeInTheDocument();
    expect(screen.getByText("Amber Beacon")).toBeInTheDocument();
    expect(screen.getByText("Pedestrian Warning Sign")).toBeInTheDocument();
  });

  it("shows the initial result count", () => {
    render(<CatalogueBrowser products={products} />);
    expect(screen.getByText("3 of 3 products")).toBeInTheDocument();
  });

  it("narrows results when typing in the search input", async () => {
    const user = userEvent.setup();
    render(<CatalogueBrowser products={products} />);

    const search = screen.getByRole("searchbox");
    await user.type(search, "beacon");

    expect(screen.getByText("Amber Beacon")).toBeInTheDocument();
    expect(screen.queryByText("LED Bar Pro")).not.toBeInTheDocument();
    expect(screen.getByText("1 of 3 products")).toBeInTheDocument();
  });

  it("narrows results when selecting a category", async () => {
    const user = userEvent.setup();
    render(<CatalogueBrowser products={products} />);

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "warning-beacons");

    expect(screen.getByText("Amber Beacon")).toBeInTheDocument();
    expect(screen.queryByText("LED Bar Pro")).not.toBeInTheDocument();
    expect(screen.getByText("1 of 3 products")).toBeInTheDocument();
  });

  it("narrows results when toggling 'in stock only'", async () => {
    const user = userEvent.setup();
    render(<CatalogueBrowser products={products} />);

    const checkbox = screen.getByRole("checkbox", { name: /in stock only/i });
    await user.click(checkbox);

    expect(screen.queryByText("Pedestrian Warning Sign")).not.toBeInTheDocument();
    expect(screen.getByText("2 of 3 products")).toBeInTheDocument();
  });

  it("combines filters", async () => {
    const user = userEvent.setup();
    render(<CatalogueBrowser products={products} />);

    await user.type(screen.getByRole("searchbox"), "warning");
    await user.click(screen.getByRole("checkbox", { name: /in stock only/i }));

    expect(screen.queryByText("Pedestrian Warning Sign")).not.toBeInTheDocument();
    expect(screen.getByText("0 of 3 products")).toBeInTheDocument();
  });

  it("renders the empty state when no products match", async () => {
    const user = userEvent.setup();
    render(<CatalogueBrowser products={products} />);

    await user.type(screen.getByRole("searchbox"), "nonexistent");

    expect(screen.getByText(/no products match the current filters/i)).toBeInTheDocument();
  });

  it("exposes every category in the dropdown", () => {
    render(<CatalogueBrowser products={products} />);
    const select = screen.getByRole("combobox");
    const options = within(select).getAllByRole("option").map((o) => o.textContent);
    expect(options).toContain("All categories");
    expect(options).toContain("LED lighting");
    expect(options).toContain("Warning beacons");
    expect(options).toContain("Reflective signage");
    expect(options).toContain("Reflective tape");
    expect(options).toContain("Fleet decals");
  });
});
