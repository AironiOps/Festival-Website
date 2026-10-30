import { localePath, LOCALES } from "./i18n";

const PAGES = ["/", "/about/", "/categories/", "/how-to-enter/", "/submit/", "/faq/", "/dates/", "/lab/", "/contact/", "/privacy/", "/terms/"];

/** Every exported page in both languages. */
export const ROUTES = LOCALES.flatMap((l) => PAGES.map((p) => localePath(l, p)));
