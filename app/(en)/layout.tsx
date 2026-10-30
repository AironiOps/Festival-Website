import type { ReactNode } from "react";
import { SiteChrome } from "@/components/SiteChrome";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteChrome locale="en">{children}</SiteChrome>;
}
