/**
 * Two languages: English at the site root, Korean under /ko/.
 * Every page exists in both; the language switch keeps the visitor on the
 * matching page.
 */
export type Locale = "en" | "ko";

export const LOCALES: Locale[] = ["en", "ko"];

export const LOCALE_META: Record<Locale, { label: string; short: string; htmlLang: string; og: string; date: string }> = {
  en: { label: "English", short: "EN", htmlLang: "en", og: "en_GB", date: "en-GB" },
  ko: { label: "한국어", short: "KO", htmlLang: "ko", og: "ko_KR", date: "ko-KR" },
};

/** "/about/" → "/ko/about/" for Korean; unchanged for English. Hash fragments are kept. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (path === "/") return "/ko/";
  return `/ko${path}`;
}

/** Strip a /ko prefix: "/ko/about/" → "/about/". */
export function basePath(pathname: string): string {
  if (pathname === "/ko" || pathname === "/ko/") return "/";
  return pathname.startsWith("/ko/") ? pathname.slice(3) : pathname;
}

export function localeOf(pathname: string): Locale {
  return pathname === "/ko" || pathname.startsWith("/ko/") ? "ko" : "en";
}

/** Metadata alternates for a page: canonical plus hreflang for both languages. */
export function alternatesFor(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: { en: path, ko: localePath("ko", path), "x-default": path },
  };
}
