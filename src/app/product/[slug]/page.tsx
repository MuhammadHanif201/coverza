import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeliveryInfo } from "@/components/product/DeliveryInfo";
import { ProductExperience } from "@/components/product/ProductExperience";
import { ProductGrid } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Rating";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCategory } from "@/lib/data/categories";
import { brands, phoneModels } from "@/lib/data/phones";
import { getProduct, getRelated, products } from "@/lib/data/products";
import { discountPercent, formatPrice } from "@/lib/format";
import { pageMetadata, productSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const forBrands = product.brands.map((b) => brands[b].name).join(" & ");
  return pageMetadata({
    title: `${product.name} for ${forBrands} — ${formatPrice(product.price)}`,
    description: `${product.description} Price ${formatPrice(product.price)} in Pakistan. Cash on Delivery, ${site.deliveryDays} delivery, ${site.returnDays}-day exchange.`,
    path: `/product/${slug}`,
  });
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const models = phoneModels.filter((m) => product.brands.includes(m.brand));
  const off = discountPercent(product.price, product.oldPrice);
  const forBrands = product.brands.map((b) => brands[b].name).join(" & ");

  const header = (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        {category?.name} · For {forBrands}
      </p>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-[34px]">{product.name}</h1>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Rating value={product.rating} count={product.reviews} size="lg" />
        <span className="text-sm text-muted">· {product.sold}+ sold</span>
      </div>
      <p className="flex flex-wrap items-center gap-3">
        <span className="text-2xl font-bold sm:text-[32px]">{formatPrice(product.price)}</span>
        {off > 0 && (
          <>
            <del className="text-base text-muted sm:text-lg"><span className="sr-only">Was </span>{formatPrice(product.oldPrice!)}</del>
            <span className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-sale">
              Save {formatPrice(product.oldPrice! - product.price)}
            </span>
          </>
        )}
      </p>
    </div>
  );

  const details = (
    <>
      <DeliveryInfo />
      <div className="divide-y divide-line border-b border-line">
        <details open className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold">
            <h2>Description</h2>
            <Icon name="plus" size={18} className="transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">{product.description}</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Icon name="check" size={16} className="text-green-600" /> {f}
              </li>
            ))}
          </ul>
        </details>
        <details className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold">
            <h2>Shipping &amp; Returns</h2>
            <Icon name="plus" size={18} className="transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            Delivered in {site.deliveryDays} anywhere in Pakistan. Free delivery on orders above Rs{" "}
            {site.freeDeliveryThreshold.toLocaleString("en-US")}, otherwise Rs {site.deliveryFee}. Wrong model or damaged
            item? Exchange it free within {site.returnDays} days.
          </p>
        </details>
        <details className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold">
            <h2>Compatible models</h2>
            <Icon name="plus" size={18} className="transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{models.map((m) => m.name).join(", ")}.</p>
        </details>
      </div>
    </>
  );

  return (
    <Container>
      <JsonLd data={productSchema(product)} />
      <Breadcrumbs
        items={[
          { name: "All Covers", href: "/covers" },
          ...(category ? [{ name: `${category.name} Covers`, href: `/category/${category.slug}` }] : []),
          { name: product.name, href: `/product/${product.slug}` },
        ]}
      />
      <ProductExperience product={product} models={models} header={header} details={details} />

      <section aria-labelledby="related" className="mt-16 lg:mt-20">
        <SectionHeading title="You may also like" id="related" link={{ href: "/covers", label: "View all" }} />
        <ProductGrid products={getRelated(product)} />
      </section>
    </Container>
  );
}
