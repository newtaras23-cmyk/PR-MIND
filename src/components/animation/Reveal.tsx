"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { m } from "framer-motion";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// framer-motion's own useReducedMotion() doesn't reliably pick up the OS/browser
// preference in this app (stays false even when prefers-reduced-motion: reduce is
// active), which left Reveal-wrapped content stuck at opacity:0 forever for those
// users. useSyncExternalStore is the React-native way to read an external source
// like matchMedia: it reports `false` for the server snapshot (matching SSR, which
// has no `window`) and the real value on the client, without the two ever
// disagreeing on the client's first (hydration) render — which is what caused
// React to silently keep the server's opacity:0 inline style instead of clearing it.
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  );
}
