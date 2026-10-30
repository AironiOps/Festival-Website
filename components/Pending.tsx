import type { Pending as PendingT } from "@/content/types";
import type { Locale } from "@/lib/i18n";

const LABEL: Record<Locale, string> = { en: "Pending", ko: "확정 전" };

/** A clearly labelled placeholder for text that is not yet approved. */
export function Pending({ item, compact = false, locale = "en" }: { item: PendingT | string; compact?: boolean; locale?: Locale }) {
  const note = typeof item === "string" ? item : item.note;
  return (
    <div
      className={`pending ${compact ? "px-3 py-2" : "px-4 py-3"} text-sm text-paper/85`}
      data-placeholder="true"
      role="note"
    >
      <span className="slate !text-cinnabar mr-2">{LABEL[locale]}</span>
      {note}
    </div>
  );
}

/** Render approved copy as a paragraph, or a Pending panel when not approved. */
export function CopyBlock({ value, className = "", locale = "en" }: { value: string | PendingT; className?: string; locale?: Locale }) {
  if (typeof value === "string") return <p className={className}>{value}</p>;
  return <Pending item={value} locale={locale} />;
}
