import { OrderConfirmation } from "@/components/order/OrderConfirmation";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Order Confirmed",
  description: "Thank you for your order.",
  path: "/order-confirmed",
  noIndex: true,
});

export default function OrderConfirmedPage() {
  return (
    <Container className="py-8">
      <OrderConfirmation />
    </Container>
  );
}
