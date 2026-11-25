# Coverza

Frontend for **Coverza** — an online store for iPhone & Samsung mobile covers in Pakistan (Cash on Delivery, JazzCash, Easypaisa, WhatsApp ordering).

Built with Next.js 16 (App Router, Cache Components), React 19 and Tailwind CSS 4. Frontend only — no backend yet.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/            Pages (home, brand, model, category, product, cart, checkout, ...) + sitemap, robots, manifest, OG images
  components/     UI components (layout, home, product, cart, checkout, order, ui, seo)
  lib/
    data/         Sample products, phone models, categories, FAQs
    site.ts       Store settings (name, URL, WhatsApp, delivery fees)
    seo.ts        Metadata + JSON-LD helpers
    cart.tsx      Cart state (saved in the browser)
public/llms.txt   Summary for AI search engines
design/           Figma screenshots
```

## Before going live

- Update contact details and domain in `src/lib/site.ts` (or set `NEXT_PUBLIC_SITE_URL`).
- Replace sample products in `src/lib/data/products.ts` and the CSS placeholder case art with real photos.
- Checkout currently stores the order in the browser only — connect a backend to receive orders.
