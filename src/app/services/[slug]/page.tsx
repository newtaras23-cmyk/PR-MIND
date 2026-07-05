import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { LeadForm } from "@/components/sections/LeadForm";
import { approachSteps, servicePillars } from "@/content/services";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/structuredData";

const siteUrl = "https://prmind.example";

export function generateStaticParams() {
  return servicePillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale?: string }> }) {
  const { slug, locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const pillar = servicePillars.find((item) => item.slug === slug);

  if (!pillar) {
    return buildMetadata({ title: "Services", path: "/services" });
  }

  return buildMetadata({
    title: locale === "uk" ? pillar.title.uk : pillar.title.en,
    description: locale === "uk" ? pillar.description.uk : pillar.description.en,
    path: `/services/${pillar.slug}`,
    locale,
  });
}

export default async function PillarDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}) {
  const { slug, locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const pillar = servicePillars.find((item) => item.slug === slug);

  if (!pillar) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const url = `${siteUrl}/${locale}/services/${pillar.slug}`;

  const serviceSchema = buildServiceSchema({
    name: locale === "uk" ? pillar.title.uk : pillar.title.en,
    description: locale === "uk" ? pillar.description.uk : pillar.description.en,
    url,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: dictionary.pages.services.eyebrow, url: `${siteUrl}/${locale}/services` },
    { name: locale === "uk" ? pillar.title.uk : pillar.title.en, url },
  ]);

  return (
    <PageShell
      eyebrow={dictionary.pages.services.eyebrow}
      title={locale === "uk" ? pillar.title.uk : pillar.title.en}
      description={locale === "uk" ? pillar.description.uk : pillar.description.en}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
        <h2 className="text-xl font-semibold text-[color:var(--porcelain)]">{dictionary.pillarDetail.whatIncluded}</h2>
        <ul className="mt-6 space-y-3 text-sm text-[color:var(--mist)]">
          {(locale === "uk" ? pillar.items.uk : pillar.items.en).map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[color:var(--action)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-[color:var(--porcelain)]">{dictionary.pillarDetail.howWeWork}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {approachSteps.map((step, index) => (
            <div key={`${step.title.en}-${index}`} className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--action)]">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? step.title.uk : step.title.en}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--mist)]">{locale === "uk" ? step.text.uk : step.text.en}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
          <h2 className="text-2xl font-semibold text-[color:var(--porcelain)]">{dictionary.pillarDetail.nextStep}</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--mist)]">{dictionary.pillarDetail.nextStepText}</p>
          <Link href={`/${locale}/services`} className="mt-6 inline-flex text-sm font-medium text-[color:var(--action)]">
            {dictionary.pillarDetail.allPillars} →
          </Link>
        </div>
        <LeadForm />
      </div>
    </PageShell>
  );
}
