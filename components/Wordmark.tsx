import Link from "next/link";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

/** Text wordmark. Replace with the official logo when supplied. */
export function Wordmark({ locale }: { locale: Locale }) {
  const { festival, ui } = getContent(locale);
  return (
    <Link href={localePath(locale, "/")} className="group flex items-baseline gap-2 no-underline" aria-label={`${festival.name}, ${ui.chrome.home}`}>
      <span className="display text-[1.55rem] italic leading-none">{festival.wordmark.lead}</span>
      <span className="slate !text-paper/70 group-hover:!text-celadon">{festival.wordmark.trail}</span>
    </Link>
  );
}
