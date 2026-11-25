"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";
import { OrderTimeline } from "./OrderTimeline";

/** Frontend demo: shows a sample status until the backend/courier API exists. */
export function TrackOrderForm() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const number = String(data.get("order") ?? "").trim().toUpperCase().replace(/^#/, "");
    if (!/^CVZ-\d{5}$/.test(number)) {
      setError("Enter your order number, e.g. CVZ-10482.");
      setResult(null);
      return;
    }
    setError("");
    setResult(number);
  };

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 rounded-3xl border border-line p-5 sm:flex-row sm:items-end sm:p-7">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="order" className="text-[13px] font-semibold">Order number</label>
          <input
            id="order"
            name="order"
            placeholder="e.g. CVZ-10482"
            aria-invalid={!!error}
            aria-describedby={error ? "order-error" : undefined}
            className="h-12 rounded-xl border border-line px-4 text-[15px] uppercase outline-none placeholder:normal-case placeholder:text-zinc-400 focus:border-ink"
          />
          {error && <p id="order-error" className="text-xs text-sale">{error}</p>}
        </div>
        <Button type="submit" size="md">Track order</Button>
      </form>

      {result && (
        <section aria-live="polite" className="rounded-3xl bg-surf p-5 sm:p-7">
          <h2 className="mb-5 text-lg font-bold">Order #{result}</h2>
          <OrderTimeline
            current={2}
            steps={[
              { title: "Order placed", text: "We received your order" },
              { title: "Confirmed on call", text: "Order verified by our team" },
              { title: "Dispatched", text: "On the way with TCS / Leopards" },
              { title: "Delivered", text: "Pay cash to the rider if COD" },
            ]}
          />
          <ButtonLink href={whatsappLink(`Assalam o Alaikum! Please share the status of my order #${result}.`)} external variant="whatsapp" icon="message" className="mt-2">
            Ask on WhatsApp
          </ButtonLink>
        </section>
      )}
    </div>
  );
}
