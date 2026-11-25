import Link from "next/link";
import type { Product } from "@/lib/data/products";
import { brands } from "@/lib/data/phones";
import { discountPercent, formatPrice } from "@/lib/format";
import { CaseArt } from "@/components/ui/CaseArt";
import { Rating } from "@/components/ui/Rating";

export function ProductCard({ product, model }: { product: Product; model?: { slug: string; name: string } }) {
  const off = discountPercent(product.price, product.oldPrice);
  const href = model ? `/product/${product.slug}?model=${model.slug}` : `/product/${product.slug}`;
  const subtitle = model?.name ?? product.brands.map((b) => brands[b].name).join(" & ");

  return (
    <article className="group relative flex flex-col gap-3">
      <div className="relative">
        <CaseArt
          color={product.colors[0].hex}
          className="aspect-[171/196] rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] sm:aspect-[282/320] sm:rounded-[18px]"
        />
        {off > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-sale px-2 py-1 text-[11px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs">
            -{off}%
          </span>
        )}
        {product.isNew && off === 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-ink px-2 py-1 text-[11px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs">
            NEW
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium leading-snug sm:text-base">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-muted sm:text-[13px]">{subtitle}</p>
        <Rating value={product.rating} count={product.reviews} />
        <p className="flex items-baseline gap-2 pt-0.5">
          <span className="text-[15px] font-bold sm:text-lg">{formatPrice(product.price)}</span>
          {off > 0 && (
            <del className="text-xs text-muted sm:text-sm">
              <span className="sr-only">Was </span>
              {formatPrice(product.oldPrice!)}
            </del>
          )}
        </p>
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  model,
  columns = 4,
}: {
  products: Product[];
  model?: { slug: string; name: string };
  columns?: 3 | 4;
}) {
  return (
    <ul
      className={
        columns === 4
          ? "grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4"
          : "grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 md:grid-cols-3"
      }
    >
      {products.map((p) => (
        <li key={p.slug}>
          <ProductCard product={p} model={model} />
        </li>
      ))}
    </ul>
  );
}
