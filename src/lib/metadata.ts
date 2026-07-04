import type { Metadata } from "next";

const siteName = "PR-MIND";
const siteDescription =
  "PR-MIND helps founders, executives, and public figures control how they are seen online through reputation strategy and discreet communications.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prmind.example";

const defaultKeywords = [
  "reputation management",
  "online reputation",
  "search visibility",
  "PR strategy",
  "brand protection",
  "crisis communications",
];

export function buildMetadata({
  title,
  description = siteDescription,
  path = "/",
  locale = "en",
  keywords = defaultKeywords,
}: {
  title: string;
  description?: string;
  path?: string;
  locale?: "en" | "uk";
  keywords?: string[];
}): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath === "/" ? "" : normalizedPath;
  const url = `${siteUrl}/${locale}${cleanPath}`;

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en${cleanPath}`,
        uk: `${siteUrl}/uk${cleanPath}`,
        "x-default": `${siteUrl}/en${cleanPath}`,
      },
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
