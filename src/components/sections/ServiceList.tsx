"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { servicePillars } from "@/content/services";
import { resolveLocale } from "@/i18n/dictionaries";

export function ServiceList() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname?.split("/")[1]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {servicePillars.map((pillar) => (
        <article key={pillar.slug} className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? pillar.title.uk : pillar.title.en}</h3>
            <Link href={`/${locale}/services/${pillar.slug}`} className="inline-flex items-center gap-2 text-sm text-[color:var(--action)]">
              {locale === "uk" ? "Переглянути" : "View"} <ArrowUpRight size={16} />
            </Link>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--mist)]">{locale === "uk" ? pillar.description.uk : pillar.description.en}</p>
          <ul className="mt-6 space-y-3 text-sm text-[color:var(--mist)]">
            {(locale === "uk" ? pillar.items.uk : pillar.items.en).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[color:var(--action)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
