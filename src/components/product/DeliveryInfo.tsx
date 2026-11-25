import { Icon, type IconName } from "@/components/ui/Icon";
import { site } from "@/lib/site";

const rows: { icon: IconName; title: string; text: string }[] = [
  { icon: "cash", title: "Cash on Delivery available", text: "Pay when you receive the parcel" },
  {
    icon: "truck",
    title: `Delivery in ${site.deliveryDays}`,
    text: `Free delivery above Rs ${site.freeDeliveryThreshold.toLocaleString("en-US")} · All over Pakistan`,
  },
  { icon: "rotate", title: `${site.returnDays}-day easy return`, text: "Free exchange if wrong model or damaged" },
];

export function DeliveryInfo() {
  return (
    <ul className="flex flex-col gap-3.5 rounded-2xl bg-surf p-4 sm:p-5">
      {rows.map((r) => (
        <li key={r.title} className="flex items-center gap-3.5">
          <Icon name={r.icon} size={22} className="shrink-0" />
          <span className="flex flex-col">
            <span className="text-sm font-semibold">{r.title}</span>
            <span className="text-[13px] text-muted">{r.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
