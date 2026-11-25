import type { Metadata } from "next";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { FaqList } from "@/components/home/FaqList";
import { Hero } from "@/components/home/Hero";
import { ProductTabs } from "@/components/home/ProductTabs";
import { ShopByPhone } from "@/components/home/ShopByPhone";
import { TrustStrip } from "@/components/home/TrustStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/data/faqs";
import { getNewArrivals, getOnSale, getTrending } from "@/lib/data/products";
import { faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — iPhone & Samsung Mobile Covers in Pakistan | Cash on Delivery` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Hero />
      <ShopByPhone />
      <CategoryTiles />

      <Container as="section" className="mt-12 lg:mt-16">
        <SectionHeading title="Trending Now" id="trending" />
        <ProductTabs
          tabs={[
            { key: "best", label: "Best Sellers", products: getTrending() },
            { key: "new", label: "New Arrivals", products: getNewArrivals() },
            { key: "sale", label: "On Sale", products: getOnSale() },
          ]}
        />
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/covers" variant="outline" pill>View all products</ButtonLink>
        </div>
      </Container>

      <TrustStrip />

      <Container as="section" className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 id="faq" className="text-xl font-bold tracking-tight sm:text-2xl lg:text-[28px]">Frequently asked questions</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            {site.name} sells original-quality iPhone and Samsung mobile covers online in Pakistan. Every order ships with Cash
            on Delivery, {site.deliveryDays} delivery and a {site.returnDays}-day exchange policy.
          </p>
          <ButtonLink href="/faq" variant="outline" size="sm" pill className="mt-5" iconRight="chevron-right">All FAQs</ButtonLink>
        </div>
        <FaqList items={faqs.slice(0, 4)} />
      </Container>
    </>
  );
}
