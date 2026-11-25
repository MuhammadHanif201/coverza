import Link from "next/link";
import { CaseArt } from "@/components/ui/CaseArt";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";

export function CategoryTiles() {
  return (
    <Container as="section" className="mt-12 lg:mt-16">
      <SectionHeading title="Shop by Category" id="shop-by-category" link={{ href: "/covers", label: "All covers" }} />
      <ul className="no-scrollbar -mx-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-7">
        {categories.map((c) => (
          <li key={c.slug} className="w-28 shrink-0 snap-start sm:w-auto">
            <Link href={`/category/${c.slug}`} className="group flex flex-col items-center gap-2 text-center">
              <CaseArt color={c.color} className="aspect-[184/200] w-full rounded-[18px] transition-transform group-hover:scale-[1.03]" />
              <span className="mt-1 text-sm font-semibold sm:text-base">{c.name}</span>
              <span className="text-xs text-muted">{getProductsByCategory(c.slug).length} designs</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
