export type ProductCategory =
  | "led-lighting"
  | "warning-beacons"
  | "reflective-signage"
  | "reflective-tape"
  | "fleet-decals";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "led-lighting": "LED lighting",
  "warning-beacons": "Warning beacons",
  "reflective-signage": "Reflective signage",
  "reflective-tape": "Reflective tape",
  "fleet-decals": "Fleet decals",
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  longDescription: string;
  priceAud: number;
  inStock: boolean;
  specs: { label: string; value: string }[];
  imageColor: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "led-bar-pro-48",
    name: "LED Bar Pro 48",
    category: "led-lighting",
    shortDescription: "48-inch dual-row LED light bar for haul trucks and graders.",
    longDescription:
      "High-intensity LED light bar engineered for heavy-vehicle frontal mounting. Combination flood and spot optics deliver wide forward visibility and long-range projection for night shifts on open-cut mining sites.",
    priceAud: 689,
    inStock: true,
    specs: [
      { label: "Lumens", value: "32,400" },
      { label: "Voltage", value: "10–30V DC" },
      { label: "Mount", value: "Bracket / bull bar" },
      { label: "Ingress rating", value: "IP69K" },
    ],
    imageColor: "#1f2937",
  },
  {
    slug: "amber-beacon-r360",
    name: "Amber Rotating Beacon R360",
    category: "warning-beacons",
    shortDescription: "Class 1 rotating amber beacon, magnetic base.",
    longDescription:
      "Vehicle-mounted rotating warning beacon with high-impact polycarbonate dome and shock-mounted motor. Suitable for service vehicles, escort vehicles, and site utes operating in restricted-access zones.",
    priceAud: 129,
    inStock: true,
    specs: [
      { label: "Class", value: "AS/NZS 4231 Class 1" },
      { label: "Voltage", value: "12 / 24V DC" },
      { label: "Mount", value: "Magnetic + cigarette plug" },
      { label: "Cable length", value: "3 m" },
    ],
    imageColor: "#f59e0b",
  },
  {
    slug: "led-strobe-mini",
    name: "Mini LED Strobe",
    category: "warning-beacons",
    shortDescription: "Compact bolt-on amber strobe for light vehicles.",
    longDescription:
      "Low-profile LED strobe head designed for permanent vehicle mounting. Eight selectable flash patterns, internal driver, sealed housing. Ideal for utes, vans, and forklift attachments.",
    priceAud: 89,
    inStock: true,
    specs: [
      { label: "Patterns", value: "8 selectable" },
      { label: "Voltage", value: "10–30V DC" },
      { label: "Mount", value: "Bolt-through" },
      { label: "Ingress rating", value: "IP67" },
    ],
    imageColor: "#fbbf24",
  },
  {
    slug: "haul-road-sign-stop",
    name: "Haul Road STOP Sign — Class 1",
    category: "reflective-signage",
    shortDescription: "Class 1 reflective stop sign, 750 mm, aluminium substrate.",
    longDescription:
      "AS 1742.2-compliant STOP sign printed on 2 mm aluminium substrate with Class 1 reflective film. Suitable for permanent installation at haul-road intersections and crib-room exits.",
    priceAud: 145,
    inStock: true,
    specs: [
      { label: "Reflective class", value: "AS/NZS 1906.1 Class 1" },
      { label: "Size", value: "750 mm hex" },
      { label: "Substrate", value: "2 mm aluminium" },
      { label: "Standard", value: "AS 1742.2" },
    ],
    imageColor: "#dc2626",
  },
  {
    slug: "speed-limit-40",
    name: "Speed Limit 40 Sign",
    category: "reflective-signage",
    shortDescription: "Class 1 reflective speed limit sign, 600 × 900 mm.",
    longDescription:
      "Regulatory speed-limit sign for site roads. Class 1 reflective film on aluminium substrate, ready for post-mount installation. Custom limits available on request.",
    priceAud: 119,
    inStock: true,
    specs: [
      { label: "Reflective class", value: "AS/NZS 1906.1 Class 1" },
      { label: "Size", value: "600 × 900 mm" },
      { label: "Substrate", value: "2 mm aluminium" },
      { label: "Standard", value: "AS 1742.4" },
    ],
    imageColor: "#ffffff",
  },
  {
    slug: "pedestrian-warning-class2",
    name: "Pedestrian Warning Sign — Class 2",
    category: "reflective-signage",
    shortDescription: "Class 2 reflective pedestrian-crossing sign, 600 mm.",
    longDescription:
      "Diamond-shaped warning sign for pedestrian zones inside industrial premises. Class 2 high-intensity reflective film, suitable for low-ambient-light areas and indoor warehouses.",
    priceAud: 95,
    inStock: false,
    specs: [
      { label: "Reflective class", value: "AS/NZS 1906.1 Class 2" },
      { label: "Size", value: "600 × 600 mm" },
      { label: "Substrate", value: "2 mm aluminium" },
      { label: "Standard", value: "AS 1742.10" },
    ],
    imageColor: "#fde047",
  },
  {
    slug: "reflective-tape-amber-50",
    name: "Reflective Tape — Amber, 50 mm × 50 m",
    category: "reflective-tape",
    shortDescription: "Class 1 amber reflective tape roll for vehicle edges.",
    longDescription:
      "Pressure-sensitive amber reflective tape for marking vehicle edges, trailer outlines, and stationary plant. Class 1 reflectivity, durable acrylic adhesive, UV-stable for outdoor service.",
    priceAud: 78,
    inStock: true,
    specs: [
      { label: "Reflective class", value: "AS/NZS 1906.1 Class 1" },
      { label: "Width", value: "50 mm" },
      { label: "Length", value: "50 m roll" },
      { label: "Colour", value: "Amber / yellow" },
    ],
    imageColor: "#f59e0b",
  },
  {
    slug: "reflective-tape-redwhite-50",
    name: "Reflective Tape — Red/White, 50 mm × 50 m",
    category: "reflective-tape",
    shortDescription: "Class 1 red/white striped tape for trailer rear contours.",
    longDescription:
      "Alternating red and white reflective stripes for trailer rear and side contour marking, compliant with vehicle visibility standards. UV-stable, weatherproof, conformable to curved surfaces.",
    priceAud: 92,
    inStock: true,
    specs: [
      { label: "Reflective class", value: "AS/NZS 1906.1 Class 1" },
      { label: "Width", value: "50 mm" },
      { label: "Length", value: "50 m roll" },
      { label: "Pattern", value: "Red / white stripe" },
    ],
    imageColor: "#b91c1c",
  },
  {
    slug: "fleet-decal-numberset",
    name: "Fleet Number Decal Set",
    category: "fleet-decals",
    shortDescription: "Custom-numbered vinyl decals, 200 mm height, set of 4.",
    longDescription:
      "Custom-printed fleet identification decals for haul trucks, light vehicles, and service plant. UV-stable vinyl with high-tack adhesive. Includes four decals at 200 mm character height; custom heights and colours available.",
    priceAud: 65,
    inStock: true,
    specs: [
      { label: "Material", value: "5-year cast vinyl" },
      { label: "Character height", value: "200 mm" },
      { label: "Quantity", value: "4 decals" },
      { label: "Lead time", value: "3 business days" },
    ],
    imageColor: "#0f172a",
  },
  {
    slug: "convex-mirror-600",
    name: "Convex Safety Mirror 600 mm",
    category: "reflective-signage",
    shortDescription: "Outdoor convex mirror for blind-corner visibility.",
    longDescription:
      "Polycarbonate convex safety mirror with wall-mount bracket. Used at warehouse blind corners, haul-road junctions, and pedestrian-vehicle interaction zones to extend driver line of sight.",
    priceAud: 165,
    inStock: true,
    specs: [
      { label: "Diameter", value: "600 mm" },
      { label: "Material", value: "Polycarbonate face, ABS housing" },
      { label: "Mount", value: "Wall bracket included" },
      { label: "Use", value: "Outdoor / indoor" },
    ],
    imageColor: "#475569",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllCategories(): ProductCategory[] {
  return Array.from(new Set(PRODUCTS.map((p) => p.category)));
}
