import { PageShell } from "@/components/layout/PageShell";
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
    title: dictionary.pages.privacy.title,
    description: dictionary.pages.privacy.description,
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params?: Promise<{ locale?: string }> | { locale?: string };
}) {
  const resolvedParams = (await params) as { locale?: string } | undefined;
  const locale = resolveLocale(resolvedParams?.locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.pages.privacy;

  return (
    <PageShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <div className="space-y-6 rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8 text-sm leading-7 text-[color:var(--mist)]">
        <div>
          <h2 className="text-lg font-semibold text-[color:var(--porcelain)]">{copy.dataTitle}</h2>
          <p className="mt-2">{copy.dataText}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[color:var(--porcelain)]">{copy.useTitle}</h2>
          <p className="mt-2">{copy.useText}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[color:var(--porcelain)]">{copy.rightsTitle}</h2>
          <p className="mt-2">{copy.rightsText}</p>
        </div>
      </div>
    </PageShell>
  );
}
