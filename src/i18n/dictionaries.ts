import en from "./messages/en.json";
import uk from "./messages/uk.json";

export type Locale = "en" | "uk";

export const defaultLocale: Locale = "en";

const dictionaries = { en, uk } as const;

export function resolveLocale(locale?: string | null): Locale {
  return locale === "uk" ? "uk" : "en";
}

export function getDictionary(locale: string | undefined) {
  return dictionaries[resolveLocale(locale)];
}
