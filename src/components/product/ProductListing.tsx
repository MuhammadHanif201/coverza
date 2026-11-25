"use client";

import { useMemo, useState } from "react";
import { useQueryParam } from "@/lib/use-browser-value";
import type { Product } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { ProductGrid } from "./ProductCard";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/format";

type Sort = "popular" | "price-asc" | "price-desc" | "rating" | "new";

const priceRanges = [
  { key: "all", label: "Any price", min: 0, max: Infinity },
  { key: "u1500", label: "Under Rs 1,500", min: 0, max: 1499 },
  { key: "1500-2000", label: "Rs 1,500 – 2,000", min: 1500, max: 2000 },
  { key: "2000+", label: "Above Rs 2,000", min: 2001, max: Infinity },
];

/**
 * Client-side filtering/sorting. The full, unfiltered list is rendered on the
 * server first so crawlers see every product.
 */
export function ProductListing({
  products,
  model,
  showCategories = true,
}: {
  products: Product[];
  model?: { slug: string; name: string };
  showCategories?: boolean;
}) {
  // ?q= and ?category= are read on the client so the page itself stays static.
  const urlQuery = useQueryParam("q");
  const urlCategory = useQueryParam("category");
  const [categoryChoice, setCategory] = useState<string | null>(null);
  const [queryChoice, setQuery] = useState<string | null>(null);
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState<Sort>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category =
    categoryChoice ?? (urlCategory && categories.some((x) => x.slug === urlCategory) ? urlCategory : "all");
  const query = queryChoice ?? urlQuery?.trim() ?? "";

  const available = useMemo(
    () => categories.filter((c) => products.some((p) => p.category === c.slug)),
    [products],
  );

  const visible = useMemo(() => {
    const range = priceRanges.find((r) => r.key === price)!;
    const q = query.toLowerCase();
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.price >= range.min &&
        p.price <= range.max &&
        (!q || p.name.toLowerCase().includes(q) || p.category.includes(q) || p.brands.some((b) => q.includes(b))),
    );
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "popular") sorted.sort((a, b) => b.sold - a.sold);
    if (sort === "new") sorted.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return sorted;
  }, [products, category, price, sort, query]);

  const reset = () => {
    setCategory("all");
    setPrice("all");
    setQuery("");
  };

  const filterPanel = (
    <div className="flex flex-col gap-6">
      {showCategories && (
        <fieldset>
          <legend className="mb-3 text-[15px] font-semibold">Category</legend>
          <div className="flex flex-col gap-2.5">
            {[{ slug: "all", name: "All categories" }, ...available].map((c) => (
              <Radio key={c.slug} name="category" checked={category === c.slug} onChange={() => setCategory(c.slug)}>
                {c.name}
                <span className="ml-auto text-[13px] text-muted">
                  {c.slug === "all" ? products.length : products.filter((p) => p.category === c.slug).length}
                </span>
              </Radio>
            ))}
          </div>
        </fieldset>
      )}
      <fieldset>
        <legend className="mb-3 text-[15px] font-semibold">Price</legend>
        <div className="flex flex-col gap-2.5">
          {priceRanges.map((r) => (
            <Radio key={r.key} name="price" checked={price === r.key} onChange={() => setPrice(r.key)}>
              {r.label}
            </Radio>
          ))}
        </div>
      </fieldset>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside aria-label="Filters" className="hidden lg:block">
        <div className="sticky top-28">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>
            <button type="button" onClick={reset} className="text-[13px] font-medium text-muted hover:text-ink">Clear all</button>
          </div>
          {filterPanel}
        </div>
      </aside>

      <div className="min-w-0">
        {showCategories && (
          <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {[{ slug: "all", name: "All" }, ...available].map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCategory(c.slug)}
                aria-pressed={category === c.slug}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                  category === c.slug ? "bg-ink text-white" : "border border-line bg-white hover:border-ink",
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] font-medium text-muted" aria-live="polite">
            {visible.length} product{visible.length === 1 ? "" : "s"}
            {query && (
              <>
                {" "}for “<span className="text-ink">{query}</span>”{" "}
                <button type="button" onClick={() => setQuery("")} className="underline">clear</button>
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="flex h-10 items-center gap-2 rounded-xl border border-line px-3 text-[13px] font-medium lg:hidden"
            >
              <Icon name="sliders" size={16} /> Filter
            </button>
            <label className="relative">
              <span className="sr-only">Sort products</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-10 appearance-none rounded-xl border border-line bg-white pl-3 pr-9 text-[13px] font-medium outline-none focus:border-ink"
              >
                <option value="popular">Sort: Most popular</option>
                <option value="new">Sort: Newest</option>
                <option value="rating">Sort: Top rated</option>
                <option value="price-asc">Sort: Price low to high</option>
                <option value="price-desc">Sort: Price high to low</option>
              </select>
              <Icon name="chevron-down" size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </label>
          </div>
        </div>

        {filtersOpen && <div className="mb-6 rounded-2xl border border-line p-5 lg:hidden">{filterPanel}</div>}

        {visible.length > 0 ? (
          <ProductGrid products={visible} model={model} columns={3} />
        ) : (
          <div className="rounded-2xl bg-surf p-10 text-center">
            <p className="font-semibold">No covers match these filters.</p>
            <button type="button" onClick={reset} className="mt-3 text-sm font-medium underline">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Radio({
  name,
  checked,
  onChange,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          "flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] peer-focus-visible:ring-2 peer-focus-visible:ring-ink",
          checked ? "border-ink bg-ink text-white" : "border-zinc-300",
        )}
      >
        {checked && <Icon name="check" size={12} strokeWidth={3} />}
      </span>
      <span className={cn("flex flex-1 items-center", checked && "font-medium")}>{children}</span>
    </label>
  );
}
