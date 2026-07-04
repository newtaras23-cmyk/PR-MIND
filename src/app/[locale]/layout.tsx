import type { ReactNode } from "react";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "uk" }];
}

export const dynamicParams = false;

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return children;
}
