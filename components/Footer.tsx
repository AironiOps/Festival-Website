import Link from "next/link";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { JuryRoomLink } from "./JuryRoomLink";
import { StaffLink } from "./StaffLink";
import { Wordmark } from "./Wordmark";

export function Footer({ locale }: { locale: Locale }) {
  const { festival, nav, ui } = getContent(locale);
  return (
    <footer className="mt-auto border-t border-ink-line bg-ink-raised/40">
      <div className="wrap grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="min-w-0">
          <Wordmark locale={locale} />
          <p className="mt-4 max-w-xs text-sm text-paper/65">{festival.tagline}</p>
        </div>

        <nav aria-label={ui.chrome.footerFestival}>
          <p className="slate mb-4">{ui.chrome.footerFestival}</p>
          <ul className="space-y-2 text-sm">
            {nav.footer.map((l) => (
              <li key={l.href}><Link className="text-link no-underline hover:underline" href={localePath(locale, l.href)}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label={ui.chrome.footerLegal}>
          <p className="slate mb-4">{ui.chrome.footerLegal}</p>
          <ul className="space-y-2 text-sm">
            {nav.legal.map((l) => (
              <li key={l.href}><Link className="text-link no-underline hover:underline" href={localePath(locale, l.href)}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <p className="slate mb-4">{ui.chrome.footerPeople}</p>
          <p className="text-sm"><JuryRoomLink locale={locale} /></p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{ui.links.juryNote}</p>
          <p className="mt-4 text-sm"><StaffLink locale={locale} /></p>
          {ui.links.englishOnly ? <p className="mt-3 text-xs leading-relaxed text-muted">{ui.links.englishOnly}</p> : null}
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-muted">
          <p>© {festival.copyrightYear} {festival.copyrightHolder}. {ui.chrome.rights}</p>
          <p className="slate">{ui.chrome.zone}</p>
        </div>
      </div>
    </footer>
  );
}
