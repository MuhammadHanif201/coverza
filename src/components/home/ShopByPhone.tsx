import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { CaseArt } from "@/components/ui/CaseArt";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands, phoneModels, type Brand } from "@/lib/data/phones";

export function ShopByPhone() {
  return (
    <Container as="section" className="mt-12 lg:mt-16">
      <SectionHeading title="Shop by Phone" id="shop-by-phone" link={{ href: "/brand/iphone", label: "View all models" }} />
      <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {(Object.keys(brands) as Brand[]).map((b) => {
          const brand = brands[b];
          const popular = phoneModels.filter((m) => m.brand === b && m.popular).slice(0, 5);
          return (
            <div key={b} className="flex items-center gap-4 rounded-3xl bg-surf p-5 sm:p-8 lg:gap-6">
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <h3 className="text-2xl font-bold lg:text-[32px]">{brand.name}</h3>
                <p className="text-sm text-muted sm:text-[15px]">Covers for {brand.range}</p>
                <ul className="flex flex-wrap gap-2">
                  {popular.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={`/covers/${m.slug}`}
                        className="block rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium hover:border-ink sm:px-4 sm:py-2 sm:text-[13px]"
                      >
                        {m.name.replace(/^(iPhone|Galaxy) /, "")}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ButtonLink href={`/brand/${b}`} size="sm" pill iconRight="chevron-right" className="mt-2 w-fit">
                  Shop {brand.name} covers
                </ButtonLink>
              </div>
              <CaseArt color={brand.caseColor} background="bg-white" className="hidden aspect-[170/230] w-32 shrink-0 rounded-[18px] sm:flex lg:w-[170px]" />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
