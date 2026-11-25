import { Icon } from "@/components/ui/Icon";

/** Native <details> accordion: zero JavaScript, fully crawlable. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-4 sm:py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold sm:text-base">
            <h3>{f.q}</h3>
            <Icon name="plus" size={18} className="shrink-0 transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
