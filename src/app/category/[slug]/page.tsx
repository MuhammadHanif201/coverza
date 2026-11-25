import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingHeader } from "@/components/product/ListingHeader";
import { ProductListing } from "@/components/product/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { categories, getCategory } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { itemListSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return pageMetadata({
    title: `${category.name} Covers for iPhone & Samsung`,
    description: `${category.description} Shop ${category.name.toLowerCase()} covers for iPhone and Samsung in Pakistan with Cash on Delivery.`,
    path: `/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = getProductsByCategory(slug);
  const title = `${category.name} Covers`;

  return (
    <Container>
      <JsonLd data={itemListSchema(title, `/category/${slug}`, items)} />
      <Breadcrumbs items={[{ name: "All Covers", href: "/covers" }, { name: title, href: `/category/${slug}` }]} />
      <ListingHeader title={`${category.name} Covers for iPhone & Samsung`} subtitle={category.description} />
      <ProductListing products={items} showCategories={false} />
    </Container>
  );
}
