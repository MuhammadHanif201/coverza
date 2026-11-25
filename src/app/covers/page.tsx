import { ListingHeader } from "@/components/product/ListingHeader";
import { ProductListing } from "@/components/product/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { products } from "@/lib/data/products";
import { itemListSchema, pageMetadata } from "@/lib/seo";

const title = "All Mobile Covers in Pakistan";
const description =
  "Shop all iPhone and Samsung mobile covers — clear, silicone, MagSafe, shockproof, leather, glitter and card-holder cases. Cash on Delivery all over Pakistan.";

export const metadata = pageMetadata({ title, description, path: "/covers" });

export default function CoversPage() {
  return (
    <Container>
      <JsonLd data={itemListSchema(title, "/covers", products)} />
      <Breadcrumbs items={[{ name: "All Covers", href: "/covers" }]} />
      <ListingHeader title={title} subtitle={description} />
      <ProductListing products={products} />
    </Container>
  );
}
