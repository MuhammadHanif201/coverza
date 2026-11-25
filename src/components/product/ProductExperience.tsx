"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/data/products";
import type { PhoneModel } from "@/lib/data/phones";
import { useCart } from "@/lib/cart";
import { useQueryParam } from "@/lib/use-browser-value";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CaseArt } from "@/components/ui/CaseArt";
import { Icon } from "@/components/ui/Icon";
import { cn, discountPercent, formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

/**
 * Interactive gallery + buy box. Server-rendered product info is passed in as
 * `header` and `details` so it stays in the initial HTML for SEO.
 */
export function ProductExperience({
  product,
  models,
  header,
  details,
}: {
  product: Product;
  models: PhoneModel[];
  header: React.ReactNode;
  details: React.ReactNode;
}) {
  const { add } = useCart();
  const [colorIndex, setColorIndex] = useState(0);
  const urlModel = useQueryParam("model");
  const [modelChoice, setModel] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const color = product.colors[colorIndex];
  const off = discountPercent(product.price, product.oldPrice);

  // Pre-select the model the shopper came from (?model=...).
  const model =
    modelChoice ?? (urlModel && models.some((x) => x.slug === urlModel) ? urlModel : (models[0]?.slug ?? ""));

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 4000);
    return () => clearTimeout(t);
  }, [added]);

  const modelName = models.find((m) => m.slug === model)?.name ?? "";
  const seriesGroups = [...new Set(models.map((m) => m.series))];

  const handleAdd = () => {
    add({ slug: product.slug, name: product.name, model: modelName, color: color.name, hex: color.hex, price: product.price, qty });
    setAdded(true);
  };

  const waMessage = `Assalam o Alaikum! I want to order:\n• ${product.name}\n• Model: ${modelName}\n• Color: ${color.name}\n• Qty: ${qty}\n• Price: ${formatPrice(product.price * qty)}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,620px)_1fr] lg:gap-14">
      {/* Gallery */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4 lg:sticky lg:top-28 lg:self-start">
        <ul className="no-scrollbar flex gap-2.5 overflow-x-auto sm:flex-col sm:gap-3" aria-label="Colour previews">
          {product.colors.map((c, i) => (
            <li key={c.name}>
              <button
                type="button"
                onClick={() => setColorIndex(i)}
                aria-label={`Show ${c.name}`}
                aria-pressed={i === colorIndex}
                className={cn("block overflow-hidden rounded-xl border-2", i === colorIndex ? "border-ink" : "border-transparent")}
              >
                <CaseArt color={c.hex} className="size-16 sm:size-[88px]" />
              </button>
            </li>
          ))}
        </ul>
        <div className="relative flex-1">
          <CaseArt
            color={color.hex}
            label={`${product.name} in ${color.name}`}
            className="aspect-square w-full rounded-3xl sm:aspect-[5/6]"
          />
          {off > 0 && (
            <span className="absolute left-4 top-4 rounded-lg bg-sale px-2.5 py-1 text-xs font-bold text-white sm:left-5 sm:top-5 sm:text-[13px]">
              -{off}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Buy box */}
      <div className="flex flex-col gap-5">
        {header}
        <hr className="border-line" />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="model" className="text-sm font-semibold">Phone model</label>
            <Link href={`/brand/${models[0]?.brand ?? "iphone"}`} className="text-[13px] font-medium text-muted hover:text-ink">
              Not sure? Find your model
            </Link>
          </div>
          <div className="relative">
            <Icon name="phone" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-line bg-white pl-10 pr-10 text-[15px] font-medium outline-none focus:border-ink"
            >
              {seriesGroups.map((s) => (
                <optgroup key={s} label={s}>
                  {models.filter((m) => m.series === s).map((m) => (
                    <option key={m.slug} value={m.slug}>{m.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <Icon name="chevron-down" size={18} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <fieldset>
          <legend className="mb-2.5 text-sm font-semibold">
            Color: <span className="font-normal text-muted">{color.name}</span>
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((c, i) => (
              <label key={c.name} className="cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  className="peer sr-only"
                  checked={i === colorIndex}
                  onChange={() => setColorIndex(i)}
                />
                <span
                  className={cn(
                    "block rounded-full border-2 p-[3px] peer-focus-visible:ring-2 peer-focus-visible:ring-ink",
                    i === colorIndex ? "border-ink" : "border-transparent",
                  )}
                >
                  <span className="block size-7 rounded-full border border-line" style={{ backgroundColor: c.hex }} />
                </span>
                <span className="sr-only">{c.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex h-14 items-center justify-between gap-5 rounded-2xl border border-line px-4 sm:justify-start">
            <span className="text-sm font-semibold sm:hidden">Quantity</span>
            <div className="flex items-center gap-5">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} className="disabled:opacity-30">
                <Icon name="minus" size={16} />
              </button>
              <span className="w-4 text-center font-semibold" aria-live="polite">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))}>
                <Icon name="plus" size={16} />
              </button>
            </div>
          </div>
          <Button size="lg" icon="bag" className="w-full sm:w-auto sm:flex-1" onClick={handleAdd}>
            Add to Cart · {formatPrice(product.price * qty)}
          </Button>
        </div>

        {added && (
          <div role="status" className="flex items-center justify-between gap-3 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
            <span className="flex items-center gap-2 font-medium"><Icon name="check" size={18} /> Added to cart</span>
            <Link href="/cart" className="font-semibold underline">View cart</Link>
          </div>
        )}

        <ButtonLink href={whatsappLink(waMessage)} external variant="whatsapp" size="lg" icon="message">
          Order on WhatsApp
        </ButtonLink>

        {details}
      </div>
    </div>
  );
}
