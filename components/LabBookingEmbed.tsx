import { getContent } from "@/content";
import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import LabSliderClient from "./LabSliderClient";

/**
 * Lab booking app (separate from the film intake form). It is a Zite app that
 * writes to the workshop_bookings table in Airtable; this site never sees the
 * answers. It opens in a slide-in panel (LabSliderClient), like the film entry form.
 * Korean pages use NEXT_PUBLIC_LAB_BOOKING_URL_KO when set.
 * Without a configured URL a labelled notice appears with no inputs.
 */
export function LabBookingEmbed({ locale }: { locale: Locale }) {
  const t = getContent(locale).ui.lab;
  const koUrl = locale === "ko" ? config.labBookingUrlKo : null;
  const url = koUrl ?? config.labBookingUrl;
  if (!url) {
    return (
      <div className="pending px-6 py-12 text-center" data-placeholder="true" data-integration="lab-booking-missing">
        <p className="slate !text-cinnabar">{t.soonTitle}</p>
        <p className="mt-3 text-paper/85">{t.soonBody}</p>
      </div>
    );
  }
  const languageNote = locale !== "en" && !koUrl ? t.formLanguageNote : null;
  return (
    <div className="px-6 py-12 text-center sm:px-10 sm:py-16" data-integration="lab-booking" data-lab-booking-url={url} role="region" aria-label={t.region}>
      <p className="slate">{t.embedSlate}</p>
      <p className="mx-auto mt-4 mb-8 max-w-md text-paper/85">{t.embedIntro}</p>
      {languageNote ? <p className="mx-auto -mt-4 mb-8 max-w-md text-sm text-celadon" data-form-language-note="true">{languageNote}</p> : null}
      <LabSliderClient
        url={url}
        labels={{ button: t.button, region: t.region, openNewTab: t.openNewTab, close: t.closePanel, frameTitle: t.frameTitle }}
      />
      <noscript>
        <p className="mt-6">
          <a className="text-link" href={url} target="_blank" rel="noopener noreferrer">{t.openForm}</a>
        </p>
      </noscript>
    </div>
  );
}
