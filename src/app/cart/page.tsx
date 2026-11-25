import { CartView } from "@/components/cart/CartView";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Your Cart",
  description: "Review the covers in your cart and check out with Cash on Delivery.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ name: "Cart", href: "/cart" }]} />
      <h1 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl lg:mb-8 lg:text-4xl">My Cart</h1>
      <CartView />
    </Container>
  );
}
