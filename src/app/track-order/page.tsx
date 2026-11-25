import { TrackOrderForm } from "@/components/order/TrackOrderForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Track Your Order",
  description: "Track your Coverza phone-cover order with your order number. Delivery in 2–4 working days across Pakistan.",
  path: "/track-order",
});

export default function TrackOrderPage() {
  return (
    <Container className="max-w-3xl">
      <Breadcrumbs items={[{ name: "Track Order", href: "/track-order" }]} />
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Track your order</h1>
      <p className="mb-6 mt-2 text-sm text-muted sm:text-[15px]">
        Enter the order number from your confirmation (e.g. CVZ-10482).
      </p>
      <TrackOrderForm />
    </Container>
  );
}
