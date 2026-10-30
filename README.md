# WAiFF Seoul 2027 — public website

A static front door for the festival, hosted at www.aironi.com. It explains the festival, embeds the **original** Fillout submission form, and links out to the Airtable Jury Room and (optionally) Team Center.

It stores nothing. There is no server, no API route, no database and no analytics. Entrant answers go from the entrant's browser straight to Fillout; Airtable handles juror and staff sign-in.

```
Visitor ──► static site (this repo, ./out)
              ├─ /submit  ── iframe ──► Fillout form g1196pxKY4us ──► Make ──► Airtable
              ├─ footer   ── link ────► Airtable Jury Room (jurors)
              └─ footer   ── link ────► Airtable Team Center (staff, off by default)
```

## The one rule

**Use the existing Fillout form, never a copy.** Make recognises the form's questions by internal ID; a duplicate has different IDs and its entries are not processed.

The build enforces this. `lib/config.ts` holds `CANONICAL_FILLOUT_FORM_ID = "g1196pxKY4us"`. If `NEXT_PUBLIC_FILLOUT_FORM_ID` is set to anything else, `npm run build` stops with an error. For a future edition with a genuinely new form, set `ALLOW_FILLOUT_FORM_CHANGE=true` and update the constant on purpose.

## 1. Install

Node 20.9 or newer (22 recommended, see `.nvmrc`).

```bash
npm install
cp .env.example .env.local
```

## 2. Local development

```bash
npm run dev          # http://localhost:3000
```

## 3. Build

```bash
npm run build        # writes the static site to ./out
npm start            # serves ./out on http://localhost:3000
```

## 4. Test

```bash
npm run verify       # typecheck + lint + build + automated checks
npm test             # checks only (needs an existing ./out)
```

The checks in `tests/static-export.test.mjs` confirm: every page is exported; the submit page uses exactly `g1196pxKY4us` and no other form ID appears anywhere; there is no `<form>` of our own; the Jury Room link opens in a new tab with `rel="noopener noreferrer"` and shows the device note; the staff link follows its setting; no Airtable API, Make webhook, secret, analytics, browser storage, record ID or score data is in the source or output; "Aironi" and banned terms never appear in visible text; staging pages carry `noindex`; legal pages are marked unapproved.

## 5. Editing text

All copy lives in `content/`. No component changes needed.

| File | What it holds |
|---|---|
| `content/festival.ts` | Name, tagline, description, About sections, organiser, contact email, copyright |
| `content/categories.ts` | The 8 categories and awards (matching the operations base) |
| `content/dates.ts` | Key dates, each `confirmed`, `provisional` or `tba` |
| `content/faq.ts` | Questions and answers |
| `content/legal.ts` | Privacy Policy and Entry Terms structure; paste approved text into each `body` |
| `content/navigation.ts` | Header and footer menus |
| `content/lab.ts` | Lab page text |
| `content/ui.tsx` | Interface text: buttons, labels, page headings, short paragraphs |

**Korean.** The Korean site lives at `/ko/` and its text is in `content/ko/`, one file per English file with the same structure. Change both when you change a fact. Dates and category order come from the English files, so edit dates only in `content/dates.ts`. Korean text was drafted in English-first form and needs a native-speaker review before launch. The **EN / 한국어** switch in the header links each page to its counterpart; the address itself carries the language, so nothing is stored in the visitor's browser.

**Korean forms.** Both forms stay the same forms in both languages:
- Entry form: once Fillout translations are set up on the original form `g1196pxKY4us` and tested, set `NEXT_PUBLIC_FILLOUT_KO_PARAMS` to the parameter that opens it in Korean (for example `language=ko`). Never create a separate Korean copy of the form.
- Lab booking: once the Zite app shows Korean for a parameter such as `?lang=ko`, set `NEXT_PUBLIC_LAB_BOOKING_URL_KO` to that full address.
Until set, Korean pages open the form in English and say so.

**Pending text.** Anything not yet approved is written as `pending("note")`. It renders in a dashed red "Pending" panel so nobody mistakes it for final copy. Replace it with a plain string once approved. Legal sections with `body: null` render the same way; set `approved: true` and `lastUpdated` when counsel's text is in.

Every change needs a rebuild and redeploy. With Git-connected hosting, pushing to `main` does that.

## 6. Changing images

There are no photographs yet; the hero is drawn in CSS. Put supplied images in `public/` and reference them as `/filename.jpg`. Use only images the festival has rights to.

## 7. Updating colours and fonts

All colours and font stacks are tokens at the top of `app/globals.css` (`--ink`, `--paper`, `--celadon`, …). Change them there. Fonts are self-hosted from npm (`@fontsource`, SIL Open Font License), so no request goes to Google.

## 8. Installing the Fillout form

Already done: `NEXT_PUBLIC_FILLOUT_FORM_ID=g1196pxKY4us`. The site uses Fillout's official React embed (`@fillout/react`, `FilloutStandardEmbed`), which loads `https://embed.fillout.com/t/g1196pxKY4us` in an iframe. No submit or page-change handlers are attached, so the site never sees answers. If the ID is removed, `/submit` shows a labelled placeholder with no inputs.

When the form is closed in Fillout, Fillout's own closed message shows inside the frame. The site does not work around it.

## 9. Changing the Jury Room URL

Set `NEXT_PUBLIC_JURY_ROOM_URL`. Must be `https://`; anything with a token-like query parameter is refused at build time.

## 10. Changing the Team Center URL

Set `NEXT_PUBLIC_TEAM_CENTER_URL`.

## 11. Staff sign-in on or off

`NEXT_PUBLIC_SHOW_STAFF_LINK=true` shows "Staff sign-in" in the footer; anything else hides it. Default is off.

## 12. Deploying (Cloudflare Pages, preferred)

Check the plan's terms permit the festival's use before going live.

**Git-connected (recommended)**
1. Push this folder to its own repository, e.g. `AironiPlatform/Festival-Website`. Keep it separate from any backend repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset: **Next.js (Static HTML Export)**. Build command `npm run build`. Output directory `out`. Production branch `main`.
4. Settings → Environment variables: add every line from `.env.example` (Production and Preview).
5. Save and deploy. Cloudflare gives a `<project>.pages.dev` address.

**Direct upload (no Git)**
```bash
npm run build
npx wrangler pages deploy out --project-name waiff-seoul-test
```

**Vercel Pro** (alternative; not Hobby, which is non-commercial only): import the repo, framework Next.js, output is detected from `output: "export"`, add the same variables. Do not enable Web Analytics or Speed Insights.

## 13. Connecting aironi.com (Namecheap DNS)

Checked 28 Oct 2026: `aironi.com` uses Namecheap BasicDNS (`dns1/dns2.registrar-servers.com`), has no website records, and receives mail through Google Workspace (five `aspmx.l.google.com` MX records plus a `google-site-verification` TXT). Leave all of those alone.

Cloudflare Pages can only serve the bare `aironi.com` if the whole domain's DNS moves to Cloudflare. A subdomain needs just one CNAME at Namecheap. This build therefore lives at **www.aironi.com**.

1. Cloudflare Pages → the project → **Custom domains** → **Set up a custom domain** → `www.aironi.com` → Continue. Do this first; a CNAME created before this step returns error 522.
2. Namecheap → Domain List → aironi.com → **Manage** → **Advanced DNS** → **Add new record**: Type `CNAME Record`, Host `www`, Value `<project>.pages.dev` (the exact address Cloudflare shows), TTL Automatic. Save.
3. Back in Cloudflare, wait until the domain shows **Active** (certificate issued; usually minutes, can take longer).
4. Optional: send the bare domain to www. In Namecheap Advanced DNS add a `URL Redirect Record`, Host `@`, Value `https://www.aironi.com/`, Permanent (301). Namecheap only documents this for `http://aironi.com`; whether `https://aironi.com` redirects cleanly is unverified, so test it in a browser.

To serve the bare domain itself later, either move aironi.com's nameservers to Cloudflare (copy every record across first, especially the Google MX and TXT records) or host on Vercel Pro, which accepts an A record at Namecheap.

## 14. Reverting a deployment

Cloudflare Pages → the project → Deployments → pick the last good one → ⋯ → **Rollback to this deployment**. With Git, you can also revert the commit and push.

## 15. Known limitations

- Static only: content changes need a rebuild.
- Third-party form accessibility is Fillout's; it was not audited here.
- No Open Graph image yet (needs a brand asset).
- `noindex` is not access control. A staging address is reachable by anyone who has the URL unless the host adds protection (see HANDOVER).
- Airtable controls who can open the Jury Room and Team Center. Until the Airtable sharing restriction is on, those links are only as private as the interface sharing settings.
