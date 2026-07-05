"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";

export function Header() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname?.split("/")[1]);
  const dictionary = getDictionary(locale);
  const otherLocale = locale === "en" ? "uk" : "en";
  const restOfPath = pathname?.split("/").slice(2).join("/") ?? "";
  const otherLocaleHref = `/${otherLocale}${restOfPath ? `/${restOfPath}` : ""}`;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: "/services", label: dictionary.common.nav.services },
    { href: "/approach", label: dictionary.common.nav.approach },
    { href: "/cases", label: dictionary.common.nav.cases },
    { href: "/insights", label: dictionary.common.nav.insights },
    { href: "/contacts", label: dictionary.common.nav.contacts },
  ];

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass-surface" : "border-b border-[color:var(--line)]/80 bg-[color:var(--ink)]/90 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--action)]">
          <Logo variant="full" tone="washi" priority className="h-8 w-auto sm:h-9 md:h-10" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-[color:var(--mist)] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              prefetch={item.href === "/contacts" ? false : undefined}
              className="transition hover:text-[color:var(--porcelain)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--action)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={otherLocaleHref}
            aria-label={`${otherLocale.toUpperCase()} — ${otherLocale === "uk" ? "Перемкнути на українську" : "Switch to English"}`}
            className="rounded-full border border-[color:var(--line)] px-3 py-2 text-sm font-medium text-[color:var(--porcelain)] transition hover:border-[color:var(--action)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--action)]"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/contacts`} prefetch={false}
            className="hidden rounded-full bg-[color:var(--action-dim)] px-4 py-2 text-sm font-medium text-[color:var(--ink)] transition hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--action)] sm:inline-flex"
          >
            {dictionary.common.getAudit}
          </Link>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? (locale === "uk" ? "Закрити меню" : "Close menu") : (locale === "uk" ? "Відкрити меню" : "Open menu")}
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--porcelain)] transition hover:border-[color:var(--action)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--action)] md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-[color:var(--line)] bg-[color:var(--ink)] px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-4 text-sm text-[color:var(--mist)]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setMobileOpen(false)}
                className="transition hover:text-[color:var(--porcelain)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--action)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
