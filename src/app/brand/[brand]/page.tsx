import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModelPicker } from "@/components/phones/ModelPicker";
import { ListingHeader } from "@/components/product/ListingHeader";
import { ProductListing } from "@/components/product/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { brands, isBrand } from "@/lib/data/phones";
import { getProductsByBrand } from "@/lib/data/products";
import { itemListSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(brands).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps<"/brand/[brand]">): Promise<Metadata> {
  const { brand } = await params;
  if (!isBrand(brand)) return {};
  const b = brands[brand];
  return pageMetadata({
    title: `${b.name} Covers & Cases in Pakistan`,
    description: `Buy ${b.name} mobile covers for ${b.range} — clear, silicone, MagSafe, shockproof and leather cases. Cash on Delivery all over Pakistan.`,
    path: `/brand/${brand}`,
  });
}

export default async function BrandPage({ params }: PageProps<"/brand/[brand]">) {
  const { brand } = await params;
  if (!isBrand(brand)) notFound();
  const b = brands[brand];
  const items = getProductsByBrand(brand);

  return (
    <Container>
      <JsonLd data={itemListSchema(b.title, `/brand/${brand}`, items)} />
      <Breadcrumbs items={[{ name: b.title, href: `/brand/${brand}` }]} />
      <ListingHeader
        title={`${b.name} Covers in Pakistan`}
        subtitle={`Pick your exact ${b.name} model for a perfect fit — covers available for ${b.range}.`}
      />
      <ModelPicker brand={brand} />
      <section aria-labelledby="all-brand-covers" className="mt-14">
        <h2 id="all-brand-covers" className="mb-5 text-xl font-bold sm:text-2xl">All {b.name} covers</h2>
        <ProductListing products={items} />
      </section>
    </Container>
  );
}
