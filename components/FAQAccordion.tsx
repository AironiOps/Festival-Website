import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { CopyBlock } from "./Pending";

/** Accordion built on native <details>: keyboard and screen-reader accessible with no script. */
export function FAQAccordion({ items, locale = "en" }: { items: { q: string; a: Copy }[]; locale?: Locale }) {
  return (
    <div className="border-t border-ink-line">
      {items.map((item, i) => (
        <details key={item.q} className="group border-b border-ink-line" open={i === 0}>
          <summary className="flex items-start justify-between gap-6 py-6 text-left">
            <span className="flex gap-5">
              <span className="slate tabular pt-1.5">Q{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xl font-medium md:text-2xl">{item.q}</span>
            </span>
            <span className="chev mt-2 shrink-0 text-celadon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.4" /></svg>
            </span>
          </summary>
          <div className="prose-col pb-8 pl-[3.1rem] text-paper/80">
            <CopyBlock value={item.a} locale={locale} />
          </div>
        </details>
      ))}
    </div>
  );
}
