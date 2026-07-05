"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { trackEvent } from "@/lib/analytics";
import { getUtmParams } from "@/lib/utm";

const submitLead = async (values: Record<string, string | undefined>) => {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Unable to send request");
  }

  return response.json();
};

export function LeadForm() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname?.split("/")[1]);
  const dictionary = getDictionary(locale);
  const copy = dictionary.leadForm;

  const leadSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, copy.validation.name),
        channel: z.string().min(1, copy.validation.channel),
        contact: z.string().min(3, copy.validation.contact),
        request: z.string().optional(),
        company: z.string().optional(),
      }),
    [copy],
  );

  type LeadFormValues = z.infer<typeof leadSchema>;

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormValues>();

  const onSubmit = async (values: LeadFormValues) => {
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      return;
    }

    try {
      setError(null);
      await submitLead({ ...parsed.data, ...getUtmParams() });
      trackEvent("lead_submit", { source: "lead_form", channel: parsed.data.channel });
      setSubmitted(true);
      reset();
    } catch {
      setError(copy.errorMessage);
    }
  };

  return (
    <div className="glass-surface relative overflow-hidden rounded-[var(--r)] p-8">
      <div className="relative z-10">
      <h2 className="text-2xl font-semibold text-white">{copy.heading}</h2>
      <p className="mt-3 text-sm leading-7 text-[color:var(--mist)]">{copy.subheading}</p>

      {submitted ? (
        <div className="mt-6 rounded-[var(--r-sm)] border border-[color:var(--action)]/40 bg-[color:var(--action)]/10 p-4 text-sm text-[color:var(--porcelain)]">
          {copy.successMessage}
        </div>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("company")}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <div>
            <label htmlFor="lead-name" className="mb-2 block text-sm text-[color:var(--mist)]">{copy.nameLabel}</label>
            <input
              id="lead-name"
              {...register("name")}
              className="w-full rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--ink)] px-4 py-3 text-[color:var(--porcelain)] outline-none ring-0 focus-visible:border-[color:var(--action)] focus-visible:ring-2 focus-visible:ring-[color:var(--action)]/40"
            />
            {errors.name ? <p className="mt-2 text-sm text-[color:var(--action)]">{errors.name.message}</p> : null}
          </div>

          <div>
            <label htmlFor="lead-channel" className="mb-2 block text-sm text-[color:var(--mist)]">{copy.channelLabel}</label>
            <select
              id="lead-channel"
              {...register("channel")}
              className="w-full rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--ink)] px-4 py-3 text-[color:var(--porcelain)] outline-none focus-visible:border-[color:var(--action)] focus-visible:ring-2 focus-visible:ring-[color:var(--action)]/40"
            >
              <option value="">{copy.channelSelect}</option>
              <option value="telegram">Telegram</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="signal">Signal</option>
              <option value="email">Email</option>
              <option value="phone">Phone call</option>
            </select>
            {errors.channel ? <p className="mt-2 text-sm text-[color:var(--action)]">{errors.channel.message}</p> : null}
          </div>

          <div>
            <label htmlFor="lead-contact" className="mb-2 block text-sm text-[color:var(--mist)]">{copy.contactLabel}</label>
            <input
              id="lead-contact"
              {...register("contact")}
              className="w-full rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--ink)] px-4 py-3 text-[color:var(--porcelain)] outline-none focus-visible:border-[color:var(--action)] focus-visible:ring-2 focus-visible:ring-[color:var(--action)]/40"
            />
            {errors.contact ? <p className="mt-2 text-sm text-[color:var(--action)]">{errors.contact.message}</p> : null}
          </div>

          <div>
            <label htmlFor="lead-request" className="mb-2 block text-sm text-[color:var(--mist)]">{copy.requestLabel}</label>
            <textarea
              id="lead-request"
              {...register("request")}
              rows={4}
              className="w-full rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--ink)] px-4 py-3 text-[color:var(--porcelain)] outline-none focus-visible:border-[color:var(--action)] focus-visible:ring-2 focus-visible:ring-[color:var(--action)]/40"
            />
          </div>

          {error ? (
            <p className="text-sm text-[color:var(--action)]">{error}</p>
          ) : null}

          <button
            disabled={isSubmitting}
            className="rounded-full bg-[color:var(--action-dim)] px-5 py-3 text-sm font-medium text-[color:var(--ink)] transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--action)]"
          >
            {isSubmitting ? copy.submitting : copy.submit}
          </button>
        </form>
      )}
      </div>
    </div>
  );
}
