import type { ReactNode } from "react";
import { getContent } from "@/content";
import { config } from "@/lib/config";
import { LOCALE_META, type Locale } from "@/lib/i18n";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Header, footer and test bar around every page, in one language.
 * The wrapper carries the lang attribute; for Korean pages a one-line script
 * also sets <html lang="ko"> as the page loads (the shared root layout is English).
 */
export function SiteChrome({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { ui } = getContent(locale);
  return (
    <div lang={LOCALE_META[locale].htmlLang} className="flex min-h-dvh flex-col" data-locale={locale}>
      {locale !== "en" ? (
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(LOCALE_META[locale].htmlLang)}` }} />
      ) : null}
      <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]">
        {ui.chrome.skip}
      </a>
      {!config.isProduction ? (
        <div className="bg-cinnabar/90 text-ink">
          <p className="wrap py-1.5 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em]">{ui.chrome.testBar}</p>
        </div>
      ) : null}
      <Header locale={locale} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
