"use client";

import { useEffect, type ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let lenis: import("@studio-freight/lenis").default | undefined;
    let frame: number | undefined;
    let cancelled = false;

    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      }

      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
