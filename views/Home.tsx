import Link from "next/link";
import { Arrow, Button } from "@/components/Button";
import { Timecode } from "@/components/Timecode";
import { getContent } from "@/content";
import { LOCALE_META, localePath, type Locale } from "@/lib/i18n";

const at = (iso: string) => new Date(`${iso}T00:00:00+09:00`);

export function HomeView({ locale }: { locale: Locale }) {
  const { categories, dates, festival, heroImage, ui } = getContent(locale);
  const t = ui.home;
  const short = new Intl.DateTimeFormat(LOCALE_META[locale].date, { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Seoul" });
  /** "1 Dec 2026" / "2026년 12월 1일"; ranges via formatRange ("15–17 Apr 2027" / "2027년 4월 15일~17일"). */
  const show = (iso?: string) => {
    if (!iso) return t.tba;
    const [a, b] = iso.split("/");
    return b ? short.formatRange(at(a), at(b)) : short.format(at(a));
  };
  const date = (key: string) => dates.find((d) => d.key === key)?.date;
  const href = (p: string) => localePath(locale, p);

  return (
    <>
      <section className="pt-10 md:pt-14">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <p className="slate flex items-center gap-2"><span className="rec-dot" aria-hidden="true" /> {t.call} · {festival.city}</p>
            <p className="slate"><Timecode /></p>
          </div>
        </div>

        <div className="scope hero-frame grain">
          <picture>
            <source media="(max-width: 767px)" type="image/webp" srcSet={`${heroImage.tall[800]} 800w, ${heroImage.tall[1200]} 1200w`} sizes="100vw" />
            <source type="image/webp" srcSet={`${heroImage.wide[1200]} 1200w, ${heroImage.wide[1600]} 1600w, ${heroImage.wide[2400]} 2400w`} sizes="100vw" />
            <img src={heroImage.fallback} alt={heroImage.alt} width={1600} height={669} className="hero-img" fetchPriority="high" decoding="async" />
          </picture>
          <div className="hero-scrim" aria-hidden="true" />
          <div className="wrap relative flex h-full flex-col justify-end pb-[5%]">
            <h1 className="display rise text-[clamp(2.7rem,7vw,6.2rem)]">
              <span className="block">{t.heroLines[0]}</span>
              <span className="block italic text-celadon">{t.heroLines[1]}</span>
            </h1>
          </div>
        </div>

        <div className="wrap">
          <div className="flex flex-wrap justify-between gap-3 pt-4">
            <p className="slate">{festival.longName}</p>
            <p className="slate">{heroImage.credit}</p>
          </div>

          <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr] md:items-end md:py-20">
            <p className="rise rise-2 max-w-2xl text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug text-paper/90">{festival.description}</p>
            <div className="rise rise-3 flex flex-wrap gap-3 md:justify-end">
              <Button href={href("/submit/")}>{ui.chrome.submitLong} <Arrow /></Button>
              <Button href={href("/about/")} variant="ghost">{t.explore}</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-line bg-ink-raised/40" aria-labelledby="callsheet">
        <h2 id="callsheet" className="sr-only">{t.keyFacts}</h2>
        <dl className="wrap grid grid-cols-2 md:grid-cols-4">
          {[
            [t.factOpen, show(date("open"))],
            [t.factClose, show(date("close"))],
            [t.factFestival, show(date("festival"))],
            [t.factOpenTo, t.allCountries],
          ].map(([k, v], i) => (
            <div key={k} className={`py-7 pr-4 ${i % 2 === 1 ? "pl-4 md:pl-6" : ""} ${i > 1 ? "border-t border-ink-line md:border-t-0" : ""} ${i > 0 ? "md:border-l md:border-ink-line md:pl-6" : ""}`}>
              <dt className="slate">{k}</dt>
              <dd className="display tabular mt-2 text-[clamp(1.35rem,2.4vw,1.9rem)]">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="wrap pb-5 text-xs text-muted">{t.factsNote}</p>
      </section>

      <section className="border-b border-ink-line">
        <div className="wrap grid gap-10 py-20 md:grid-cols-[13rem_1fr] md:py-28">
          <p className="slate">{t.festivalLabel}</p>
          <div className="min-w-0">
            <h2 className="display max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)]">{t.festivalHeading}</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {t.pillars.map(([title, body]) => (
                <div key={title} className="border-t border-ink-line pt-5">
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="mt-2 text-paper/70">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink-line">
        <div className="wrap grid gap-10 py-20 md:grid-cols-[13rem_1fr] md:py-28">
          <p className="slate">{t.categoriesLabel}</p>
          <div className="min-w-0">
            <ul className="border-t border-ink-line">
              {categories.map((c, i) => (
                <li key={c.slug} className="border-b border-ink-line">
                  <Link href={href(`/categories/#${c.slug}`)} className="group flex items-baseline gap-5 py-4 no-underline md:gap-8">
                    <span className="slate tabular w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display flex-1 text-[clamp(1.45rem,3vw,2.3rem)] transition-colors group-hover:text-celadon">{c.name}</span>
                    <span className="hidden text-sm text-muted md:block">{c.award}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8"><Link href={href("/categories/")} className="text-link slate !text-paper">{t.allCategories}</Link></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap grid gap-8 py-20 md:grid-cols-[1fr_auto] md:items-center md:py-28">
          <div>
            <p className="slate">{t.enterLabel}</p>
            <h2 className="display mt-4 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)]">{t.enterHeading}</h2>
            <p className="mt-5 max-w-2xl text-paper/75">{t.enterBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={href("/submit/")}>{ui.chrome.submitLong} <Arrow /></Button>
            <Button href={href("/how-to-enter/")} variant="ghost">{t.readSteps}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
