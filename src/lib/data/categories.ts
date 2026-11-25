export type Category = {
  slug: string;
  name: string;
  /** Colour of the placeholder case art on category tiles. */
  color: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "clear", name: "Clear", color: "#D6E4EE", description: "Crystal-clear, anti-yellow covers that show off your phone's original colour." },
  { slug: "silicone", name: "Silicone", color: "#8FAF92", description: "Soft-touch liquid silicone covers with a microfibre lining and a comfortable grip." },
  { slug: "magsafe", name: "MagSafe", color: "#C4B5FD", description: "Covers with built-in magnets for MagSafe chargers, wallets and car mounts." },
  { slug: "shockproof", name: "Shockproof", color: "#3F3F46", description: "Rugged, drop-tested covers with reinforced corners and raised camera edges." },
  { slug: "leather", name: "Leather", color: "#8B5A3C", description: "Premium leather-finish covers that look classy and age beautifully." },
  { slug: "glitter", name: "Glitter", color: "#F9C9D9", description: "Sparkly glitter covers for a fun, eye-catching look." },
  { slug: "card-holder", name: "Card Holder", color: "#7C2D12", description: "Wallet covers with card slots so you can leave the wallet at home." },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
