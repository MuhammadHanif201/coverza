import type { Brand } from "./phones";

export type ProductColor = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  /** Brands this design is available for (every model of that brand). */
  brands: Brand[];
  colors: ProductColor[];
  description: string;
  features: string[];
  isNew?: boolean;
  trending?: boolean;
};

/**
 * Sample catalogue for testing the frontend. Real products and prices will
 * come from the admin panel later.
 */
export const products: Product[] = [
  {
    slug: "crystal-clear-magsafe-case",
    name: "Crystal Clear MagSafe Case",
    category: "magsafe",
    price: 1999,
    oldPrice: 2500,
    rating: 4.8,
    reviews: 124,
    sold: 320,
    brands: ["iphone"],
    colors: [
      { name: "Clear", hex: "#D6E4EE" },
      { name: "Black Frame", hex: "#27272A" },
      { name: "Navy Frame", hex: "#1E3A5F" },
    ],
    description:
      "Crystal-clear, anti-yellowing back with built-in MagSafe magnets. Raised edges protect the camera and screen, with precise cut-outs for buttons and ports.",
    features: ["Strong N52 MagSafe magnets", "Anti-yellow clear back", "1.5 mm raised camera lip", "Wireless charging friendly"],
    isNew: true,
    trending: true,
  },
  {
    slug: "liquid-silicone-case",
    name: "Liquid Silicone Case",
    category: "silicone",
    price: 1499,
    oldPrice: 1800,
    rating: 4.7,
    reviews: 98,
    sold: 410,
    brands: ["iphone", "samsung"],
    colors: [
      { name: "Sage", hex: "#8FAF92" },
      { name: "Navy", hex: "#1E3A5F" },
      { name: "Lavender", hex: "#C4B5FD" },
      { name: "Black", hex: "#27272A" },
      { name: "Pink", hex: "#F9C9D9" },
    ],
    description:
      "Silky-soft liquid silicone outside with a scratch-free microfibre lining inside. Slim, grippy and comfortable for everyday use.",
    features: ["Soft microfibre lining", "Anti-fingerprint finish", "Slim 1.2 mm profile", "Full bottom coverage"],
    trending: true,
  },
  {
    slug: "armor-shockproof-case",
    name: "Armor Shockproof Case",
    category: "shockproof",
    price: 2299,
    rating: 4.9,
    reviews: 210,
    sold: 530,
    brands: ["iphone", "samsung"],
    colors: [
      { name: "Graphite", hex: "#3F3F46" },
      { name: "Navy", hex: "#1E3A5F" },
      { name: "Olive", hex: "#4D5B3A" },
    ],
    description:
      "Dual-layer armour with air-cushion corners that survives everyday drops. Textured sides for a secure grip and raised edges for camera and screen.",
    features: ["Drop-tested to 3 metres", "Air-cushion corners", "Textured anti-slip sides", "Raised screen and camera edges"],
    trending: true,
  },
  {
    slug: "leather-card-holder-case",
    name: "Leather Card Holder Case",
    category: "card-holder",
    price: 2499,
    oldPrice: 3000,
    rating: 4.6,
    reviews: 57,
    sold: 140,
    brands: ["iphone", "samsung"],
    colors: [
      { name: "Tan", hex: "#8B5A3C" },
      { name: "Black", hex: "#27272A" },
    ],
    description:
      "Premium leather-finish cover with a back pocket for two cards. Carry your phone, CNIC and card together.",
    features: ["Holds 2 cards", "Leather-finish PU", "Soft inner lining", "Raised camera edge"],
    trending: true,
  },
  {
    slug: "frosted-matte-case",
    name: "Frosted Matte Case",
    category: "clear",
    price: 1699,
    oldPrice: 2000,
    rating: 4.6,
    reviews: 64,
    sold: 190,
    brands: ["iphone", "samsung"],
    colors: [
      { name: "Frost Grey", hex: "#A1A1AA" },
      { name: "Frost Black", hex: "#3F3F46" },
      { name: "Frost Blue", hex: "#93A8BF" },
    ],
    description:
      "Translucent frosted back that resists fingerprints, with coloured buttons and a soft bumper frame.",
    features: ["Fingerprint-resistant matte back", "Shock-absorbing bumper", "Metal colour buttons", "Slim and light"],
  },
  {
    slug: "glitter-sparkle-case",
    name: "Glitter Sparkle Case",
    category: "glitter",
    price: 1599,
    rating: 4.5,
    reviews: 41,
    sold: 120,
    brands: ["iphone", "samsung"],
    colors: [
      { name: "Rose", hex: "#F9C9D9" },
      { name: "Silver", hex: "#E4E4E7" },
      { name: "Gold", hex: "#F3D9A4" },
    ],
    description:
      "Sealed glitter layer that sparkles in the light, with a clear protective outer shell.",
    features: ["Sealed glitter — no shedding", "Clear protective shell", "Raised edges", "Slim fit"],
    isNew: true,
  },
  {
    slug: "leather-magsafe-case",
    name: "Leather MagSafe Case",
    category: "leather",
    price: 2799,
    oldPrice: 3200,
    rating: 4.8,
    reviews: 73,
    sold: 160,
    brands: ["iphone"],
    colors: [
      { name: "Tan", hex: "#8B5A3C" },
      { name: "Black", hex: "#27272A" },
      { name: "Forest", hex: "#2F4A3A" },
    ],
    description:
      "Classy leather-finish cover with built-in MagSafe magnets and aluminium buttons.",
    features: ["Built-in MagSafe magnets", "Leather-finish exterior", "Aluminium buttons", "Microfibre lining"],
    isNew: true,
  },
  {
    slug: "silicone-magsafe-case",
    name: "Silicone MagSafe Case",
    category: "magsafe",
    price: 1899,
    rating: 4.7,
    reviews: 52,
    sold: 150,
    brands: ["iphone"],
    colors: [
      { name: "Lavender", hex: "#C4B5FD" },
      { name: "Sage", hex: "#8FAF92" },
      { name: "Black", hex: "#27272A" },
    ],
    description:
      "Soft silicone cover with MagSafe magnets for snap-on chargers, wallets and car mounts.",
    features: ["MagSafe compatible", "Soft-touch silicone", "Microfibre lining", "Raised camera edge"],
  },
  {
    slug: "card-holder-wallet-case",
    name: "Card Holder Wallet Case",
    category: "card-holder",
    price: 2199,
    rating: 4.4,
    reviews: 30,
    sold: 85,
    brands: ["iphone", "samsung"],
    colors: [
      { name: "Brown", hex: "#7C2D12" },
      { name: "Black", hex: "#27272A" },
    ],
    description:
      "Flip-style wallet cover with three card slots and a cash pocket. Doubles as a stand.",
    features: ["3 card slots + cash pocket", "Magnetic closure", "Doubles as a stand", "Full-body protection"],
  },
  {
    slug: "ring-stand-clear-case",
    name: "Ring Stand Clear Case",
    category: "clear",
    price: 1799,
    oldPrice: 2100,
    rating: 4.6,
    reviews: 45,
    sold: 110,
    brands: ["iphone", "samsung"],
    colors: [
      { name: "Clear", hex: "#E4ECF2" },
      { name: "Clear Black Ring", hex: "#D6DEE6" },
    ],
    description:
      "Clear cover with a 360° rotating ring that works as a finger grip and a kickstand for videos.",
    features: ["360° rotating ring", "Kickstand for videos", "Anti-yellow clear back", "Car-mount friendly"],
  },
  {
    slug: "ultra-slim-clear-case",
    name: "Ultra Slim Clear Case",
    category: "clear",
    price: 999,
    rating: 4.5,
    reviews: 88,
    sold: 600,
    brands: ["iphone", "samsung"],
    colors: [{ name: "Clear", hex: "#DCE7EF" }],
    description:
      "Budget-friendly, barely-there clear cover that keeps your phone slim while protecting against scratches.",
    features: ["Only 0.8 mm thin", "Flexible TPU", "Scratch protection", "Precise cut-outs"],
  },
  {
    slug: "rugged-kickstand-case",
    name: "Rugged Kickstand Case",
    category: "shockproof",
    price: 2499,
    rating: 4.7,
    reviews: 66,
    sold: 140,
    brands: ["iphone", "samsung"],
    colors: [
      { name: "Navy", hex: "#1E3A5F" },
      { name: "Black", hex: "#27272A" },
    ],
    description:
      "Heavy-duty protection with a fold-out metal kickstand for hands-free videos and calls.",
    features: ["Fold-out metal kickstand", "Military-grade drop protection", "Camera slide cover", "Reinforced corners"],
    isNew: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByBrand(brand: Brand) {
  return products.filter((p) => p.brands.includes(brand));
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getTrending() {
  return products.filter((p) => p.trending);
}

export function getNewArrivals() {
  return products.filter((p) => p.isNew);
}

export function getOnSale() {
  return products.filter((p) => p.oldPrice && p.oldPrice > p.price);
}

export function getRelated(product: Product, limit = 4) {
  const same = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const rest = products.filter((p) => p.slug !== product.slug && p.category !== product.category);
  return [...same, ...rest].slice(0, limit);
}
