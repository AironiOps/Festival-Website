import { getContent } from "@/content";
import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import { ExternalIcon } from "./Button";

/**
 * Optional "Staff sign-in" link to the Airtable Team Center.
 * Hidden unless NEXT_PUBLIC_SHOW_STAFF_LINK=true and a URL is configured.
 */
export function StaffLink({ locale, className = "" }: { locale: Locale; className?: string }) {
  if (!config.showStaffLink || !config.teamCenterUrl) return null;
  const t = getContent(locale).ui.links;
  return (
    <a
      href={config.teamCenterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-link ${className}`}
      data-integration="team-center"
      title="Team Center"
    >
      {t.staff} <ExternalIcon />
      <span className="sr-only">{t.staffNewTab}</span>
    </a>
  );
}
