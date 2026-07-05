"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";

const PARTICLE_COUNT = 55;

// Must be referentially stable for the lifetime of the app — ParticlesProvider throws if it changes.
const initParticlesEngine = async (engine: Parameters<typeof loadSlim>[0]) => {
  await loadSlim(engine);
};

export default function AmbientParticles() {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const containerRef = useRef<Container | undefined>(undefined);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    motionQuery.addEventListener("change", onMotionChange);
    return () => motionQuery.removeEventListener("change", onMotionChange);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      const container = containerRef.current;
      if (!container) return;
      if (document.hidden) {
        container.pause();
      } else {
        void container.play();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: "transparent" },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: PARTICLE_COUNT, density: { enable: true } },
        color: { value: ["#F5F6F7", "#0A84FF"] },
        opacity: { value: { min: 0.15, max: 0.5 } },
        size: { value: { min: 1, max: 2.2 } },
        links: {
          enable: true,
          color: "#0A84FF",
          distance: 140,
          opacity: 0.12,
          width: 1,
        },
        move: {
          enable: !reducedMotion,
          speed: 0.35,
          direction: "none",
          outModes: { default: "out" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: !reducedMotion, mode: "grab" },
          resize: { enable: true },
        },
        modes: { grab: { distance: 160, links: { opacity: 0.25 } } },
      },
    }),
    [reducedMotion],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-1]">
      <ParticlesProvider init={initParticlesEngine}>
        <Particles
          id="ambient-particles"
          className="h-full w-full"
          options={options}
          particlesLoaded={async (container) => {
            containerRef.current = container;
          }}
        />
      </ParticlesProvider>
    </div>
  );
}
