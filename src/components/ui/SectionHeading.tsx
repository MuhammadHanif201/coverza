import Link from "next/link";
import { Icon } from "./Icon";

export function SectionHeading({
  title,
  id,
  link,
  children,
}: {
  title: string;
  id?: string;
  link?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 lg:mb-6">
      <h2 id={id} className="text-xl font-bold tracking-tight sm:text-2xl lg:text-[28px]">{title}</h2>
      {children}
      {link && (
        <Link href={link.href} className="flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink">
          {link.label}
          <Icon name="chevron-right" size={16} />
        </Link>
      )}
    </div>
  );
}
