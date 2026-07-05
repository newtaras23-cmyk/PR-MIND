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
    title: dictionary.pages.cases.title,
    description: dictionary.pages.cases.description,
    path: "/cases",
    locale,
  });
}

const cases = [
  {
    tag: { en: "Confidential", uk: "Конфіденційно" },
    title: { en: "Reputation clarity for a founder-led brand", uk: "Репутаційна ясність для бренду з фаундером на чолі" },
    summary: {
      en: "A discreet search visibility program that reduced noise and strengthened the primary narrative.",
      uk: "Дискретна програма видимості в пошуку, яка зменшила шум і посилила основний наратив.",
    },
  },
  {
    tag: { en: "Confidential", uk: "Конфіденційно" },
    title: { en: "Crisis response for a public-facing executive", uk: "Реагування на кризу для публічного керівника" },
    summary: {
      en: "The work focused on signal control, trust recovery and placement of the right stories.",
      uk: "Робота була зосереджена на контролі сигналів, відновленні довіри та розміщенні потрібних історій.",
    },
  },
  {
    tag: { en: "Confidential", uk: "Конфіденційно" },
    title: { en: "Search positioning for a high-sensitivity business", uk: "Позиціонування в пошуку для чутливого бізнесу" },
    summary: {
      en: "The goal was to make the right information visible while keeping the narrative controlled.",
      uk: "Метою було зробити потрібну інформацію видимою, зберігаючи контроль над наративом.",
    },
  },
];

export default async function CasesPage({
  params,
}: {
  params?: Promise<{ locale?: string }> | { locale?: string };
}) {
  const resolvedParams = (await params) as { locale?: string } | undefined;
  const locale = resolveLocale(resolvedParams?.locale);
  const dictionary = getDictionary(locale);

  return (
    <PageShell
      eyebrow={dictionary.pages.cases.eyebrow}
      title={dictionary.pages.cases.title}
      description={dictionary.pages.cases.description}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {cases.map((item) => (
          <article key={item.title.en} className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--action)]">{locale === "uk" ? item.tag.uk : item.tag.en}</p>
            <h2 className="mt-4 text-2xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? item.title.uk : item.title.en}</h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--mist)]">{locale === "uk" ? item.summary.uk : item.summary.en}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
