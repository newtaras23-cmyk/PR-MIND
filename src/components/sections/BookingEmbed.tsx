"use client";

import { usePathname } from "next/navigation";
import { resolveLocale } from "@/i18n/dictionaries";
import { trackEvent } from "@/lib/analytics";

export function BookingEmbed() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname?.split("/")[1]);
  // Set once a real Cal.com account exists; falls back to a plain notice until then.
  const calLink = process.env.NEXT_PUBLIC_CAL_COM_LINK;

  if (!calLink) {
    return (
      <div className="rounded-[var(--r)] border border-dashed border-[color:var(--line)] bg-[color:var(--ink-2)] p-8 text-sm text-[color:var(--fog)]">
        <h2 className="text-xl font-semibold text-[color:var(--mist)]">
          {locale === "uk" ? "Бронювання дзвінка" : "Book a call"}
        </h2>
        <p className="mt-3 leading-7">
          {locale === "uk"
            ? "Слот під Cal.com — з’явиться, щойно буде підключено акаунт бронювання."
            : "Cal.com slot — activates once a booking account is connected."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)]">
      <iframe
        title="Cal.com booking"
        src={`https://cal.com/${calLink}?embed=true`}
        className="h-[600px] w-full"
        onLoad={() => trackEvent("booking_open")}
      />
    </div>
  );
}
