import { ListingHeader } from "@/components/product/ListingHeader";
import { ProductListing } from "@/components/product/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getOnSale } from "@/lib/data/products";
import { itemListSchema, pageMetadata } from "@/lib/seo";

const title = "Mobile Covers on Sale";
const description =
  "Discounted iPhone and Samsung covers — save up to 20% on clear, MagSafe, silicone and leather cases. Cash on Delivery all over Pakistan.";

export const metadata = pageMetadata({ title, description, path: "/sale" });

export default function SalePage() {
  const items = getOnSale();
  return (
    <Container>
      <JsonLd data={itemListSchema(title, "/sale", items)} />
      <Breadcrumbs items={[{ name: "Sale", href: "/sale" }]} />
      <ListingHeader title={title} subtitle={description} />
      <ProductListing products={items} />
    </Container>
  );
}
