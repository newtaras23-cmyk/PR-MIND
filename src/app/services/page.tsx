import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { servicePillars } from "@/content/services";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale?: string }> | { locale?: string };
}) {
  const resolvedParams = (await params) as { locale?: string } | undefined;
  const locale = resolveLocale(resolvedParams?.locale);
  const dictionary = getDictionary(locale);
  return buildMetadata({
    title: dictionary.pages.services.title,
    description: dictionary.pages.services.description,
    path: "/services",
    locale,
  });
}

export default async function ServicesPage({
  params,
}: {
  params?: Promise<{ locale?: string }> | { locale?: string };
}) {
  const resolvedParams = (await params) as { locale?: string } | undefined;
  const locale = resolveLocale(resolvedParams?.locale);
  const dictionary = getDictionary(locale);
  return (
    <PageShell
      eyebrow={dictionary.pages.services.eyebrow}
      title={dictionary.pages.services.title}
      description={dictionary.pages.services.description}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {servicePillars.map((pillar) => (
          <article key={pillar.slug} className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
            <h2 className="text-2xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? pillar.title.uk : pillar.title.en}</h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--mist)]">{locale === "uk" ? pillar.description.uk : pillar.description.en}</p>
            <ul className="mt-6 space-y-3 text-sm text-[color:var(--mist)]">
              {(locale === "uk" ? pillar.items.uk : pillar.items.en).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[color:var(--action)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/services/${pillar.slug}`} className="mt-8 inline-flex text-sm font-medium text-[color:var(--action)]">
              {dictionary.pages.services.viewPillar} →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
        <h2 className="text-2xl font-semibold text-[color:var(--porcelain)]">{dictionary.pages.services.whyTitle}</h2>
        <p className="mt-4 text-sm leading-7 text-[color:var(--mist)]">{dictionary.pages.services.whyText}</p>
      </div>
    </PageShell>
  );
}
