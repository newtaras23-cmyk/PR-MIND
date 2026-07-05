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
    washi: { src: "/images/logo/PR-MIND_horizontal_dark.svg", width: 1200, height: 420 },
  },
};

export function Logo({ variant = "full", tone = "auto", className, priority = false }: LogoProps) {
  const resolvedTone = tone === "auto" ? "washi" : tone;
  const { src, width, height } = SOURCES[variant][resolvedTone];

  return (
    // eslint-disable-next-line @next/next/no-img-element -- vector logo, no raster optimization needed
    <img
      src={src}
      alt="PR-MIND"
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
