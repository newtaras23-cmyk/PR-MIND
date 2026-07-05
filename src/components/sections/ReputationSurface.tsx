"use client";

import { useLayoutEffect, useRef } from "react";
import type { Locale } from "@/i18n/dictionaries";

type Card = {
  label: { en: string; uk: string };
  outcome: "noisy" | "clean";
};

const cards: Card[] = [
  { label: { en: "Outdated profile listing", uk: "Застарілий профіль" }, outcome: "noisy" },
  { label: { en: "Official website", uk: "Офіційний сайт" }, outcome: "clean" },
  { label: { en: "Unrelated forum thread", uk: "Стороння гілка форуму" }, outcome: "noisy" },
  { label: { en: "Verified press feature", uk: "Перевірена медіа-публікація" }, outcome: "clean" },
  { label: { en: "Old negative review", uk: "Старий негативний відгук" }, outcome: "noisy" },
  { label: { en: "Curated social profile", uk: "Впорядкований соцпрофіль" }, outcome: "clean" },
  { label: { en: "Low-quality mention", uk: "Слабка згадка" }, outcome: "noisy" },
  { label: { en: "Wikipedia entry", uk: "Стаття у Вікіпедії" }, outcome: "clean" },
];

export function ReputationSurface({ locale, heading, subheading }: { locale: Locale; heading: string; subheading: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 0.6,
            pin: true,
          },
        });

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const isNoisy = cards[index].outcome === "noisy";

          if (isNoisy) {
            timeline.to(card, { opacity: 0.15, filter: "blur(6px)", y: 24, duration: 1 }, 0);
          } else {
            timeline.to(
              card,
              {
                filter: "blur(0px)",
                scale: 1.03,
                boxShadow: "0 0 0 1px var(--action), 0 0 32px -8px var(--action)",
                duration: 1,
              },
              0,
            );
          }
        });
      }, sectionRef);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[color:var(--cool-tint)]/55 py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-[color:var(--action)]">
            {locale === "uk" ? "Вітрина бренда" : "Reputation Surface"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-lg leading-8 text-[color:var(--mist)]">{subheading}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={card.label.en}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`rounded-[var(--r)] p-6 text-sm transition-colors ${
                card.outcome === "noisy"
                  ? "border border-[color:var(--line)] bg-[color:var(--ink-2)] text-[color:var(--fog)]"
                  : "glass-surface text-[color:var(--porcelain)]"
              }`}
            >
              {locale === "uk" ? card.label.uk : card.label.en}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
