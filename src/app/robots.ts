import type { MetadataRoute } from "next";

const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended", "CCBot"];
const isPreview = process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";

export default function robots(): MetadataRoute.Robots {
  if (isPreview) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly allow AI/AEO crawlers so PR-MIND can be cited by AI search and answer engines.
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://prmind.example/sitemap.xml",
  };
}
