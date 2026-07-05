import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { LeadForm } from "@/components/sections/LeadForm";
import { ormService } from "@/content/services";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/structuredData";

const siteUrl = "https://prmind.example";

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale?: string }> | { locale?: string };
}) {
  const resolvedParams = (await params) as { locale?: string } | undefined;
  const locale = resolveLocale(resolvedParams?.locale);
  return buildMetadata({
    title: locale === "uk" ? ormService.title.uk : ormService.title.en,
    description: locale === "uk" ? ormService.description.uk : ormService.description.en,
    path: "/services/orm",
    locale,
    keywords: ["online reputation management", "ORM", "reputation monitoring", "search visibility", "crisis communications"],
  });
}

export default async function OrmServicePage({
  params,
}: {
  params?: Promise<{ locale?: string }> | { locale?: string };
}) {
  const resolvedParams = (await params) as { locale?: string } | undefined;
  const locale = resolveLocale(resolvedParams?.locale);
  const dictionary = getDictionary(locale);
  const url = `${siteUrl}/${locale}/services/orm`;

  const serviceSchema = buildServiceSchema({
    name: locale === "uk" ? ormService.title.uk : ormService.title.en,
    description: locale === "uk" ? ormService.description.uk : ormService.description.en,
    url,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: dictionary.pages.services.eyebrow, url: `${siteUrl}/${locale}/services` },
    { name: locale === "uk" ? ormService.title.uk : ormService.title.en, url },
  ]);

  return (
    <PageShell
      eyebrow={dictionary.pages.services.eyebrow}
      title={locale === "uk" ? ormService.title.uk : ormService.title.en}
      description={locale === "uk" ? ormService.description.uk : ormService.description.en}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="grid gap-6 lg:grid-cols-2">
        {ormService.features.map((feature) => (
          <div key={feature.title.en} className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
            <h2 className="text-xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? feature.title.uk : feature.title.en}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--mist)]">{locale === "uk" ? feature.text.uk : feature.text.en}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-[color:var(--porcelain)]">{dictionary.orm.howWeRun}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {ormService.process.map((step, index) => (
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
          <h2 className="text-2xl font-semibold text-[color:var(--porcelain)]">{dictionary.orm.whoForTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--mist)]">{dictionary.orm.whoForText}</p>
          <Link href={`/${locale}/services`} className="mt-6 inline-flex text-sm font-medium text-[color:var(--action)]">
            {dictionary.pillarDetail.allPillars} →
          </Link>
        </div>
        <LeadForm />
      </div>
    </PageShell>
  );
}
