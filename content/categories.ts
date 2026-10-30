/**
 * Competition categories. Names match the category records in the
 * operations base for WAIFF-SEL-2027 (8 categories, as of 28 Oct 2026).
 * The Fillout form remains the authority on what an entrant may select;
 * this page only describes the categories.
 *
 * `award` is the prize for the category. `note` is optional extra guidance.
 * Duration limits and detailed eligibility are pending approval.
 */
export type Category = {
  slug: string;
  name: string;
  /** English name as it appears on the entry form (shown on Korean pages). */
  formName?: string;
  award: string;
  note?: string;
  /** Approved description, or null while it is still pending. */
  description: string | null;
};

export const categoriesPendingNote =
  "Descriptions, running-time limits and category-specific rules are awaiting approval.";

export const categories: Category[] = [
  { slug: "advertisement", name: "Advertisement", award: "Best Advertisement", description: null },
  { slug: "music-video", name: "Music video", award: "Best Music Video", description: null },
  {
    slug: "youth-film",
    name: "Youth film",
    award: "Best Youth Film",
    note: "Made by a creator under 19. Parent or guardian consent applies.",
    description: null,
  },
  { slug: "feature-film", name: "Feature film", award: "Best Feature Film", description: null },
  { slug: "micro-series", name: "Micro series", award: "Best Micro Series", description: null },
  {
    slug: "vertical-mobile",
    name: "Vertical and mobile content",
    award: "Best Vertical and Mobile Content",
    description: null,
  },
  {
    slug: "live-action-short",
    name: "Live action short film",
    award: "Best Live Action Short Film",
    description: null,
  },
  {
    slug: "film-for-youth",
    name: "Film for youth",
    award: "Best Film for Youth",
    note: "Made for a young audience.",
    description: null,
  },
];
