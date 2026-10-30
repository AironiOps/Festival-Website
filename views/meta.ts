import type { Metadata } from "next";
import { getContent } from "@/content";
import { alternatesFor, type Locale } from "@/lib/i18n";

type PageKey = "home" | "about" | "categories" | "how-to-enter" | "submit" | "faq" | "dates" | "lab" | "contact" | "privacy" | "terms";

export const PATHS: Record<PageKey, string> = {
  home: "/",
  about: "/about/",
  categories: "/categories/",
  "how-to-enter": "/how-to-enter/",
  submit: "/submit/",
  faq: "/faq/",
  dates: "/dates/",
  lab: "/lab/",
  contact: "/contact/",
  privacy: "/privacy/",
  terms: "/terms/",
};

/** Page title, description and hreflang alternates, per language. */
export function pageMeta(locale: Locale, key: PageKey): Metadata {
  const c = getContent(locale);
  const titles: Record<PageKey, string | undefined> = {
    home: undefined,
    about: c.ui.about.title,
    categories: c.ui.categories.title,
    "how-to-enter": c.ui.howToEnter.title,
    submit: c.ui.submit.title,
    faq: c.ui.faq.title,
    dates: c.ui.dates.title,
    lab: c.ui.lab.title,
    contact: c.ui.contact.title,
    privacy: c.privacyPolicy.title,
    terms: c.entryTerms.title,
  };
  const descriptions: Partial<Record<PageKey, string>> = {
    submit: c.ui.submit.description,
    lab: c.lab.tagline,
  };
  const path = PATHS[key];
  return {
    ...(titles[key] ? { title: titles[key] } : {}),
    ...(descriptions[key] ? { description: descriptions[key] } : {}),
    alternates: alternatesFor(locale, path),
  };
}
