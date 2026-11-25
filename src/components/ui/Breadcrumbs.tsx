import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="py-4 text-[13px]">
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-2 text-muted">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-zinc-400">/</span>}
              {last ? (
                <span aria-current="page" className="font-medium text-ink">{c.name}</span>
              ) : (
                <Link href={c.href} className="hover:text-ink">{c.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
