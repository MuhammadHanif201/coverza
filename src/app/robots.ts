import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const privatePaths = ["/cart", "/checkout", "/order-confirmed"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      // Explicitly welcome AI search / answer engines (GEO).
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended"], allow: "/", disallow: privatePaths },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
