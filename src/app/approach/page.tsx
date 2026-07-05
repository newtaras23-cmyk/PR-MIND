import { PageShell } from "@/components/layout/PageShell";
import { approachSteps } from "@/content/services";
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
    title: dictionary.pages.approach.title,
    description: dictionary.pages.approach.description,
    path: "/approach",
    locale,
  });
}

export default async function ApproachPage({
  params,
}: {
  params?: Promise<{ locale?: string }> | { locale?: string };
}) {
  const resolvedParams = (await params) as { locale?: string } | undefined;
  const locale = resolveLocale(resolvedParams?.locale);
  const dictionary = getDictionary(locale);
  return (
    <PageShell
      eyebrow={dictionary.pages.approach.eyebrow}
      title={dictionary.pages.approach.title}
      description={dictionary.pages.approach.description}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {approachSteps.map((step, index) => (
          <div key={`${step.title.en}-${index}`} className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--action)]">0{index + 1}</p>
            <h2 className="mt-4 text-2xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? step.title.uk : step.title.en}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--mist)]">{locale === "uk" ? step.text.uk : step.text.en}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
        <h2 className="text-2xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? "FAQ" : "FAQ"}</h2>
        <p className="mt-4 text-sm leading-7 text-[color:var(--mist)]">
          {locale === "uk"
            ? "Чи підходить цей підхід для кризових ситуацій? Так. PR-MIND працює як із запобіганням проблемам, так і з їхньою ліквідацією, з фокусом на швидку ясність і контроль наративу."
            : "Is this approach suitable for crisis situations? Yes. PR-MIND works for both prevention and recovery, with a focus on rapid clarity and narrative control."}
        </p>
      </div>
    </PageShell>
  );
}
