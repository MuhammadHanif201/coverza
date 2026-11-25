import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/format";

/** Plain GET form — works without JavaScript; /covers reads the ?q= value. */
export function SearchBox({ className, id = "site-search" }: { className?: string; id?: string }) {
  return (
    <form action="/covers" method="get" role="search" className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">Search covers</label>
      <Icon name="search" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
      <input
        id={id}
        name="q"
        type="search"
        placeholder="Search cover or phone model"
        autoComplete="off"
        className="h-11 w-full rounded-full bg-surf pl-10 pr-4 text-sm outline-none placeholder:text-muted focus:ring-2 focus:ring-ink"
      />
    </form>
  );
}
