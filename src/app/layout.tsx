import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/animation/MotionProvider";
import { SmoothScrollProvider } from "@/components/animation/SmoothScrollProvider";
import { UtmCapture } from "@/components/animation/UtmCapture";
import { ContactDock, MobileCallBar } from "@/components/sections/ContactDock";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

// TODO: swap for the licensed Clash Display files (fontshare.com) — Bricolage Grotesque
// is a self-hosted interim display font with a similar confident/editorial character.
const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

// TZ-designated fallback for General Sans until the licensed font files are sourced.
const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

// Single weight only: mono is used sparingly for eyebrow/utility labels, not body text.
const monoFont = localFont({
  variable: "--font-mono",
  src: [
    { path: "../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = buildMetadata({
  title: "Reputation strategy",
  description: "PR-MIND helps founders, executives, and public figures control how they are seen online through reputation strategy and discreet communications.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16 md:pb-0">
        <StructuredData />
        <UtmCapture />
        <MotionProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <ContactDock />
          <MobileCallBar />
        </MotionProvider>
      </body>
    </html>
  );
}
