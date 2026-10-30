import type { Locale } from "@/lib/i18n";
import * as enCategories from "./categories";
import * as enDates from "./dates";
import * as enFaq from "./faq";
import * as enFestival from "./festival";
import * as enLab from "./lab";
import * as enLegal from "./legal";
import * as enNav from "./navigation";
import { ui as enUi } from "./ui";
import * as koCategories from "./ko/categories";
import * as koDates from "./ko/dates";
import * as koFaq from "./ko/faq";
import * as koFestival from "./ko/festival";
import * as koLab from "./ko/lab";
import * as koLegal from "./ko/legal";
import * as koNav from "./ko/navigation";
import { ui as koUi } from "./ko/ui";

/** Everything a page needs, in one language. English files live in content/, Korean in content/ko/. */
const bundles = {
  en: {
    festival: enFestival.festival,
    about: enFestival.about,
    heroImage: enFestival.heroImage,
    categories: enCategories.categories,
    categoriesPendingNote: enCategories.categoriesPendingNote,
    dates: enDates.dates,
    faq: enFaq.faq,
    lab: enLab.lab,
    privacyPolicy: enLegal.privacyPolicy,
    entryTerms: enLegal.entryTerms,
    nav: { main: enNav.mainNav, footer: enNav.footerNav, legal: enNav.legalNav, contact: enNav.contactNav },
    ui: enUi,
  },
  ko: {
    festival: koFestival.festival,
    about: koFestival.about,
    heroImage: koFestival.heroImage,
    categories: koCategories.categories,
    categoriesPendingNote: koCategories.categoriesPendingNote,
    dates: koDates.dates,
    faq: koFaq.faq,
    lab: koLab.lab,
    privacyPolicy: koLegal.privacyPolicy,
    entryTerms: koLegal.entryTerms,
    nav: { main: koNav.mainNav, footer: koNav.footerNav, legal: koNav.legalNav, contact: koNav.contactNav },
    ui: koUi,
  },
};

export type Content = (typeof bundles)["en"];

export function getContent(locale: Locale): Content {
  return bundles[locale];
}
