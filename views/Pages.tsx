import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Button } from "@/components/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FilloutEmbed } from "@/components/FilloutEmbed";
import { JuryRoomLink } from "@/components/JuryRoomLink";
import { LabBookingEmbed } from "@/components/LabBookingEmbed";
import { LegalPage } from "@/components/LegalPage";
import { linkFor } from "@/components/LocaleLink";
import { PageHeader } from "@/components/PageHeader";
import { CopyBlock, Pending } from "@/components/Pending";
import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { getContent } from "@/content";
import { config } from "@/lib/config";
import { localePath, type Locale } from "@/lib/i18n";

type P = { locale: Locale };

export function AboutView({ locale }: P) {
  const { about, festival, ui } = getContent(locale);
  const t = ui.about;
  return (
    <>
      <PageHeader slate={t.slate} title={festival.longName} lede={festival.tagline} />
      <Section label={t.mission}>
        <div className="prose-col text-lg"><CopyBlock value={about.mission} locale={locale} /></div>
      </Section>
      {about.sections.map((s, i) => (
        <Section key={s.heading} label={`${t.scene} ${String(i + 1).padStart(2, "0")}`} title={s.heading}>
          <p className="prose-col text-paper/80">{s.body}</p>
        </Section>
      ))}
      <Section label={t.objectives}>
        <div className="prose-col"><CopyBlock value={about.objectives} locale={locale} /></div>
      </Section>
      <Section label={t.organiser}>
        <div className="prose-col"><CopyBlock value={festival.organiser} locale={locale} /></div>
        <div className="mt-10"><Button href={localePath(locale, "/submit/")}>{ui.chrome.submitLong} <Arrow /></Button></div>
      </Section>
    </>
  );
}

export function CategoriesView({ locale }: P) {
  const { categories, categoriesPendingNote, ui } = getContent(locale);
  const t = ui.categories;
  return (
    <>
      <PageHeader slate={t.slate(categories.length)} title={t.title} lede={t.lede}>
        <div className="mt-8 max-w-2xl"><Pending item={categoriesPendingNote} locale={locale} /></div>
      </PageHeader>
      <div className="wrap py-10 md:py-16">
        <ol className="border-t border-ink-line">
          {categories.map((c, i) => (
            <li key={c.slug} id={c.slug} className="grid scroll-mt-28 gap-4 border-b border-ink-line py-10 md:grid-cols-[6rem_1fr_1fr] md:gap-10">
              <p className="slate tabular">{t.cat} {String(i + 1).padStart(2, "0")}</p>
              <div className="min-w-0">
                <h2 className="display text-[clamp(1.9rem,4vw,3rem)]">{c.name}</h2>
                <p className="mt-2 text-celadon">{c.award}</p>
                {t.formNameLabel && c.formName ? (
                  <p className="mt-2 text-sm text-muted">
                    {t.formNameLabel}: <span lang="en">{c.formName}</span>
                  </p>
                ) : null}
              </div>
              <div className="min-w-0 space-y-3 text-paper/80">
                {c.note ? <p>{c.note}</p> : null}
                {c.description ? <p>{c.description}</p> : <p className="text-sm text-muted" data-placeholder="true">{t.pendingDescription}</p>}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-sm text-muted">{t.footnote}</p>
        <div className="mt-8"><Button href={localePath(locale, "/submit/")}>{ui.chrome.submitLong} <Arrow /></Button></div>
      </div>
    </>
  );
}

export function HowToEnterView({ locale }: P) {
  const { ui } = getContent(locale);
  const t = ui.howToEnter;
  const steps = t.steps(linkFor(locale));
  return (
    <>
      <PageHeader slate={t.slate} title={t.title} lede={t.lede} />
      <div className="wrap py-14 md:py-20">
        <ol className="grid gap-px overflow-hidden border border-ink-line bg-ink-line md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.t} className="min-w-0 bg-ink p-8 md:p-10">
              <p className="slate tabular">{t.take(i + 1, steps.length)}</p>
              <h2 className="display mt-4 text-[clamp(1.7rem,3vw,2.3rem)]">{s.t}</h2>
              <p className="mt-4 text-paper/80">{s.b}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16 grid gap-10 md:grid-cols-[13rem_1fr]">
          <p className="slate">{t.linksLabel}</p>
          <div className="prose-col space-y-4 text-paper/80">
            {t.links.map((p) => <p key={p}>{p}</p>)}
            <Pending item={t.linksPending} locale={locale} />
          </div>
        </div>
        <div className="mt-16"><Button href={localePath(locale, "/submit/")}>{ui.chrome.submitLong} <Arrow /></Button></div>
      </div>
    </>
  );
}

// No analytics, pixels or tracking scripts may be added to this page without approval.
export function SubmitView({ locale }: P) {
  const { festival, ui } = getContent(locale);
  const t = ui.submit;
  const A = linkFor(locale);
  return (
    <>
      <PageHeader slate={t.slate} title={t.title} lede={t.lede} />
      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[19rem_1fr] lg:gap-16">
        <aside className="min-w-0 space-y-10 lg:sticky lg:top-28 lg:self-start">
          <div>
            <p className="slate">{t.eligibilityLabel}</p>
            <ul className="mt-4 space-y-3 text-paper/85">
              {t.eligibility.map((e) => (
                <li key={e} className="flex gap-3"><span className="mt-2.5 h-px w-4 shrink-0 bg-celadon" />{e}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted">{t.summaryOnly(A)}</p>
          </div>
          <div>
            <p className="slate">{t.beforeLabel}</p>
            <p className="mt-4 text-sm text-paper/80">{t.before(A)}</p>
          </div>
          <div>
            <p className="slate">{t.helpLabel}</p>
            <div className="mt-4 text-sm text-paper/80">
              <CopyBlock value={festival.contactEmail} locale={locale} />
              <p className="mt-3"><Link className="text-link" href={localePath(locale, "/faq/")}>{t.readFaq}</Link></p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-muted">{t.closed(A)}</p>
        </aside>
        <section aria-labelledby="form-heading" className="min-w-0">
          <h2 id="form-heading" className="sr-only">{t.formHeading}</h2>
          <div className="border border-ink-line bg-paper/[0.03] p-1 sm:p-2">
            <FilloutEmbed locale={locale} />
          </div>
          <p className="mt-4 text-xs text-muted">{t.footnote}</p>
        </section>
      </div>
    </>
  );
}

export function FaqView({ locale }: P) {
  const { faq, ui } = getContent(locale);
  const t = ui.faq;
  return (
    <>
      <PageHeader slate={t.slate} title={t.heading} lede={t.lede} />
      <div className="wrap py-12 md:py-16">
        <FAQAccordion items={faq} locale={locale} />
        <p className="mt-10 text-paper/70">{t.stuck(linkFor(locale))}</p>
      </div>
    </>
  );
}

export function DatesView({ locale }: P) {
  const { dates, ui } = getContent(locale);
  const t = ui.dates;
  const allTba = dates.every((d) => d.status === "tba");
  return (
    <>
      <PageHeader slate={t.slate} title={t.title} lede={t.lede} />
      <div className="wrap py-14 md:py-20">
        {allTba ? (
          <p className="display text-[clamp(2rem,5vw,3.4rem)] text-muted">{t.allTba}</p>
        ) : (
          <div className="max-w-3xl"><Timeline items={dates} locale={locale} /></div>
        )}
      </div>
    </>
  );
}

// No analytics, pixels or tracking scripts may be added to this page without approval.
export function LabView({ locale }: P) {
  if (!config.showLab) notFound();
  const { lab, ui } = getContent(locale);
  const t = ui.lab;
  return (
    <>
      <PageHeader slate={t.slate} title={lab.name} lede={lab.tagline} />
      <section className="border-b border-ink-line">
        <div className="wrap grid gap-10 py-14 md:grid-cols-[1.3fr_1fr] md:py-20">
          <p className="prose-col text-[clamp(1.15rem,1.8vw,1.4rem)] leading-snug text-paper/90">{lab.intro}</p>
          <dl className="grid grid-cols-2 content-start gap-px border border-ink-line bg-ink-line">
            {lab.facts.map(([k, v]) => (
              <div key={k} className="bg-ink p-5">
                <dt className="slate">{k}</dt>
                <dd className="display mt-2 text-[1.35rem]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="border-b border-ink-line">
        <div className="wrap py-14 md:py-20">
          <p className="slate">{t.how}</p>
          <ol className="mt-6 grid gap-px border border-ink-line bg-ink-line md:grid-cols-3">
            {lab.steps.map((s, i) => (
              <li key={s.t} className="min-w-0 bg-ink p-7">
                <p className="slate tabular">{t.step(i + 1)}</p>
                <h2 className="display mt-3 text-[1.6rem]">{s.t}</h2>
                <p className="mt-3 text-paper/75">{s.b}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 max-w-2xl text-sm"><CopyBlock value={lab.ageRule} locale={locale} /></div>
        </div>
      </section>
      <section aria-labelledby="book-heading">
        <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[19rem_1fr] lg:gap-16">
          <div>
            <h2 id="book-heading" className="display text-[clamp(1.9rem,3.6vw,2.6rem)]">{t.book}</h2>
            <p className="mt-4 text-paper/75">{lab.programmeNote}</p>
            <p className="mt-4 text-sm text-paper/70">{t.privacy(linkFor(locale))}</p>
          </div>
          <div className="min-w-0">
            <div className="border border-ink-line bg-paper/[0.03] p-1 sm:p-2">
              <LabBookingEmbed locale={locale} />
            </div>
            <p className="mt-4 text-xs text-muted">{t.footnote}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactView({ locale }: P) {
  const { festival, ui } = getContent(locale);
  const t = ui.contact;
  const email = festival.contactEmail;
  return (
    <>
      <PageHeader slate={t.slate} title={t.heading} lede={t.lede} />
      <Section label={t.email}>
        {typeof email === "string" ? (
          <p className="display select-all text-[clamp(1.6rem,3.6vw,2.6rem)]">{email}</p>
        ) : (
          <div className="max-w-xl"><CopyBlock value={email} locale={locale} /></div>
        )}
        <p className="prose-col mt-6 text-paper/70">{t.noFiles}</p>
      </Section>
      <Section label={t.jurors}>
        <p className="text-lg"><JuryRoomLink locale={locale} /></p>
        <p className="mt-2 text-paper/70">{ui.links.juryNote}</p>
        {ui.links.englishOnly ? <p className="mt-2 text-sm text-muted">{ui.links.englishOnly}</p> : null}
      </Section>
    </>
  );
}

export function PrivacyView({ locale }: P) {
  return <LegalPage doc={getContent(locale).privacyPolicy} locale={locale} />;
}

export function TermsView({ locale }: P) {
  return <LegalPage doc={getContent(locale).entryTerms} locale={locale} />;
}
