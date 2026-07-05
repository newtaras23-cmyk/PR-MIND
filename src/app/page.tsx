import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceList } from "@/components/sections/ServiceList";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ReputationSurface } from "@/components/sections/ReputationSurface";
import { approachSteps, faqItems, stakesPoints, stats } from "@/content/services";
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
    title: dictionary.home.title,
    description: dictionary.home.description,
    path: "/",
    locale,
  });
}

export default async function Home({
  params,
}: {
  params?: Promise<{ locale?: string }> | { locale?: string };
}) {
  const resolvedParams = (await params) as { locale?: string } | undefined;
  const locale = resolveLocale(resolvedParams?.locale);
  const dictionary = getDictionary(locale);
  return (
    <div className="min-h-screen text-[color:var(--porcelain)]">
      <Header />
      <main>
        <section className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <Reveal delay={0}>
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-[color:var(--action)]">
                {dictionary.home.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.07}>
              <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl">
                {dictionary.home.title}
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[color:var(--mist)]">
                {dictionary.home.description}
              </p>
            </Reveal>
            <Reveal delay={0.21}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href={`/${locale}/contacts`} prefetch={false} className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--action-dim)] px-6 py-3 font-medium text-[color:var(--ink)] transition hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--action)]">
                  {dictionary.home.primaryCta} <ArrowRight size={18} />
                </Link>
                <Link href={`/${locale}/approach`} className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] px-6 py-3 font-medium text-[color:var(--porcelain)] transition hover:border-[color:var(--action)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--action)]">
                  {dictionary.home.secondaryCta}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal className="grid gap-6 rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8 lg:grid-cols-[1.25fr_0.75fr] lg:p-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--mist)]">{dictionary.home.signalEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{dictionary.home.signalTitle}</h2>
            </div>
            <div className="flex flex-col gap-4 rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--ink-2)] p-6">
              <div className="flex items-center gap-3 text-[color:var(--porcelain)]">
                <ShieldCheck className="text-[color:var(--action)]" />
                <span className="font-medium">{dictionary.home.discretionTitle}</span>
              </div>
              <p className="text-sm leading-7 text-[color:var(--mist)]">{dictionary.home.discretionText}</p>
            </div>
          </Reveal>
        </section>

        <section className="border-y border-[color:var(--line)] bg-[color:var(--cool-tint)]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow={dictionary.home.stakesEyebrow}
                title={dictionary.home.stakesTitle}
                description={dictionary.home.stakesDescription}
              />
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {stakesPoints.map((point, index) => (
                <Reveal key={point.en} delay={index * 0.07} className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--ink-2)] p-6 text-sm leading-7 text-[color:var(--mist)]">
                  {locale === "uk" ? point.uk : point.en}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={dictionary.home.approachEyebrow}
              title={dictionary.home.approachTitle}
              description={dictionary.home.approachDescription}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {approachSteps.map((step, index) => (
              <Reveal key={`${step.title.en}-${index}`} delay={index * 0.07} className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--action)]">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold text-[color:var(--porcelain)]">{locale === "uk" ? step.title.uk : step.title.en}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--mist)]">{locale === "uk" ? step.text.uk : step.text.en}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={dictionary.home.servicesEyebrow}
              title={dictionary.home.servicesTitle}
              description={dictionary.home.servicesDescription}
            />
          </Reveal>
          <div className="mt-12">
            <ServiceList />
          </div>
        </section>

        <ReputationSurface
          locale={locale}
          heading={dictionary.home.surfaceHeading}
          subheading={dictionary.home.surfaceSubheading}
        />

        <section className="border-y border-[color:var(--line)] bg-[color:var(--ink-2)]/80">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-3 lg:px-8">
            {stats.map((stat, index) => (
              <Reveal key={stat.label.en} delay={index * 0.07} className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
                <p className="text-4xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[color:var(--mist)]">{locale === "uk" ? stat.label.uk : stat.label.en}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={dictionary.home.trustEyebrow}
              title={dictionary.home.trustTitle}
              description={dictionary.home.trustDescription}
            />
          </Reveal>
          <Reveal className="mt-10 flex items-center gap-3 rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--cool-tint)] p-6 text-sm text-[color:var(--porcelain)]">
            <ShieldCheck className="shrink-0 text-[color:var(--action)]" />
            <span>{dictionary.home.discretionText}</span>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow={dictionary.home.faqEyebrow} title={dictionary.home.faqTitle} />
          </Reveal>
          <div className="mt-10">
            <FaqAccordion items={faqItems} locale={locale} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <Reveal className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8 lg:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-[color:var(--action)]">{dictionary.home.ctaEyebrow}</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{dictionary.home.ctaTitle}</h2>
              </div>
              <Link href={`/${locale}/contacts`} prefetch={false} className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--action-dim)] px-6 py-3 font-medium text-[color:var(--ink)] transition hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--action)]">
                {dictionary.home.ctaButton} <Sparkles size={18} />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
