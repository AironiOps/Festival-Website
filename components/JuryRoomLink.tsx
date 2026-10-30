import { getContent } from "@/content";
import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import { ExternalIcon } from "./Button";

/**
 * Link out to the Airtable Jury Room. Airtable handles sign-in and permissions;
 * this site never reads or shows juror data. The Jury Room itself is in English.
 */
export function JuryRoomLink({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = getContent(locale).ui.links;
  if (!config.juryRoomUrl) {
    return (
      <span className={className} data-placeholder="true">
        <span className="text-muted">{t.juryRoom}</span> <span className="slate !text-cinnabar">{t.notConfigured}</span>
      </span>
    );
  }
  return (
    <a href={config.juryRoomUrl} target="_blank" rel="noopener noreferrer" className={`text-link ${className}`} data-integration="jury-room">
      {t.juryRoom} <ExternalIcon />
      <span className="sr-only">{t.newTab}</span>
    </a>
  );
}
