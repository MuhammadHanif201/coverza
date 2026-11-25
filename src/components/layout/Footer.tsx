import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "iPhone Covers", href: "/brand/iphone" },
      { label: "Samsung Covers", href: "/brand/samsung" },
      { label: "All Covers", href: "/covers" },
      { label: "Sale", href: "/sale" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Track Order", href: "/track-order" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "FAQs", href: "/faq" },
      { label: "Cart", href: "/cart" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 bg-ink text-zinc-400 lg:mt-24">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-16">
        <div className="flex flex-col gap-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed">
            Premium iPhone &amp; Samsung covers, delivered all over Pakistan with Cash on Delivery.
          </p>
          <a
            href={whatsappLink("Assalam o Alaikum! I have a question about phone covers.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-wa px-4 py-2.5 text-[13px] font-semibold text-white"
          >
            <Icon name="message" size={16} /> Chat on WhatsApp
          </a>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-4 text-[15px] font-semibold text-white">{col.title}</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="mb-4 text-[15px] font-semibold text-white">Contact</h2>
          <address className="flex flex-col gap-3 text-sm not-italic">
            <span>WhatsApp: {site.whatsappDisplay}</span>
            <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
            <span>{site.city}, Pakistan</span>
          </address>
        </div>
      </Container>
      <Container className="flex flex-col gap-4 border-t border-zinc-700 py-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {site.name}. All rights reserved.</p>
        <ul className="flex flex-wrap gap-2" aria-label="Payment methods">
          {["Cash on Delivery", "JazzCash", "Easypaisa", "Visa / Mastercard"].map((p) => (
            <li key={p} className="rounded-md border border-zinc-600 px-2.5 py-1 text-xs font-semibold text-white">{p}</li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
