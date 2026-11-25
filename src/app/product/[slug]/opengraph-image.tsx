import { ImageResponse } from "next/og";
import { getProduct, products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

export const alt = "Coverza phone cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const color = product?.colors[0].hex ?? "#D6E4EE";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#18181b", color: "white", padding: 72 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, gap: 20 }}>
          <div style={{ fontSize: 28, letterSpacing: 6, fontWeight: 700 }}>COVERZA</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{product?.name ?? "Phone Cover"}</div>
          {product && <div style={{ fontSize: 40, color: "#d4d4d8" }}>{`${formatPrice(product.price)} · Cash on Delivery`}</div>}
        </div>
        <div style={{ width: 360, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 220, height: 451, borderRadius: 48, background: color, display: "flex", padding: 22 }}>
            <div style={{ width: 92, height: 92, borderRadius: 28, background: "rgba(0,0,0,0.18)" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
