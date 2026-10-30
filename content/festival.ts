import { pending, type Copy } from "./types";

/**
 * Festival identity and site-wide text.
 * Edit the strings below; no component code needs to change.
 */
export const festival = {
  /** Short name used in the header, titles and footer. */
  name: "WAiFF Seoul 2027",
  /** Wordmark split for the header: first part set in the display face. */
  wordmark: { lead: "WAiFF", trail: "Seoul 2027" },
  longName: "World AI Film Festival Seoul 2027",
  city: "Seoul",
  /** One line under the name in the hero. */
  tagline: "An international competition for films made with artificial intelligence.",
  /** Two or three sentences used on the home page and as the meta description. */
  description:
    "WAiFF Seoul 2027 invites filmmakers from every country to submit work made with AI tools. Entries are watched and scored by a selection committee and a festival jury, and the winners are presented in Seoul.",

  /** Who runs the festival. Left pending until counsel confirms the entity. */
  organiser: pending("Organising entity to be confirmed by counsel.") as Copy,

  /** Public contact address. Leave pending until an inbox is confirmed. */
  contactEmail: pending("Public contact address to be confirmed.") as Copy,

  /** Footer copyright holder. */
  copyrightHolder: "WAiFF Seoul",
  copyrightYear: 2026,
};

export const about = {
  mission: pending("Festival mission statement to be supplied.") as Copy,
  sections: [
    {
      heading: "Made with AI, judged as cinema",
      body:
        "The festival is for films where artificial intelligence played a real part in the making: in the images, the sound, the edit or the writing. Films are judged on what reaches the screen. Craft, story and intent count for more than the tools used.",
    },
    {
      heading: "Open to every country",
      body:
        "Entries are accepted from creators anywhere in the world. Each entrant states their country of residence on the submission form.",
    },
    {
      heading: "Selection",
      body:
        "A selection committee watches entries as they arrive and scores them against published criteria. Shortlisted films then go to the festival jury, who choose the winners. Reviewers do not see who made the film while they score it.",
    },
    {
      heading: "Seoul",
      body:
        "The awards are presented at the festival in Seoul. Programme, venue and ticketing details will be published here when they are confirmed.",
    },
  ],
  objectives: pending("Festival objectives to be supplied.") as Copy,
};

/**
 * Hero image. Replace the files in public/images/ (same names) to change it.
 * wide = 2.39:1 for tablets and computers, tall = 4:5 for phones.
 * Use only images the festival has the rights to.
 */
export const heroImage = {
  alt: "A young woman and man on a rooftop at sunset, looking back over their shoulders, city towers behind them.",
  credit: "AI-generated still",
  fallback: "/images/hero-wide-1600.jpg",
  wide: { 1200: "/images/hero-wide-1200.webp", 1600: "/images/hero-wide-1600.webp", 2400: "/images/hero-wide-2400.webp" },
  tall: { 800: "/images/hero-tall-800.webp", 1200: "/images/hero-tall-1200.webp" },
};
