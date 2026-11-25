import type { Metadata } from "next";
import type { Product } from "@/lib/data/products";
import { absoluteUrl, site } from "@/lib/site";
import { getCategory } from "@/lib/data/categories";

/** Builds consistent per-page metadata (title, description, canonical, OG, Twitter). */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, locale: "en_PK", type: "website" },
    twitter: { card: "summary_large_image", title, description },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    telephone: `+${site.whatsapp}`,
    areaServed: { "@type": "Country", name: "Pakistan" },
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.country },
    sameAs: Object.values(site.social),
    paymentAccepted: ["Cash on Delivery", "JazzCash", "Easypaisa", "Credit Card", "Debit Card"],
    currenciesAccepted: site.currency,
    hasMerchantReturnPolicy: returnPolicySchema(),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    url: site.url,
    inLanguage: "en-PK",
    publisher: { "@id": absoluteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/covers")}?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

function returnPolicySchema() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: site.country,
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: site.returnDays,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };
}

function shippingSchema() {
  return {
    "@type": "OfferShippingDetails",
    shippingDestination: { "@type": "DefinedRegion", addressCountry: site.country },
    shippingRate: { "@type": "MonetaryAmount", value: site.deliveryFee, currency: site.currency },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 4, unitCode: "DAY" },
    },
  };
}

export function productSchema(product: Product) {
  const url = absoluteUrl(`/product/${product.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description,
    sku: product.slug,
    url,
    image: absoluteUrl(`/product/${product.slug}/opengraph-image`),
    brand: { "@type": "Brand", name: site.name },
    category: getCategory(product.category)?.name,
    color: product.colors.map((c) => c.name).join(", "),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: site.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": absoluteUrl("/#organization") },
      shippingDetails: shippingSchema(),
      hasMerchantReturnPolicy: returnPolicySchema(),
    },
  };
}

export function itemListSchema(name: string, path: string, items: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/product/${p.slug}`),
        name: p.name,
      })),
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}
