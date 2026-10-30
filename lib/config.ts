/**
 * Integration settings, read once at build time from NEXT_PUBLIC_* variables.
 * See .env.example. Nothing here is secret: it all appears in page source.
 */

/**
 * The original intake form. Make.com recognises its questions by internal ID,
 * and a duplicated form gets new IDs, so submissions from a copy would not be
 * processed. The build stops if a different ID is configured, unless
 * ALLOW_FILLOUT_FORM_CHANGE=true is set deliberately (for a future edition).
 */
export const CANONICAL_FILLOUT_FORM_ID = "g1196pxKY4us";

const FILLOUT_ID_PATTERN = /^[A-Za-z0-9]{8,32}$/;

function clean(value: string | undefined): string | null {
  const v = (value ?? "").trim();
  return v.length > 0 ? v : null;
}

function readFormId(): string | null {
  const raw = clean(process.env.NEXT_PUBLIC_FILLOUT_FORM_ID);
  if (!raw) return null;
  // Accept a full share URL by mistake and take the ID from its last segment.
  const id = raw.includes("/") ? raw.replace(/\/+$/, "").split("/").pop() ?? "" : raw;
  if (!FILLOUT_ID_PATTERN.test(id)) {
    throw new Error(`NEXT_PUBLIC_FILLOUT_FORM_ID "${raw}" is not a Fillout form ID.`);
  }
  if (id !== CANONICAL_FILLOUT_FORM_ID && process.env.ALLOW_FILLOUT_FORM_CHANGE !== "true") {
    throw new Error(
      `NEXT_PUBLIC_FILLOUT_FORM_ID is "${id}" but the original intake form is "${CANONICAL_FILLOUT_FORM_ID}". ` +
        "A copied form has different question IDs and breaks submission processing. " +
        "If this change is intentional, set ALLOW_FILLOUT_FORM_CHANGE=true.",
    );
  }
  return id;
}

/**
 * The Lab booking app: a separate Zite (Fillout) app that writes to the
 * workshop_bookings table. Must be an https link on a Zite or Fillout host,
 * and never the film intake form.
 */
const LAB_HOSTS = /(^|\.)(zite\.so|zite\.com|fillout\.com)$/i;
function readLabUrl(name = "NEXT_PUBLIC_LAB_BOOKING_URL", value = process.env.NEXT_PUBLIC_LAB_BOOKING_URL): string | null {
  const raw = clean(value);
  if (!raw) return null;
  const url = readHttpsUrl(name, raw)!;
  const host = new URL(url).hostname;
  if (!LAB_HOSTS.test(host)) {
    throw new Error(`${name} host "${host}" is not a Zite or Fillout address.`);
  }
  if (url.includes(CANONICAL_FILLOUT_FORM_ID)) {
    throw new Error(`${name} must be the Lab booking app, not the film intake form.`);
  }
  return url;
}

/**
 * Extra URL parameters that make the entry form open in Korean, as Fillout
 * expects them, e.g. "language=ko". Empty means the Korean pages open the
 * form in its default language and say so. Only plain key=value pairs.
 */
function readParams(name: string, value: string | undefined): Record<string, string> | null {
  const raw = clean(value);
  if (!raw) return null;
  const out: Record<string, string> = {};
  for (const pair of raw.replace(/^\?/, "").split("&")) {
    const [k, v = ""] = pair.split("=");
    if (!/^[A-Za-z0-9_-]{1,40}$/.test(k) || !/^[A-Za-z0-9_-]{1,40}$/.test(v)) {
      throw new Error(`${name} must look like "language=ko" (letters, digits, - and _ only).`);
    }
    out[k] = v;
  }
  return out;
}

function readHttpsUrl(name: string, value: string | undefined): string | null {
  const raw = clean(value);
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`${name} is not a valid URL.`);
  }
  if (url.protocol !== "https:") throw new Error(`${name} must start with https://`);
  // Interface links never need credentials; refuse anything that looks like one.
  const suspicious = /(token|key|secret|password|signature|auth)=/i;
  if (url.username || url.password || suspicious.test(url.search)) {
    throw new Error(`${name} appears to contain a credential. Public variables must not hold secrets.`);
  }
  return url.toString();
}

const siteEnv = clean(process.env.NEXT_PUBLIC_SITE_ENV) === "production" ? "production" : "staging";

const intakeFormId = readFormId();

export const config = {
  siteUrl: (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/+$/, ""),
  siteEnv,
  isProduction: siteEnv === "production",
  filloutFormId: intakeFormId,
  labBookingUrl: readLabUrl(),
  /** Korean version of the Lab booking app, e.g. the same address with ?lang=ko. Empty = use labBookingUrl. */
  labBookingUrlKo: readLabUrl("NEXT_PUBLIC_LAB_BOOKING_URL_KO", process.env.NEXT_PUBLIC_LAB_BOOKING_URL_KO),
  /** URL parameters that open the entry form in Korean. Empty = not set up yet. */
  filloutKoParams: readParams("NEXT_PUBLIC_FILLOUT_KO_PARAMS", process.env.NEXT_PUBLIC_FILLOUT_KO_PARAMS),
  showLab: clean(process.env.NEXT_PUBLIC_SHOW_LAB) === "true",
  juryRoomUrl: readHttpsUrl("NEXT_PUBLIC_JURY_ROOM_URL", process.env.NEXT_PUBLIC_JURY_ROOM_URL),
  teamCenterUrl: readHttpsUrl("NEXT_PUBLIC_TEAM_CENTER_URL", process.env.NEXT_PUBLIC_TEAM_CENTER_URL),
  showStaffLink: clean(process.env.NEXT_PUBLIC_SHOW_STAFF_LINK) === "true",
} as const;
