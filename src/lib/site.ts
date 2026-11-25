/**
 * Site-wide settings. Replace placeholder contact details before going live.
 */
export const site = {
  name: "Coverza",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://coverza.pk",
  tagline: "iPhone & Samsung Mobile Covers in Pakistan",
  description:
    "Buy premium iPhone & Samsung mobile covers in Pakistan — clear, silicone, MagSafe, shockproof and leather cases. Cash on Delivery nationwide, 2–4 day delivery and 7-day easy returns.",
  /** WhatsApp number in international format, digits only (placeholder). */
  whatsapp: "923000000000",
  whatsappDisplay: "0300-0000000",
  email: "hello@coverza.pk",
  city: "Lahore",
  country: "PK",
  currency: "PKR",
  freeDeliveryThreshold: 2000,
  deliveryFee: 200,
  deliveryDays: "2–4 working days",
  returnDays: 7,
  social: {
    instagram: "https://instagram.com/coverza.pk",
    facebook: "https://facebook.com/coverza.pk",
  },
} as const;

export const mainNav = [
  { label: "iPhone Covers", href: "/brand/iphone" },
  { label: "Samsung Covers", href: "/brand/samsung" },
  { label: "All Covers", href: "/covers" },
  { label: "Sale", href: "/sale", highlight: true },
  { label: "Track Order", href: "/track-order" },
] as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
