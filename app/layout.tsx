import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { festival } from "@/content/festival";
import { config } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: { default: festival.name, template: `%s · ${festival.name}` },
  description: festival.description,
  applicationName: festival.name,
  alternates: { canonical: "/", languages: { en: "/", ko: "/ko/", "x-default": "/" } },
  openGraph: {
    type: "website",
    siteName: festival.name,
    title: festival.name,
    description: festival.description,
    url: "/",
    locale: "en_GB",
    alternateLocale: ["ko_KR"],
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "WAiFF Seoul 2027" }],
  },
  twitter: { card: "summary_large_image", title: festival.name, description: festival.description, images: ["/og-image.jpg"] },
  // Staging builds must never be indexed.
  robots: config.isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0c0e15",
  colorScheme: "dark",
  viewportFit: "cover",
};

/** Shared root. Header, footer and language come from (en)/layout.tsx and ko/layout.tsx via SiteChrome. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
