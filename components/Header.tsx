import Link from "next/link";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

export function Header({ locale }: { locale: Locale }) {
  const { nav, ui } = getContent(locale);
  const items = nav.main.map((i) => ({ href: localePath(locale, i.href), label: i.label }));
  return (
    <header className="site-header sticky top-0 z-50 border-b border-ink-line">
      <div className="wrap flex h-[4.25rem] items-center justify-between gap-6">
        <Wordmark locale={locale} />
        <div className="hidden items-center gap-7 md:flex">
          <nav aria-label={ui.chrome.mainNav} className="flex items-center gap-6 lg:gap-7">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap text-sm text-paper/80 no-underline transition-colors hover:text-celadon">
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitch label={ui.chrome.language} />
          <Link href={localePath(locale, "/submit/")} className="btn btn-primary !min-h-0 !py-2.5">
            {ui.chrome.submitShort}
          </Link>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitch label={ui.chrome.language} />
          <MobileMenu
            items={[...items, { href: localePath(locale, nav.contact.href), label: nav.contact.label }]}
            submit={{ href: localePath(locale, "/submit/"), label: ui.chrome.submitLong }}
            labels={{ menu: ui.chrome.menu, close: ui.chrome.close, nav: ui.chrome.mainNav }}
          />
        </div>
      </div>
    </header>
  );
}
