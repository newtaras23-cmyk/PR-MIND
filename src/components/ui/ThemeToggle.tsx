"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";

const noopSubscribe = () => () => {};

// Same hydration-safe "mounted" check as Reveal.tsx: the server can't know the
// resolved theme, so we need a value that's false during SSR/first client render
// and true afterward, without a setState-in-effect (which reintroduces the mismatch).
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const pathname = usePathname();
  const locale = resolveLocale(pathname?.split("/")[1]);
  const dictionary = getDictionary(locale);

  if (!mounted) {
    // Avoids a hydration mismatch: the server can't know the resolved theme, so
    // render an inert placeholder of the same size until the client settles.
    return <span aria-hidden="true" className={`inline-block h-10 w-10 ${className ?? ""}`} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? dictionary.common.theme.light : dictionary.common.theme.dark}
      title={dictionary.common.theme.toggle}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--porcelain)] transition hover:border-[color:var(--action)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--action)] ${className ?? ""}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
