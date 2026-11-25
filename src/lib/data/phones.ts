import { slugify } from "@/lib/format";

export type Brand = "iphone" | "samsung";

export type PhoneModel = {
  slug: string;
  name: string;
  brand: Brand;
  series: string;
  popular?: boolean;
};

export const brands: Record<
  Brand,
  { slug: Brand; name: string; title: string; range: string; caseColor: string }
> = {
  iphone: {
    slug: "iphone",
    name: "iPhone",
    title: "iPhone Covers",
    range: "iPhone 11 to iPhone 17 Pro Max",
    caseColor: "#C7D9E8",
  },
  samsung: {
    slug: "samsung",
    name: "Samsung",
    title: "Samsung Covers",
    range: "Galaxy S, A & Z series",
    caseColor: "#8FAF92",
  },
};

const series: Array<{ brand: Brand; series: string; models: string[]; popular?: string[] }> = [
  { brand: "iphone", series: "iPhone 17 Series", models: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone Air", "iPhone 17"], popular: ["iPhone 17 Pro Max", "iPhone 17 Pro"] },
  { brand: "iphone", series: "iPhone 16 Series", models: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16"], popular: ["iPhone 16 Pro Max"] },
  { brand: "iphone", series: "iPhone 15 Series", models: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15"], popular: ["iPhone 15 Pro"] },
  { brand: "iphone", series: "iPhone 14 Series", models: ["iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14"] },
  { brand: "iphone", series: "iPhone 13 Series", models: ["iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13"] },
  { brand: "iphone", series: "iPhone 11 & 12 Series", models: ["iPhone 12 Pro Max", "iPhone 12", "iPhone 11"] },
  { brand: "samsung", series: "Galaxy S25 Series", models: ["Galaxy S25 Ultra", "Galaxy S25+", "Galaxy S25"], popular: ["Galaxy S25 Ultra", "Galaxy S25"] },
  { brand: "samsung", series: "Galaxy S24 Series", models: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S24 FE"], popular: ["Galaxy S24 Ultra"] },
  { brand: "samsung", series: "Galaxy A Series", models: ["Galaxy A56", "Galaxy A55", "Galaxy A36", "Galaxy A35", "Galaxy A16", "Galaxy A15"], popular: ["Galaxy A56"] },
  { brand: "samsung", series: "Galaxy Z Series", models: ["Galaxy Z Fold 7", "Galaxy Z Flip 7"], popular: ["Galaxy Z Flip 7"] },
];

export const phoneModels: PhoneModel[] = series.flatMap((s) =>
  s.models.map((name) => ({
    slug: slugify(name),
    name,
    brand: s.brand,
    series: s.series,
    popular: s.popular?.includes(name),
  })),
);

export function getModel(slug: string) {
  return phoneModels.find((m) => m.slug === slug);
}

export function getModelsByBrand(brand: Brand) {
  return phoneModels.filter((m) => m.brand === brand);
}

export function getSeriesByBrand(brand: Brand) {
  const groups = new Map<string, PhoneModel[]>();
  for (const m of getModelsByBrand(brand)) {
    groups.set(m.series, [...(groups.get(m.series) ?? []), m]);
  }
  return [...groups.entries()].map(([name, models]) => ({ name, models }));
}

export function isBrand(value: string): value is Brand {
  return value === "iphone" || value === "samsung";
}
