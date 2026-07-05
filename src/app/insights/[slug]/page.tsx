import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { insights } from "@/content/insights";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/structuredData";

const siteUrl = "https://prmind.example";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale?: string }> }) {
  const { slug, locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const insight = insights.find((item) => item.slug === slug);

  if (!insight) {
    return buildMetadata({ title: "Insight", path: "/insights" });
  }

  return buildMetadata({
    title: locale === "uk" ? insight.title.uk : insight.title.en,
    description: locale === "uk" ? insight.summary.uk : insight.summary.en,
    path: `/insights/${insight.slug}`,
    locale,
  });
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}) {
  const { slug, locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const insight = insights.find((item) => item.slug === slug);

  if (!insight) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const url = `${siteUrl}/${locale}/insights/${insight.slug}`;

  const articleSchema = buildArticleSchema({
    title: locale === "uk" ? insight.title.uk : insight.title.en,
    description: locale === "uk" ? insight.summary.uk : insight.summary.en,
    url,
    datePublished: insight.publishedAt,
  });

  const faqSchema = buildFaqPageSchema(
    insight.faq.map((item) => ({
      question: locale === "uk" ? item.question.uk : item.question.en,
      answer: locale === "uk" ? item.answer.uk : item.answer.en,
    })),
  );

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: dictionary.pages.insights.eyebrow, url: `${siteUrl}/${locale}/insights` },
    { name: locale === "uk" ? insight.title.uk : insight.title.en, url },
  ]);

  return (
    <PageShell
      eyebrow={dictionary.pages.insights.eyebrow}
      title={locale === "uk" ? insight.title.uk : insight.title.en}
      description={locale === "uk" ? insight.summary.uk : insight.summary.en}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8 text-sm leading-8 text-[color:var(--mist)]">
        <div className="rounded-[var(--r-sm)] border border-[color:var(--action)]/30 bg-[color:var(--action)]/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--action)]">
            {dictionary.pages.insights.shortAnswer}
          </p>
          <p className="mt-3 text-base text-[color:var(--porcelain)]">{locale === "uk" ? insight.intro.uk : insight.intro.en}</p>
        </div>

        <ul className="mt-6 space-y-2 border-l-2 border-[color:var(--action)]/40 pl-4">
          {(locale === "uk" ? insight.keyPoints.uk : insight.keyPoints.en).map((point) => (
            <li key={point} className="text-sm leading-7 text-[color:var(--porcelain)]">
              {point}
            </li>
          ))}
        </ul>

        {insight.sections.map((section) => (
          <div key={section.heading.en} className="mt-8">
            <h2 className="text-xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? section.heading.uk : section.heading.en}</h2>
            {(locale === "uk" ? section.paragraphs.uk : section.paragraphs.en).map((paragraph) => (
              <p key={paragraph} className="mt-3">
                {paragraph}
              </p>
            ))}
          </div>
        ))}

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[color:var(--line)] pt-6">
          <Link
            href={`/${locale}/services/${insight.relatedPillar}`}
            className="inline-flex text-sm font-medium text-[color:var(--action)]"
          >
            {locale === "uk" ? "Пов’язана послуга" : "Related service"} →
          </Link>
          {insight.rubric && (
            <Link
              href={`/${locale}/services/pr`}
              className="inline-flex text-sm font-medium text-[color:var(--action)]"
            >
              {locale === "uk" ? "Репутаційний PR" : "Reputation PR"} →
            </Link>
          )}
        </div>
      </article>

      <div className="mt-8 rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
        <h2 className="text-xl font-semibold text-[color:var(--porcelain)]">FAQ</h2>
        <div className="mt-6 space-y-6">
          {insight.faq.map((item) => (
            <div key={item.question.en}>
              <h3 className="text-base font-semibold text-[color:var(--porcelain)]">
                {locale === "uk" ? item.question.uk : item.question.en}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[color:var(--mist)]">
                {locale === "uk" ? item.answer.uk : item.answer.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
