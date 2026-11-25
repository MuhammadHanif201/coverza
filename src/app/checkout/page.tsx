import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Checkout",
  description: "Enter your delivery details and choose Cash on Delivery, JazzCash, Easypaisa or card.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ name: "Cart", href: "/cart" }, { name: "Checkout", href: "/checkout" }]} />
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-muted sm:text-[15px]">
          Apni details bharein — hum order confirm karne ke liye aap ko call karenge.
        </p>
      </div>
      <CheckoutForm />
    </Container>
  );
}
