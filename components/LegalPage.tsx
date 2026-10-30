import type { LegalDoc } from "@/content/legal";
import { getContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "./PageHeader";
import { Pending } from "./Pending";

/** Styled legal document. Sections without approved text render as placeholders. */
export function LegalPage({ doc, locale = "en" }: { doc: LegalDoc; locale?: Locale }) {
  const t = getContent(locale).ui.legal;
  return (
    <>
      <PageHeader slate={doc.approved && doc.lastUpdated ? t.lastUpdated(doc.lastUpdated) : t.draft} title={doc.title}>
        {!doc.approved ? (
          <div className="mt-8 max-w-2xl">
            <Pending locale={locale} item={t.outlineOnly} />
            {t.translationNote ? <div className="mt-3"><Pending locale={locale} item={t.translationNote} /></div> : null}
          </div>
        ) : null}
      </PageHeader>
      <div className="wrap grid gap-12 py-14 md:grid-cols-[15rem_1fr] md:py-20">
        <nav aria-label={t.contents} className="hidden md:block">
          <ol className="sticky top-28 space-y-2 text-sm text-muted">
            {doc.sections.map((s, i) => (
              <li key={s.heading}>
                <a className="no-underline hover:text-celadon" href={`#s${i + 1}`}>
                  <span className="tabular font-mono text-xs">{String(i + 1).padStart(2, "0")}</span> {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="prose-col min-w-0">
          {doc.intro ? <p className="mb-10 text-lg">{doc.intro}</p> : null}
          <ol className="space-y-12">
            {doc.sections.map((s, i) => (
              <li key={s.heading} id={`s${i + 1}`} className="scroll-mt-28">
                <h2 className="flex gap-4 text-2xl font-medium">
                  <span className="slate tabular pt-2">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 pl-10 text-paper/80">
                  {s.body ? s.body.map((p, j) => <p key={j}>{p}</p>) : <Pending compact locale={locale} item={t.sectionPending} />}
                </div>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </>
  );
}
