"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";

export function Footer() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname?.split("/")[1]);
  const dictionary = getDictionary(locale);

  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--ink)] text-[color:var(--mist)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-md">
          <Logo variant="full" tone="washi" className="h-7 w-auto opacity-80" />
          <p className="mt-3 text-sm leading-7">
            Reputation strategy for founders, executives, and public figures who need clarity, discretion, and control.
          </p>
        </div>
        <div className="grid gap-8 text-sm sm:grid-cols-2">
          <div>
            <p className="mb-3 text-[color:var(--porcelain)]">{dictionary.common.footer.navigate}</p>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/services`} className="transition hover:text-[color:var(--porcelain)]">{dictionary.common.nav.services}</Link>
              <Link href={`/${locale}/approach`} className="transition hover:text-[color:var(--porcelain)]">{dictionary.common.nav.approach}</Link>
              <Link href={`/${locale}/contacts`} prefetch={false} className="transition hover:text-[color:var(--porcelain)]">{dictionary.common.nav.contacts}</Link>
            </div>
          </div>
          <div>
            <p className="mb-3 text-[color:var(--porcelain)]">{dictionary.common.footer.contact}</p>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@prmind.example" className="transition hover:text-[color:var(--porcelain)]">hello@prmind.example</a>
              <a href="tel:+380000000000" className="transition hover:text-[color:var(--porcelain)]">+38 (000) 000 00 00</a>
              <Link href={`/${locale}/privacy`} className="transition hover:text-[color:var(--porcelain)]">{dictionary.common.footer.privacy}</Link>
              <Link href={`/${locale}/terms`} className="transition hover:text-[color:var(--porcelain)]">{dictionary.common.footer.terms}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
