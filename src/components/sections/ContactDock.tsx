"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, X } from "lucide-react";
import { getContactChannels } from "@/lib/contactChannels";
import { trackEvent } from "@/lib/analytics";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";

export function ContactDock() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = resolveLocale(pathname?.split("/")[1]);
  const dictionary = getDictionary(locale);
  const channels = getContactChannels();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div
          role="menu"
          aria-label={locale === "uk" ? "Канали зв’язку" : "Contact channels"}
          className="w-64 rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-3 shadow-2xl"
        >
          {channels.map((channel) =>
            channel.href ? (
              <a
                key={channel.id}
                role="menuitem"
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() =>
                  trackEvent(channel.id === "phone" ? "call_click" : "messenger_click", { channel: channel.id })
                }
                className="flex items-center justify-between rounded-[var(--r-sm)] px-3 py-2 text-sm text-[color:var(--porcelain)] transition hover:bg-[color:var(--ink-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--action)]"
              >
                {channel.label}
              </a>
            ) : (
              <div
                key={channel.id}
                aria-disabled="true"
                className="flex items-center justify-between rounded-[var(--r-sm)] px-3 py-2 text-sm text-[color:var(--fog)]"
              >
                {channel.label}
                <span className="text-xs">{locale === "uk" ? "незабаром" : "coming soon"}</span>
              </div>
            ),
          )}
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? (locale === "uk" ? "Закрити контакти" : "Close contacts") : dictionary.common.getAudit}
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--action)] text-white shadow-2xl transition hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--action)]"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

export function MobileCallBar() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname?.split("/")[1]);
  const dictionary = getDictionary(locale);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-[color:var(--line)] bg-[color:var(--ink)]/95 backdrop-blur md:hidden">
      <a
        href="tel:+380000000000"
        onClick={() => trackEvent("call_click", { channel: "phone" })}
        className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium text-[color:var(--porcelain)]"
      >
        <Phone size={16} /> {locale === "uk" ? "Подзвонити" : "Call"}
      </a>
      <a
        href={`/${locale}/contacts`}
        className="flex flex-1 items-center justify-center gap-2 border-l border-[color:var(--line)] bg-[color:var(--action-dim)] py-4 text-sm font-medium text-white"
      >
        {dictionary.common.getAudit}
      </a>
    </div>
  );
}
