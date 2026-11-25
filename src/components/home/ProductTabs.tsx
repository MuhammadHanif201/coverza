"use client";

import { useState } from "react";
import type { Product } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/ProductCard";

type Tab = { key: string; label: string; products: Product[] };

/** Tabs between product lists. All lists are server-rendered into the HTML for SEO. */
export function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].key);
  return (
    <div>
      <div role="tablist" aria-label="Product lists" className="no-scrollbar mb-5 flex gap-2 overflow-x-auto lg:mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={active === t.key}
            aria-controls={`panel-${t.key}`}
            onClick={() => setActive(t.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
              active === t.key ? "bg-ink text-white" : "border border-line bg-white hover:border-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.key} role="tabpanel" id={`panel-${t.key}`} aria-labelledby={`tab-${t.key}`} hidden={active !== t.key}>
          <ProductGrid products={t.products.slice(0, 4)} />
        </div>
      ))}
    </div>
  );
}
