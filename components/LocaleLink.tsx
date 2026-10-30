import Link from "next/link";
import type { ReactNode } from "react";
import type { LinkComp } from "@/content/ui";
import { localePath, type Locale } from "@/lib/i18n";

/** Returns an inline text-link component that adds the language prefix to internal paths. */
export function linkFor(locale: Locale): LinkComp {
  function A({ href, children }: { href: string; children: ReactNode }) {
    return (
      <Link className="text-link" href={localePath(locale, href)}>
        {children}
      </Link>
    );
  }
  return A;
}
