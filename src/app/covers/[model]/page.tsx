import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingHeader } from "@/components/product/ListingHeader";
import { ProductListing } from "@/components/product/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { brands, getModel, phoneModels } from "@/lib/data/phones";
import { getProductsByBrand } from "@/lib/data/products";
import { itemListSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return phoneModels.map((m) => ({ model: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/covers/[model]">): Promise<Metadata> {
  const { model: slug } = await params;
  const model = getModel(slug);
  if (!model) return {};
  return pageMetadata({
    title: `${model.name} Covers & Cases in Pakistan`,
    description: `Shop ${model.name} covers — clear, silicone, MagSafe, shockproof and leather cases with a perfect fit. Cash on Delivery all over Pakistan, 2–4 day delivery.`,
    path: `/covers/${slug}`,
  });
}

export default async function ModelCoversPage({ params }: PageProps<"/covers/[model]">) {
  const { model: slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();
  const brand = brands[model.brand];
  const items = getProductsByBrand(model.brand);
  const title = `${model.name} Covers`;

  return (
    <Container>
      <JsonLd data={itemListSchema(title, `/covers/${slug}`, items)} />
      <Breadcrumbs items={[{ name: brand.title, href: `/brand/${model.brand}` }, { name: model.name, href: `/covers/${slug}` }]} />
      <ListingHeader
        title={title}
        subtitle={`${items.length} designs made for ${model.name} · Perfect fit, Cash on Delivery available`}
      >
        <ButtonLink href={`/brand/${model.brand}`} variant="outline" size="sm" icon="phone" className="w-fit">
          Change phone model
        </ButtonLink>
      </ListingHeader>
      <ProductListing products={items} model={{ slug: model.slug, name: model.name }} />
    </Container>
  );
}
