import type { MetadataRoute } from "next";
import { categories } from "@/lib/data/categories";
import { brands, phoneModels } from "@/lib/data/phones";
import { products } from "@/lib/data/products";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" = "weekly") => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "daily"),
    entry("/covers", 0.9, "daily"),
    entry("/sale", 0.8, "daily"),
    ...Object.keys(brands).map((b) => entry(`/brand/${b}`, 0.9)),
    ...phoneModels.map((m) => entry(`/covers/${m.slug}`, m.popular ? 0.8 : 0.7)),
    ...categories.map((c) => entry(`/category/${c.slug}`, 0.8)),
    ...products.map((p) => entry(`/product/${p.slug}`, 0.8)),
    entry("/faq", 0.5, "monthly"),
    entry("/shipping-returns", 0.4, "monthly"),
    entry("/track-order", 0.3, "monthly"),
  ];
}
