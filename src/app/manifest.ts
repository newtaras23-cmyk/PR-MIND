import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PR-MIND",
    short_name: "PR-MIND",
    description: "Reputation strategy for founders, executives, and public figures.",
    start_url: "/",
    display: "standalone",
    background_color: "#17140F",
    theme_color: "#17140F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
