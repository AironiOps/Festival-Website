"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { basePath, LOCALE_META, LOCALES, localeOf, localePath } from "@/lib/i18n";

/**
 * EN · 한국어 switch. Links to the same page in the other language.
 * The choice is not stored: the address itself (/ or /ko/) carries the language.
 */
export function LanguageSwitch({ label, className = "" }: { label: string; className?: string }) {
  const pathname = usePathname() || "/";
  const current = localeOf(pathname);
  const base = basePath(pathname.endsWith("/") ? pathname : `${pathname}/`);
  return (
    <nav aria-label={label} className={`flex items-center gap-1 ${className}`}>
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 ? <span aria-hidden="true" className="text-paper/30">/</span> : null}
          {l === current ? (
            <span aria-current="true" lang={LOCALE_META[l].htmlLang} className="px-1 text-sm text-paper">
              {LOCALE_META[l].short === "KO" ? "한국어" : "EN"}
            </span>
          ) : (
            <Link
              href={localePath(l, base)}
              hrefLang={LOCALE_META[l].htmlLang}
              lang={LOCALE_META[l].htmlLang}
              className="px-1 text-sm text-paper/60 no-underline transition-colors hover:text-celadon"
              data-lang-switch={l}
            >
              {LOCALE_META[l].short === "KO" ? "한국어" : "EN"}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
