import type { Locale } from "@/i18n/dictionaries";

type FaqItem = {
  question: { en: string; uk: string };
  answer: { en: string; uk: string };
};

export function FaqAccordion({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  return (
    <div className="divide-y divide-[color:var(--line)] rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)]">
      {items.map((item) => (
        <details key={item.question.en} className="group p-6 open:pb-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-[color:var(--porcelain)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--action)]">
            {locale === "uk" ? item.question.uk : item.question.en}
            <span className="shrink-0 text-[color:var(--action)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-7 text-[color:var(--mist)]">
            {locale === "uk" ? item.answer.uk : item.answer.en}
          </p>
        </details>
      ))}
    </div>
  );
}
