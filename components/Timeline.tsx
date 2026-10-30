import type { FestivalDate } from "@/content/dates";
import { getContent } from "@/content";
import { LOCALE_META, type Locale } from "@/lib/i18n";

function formatter(locale: Locale) {
  const tag = LOCALE_META[locale].date;
  const fmt = new Intl.DateTimeFormat(tag, { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Seoul" });
  const fmtDayMonth = new Intl.DateTimeFormat(tag, { day: "numeric", month: "long", timeZone: "Asia/Seoul" });
  return (d?: string): string | null => {
    if (!d) return null;
    const [a, b] = d.split("/");
    const start = new Date(`${a}T00:00:00+09:00`);
    if (!b) return fmt.format(start);
    const end = new Date(`${b}T00:00:00+09:00`);
    return locale === "ko" ? `${fmt.format(start)} – ${fmtDayMonth.format(end)}` : `${fmtDayMonth.format(start)} – ${fmt.format(end)}`;
  };
}

export function Timeline({ items, locale = "en" }: { items: FestivalDate[]; locale?: Locale }) {
  const t = getContent(locale).ui.dates;
  const formatDate = formatter(locale);
  return (
    <ol className="relative border-l border-ink-line">
      {items.map((item) => {
        const when = formatDate(item.date);
        return (
          <li key={item.key} className="relative pb-12 pl-8 last:pb-0 md:pl-12">
            <span
              className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full ${item.status === "tba" ? "border border-muted bg-ink" : "bg-celadon"}`}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="text-xl font-medium md:text-2xl">{item.label}</h3>
              {item.status === "provisional" ? <span className="slate !text-celadon">{t.provisional}</span> : null}
            </div>
            <p className="display tabular mt-2 text-[clamp(1.6rem,3.4vw,2.4rem)] text-paper/90">
              {item.status === "tba" ? <span className="text-muted">{t.tba}</span> : when ?? <span className="text-muted">{t.ongoing}</span>}
            </p>
            {item.detail ? <p className="mt-2 text-paper/70">{item.detail}</p> : null}
          </li>
        );
      })}
    </ol>
  );
}
