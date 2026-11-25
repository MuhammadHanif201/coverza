"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { cities, newOrderNumber, paymentLabels, saveOrder, type PaymentMethod } from "@/lib/order";
import { cn, formatPrice } from "@/lib/format";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CaseArt } from "@/components/ui/CaseArt";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Totals } from "@/components/cart/OrderSummary";

const payments: { key: PaymentMethod; icon: IconName; text: string }[] = [
  { key: "cod", icon: "cash", text: "Pay in cash when parcel arrives" },
  { key: "jazzcash", icon: "wallet", text: "Pay via JazzCash mobile account" },
  { key: "easypaisa", icon: "wallet", text: "Pay via Easypaisa mobile account" },
  { key: "card", icon: "card", text: "Visa, Mastercard" },
];

type Errors = Partial<Record<"name" | "phone" | "city" | "address", string>>;

function validate(data: FormData): Errors {
  const e: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").replace(/[\s-]/g, "");
  if (name.length < 3) e.name = "Please enter your full name.";
  if (!/^(03\d{9}|\+923\d{9}|923\d{9})$/.test(phone)) e.phone = "Enter a valid mobile number, e.g. 03001234567.";
  if (!data.get("city")) e.city = "Please select your city.";
  if (String(data.get("address") ?? "").trim().length < 10) e.address = "Please enter your complete address.";
  return e;
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, ready, count, subtotal, delivery, total, clear } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  if (!ready) return <div className="h-96 animate-pulse rounded-3xl bg-surf" aria-busy="true" />;

  if (submitting) return <div className="h-96 animate-pulse rounded-3xl bg-surf" aria-busy="true" />;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-surf px-6 py-16 text-center">
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <p className="text-sm text-muted">Add a cover to your cart before checking out.</p>
        <ButtonLink href="/covers" pill>Browse covers</ButtonLink>
      </div>
    );
  }

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }
    setSubmitting(true);
    // Frontend only: no backend yet, so the order is kept in the browser.
    saveOrder({
      number: newOrderNumber(),
      createdAt: new Date().toISOString(),
      name: String(data.get("name")).trim(),
      phone: String(data.get("phone")).trim(),
      city: String(data.get("city")),
      area: String(data.get("area") ?? "").trim(),
      address: String(data.get("address")).trim(),
      notes: String(data.get("notes") ?? "").trim(),
      payment,
      items,
      subtotal,
      delivery,
      total,
    });
    clear();
    router.push("/order-confirmed");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 lg:grid-cols-[1fr_420px] lg:gap-8">
      <div className="flex flex-col gap-6">
        <section aria-labelledby="delivery-details" className="rounded-3xl border border-line bg-white p-5 sm:p-7">
          <h2 id="delivery-details" className="mb-5 text-lg font-bold sm:text-xl">Delivery details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" autoComplete="name" placeholder="e.g. Ali Raza" error={errors.name} />
            <Field label="Phone number" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="03XX-XXXXXXX" error={errors.phone} />
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-[13px] font-semibold">City</label>
              <div className="relative">
                <select
                  id="city"
                  name="city"
                  defaultValue=""
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? "city-error" : undefined}
                  className={cn(inputCls, "appearance-none pr-10", errors.city && "border-sale")}
                >
                  <option value="" disabled>Select city</option>
                  {cities.map((c) => <option key={c}>{c}</option>)}
                </select>
                <Icon name="chevron-down" size={18} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
              </div>
              {errors.city && <p id="city-error" className="text-xs text-sale">{errors.city}</p>}
            </div>
            <Field label="Area (optional)" name="area" placeholder="e.g. DHA Phase 5" />
            <Field label="Complete address" name="address" autoComplete="street-address" placeholder="House #, street, nearby landmark" error={errors.address} className="sm:col-span-2" />
            <Field label="Order notes (optional)" name="notes" placeholder="e.g. Call before delivery" className="sm:col-span-2" />
          </div>
        </section>

        <fieldset className="rounded-3xl border border-line bg-white p-5 sm:p-7">
          <legend className="sr-only">Payment method</legend>
          <h2 aria-hidden="true" className="mb-4 text-lg font-bold sm:text-xl">Payment method</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {payments.map((p) => {
              const on = payment === p.key;
              return (
                <label
                  key={p.key}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink",
                    on ? "border-2 border-ink bg-zinc-50" : "border-line hover:border-zinc-400",
                  )}
                >
                  <input type="radio" name="payment" value={p.key} checked={on} onChange={() => setPayment(p.key)} className="sr-only" />
                  <span className={cn("rounded-xl p-2", on ? "bg-ink text-white" : "bg-surf")}>
                    <Icon name={p.icon} size={18} />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="text-sm font-semibold sm:text-[15px]">{paymentLabels[p.key]}</span>
                    <span className="text-xs text-muted">{p.text}</span>
                  </span>
                  <span aria-hidden="true" className={cn("flex size-5 items-center justify-center rounded-full border-2", on ? "border-ink" : "border-zinc-300")}>
                    {on && <span className="size-2.5 rounded-full bg-ink" />}
                  </span>
                </label>
              );
            })}
          </div>
          {payment !== "cod" && (
            <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
              Our team will share {paymentLabels[payment]} payment details on WhatsApp after confirming your order.
            </p>
          )}
        </fieldset>
      </div>

      <aside aria-label="Order summary" className="h-fit rounded-3xl border border-line bg-white p-5 sm:p-7 lg:sticky lg:top-28">
        <h2 className="mb-5 text-lg font-bold sm:text-xl">Order summary</h2>
        <ul className="mb-5 flex flex-col gap-4">
          {items.map((i) => (
            <li key={i.id} className="flex items-center gap-3.5">
              <CaseArt color={i.hex} className="h-[76px] w-16 shrink-0 rounded-xl" />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-semibold">{i.name}</span>
                <span className="text-xs text-muted">{i.model} · {i.color} · Qty {i.qty}</span>
              </span>
              <span className="text-sm font-semibold">{formatPrice(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mb-5 border-t border-line" />
        <Totals subtotal={subtotal} delivery={delivery} total={total} count={count} />
        <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
          {submitting ? "Placing order…" : `Place Order · ${formatPrice(total)}`}
        </Button>
        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
          <Icon name="lock" size={14} /> We will call you to confirm before dispatch
        </p>
      </aside>
    </form>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] outline-none placeholder:text-zinc-400 focus:border-ink";

function Field({
  label,
  name,
  error,
  className,
  ...props
}: { label: string; name: string; error?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={name} className="text-[13px] font-semibold">{label}</label>
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(inputCls, error && "border-sale")}
        {...props}
      />
      {error && <p id={`${name}-error`} className="text-xs text-sale">{error}</p>}
    </div>
  );
}
