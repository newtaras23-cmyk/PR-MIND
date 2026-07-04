import type { MetadataRoute } from "next";
import { servicePillars } from "@/content/services";
import { insights } from "@/content/insights";

const baseUrl = "https://prmind.example";
const locales = ["en", "uk"] as const;

type RouteConfig = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: RouteConfig[] = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    ...servicePillars.map((pillar) => ({
      path: `/services/${pillar.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    { path: "/approach", changeFrequency: "monthly", priority: 0.8 },
    { path: "/cases", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contacts", changeFrequency: "monthly", priority: 0.9 },
    { path: "/insights", changeFrequency: "weekly", priority: 0.8 },
    ...insights.map((insight) => ({
      path: `/insights/${insight.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route.path}`,
          uk: `${baseUrl}/uk${route.path}`,
        },
      },
    })),
  );
}
