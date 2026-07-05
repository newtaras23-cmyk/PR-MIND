import { PageShell } from "@/components/layout/PageShell";
import { BookingEmbed } from "@/components/sections/BookingEmbed";
import { CallbackForm } from "@/components/sections/CallbackForm";
import { LeadForm } from "@/components/sections/LeadForm";
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
    title: dictionary.pages.contacts.title,
    description: dictionary.pages.contacts.description,
    path: "/contacts",
    locale,
  });
}

export default async function ContactsPage({
  params,
}: {
  params?: Promise<{ locale?: string }> | { locale?: string };
}) {
  const resolvedParams = (await params) as { locale?: string } | undefined;
  const locale = resolveLocale(resolvedParams?.locale);
  const dictionary = getDictionary(locale);
  return (
    <PageShell
      eyebrow={dictionary.pages.contacts.eyebrow}
      title={dictionary.pages.contacts.title}
      description={dictionary.pages.contacts.description}
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
          <h2 className="text-2xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? "Прямий контакт" : "Direct contact"}</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-[color:var(--mist)]">
            <li>{locale === "uk" ? "Telegram" : "Telegram"}: <span className="text-[color:var(--porcelain)]">{locale === "uk" ? "очікує налаштування" : "pending setup"}</span></li>
            <li>{locale === "uk" ? "WhatsApp" : "WhatsApp"}: <span className="text-[color:var(--porcelain)]">{locale === "uk" ? "очікує налаштування" : "pending setup"}</span></li>
            <li>{locale === "uk" ? "Signal" : "Signal"}: <span className="text-[color:var(--porcelain)]">{locale === "uk" ? "очікує налаштування" : "pending setup"}</span></li>
            <li>{locale === "uk" ? "Email" : "Email"}: <span className="text-[color:var(--porcelain)]">hello@prmind.example</span></li>
            <li>{locale === "uk" ? "Телефон" : "Phone"}: <span className="text-[color:var(--porcelain)]">+38 (000) 000 00 00</span></li>
          </ul>
        </div>
        <LeadForm />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <CallbackForm />
        <BookingEmbed />
      </div>

      <div className="mt-8 rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
        <h2 className="text-2xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? "Що ви отримаєте" : "What you will receive"}</h2>
        <p className="mt-4 text-sm leading-7 text-[color:var(--mist)]">
          {locale === "uk"
            ? "Після звернення ми надаємо короткий план наступних кроків, підбираємо канал взаємодії і пояснюємо, чи підходить нам підхід для вашого випадку."
            : "After your inquiry, we provide a concise plan of next steps, suggest the right communication channel, and explain whether our approach fits your situation."}
        </p>
      </div>
    </PageShell>
  );
}
