// Checks on the built static site in ./out. Run `npm run build` first.
// Uses only Node's built-in test runner; no extra dependencies.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;
const SRC_DIRS = ["app", "components", "content", "lib"].map((d) => new URL(`../${d}/`, import.meta.url).pathname);
const CANONICAL_FORM_ID = "g1196pxKY4us";
const PAGES = ["", "about", "categories", "how-to-enter", "submit", "faq", "dates", "lab", "contact", "privacy", "terms"];
const KO_ROUTES = PAGES.map((p) => (p ? `ko/${p}` : "ko"));
const ROUTES = [...PAGES, ...KO_ROUTES];

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const html = (route) => readFileSync(join(OUT, route, "index.html"), "utf8");
const allOut = () => walk(OUT).filter((f) => /\.(html|js|css|txt|xml)$/.test(f));

test("build output exists", () => {
  assert.ok(existsSync(OUT), "out/ is missing; run npm run build");
});

test("every route is exported as static HTML", () => {
  for (const r of ROUTES) assert.ok(existsSync(join(OUT, r, "index.html")), `missing /${r}`);
  assert.ok(existsSync(join(OUT, "404.html")), "missing 404.html");
});

test("no server output: no API routes or functions", () => {
  assert.ok(!existsSync(join(OUT, "api")), "out/api exists");
  assert.ok(!existsSync(new URL("../functions/", import.meta.url).pathname), "functions/ directory exists");
});

test("submit page embeds the ORIGINAL Fillout form only, in both languages", () => {
  for (const r of ["submit", "ko/submit"]) {
    const page = html(r);
    const ids = [...page.matchAll(/data-fillout-form-id="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(ids, [CANONICAL_FORM_ID], `/${r}: expected exactly ${CANONICAL_FORM_ID}, found ${ids.join(",") || "none"}`);
  }
  // No other Fillout form ID appears anywhere, except the Lab booking form.
  for (const f of allOut()) {
    const text = readFileSync(f, "utf8");
    for (const m of text.matchAll(/fillout\.com\/t\/([A-Za-z0-9]+)/g)) {
      assert.ok(m[1] === CANONICAL_FORM_ID, `${relative(OUT, f)} references form ${m[1]}`);
    }
  }
});

test("no custom form posts anywhere", () => {
  for (const r of ROUTES) assert.ok(!/<form[\s>]/i.test(html(r)), `/${r} contains a <form>`);
});

test("Jury Room link opens in a new tab with safe rel, plus the device note", () => {
  const footer = html("");
  const m = footer.match(/<a[^>]*data-integration="jury-room"[^>]*>/);
  assert.ok(m, "Jury Room link not found in footer");
  assert.match(m[0], /target="_blank"/);
  assert.match(m[0], /rel="noopener noreferrer"/);
  assert.match(m[0], /href="https:\/\/airtable\.com\//);
  assert.match(footer, /Please use a computer or tablet\. Phones are not supported\./);
});

test("staff link follows NEXT_PUBLIC_SHOW_STAFF_LINK", () => {
  const shown = /data-integration="team-center"/.test(html(""));
  const want = (process.env.NEXT_PUBLIC_SHOW_STAFF_LINK ?? readEnvLocal("NEXT_PUBLIC_SHOW_STAFF_LINK")) === "true";
  assert.equal(shown, want);
});

test("no Airtable API, Make webhooks or secrets in source or output", () => {
  const banned = [/api\.airtable\.com/i, /hook\.[a-z0-9]+\.make\.com/i, /\bpat[A-Za-z0-9]{14}\.[a-f0-9]{20,}/, /re_[A-Za-z0-9]{20,}/, /airtable\.js|from "airtable"/];
  const files = [...SRC_DIRS.flatMap(walk), ...allOut()];
  for (const f of files) {
    const text = readFileSync(f, "utf8");
    for (const b of banned) assert.ok(!b.test(text), `${f} matches ${b}`);
  }
});

test("no analytics or tracking scripts", () => {
  const banned = [/googletagmanager/i, /google-analytics/i, /gtag\(/, /fbq\(/, /connect\.facebook\.net/i, /_vercel\/insights/i, /posthog/i, /hotjar/i, /clarity\.ms/i, /plausible/i, /segment\.com/i];
  for (const f of allOut()) {
    const text = readFileSync(f, "utf8");
    for (const b of banned) assert.ok(!b.test(text), `${relative(OUT, f)} matches ${b}`);
  }
});

test("no localStorage, sessionStorage or cookies written by site code", () => {
  for (const f of SRC_DIRS.flatMap(walk)) {
    const text = readFileSync(f, "utf8");
    assert.ok(!/localStorage|sessionStorage|document\.cookie|indexedDB/.test(text), `${f} uses browser storage`);
  }
});

test("internal name never shown publicly", () => {
  for (const r of ROUTES) {
    const visible = html(r).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    assert.ok(!/aironi/i.test(visible), `/${r} shows the internal platform name`);
  }
});

test("banned terminology absent from visible text", () => {
  const banned = /\b(applicant|administrator|operator|moderator|user profile)s?\b/i;
  for (const r of ROUTES) {
    const visible = html(r).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    assert.ok(!banned.test(visible), `/${r}: ${visible.match(banned)?.[0]}`);
  }
});

test("staging builds are not indexable", () => {
  const env = process.env.NEXT_PUBLIC_SITE_ENV ?? readEnvLocal("NEXT_PUBLIC_SITE_ENV");
  if (env === "production") return;
  for (const r of ROUTES) assert.match(html(r), /<meta name="robots" content="noindex/, `/${r} lacks noindex`);
  assert.match(readFileSync(join(OUT, "robots.txt"), "utf8"), /Disallow: \//);
});

test("legal pages are marked as not yet approved", () => {
  for (const r of ["privacy", "terms"]) assert.match(html(r), /data-placeholder="true"/, `/${r} has no pending marker`);
});

test("no entrant, juror or score data shipped", () => {
  const banned = [/\brec(?=[A-Za-z0-9]{14}\b)(?=[a-z]*[A-Z])(?=[A-Za-z]*\d)[A-Za-z0-9]{14}\b/, /jury_scores|jury_assignments|tblAMtNpd0z916Mwn/, /@example\.com/];
  for (const f of allOut()) {
    const text = readFileSync(f, "utf8");
    for (const b of banned) assert.ok(!b.test(text), `${relative(OUT, f)} matches ${b}`);
  }
});

function readEnvLocal(key) {
  for (const name of [".env.local", ".env.production", ".env"]) {
    const p = new URL(`../${name}`, import.meta.url).pathname;
    if (!existsSync(p)) continue;
    const line = readFileSync(p, "utf8").split("\n").find((l) => l.startsWith(`${key}=`));
    if (line) return line.slice(key.length + 1).trim();
  }
  return undefined;
}

test("every image the pages reference exists", () => {
  for (const r of ROUTES) {
    const page = html(r);
    const refs = [...page.matchAll(/(?:src|srcSet|srcset)="([^"]+)"/g)].flatMap((m) => m[1].split(",").map((x) => x.trim().split(" ")[0]));
    for (const ref of refs.filter((x) => x.startsWith("/images/"))) {
      assert.ok(existsSync(join(OUT, ref)), `/${r} references missing ${ref}`);
    }
  }
  assert.ok(existsSync(join(OUT, "og-image.jpg")), "missing og-image.jpg");
});

test("hero image has alt text", () => {
  const m = html("").match(/<img[^>]*class="hero-img"[^>]*>/);
  assert.ok(m, "hero image missing");
  assert.match(m[0], /alt="[^"]{20,}"/);
});

test("Lab page never embeds the intake form", () => {
  for (const r of ["lab", "ko/lab"]) {
  const page = html(r);
  assert.ok(!page.includes(`data-fillout-form-id="${CANONICAL_FORM_ID}"`), "intake form on /lab");
  assert.ok(!page.includes(CANONICAL_FORM_ID), "intake form ID appears on /lab");
  assert.match(page, /data-integration="lab-booking(-missing)?"/);
  const m = page.match(/data-lab-booking-url="([^"]+)"/);
  if (m) {
    assert.match(m[1], /^https:\/\/[^/]*(zite\.so|zite\.com|fillout\.com)\//, "Lab booking URL host");
    assert.ok(page.includes(`href="${m[1]}" target="_blank" rel="noopener noreferrer"`), "Lab no-JS fallback link missing or unsafe");
  }
  }
});

// ---- Two languages ----

const visible = (page) => page.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
const HANGUL = /[\uac00-\ud7a3]/;

test("every Korean page is marked lang=ko and its heading is in Korean", () => {
  for (const r of KO_ROUTES) {
    const page = html(r);
    assert.match(page, /<div lang="ko"[^>]*data-locale="ko"/, `/${r} wrapper not lang=ko`);
    assert.match(page, /document\.documentElement\.lang=\\?"ko\\?"|document\.documentElement\.lang="ko"/, `/${r} does not set html lang`);
    const h1 = page.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "";
    // The Lab keeps its brand name "WAiFF Lab"; everything else must be Hangul.
    if (r !== "ko/lab") assert.ok(HANGUL.test(h1), `/${r} h1 not Korean: ${h1.replace(/<[^>]+>/g, "")}`);
  }
  for (const r of PAGES) assert.match(html(r), /<div lang="en"[^>]*data-locale="en"/, `/${r} wrapper not lang=en`);
});

test("language switch links to the same page in the other language", () => {
  for (const p of PAGES) {
    const en = html(p);
    const ko = html(p ? `ko/${p}` : "ko");
    const enPath = p ? `/${p}/` : "/";
    const koPath = p ? `/ko/${p}/` : "/ko/";
    assert.ok(en.includes(`href="${koPath}"`) && /data-lang-switch="ko"/.test(en), `/${p} has no switch to ${koPath}`);
    assert.ok(ko.includes(`href="${enPath}"`) && /data-lang-switch="en"/.test(ko), `${koPath} has no switch to ${enPath}`);
  }
});

test("hreflang alternates point at both languages", () => {
  for (const p of PAGES) {
    const page = html(p ? `ko/${p}` : "ko");
    assert.match(page, /<link rel="alternate" hrefLang="en"/i, `/ko/${p} lacks hreflang en`);
    assert.match(page, /<link rel="alternate" hrefLang="ko"/i, `/ko/${p} lacks hreflang ko`);
  }
});

test("Korean pages link internally to Korean pages", () => {
  const leaks = /href="\/(about|categories|how-to-enter|submit|faq|dates|lab|contact|privacy|terms)\/"/g;
  for (const r of KO_ROUTES) {
    // Strip the language switch, which deliberately links to English.
    const page = html(r).replace(/<a[^>]*data-lang-switch="en"[^>]*>[\s\S]*?<\/a>/g, "");
    const found = page.match(leaks);
    assert.ok(!found, `/${r} links to English pages: ${found?.join(", ")}`);
  }
});

test("Korean pages show no leftover English interface labels", () => {
  const english = /\b(Submit your film|Explore the festival|How to enter|Important dates|Read the steps|Entry Terms|Privacy Policy|Get in touch|Frequently asked|Book a session|Open the entry form)\b/;
  for (const r of KO_ROUTES) {
    const text = visible(html(r));
    assert.ok(!english.test(text), `/${r} shows "${text.match(english)?.[0]}"`);
  }
});

test("sitemap lists both languages", () => {
  const xml = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  for (const r of ROUTES) assert.ok(xml.includes(`/${r ? r + "/" : ""}</loc>`), `sitemap missing /${r}`);
});
