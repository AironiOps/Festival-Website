import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { getContent } from "@/content";

const { festival } = getContent("ko");

export const metadata: Metadata = {
  title: { default: festival.longName, template: `%s · ${festival.name}` },
  description: festival.description,
  openGraph: {
    type: "website",
    siteName: festival.name,
    title: festival.longName,
    description: festival.description,
    url: "/ko/",
    locale: "ko_KR",
    alternateLocale: ["en_GB"],
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: festival.name }],
  },
  twitter: { card: "summary_large_image", title: festival.longName, description: festival.description, images: ["/og-image.jpg"] },
};

export default function KoreanLayout({ children }: { children: ReactNode }) {
  return <SiteChrome locale="ko">{children}</SiteChrome>;
}
