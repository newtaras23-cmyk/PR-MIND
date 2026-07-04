import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--ink)] text-[color:var(--porcelain)]">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.28em] text-[color:var(--action)]">{eyebrow}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
            <p className="mt-6 text-lg leading-8 text-[color:var(--mist)]">{description}</p>
          </div>
          <div className="mt-12">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
