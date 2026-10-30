# Operator handover — festival test website

Date: 28 October 2026 · Build status: passes typecheck, lint, static export and 15 automated checks.

## What exists

Ten public pages plus a 404, exported as plain HTML to `out/`:

| Route | Purpose | State |
|---|---|---|
| `/` | Hero, key facts, festival summary, category index, entry CTA | Complete |
| `/about/` | Festival positioning | Mission, objectives and organiser pending |
| `/categories/` | The 8 categories and awards from the operations base | Descriptions and running times pending |
| `/how-to-enter/` | Four steps, screening-link guidance | Technical requirements pending |
| `/submit/` | Original Fillout form `g1196pxKY4us`, eligibility summary | Live embed; contact pending |
| `/faq/` | 9 questions, accordion | 2 answers pending (changes/withdrawal, fees) |
| `/dates/` | Timeline, Seoul time | Dates marked provisional |
| `/contact/` | Contact, Jury Room note | Email pending |
| `/privacy/` | Privacy Policy outline, 15 sections | All text pending counsel |
| `/terms/` | Entry Terms outline, 14 sections | All text pending counsel |

A red "Test site · not public · content not final" bar shows on every page until `NEXT_PUBLIC_SITE_ENV=production`.

## Integration values in use

| Variable | Value | Verified? |
|---|---|---|
| `NEXT_PUBLIC_FILLOUT_FORM_ID` | `g1196pxKY4us` (WAIFF-SEL-2027 Creator Intake) | ID from the platform handover; embed URL confirmed in the built page. Live load not tested from here (sandbox cannot reach fillout.com) |
| `NEXT_PUBLIC_JURY_ROOM_URL` | `https://airtable.com/appdSfdAy414Bz0ZB/pagj3RxFr2z77MNgI` (Watch and score) | **Not verified.** Built from base + page ID. Open it once signed in; if it doesn't land on Jury Room, paste the URL from the browser bar instead |
| `NEXT_PUBLIC_TEAM_CENTER_URL` | `https://airtable.com/appdSfdAy414Bz0ZB/pagwBYUhU2yChomNY` (Overview) | **Not verified**, same as above |
| `NEXT_PUBLIC_SITE_URL` | `https://www.aironi.com` | aironi.com DNS checked 28 Oct: Namecheap BasicDNS, no web records, Google Workspace MX (keep) |
| `NEXT_PUBLIC_SHOW_STAFF_LINK` | `true` (Save, 28 Oct) | — |

## Still needed from the festival

1. Confirm the two Airtable URLs open the right interfaces.
2. Public contact email.
3. Organiser entity for the About page (tied to the open counsel question on data controller).
4. Counsel-approved Privacy Policy and Entry Terms, plus the final eligibility wording. The privacy text should cover the website host and Fillout's iframe as processors of technical request data.
5. Category descriptions and running-time limits; the four genre options alignment is a Fillout-side task already on the list.
6. Logo, Open Graph image, any photography with rights.
7. Decision on access control for the staging address (below).
8. Domain decided 28 Oct: aironi.com. Hosted at www.aironi.com via a Namecheap CNAME to Cloudflare Pages; the bare domain would need nameservers moved to Cloudflare. Go-live steps: https://claude.ai/artifact/LDH3QLGQAkL4FKgDcmWwez

## Staging access control

`noindex` keeps search engines out but does not stop people with the link. Options, in order of effort:

- Keep the address unpublished and short-lived (weakest).
- Cloudflare Access (Zero Trust, free tier) in front of the Pages project, allowing named emails. Whether this works on a custom hostname whose DNS is at Wix rather than Cloudflare needs checking; it does work on the `pages.dev` address. **Unverified — check Cloudflare's current docs before relying on it.**
- Put the subdomain's DNS on Cloudflare (bigger change; affects Wix setup).

## End-to-end acceptance test (needs you)

Do not mark this passed until you confirm steps 6–8.

1. Deploy to the staging address.
2. Open `/submit/` and confirm the form is the original (Fillout editor → Share → the ID in the URL is `g1196pxKY4us`).
3. In Fillout, open the form for a short window.
4. Submit one entry through the website's embedded form.
5. Film title: **Website test (delete)**.
6. In Team Center, confirm the entry arrived with the required fields.
7. In Make, confirm M-INTAKE-00 and M-INTAKE-01 ran cleanly for it.
8. Delete the test entry and its creator, consent and audit rows as for previous QA; close the form.
9. Reload `/submit/` and check Fillout's closed message sits cleanly in the page.
10. On a computer and an iPad, click Jury Room and (temporarily enabled) Staff sign-in; confirm each opens in a new tab and Airtable asks for sign-in.

## Manual checklist

- [ ] All routes load on desktop, tablet, phone (automated overflow check passed at 1440, 820, 390 px)
- [ ] Mobile menu opens, closes on Escape and on navigation (passed)
- [ ] Keyboard: Tab reaches skip link first, then nav; focus ring visible
- [ ] Form works on phone (Fillout's responsibility; test during step 4)
- [ ] Jury Room note visible beside every Jury Room link (passed)
- [ ] No pending panel left before public launch
- [ ] `NEXT_PUBLIC_SITE_ENV=production` set only at public launch; then the test bar and noindex disappear

## Update 29 Oct 2026

- Live at https://www.aironi.com (Cloudflare Pages project `aironi-festival`, CNAME `www` at Namecheap → `aironi-festival.pages.dev`). Bare aironi.com not served.
- Deploy method that works: Wrangler from Terminal with a Pages-only API token (`CLOUDFLARE_API_TOKEN`) and `CLOUDFLARE_ACCOUNT_ID`, run inside the unzipped site folder: `npx wrangler pages deploy . --project-name aironi-festival`. The dashboard drag-and-drop stalled.
- Hero image added (couple, AI-generated still supplied by Save): `public/images/hero-wide-*.webp` (2.39:1) and `hero-tall-*.webp` (4:5 phones), social preview `public/og-image.jpg`. Rights to confirm: image tool licence allows commercial use; no resemblance to a real person.
- End-to-end test: entry "Playing all day" reached Airtable; assigned by M-JURY-01 to three committee members on 29 Oct. Test entry, its assignments and the test roster settings must be deleted/reset after the jury test.
- Open from QA review: Road to Cannes / prize section (needs confirmation for Seoul 2027), Jury and Partners pages, bolder type, official WAIFF logo per licence, Korean version, Fillout email-match validation.
- 30 Oct: Screening room (staff player, block blkBSaPHDGggRnrCy) rebuilt with in-element queue tabs (To triage / Pass / Hold / Reject / All, by triage_decision) and a yellow warning strip (admin_review_reason until admin_review_status = resolved; video_url_validation_status when not valid). Element now reads admin_review_reason, admin_review_status, video_url_validation_status, video_check_notes. Published. The jury copy (blkOdDBIkEL1iYcc3) still runs the previous source; same Player, untouched.
- Open (UI only, Save): the Screening room page's own "Ready for triage" view hides held and decided entries before they reach the player; make "All records" the default view or remove the page views' filters.
- 30 Oct: 5 dummy entries loaded for triage/jury testing (titles start "[DUMMY]"): submissions recoFX6iMCJi35UUb, recsgJDIkjZ3FTV0H, rec3OqkwRUGaHNcLS, recUH3yPxFBadiaI3, rec8sUsBZoKdQFbU5; creators (is_test_record = true) rec39VYD1Zte5vMqq, recVk9dui2Iiikk0K, recfAZZBWjETH5Fbq, recHAnt76dlJr3DsH, recsjFbSZVZ1gOghK. Films are public Blender open movies (YouTube x3, Vimeo x1) plus one deliberately broken link. client_idempotency_key left empty so A-COMMS-02 queued no receipts. Delete all of these, plus any jury_assignments/jury_scores/audit rows they generate, before real intake.
- 30 Oct: Team Center Overview rebuilt as a new page pagl8UXmGaSsmPMGD (pages can't be edited via API): action counts (to triage, on hold, broken links, guardian consent waiting, passed films short of reviewers, data requests due ≤3 days), intake (all entries, entries per day, by category, entrants by country), jury (assignments by status with round dropdown, conflicts, panel without undertaking), unsent emails, and the three system-health counts. Old Overview pagwBYUhU2yChomNY still exists and must be deleted by Save. Website Staff sign-in now points to the new page (site build v3).
- 30 Oct: Lab module made live (free, public, Fillout booking form). See docs/LAB.md. Team Center pages: Lab · Workshops pagnoR5RoWKThQReJ, Lab · Bookings pagUZhi6c9rEulWNv, Setup · Lab pagPfc1kSYsOT8K8t. Automation A-LAB-01 wflK5V6kmS7JubnfY (off until Save switches it on). Placeholder workshops recRARvT5PyiqMm4x, recDcJdMvIeqmPWDs. Site build v4 adds /lab; Lab form ID still to come from Save.
- 30 Oct: Lab booking form built as a Zite app (https://r7n3my3uio.zite.so) saving to Airtable workshop_bookings. Site build v5 embedded it in an iframe, which showed blank on the live site; v6 replaces it with a "Book a Lab session" button opening the app in a new tab (`NEXT_PUBLIC_LAB_BOOKING_URL`). Still to test: one preview booking reaching workshop_bookings; then switch on A-LAB-01 and re-test for 'confirmed'; delete both test rows. Pasting is blocked in the app's "Confirm your email" field (Zite AI's choice).
- 30 Oct: Intake form restyled in Fillout (dark theme, Manrope, vermilion accent); country question 8n4P now South Korea first + full country list, 'Other' removed, same question ID. Site build v7: /submit uses Fillout's official slider embed (same form g1196pxKY4us, opens from the right via 'Open the entry form'), chosen by Save; replaces the inline embed.
- 30 Oct: Site build v8: Lab booking opens in a site-built slide-in panel from the right (LabSliderClient: iframe of the public Zite app, Esc/close/backdrop, new-tab link in panel header, no-JS link). Intake test 'Test Film (Delete)' recLcU7SW1xCxVHdX: France recorded, flagged needs_review for email mismatch → Fillout-side email-match validation still missing on the intake form (question hnqs must equal kDL3). Delete the test record.
- 30 Oct: Site build v9: full Korean version at /ko/ (all 11 pages), EN / 한국어 switch in header and mobile header, hreflang alternates, sitemap for both languages, Korean fonts (Noto Sans KR / Noto Serif KR, OFL, unicode-range). Korean text in content/ko/ drafted by Claude using terms from worldaifilmfestival.kr (세계 AI 영화제 서울, 공모, 심사위원); needs native-speaker review. Jury Room and Team Center stay English (Airtable). Forms: same intake form in both languages; NEXT_PUBLIC_FILLOUT_KO_PARAMS and NEXT_PUBLIC_LAB_BOOKING_URL_KO empty until Korean form versions are set up and tested, Korean pages say the form is in English meanwhile.
- 30 Oct (evening): Source now in GitHub: AironiOps/Festival-Website (branch main; Claude GitHub App installed on the org). Plans confirmed: Make Core (10,000 ops/month, webhook queue 667, auto-purchase off), Airtable Free (1,000 records/base, 1,000 API calls and 100 automation runs per month: launch blocker; upgrade before entries open). M-LINK-01 and M-JURY-01 paused to save Airtable API quota until real entries. New scenario M-OPS-01 Missing-entry watchdog (Make 8284408), hourly: Fillout API (read-only key connection) vs Airtable client_idempotency_key in one call; alerts via Make's built-in "Send an Email to a Team Member" to tech@aironi.com (Gmail connection to founder@aironi.com fails with "Connection closed unexpectedly", left unused). Test over 4 days flagged entries missing in Airtable (likely the 28 Oct test entries that failed on the "Documentary" select value). Duplicate base for tests: WAIFF-SEL-2027 [TEST] appWBihHHsenXBnJv.
