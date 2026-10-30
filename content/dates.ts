/**
 * Key dates, Seoul time (KST, UTC+9).
 *
 * status:
 *   "confirmed"   shown as final
 *   "provisional" shown with a "Provisional" label
 *   "tba"         shown as "To be announced"; leave `date` empty
 */
export type FestivalDate = {
  /** Stable key used by the home page; do not translate. */
  key: "open" | "review" | "close" | "shortlist" | "winners" | "festival";
  label: string;
  /** ISO date, or a "start/end" pair for a range. */
  date?: string;
  status: "confirmed" | "provisional" | "tba";
  detail?: string;
};

export const dates: FestivalDate[] = [
  {
    key: "open",
    label: "Entries open",
    date: "2026-12-01",
    status: "provisional",
    detail: "The submission form opens.",
  },
  {
    key: "review",
    label: "Selection committee review",
    status: "provisional",
    detail: "Rolling. Entries are reviewed as they arrive, from December.",
  },
  {
    key: "close",
    label: "Entries close",
    date: "2027-03-31",
    status: "provisional",
    detail: "Last day to submit.",
  },
  { key: "shortlist", label: "Shortlist announced", status: "tba" },
  { key: "winners", label: "Winners announced", status: "tba" },
  {
    key: "festival",
    label: "Festival in Seoul",
    date: "2027-04-15/2027-04-17",
    status: "provisional",
  },
];
