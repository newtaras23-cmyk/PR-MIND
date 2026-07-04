"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { trackEvent } from "@/lib/analytics";
import { getUtmParams } from "@/lib/utm";

export function CallbackForm() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname?.split("/")[1]);
  const dictionary = getDictionary(locale);
  const copy = dictionary.leadForm;

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, copy.validation.name),
        contact: z.string().min(3, copy.validation.contact),
      }),
    [copy],
  );

  type Values = z.infer<typeof schema>;

  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Values>();

  const onSubmit = async (values: Values) => {
    const parsed = schema.safeParse(values);
    if (!parsed.success) return;

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, channel: "phone", request: "Callback requested", ...getUtmParams() }),
    });
    trackEvent("lead_submit", { source: "callback_form" });
    setSubmitted(true);
    reset();
  };

  return (
    <div className="rounded-[var(--r)] border border-[color:var(--line)] bg-[color:var(--graphite)] p-8">
      <h2 className="text-xl font-semibold text-white">
        {locale === "uk" ? "Замовити дзвінок" : "Request a callback"}
      </h2>
      <p className="mt-3 text-sm leading-7 text-[color:var(--mist)]">
        {locale === "uk" ? "Залиште номер — ми передзвонимо." : "Leave your number and we will call you back."}
      </p>

      {submitted ? (
        <div className="mt-6 rounded-[var(--r-sm)] border border-[color:var(--action)]/40 bg-[color:var(--action)]/10 p-4 text-sm text-[color:var(--porcelain)]">
          {copy.successMessage}
        </div>
      ) : (
        <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1">
            <input
              {...register("name")}
              placeholder={copy.nameLabel}
              aria-label={copy.nameLabel}
              className="w-full rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--ink)] px-4 py-3 text-[color:var(--porcelain)] outline-none focus-visible:border-[color:var(--action)] focus-visible:ring-2 focus-visible:ring-[color:var(--action)]/40"
            />
            {errors.name ? <p className="mt-2 text-xs text-[color:var(--action)]">{errors.name.message}</p> : null}
          </div>
          <div className="flex-1">
            <input
              {...register("contact")}
              placeholder={copy.contactLabel}
              aria-label={copy.contactLabel}
              className="w-full rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--ink)] px-4 py-3 text-[color:var(--porcelain)] outline-none focus-visible:border-[color:var(--action)] focus-visible:ring-2 focus-visible:ring-[color:var(--action)]/40"
            />
            {errors.contact ? <p className="mt-2 text-xs text-[color:var(--action)]">{errors.contact.message}</p> : null}
          </div>
          <button
            disabled={isSubmitting}
            className="rounded-full bg-[color:var(--action-dim)] px-5 py-3 text-sm font-medium text-white transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--action)]"
          >
            {isSubmitting ? copy.submitting : copy.submit}
          </button>
        </form>
      )}
    </div>
  );
}
