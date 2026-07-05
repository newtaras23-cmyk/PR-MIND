type LogoVariant = "full" | "symbol";
type LogoTone = "auto" | "ink" | "washi";

type LogoProps = {
  variant?: LogoVariant;
  tone?: LogoTone;
  className?: string;
  priority?: boolean;
};

// File naming from the brand pack: "_light" = ink-colored mark for light backgrounds,
// "_dark" = washi-colored mark for dark backgrounds. The site has no light-mode context
// today, so "auto" resolves to washi (the site is uniformly ink-based).
const SOURCES: Record<LogoVariant, Record<"ink" | "washi", { src: string; width: number; height: number }>> = {
  symbol: {
    ink: { src: "/images/logo/PR-MIND_symbol_light.svg", width: 240, height: 240 },
    washi: { src: "/images/logo/PR-MIND_symbol_dark.svg", width: 240, height: 240 },
  },
  full: {
    ink: { src: "/images/logo/PR-MIND_horizontal_light.svg", width: 1200, height: 420 },
    // _dark.svg ships with an opaque ink card baked in (brand-board mockup asset) — the
    // _transparent variant strips that rect so the mark composites over our own header/footer background.
    washi: { src: "/images/logo/PR-MIND_horizontal_dark_transparent.svg", width: 1200, height: 420 },
  },
};

export function Logo({ variant = "full", tone = "auto", className, priority = false }: LogoProps) {
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  if (tone !== "auto") {
    const { src, width, height } = SOURCES[variant][tone];
    return (
      // eslint-disable-next-line @next/next/no-img-element -- vector logo, no raster optimization needed
      <img src={src} alt="PR-MIND" width={width} height={height} className={className} loading={loading} fetchPriority={fetchPriority} />
    );
  }

  // Both tones render; CSS ([data-theme]) shows the right one instantly from the theme
  // blocking script, with no client-side theme detection and so no hydration flash.
  const washi = SOURCES[variant].washi;
  const ink = SOURCES[variant].ink;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- vector logo, no raster optimization needed */}
      <img
        src={washi.src}
        alt="PR-MIND"
        width={washi.width}
        height={washi.height}
        className={`theme-show-dark ${className ?? ""}`}
        loading={loading}
        fetchPriority={fetchPriority}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- vector logo, no raster optimization needed */}
      <img
        src={ink.src}
        alt="PR-MIND"
        width={ink.width}
        height={ink.height}
        className={`theme-show-light ${className ?? ""}`}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    </>
  );
}
