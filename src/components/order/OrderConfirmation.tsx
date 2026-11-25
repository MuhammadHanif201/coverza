"use client";

import { useMemo } from "react";
import { ORDER_KEY, paymentLabels, type Order } from "@/lib/order";
import { useSessionValue } from "@/lib/use-browser-value";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { OrderTimeline } from "./OrderTimeline";

function deliveryWindow(createdAt: string) {
  const fmt = (d: Date) => d.toLocaleDateString("en-PK", { day: "numeric", month: "short" });
  const start = new Date(createdAt);
  const from = new Date(start);
  from.setDate(start.getDate() + 2);
  const to = new Date(start);
  to.setDate(start.getDate() + 4);
  return `${fmt(from)} – ${fmt(to)}`;
}

export function OrderConfirmation() {
  const raw = useSessionValue(ORDER_KEY);
  const order = useMemo<Order | null | undefined>(() => {
    if (raw === undefined) return undefined;
    try {
      return raw ? (JSON.parse(raw) as Order) : null;
    } catch {
      return null;
    }
  }, [raw]);

  if (order === undefined) return <div className="mx-auto h-96 max-w-xl animate-pulse rounded-3xl bg-surf" aria-busy="true" />;

  if (!order) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-3xl bg-surf px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">No recent order found</h1>
        <p className="text-sm text-muted">Looks like you haven&apos;t placed an order in this session.</p>
        <ButtonLink href="/covers" pill>Browse covers</ButtonLink>
      </div>
    );
  }

  const placed = new Date(order.createdAt).toLocaleString("en-PK", { hour: "numeric", minute: "2-digit", day: "numeric", month: "short" });

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <div className="flex flex-col items-center gap-3 pt-4 text-center">
        <span className="rounded-full bg-green-100 p-3.5">
          <span className="flex rounded-full bg-green-600 p-4 text-white"><Icon name="check" size={32} strokeWidth={3} /></span>
        </span>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Order placed!</h1>
        <p className="max-w-md text-sm leading-relaxed text-muted sm:text-[15px]">
          Shukriya {order.name.split(" ")[0]}! Your order has been received. We will call you on {order.phone} to confirm before dispatch.
        </p>
      </div>

      <dl className="flex flex-col gap-3 rounded-2xl bg-surf p-5">
        {[
          ["Order number", `#${order.number}`],
          ["Payment", paymentLabels[order.payment]],
          ["Deliver to", `${order.area ? `${order.area}, ` : ""}${order.city}`],
          ["Estimated delivery", deliveryWindow(order.createdAt)],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-sm sm:text-[15px]">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
        <div className="flex justify-between border-t border-line pt-3 text-base font-bold sm:text-lg">
          <dt>Amount to pay</dt>
          <dd>{formatPrice(order.total)}</dd>
        </div>
      </dl>

      <section aria-labelledby="order-status">
        <h2 id="order-status" className="mb-4 text-lg font-bold">Order status</h2>
        <OrderTimeline
          current={1}
          steps={[
            { title: "Order placed", text: placed },
            { title: "Confirmed on call", text: "Within 2 hours" },
            { title: "Dispatched", text: "Courier: TCS / Leopards" },
            { title: "Delivered", text: order.payment === "cod" ? "Pay cash to rider" : "Enjoy your new cover!" },
          ]}
        />
      </section>

      <div className="flex flex-col gap-3">
        <ButtonLink href={whatsappLink(`Assalam o Alaikum! Please share the status of my order #${order.number}.`)} external variant="whatsapp" size="lg" icon="message">
          Track on WhatsApp
        </ButtonLink>
        <ButtonLink href="/covers" variant="outline" size="lg">Continue Shopping</ButtonLink>
      </div>
    </div>
  );
}
