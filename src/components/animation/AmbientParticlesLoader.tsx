"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AmbientParticlesImpl = dynamic(() => import("./AmbientParticles"), { ssr: false });

// Desktop only: on throttled mobile devices the tsParticles bundle's own fetch/parse/execute
// cost measurably regresses Lighthouse Performance, regardless of how late it's mounted.
const MOBILE_BREAKPOINT = "(max-width: 640px)";

// Mounted only once the page has settled, so the particle engine never competes with LCP/hydration.
export function AmbientParticles() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (window.matchMedia(MOBILE_BREAKPOINT).matches) return;

    let idleId: number | undefined;
    const scheduleIdleMount = () => {
      const schedule = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(cb, 300));
      idleId = schedule(() => setShouldMount(true)) as number;
    };

    if (document.readyState === "complete") {
      scheduleIdleMount();
      return;
    }
    window.addEventListener("load", scheduleIdleMount, { once: true });
    return () => {
      window.removeEventListener("load", scheduleIdleMount);
      const cancel = window.cancelIdleCallback ?? window.clearTimeout;
      if (idleId !== undefined) cancel(idleId);
    };
  }, []);

  if (!shouldMount) return null;
  return <AmbientParticlesImpl />;
}
