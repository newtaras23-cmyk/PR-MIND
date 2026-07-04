import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { insights } from "@/content/insights";
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
    title: dictionary.pages.insights.title,
    description: dictionary.pages.insights.description,
    path: "/insights",
    locale,
  });
}

export default async function InsightsPage({
  params,
}: {
  params?: Promise<{ locale?: string }> | { locale?: string };
}) {
  const resolvedParams = (await params) as { locale?: string } | undefined;
  const locale = resolveLocale(resolvedParams?.locale);
  const dictionary = getDictionary(locale);
  return (
    <PageShell
      eyebrow={dictionary.pages.insights.eyebrow}
      title={dictionary.pages.insights.title}
      description={dictionary.pages.insights.description}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {insights.map((item) => (
          <article key={item.slug} className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--action)]">{dictionary.pages.insights.eyebrow}</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{locale === "uk" ? item.title.uk : item.title.en}</h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--mist)]">{locale === "uk" ? item.summary.uk : item.summary.en}</p>
            <Link href={`/${locale}/insights/${item.slug}`} className="mt-8 inline-flex text-sm font-medium text-[color:var(--action)]">
              {dictionary.pages.insights.readArticle} →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
        <h2 className="text-2xl font-semibold text-white">{dictionary.pages.insights.whyTitle}</h2>
        <p className="mt-4 text-sm leading-7 text-[color:var(--mist)]">{dictionary.pages.insights.whyText}</p>
      </div>
    </PageShell>
  );
}
