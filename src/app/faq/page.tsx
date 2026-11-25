import { FaqList } from "@/components/home/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { faqs } from "@/lib/data/faqs";
import { faqSchema, pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata = pageMetadata({
  title: "FAQs — Delivery, Cash on Delivery & Returns",
  description:
    "Answers about Coverza phone covers: Cash on Delivery, delivery time and charges across Pakistan, exchanges, supported iPhone & Samsung models and WhatsApp orders.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <Container className="max-w-3xl">
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={[{ name: "FAQs", href: "/faq" }]} />
      <h1 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Frequently asked questions</h1>
      <FaqList items={faqs} />
      <div className="mt-10 flex flex-col items-start gap-3 rounded-3xl bg-surf p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold">Still have a question?</p>
        <ButtonLink href={whatsappLink("Assalam o Alaikum! I have a question.")} external variant="whatsapp" icon="message" size="sm">
          Ask on WhatsApp
        </ButtonLink>
      </div>
    </Container>
  );
}
