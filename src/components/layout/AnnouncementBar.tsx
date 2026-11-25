import { site } from "@/lib/site";

export function AnnouncementBar() {
  const items = [
    `Free delivery above Rs ${site.freeDeliveryThreshold.toLocaleString("en-US")}`,
    "Cash on Delivery all over Pakistan",
    `${site.returnDays}-day easy returns`,
  ];
  return (
    <div className="bg-ink px-4 py-2 text-center text-[11px] font-medium text-white sm:text-xs">
      <p className="flex items-center justify-center gap-3">
        {items.map((t, i) => (
          <span key={t} className={i === 2 ? "hidden md:inline" : i === 1 ? "hidden sm:inline" : undefined}>
            {i > 0 && <span aria-hidden="true" className="mr-3 text-zinc-500">·</span>}
            {t}
          </span>
        ))}
      </p>
    </div>
  );
}
