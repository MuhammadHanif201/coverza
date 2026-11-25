import { TrustStrip } from "@/components/home/TrustStrip";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Shipping & Returns Policy",
  description: `Coverza delivers phone covers all over Pakistan in ${site.deliveryDays} with Cash on Delivery. Free delivery above Rs ${site.freeDeliveryThreshold}. ${site.returnDays}-day free exchange.`,
  path: "/shipping-returns",
});

const sections = [
  {
    title: "Delivery areas & time",
    body: `We deliver to every city in Pakistan through trusted couriers (TCS, Leopards and others). Orders are confirmed on call and dispatched within 24 hours, then delivered in ${site.deliveryDays}.`,
  },
  {
    title: "Delivery charges",
    body: `Delivery is FREE on orders above Rs ${site.freeDeliveryThreshold.toLocaleString("en-US")}. For smaller orders, a flat charge of Rs ${site.deliveryFee} applies. There are no extra Cash on Delivery charges.`,
  },
  {
    title: "Payment options",
    body: "Pay with Cash on Delivery, JazzCash, Easypaisa or a debit/credit card. For COD, please keep the exact amount ready for the rider.",
  },
  {
    title: `${site.returnDays}-day exchange`,
    body: `If you receive the wrong model, a damaged cover or a manufacturing defect, message us on WhatsApp within ${site.returnDays} days of delivery with a photo. We will exchange it free of cost. Covers must be unused and in their original packaging.`,
  },
];

export default function ShippingReturnsPage() {
  return (
    <>
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Shipping & Returns", href: "/shipping-returns" }]} />
        <h1 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Shipping &amp; Returns</h1>
        <div className="flex flex-col gap-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="mb-2 text-lg font-bold sm:text-xl">{s.title}</h2>
              <p className="text-sm leading-relaxed text-muted sm:text-[15px]">{s.body}</p>
            </section>
          ))}
        </div>
      </Container>
      <TrustStrip className="mt-14" />
    </>
  );
}
