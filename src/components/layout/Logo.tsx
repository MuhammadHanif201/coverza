import Link from "next/link";
import { cn } from "@/lib/format";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Coverza home"
      className={cn("text-xl font-bold tracking-[0.12em] lg:text-2xl", light ? "text-white" : "text-ink", className)}
    >
      COVERZA
    </Link>
  );
}
