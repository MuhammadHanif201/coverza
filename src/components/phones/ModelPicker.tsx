import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { brands, getSeriesByBrand, type Brand } from "@/lib/data/phones";
import { cn } from "@/lib/format";

/** Brand toggle + model list. Pure links → static, crawlable, no JS. */
export function ModelPicker({ brand }: { brand: Brand }) {
  const groups = getSeriesByBrand(brand);
  return (
    <section aria-labelledby="choose-model">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="choose-model" className="text-xl font-bold sm:text-2xl">Choose your phone model</h2>
        <nav aria-label="Brand" className="flex w-full rounded-xl bg-surf p-1 sm:w-auto">
          {(Object.keys(brands) as Brand[]).map((b) => (
            <Link
              key={b}
              href={`/brand/${b}`}
              aria-current={b === brand ? "page" : undefined}
              className={cn(
                "flex-1 rounded-[10px] px-6 py-2.5 text-center text-sm transition-colors sm:flex-none",
                b === brand ? "bg-white font-semibold shadow-sm" : "font-medium text-muted hover:text-ink",
              )}
            >
              {brands[b].name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.name}>
            <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted">{g.name}</h3>
            <ul className="overflow-hidden rounded-2xl border border-line">
              {g.models.map((m) => (
                <li key={m.slug} className="border-b border-line last:border-b-0">
                  <Link href={`/covers/${m.slug}`} className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-surf">
                    <span className="flex items-center gap-3">
                      <Icon name="phone" size={20} className="text-muted" />
                      <span className="text-[15px] font-medium">{m.name}</span>
                      {m.popular && (
                        <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">Popular</span>
                      )}
                    </span>
                    <Icon name="chevron-right" size={18} className="text-zinc-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
