"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { CaseArt } from "@/components/ui/CaseArt";
import { Icon } from "@/components/ui/Icon";
import { Totals } from "./OrderSummary";

export function CartView() {
  const { items, ready, count, subtotal, delivery, total, setQty, remove } = useCart();

  if (!ready) {
    return <div className="h-64 animate-pulse rounded-3xl bg-surf" aria-busy="true" />;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-surf px-6 py-16 text-center">
        <Icon name="bag" size={40} className="text-muted" />
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <p className="max-w-sm text-sm text-muted">Find a cover for your iPhone or Samsung — Cash on Delivery all over Pakistan.</p>
        <ButtonLink href="/covers" pill iconRight="chevron-right">Start shopping</ButtonLink>
      </div>
    );
  }

  const remaining = site.freeDeliveryThreshold - subtotal;
  const progress = Math.min(100, (subtotal / site.freeDeliveryThreshold) * 100);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-green-50 p-4">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-green-700">
            <Icon name="truck" size={18} />
            {remaining > 0 ? `Add ${formatPrice(remaining)} more for FREE delivery` : "Yay! You get FREE delivery"}
          </p>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-green-200">
            <div className="h-full rounded-full bg-green-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3 rounded-2xl border border-line p-3 sm:gap-4 sm:p-4">
              <Link href={`/product/${item.slug}`} className="shrink-0">
                <CaseArt color={item.hex} className="h-24 w-20 rounded-xl sm:h-28 sm:w-24" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link href={`/product/${item.slug}`} className="text-sm font-semibold hover:underline sm:text-base">{item.name}</Link>
                    <p className="mt-0.5 text-xs text-muted sm:text-[13px]">{item.model} · {item.color}</p>
                  </div>
                  <button type="button" onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`} className="p-1 text-zinc-400 hover:text-sale">
                    <Icon name="trash" size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold">{formatPrice(item.price * item.qty)}</span>
                  <div className="flex items-center gap-3.5 rounded-full bg-surf px-3 py-1.5">
                    <button type="button" onClick={() => setQty(item.id, item.qty - 1)} disabled={item.qty <= 1} aria-label="Decrease quantity" className="disabled:opacity-30">
                      <Icon name="minus" size={14} />
                    </button>
                    <span className="w-4 text-center text-sm font-semibold">{item.qty}</span>
                    <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/covers" className="flex w-fit items-center gap-1 text-sm font-semibold text-muted hover:text-ink">
          <Icon name="chevron-left" size={16} /> Continue shopping
        </Link>
      </div>

      <aside aria-label="Order summary" className="h-fit rounded-3xl border border-line p-5 sm:p-7 lg:sticky lg:top-28">
        <h2 className="mb-5 text-lg font-bold sm:text-xl">Order summary</h2>
        <Totals subtotal={subtotal} delivery={delivery} total={total} count={count} />
        <ButtonLink href="/checkout" size="lg" className="mt-6 w-full">
          Proceed to Checkout · {formatPrice(total)}
        </ButtonLink>
        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
          <Icon name="cash" size={16} /> Cash on Delivery available
        </p>
      </aside>
    </div>
  );
}
