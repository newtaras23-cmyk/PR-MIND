import type { NextConfig } from "next";

// Vercel sets VERCEL_ENV to "preview" for branch/PR deployments and "production"
// for the production deployment. Preview URLs must never be indexed.
const isPreview = process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";

const nextConfig: NextConfig = {
  async headers() {
    if (!isPreview) return [];

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
