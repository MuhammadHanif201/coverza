import { formatPrice } from "@/lib/format";

export function SummaryRow({ label, value, strong, green }: { label: string; value: string; strong?: boolean; green?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={strong ? "text-base font-bold sm:text-lg" : "text-sm text-muted sm:text-[15px]"}>{label}</dt>
      <dd className={strong ? "text-base font-bold sm:text-lg" : `text-sm font-medium sm:text-[15px] ${green ? "text-green-600" : ""}`}>{value}</dd>
    </div>
  );
}

export function Totals({ subtotal, delivery, total, count }: { subtotal: number; delivery: number; total: number; count: number }) {
  return (
    <dl className="flex flex-col gap-2.5">
      <SummaryRow label={`Subtotal (${count} item${count === 1 ? "" : "s"})`} value={formatPrice(subtotal)} />
      <SummaryRow label="Delivery" value={delivery === 0 ? "FREE" : formatPrice(delivery)} green={delivery === 0} />
      <SummaryRow label="COD charges" value="Rs 0" />
      <div className="my-1 border-t border-line" />
      <SummaryRow label="Total" value={formatPrice(total)} strong />
    </dl>
  );
}
