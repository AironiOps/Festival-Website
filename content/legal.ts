/**
 * Legal pages. These hold structure only. Paste counsel-approved text into
 * `body` for each section; while `body` is null the section renders as a
 * labelled placeholder. Set `approved` and `lastUpdated` when final text is in.
 */
export type LegalSection = { heading: string; body: string[] | null };
export type LegalDoc = {
  title: string;
  approved: boolean;
  lastUpdated: string | null;
  intro: string | null;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  approved: false,
  lastUpdated: null,
  intro: null,
  sections: [
    { heading: "Who we are", body: null },
    { heading: "What personal information we collect", body: null },
    { heading: "How we use it", body: null },
    { heading: "Services that process your information", body: null },
    { heading: "The submission form (Fillout)", body: null },
    { heading: "Festival records and judging (Airtable, Make)", body: null },
    { heading: "Emails (Resend)", body: null },
    { heading: "Video hosting (YouTube, Vimeo)", body: null },
    { heading: "Website hosting and technical information", body: null },
    { heading: "Cookies", body: null },
    { heading: "Creators under 19", body: null },
    { heading: "Lab workshop bookings", body: null },
    { heading: "How long we keep information", body: null },
    { heading: "Your rights", body: null },
    { heading: "International transfers", body: null },
    { heading: "Contact and privacy officer", body: null },
  ],
};

export const entryTerms: LegalDoc = {
  title: "Entry Terms",
  approved: false,
  lastUpdated: null,
  intro: null,
  sections: [
    { heading: "The organiser", body: null },
    { heading: "Who may enter", body: null },
    { heading: "Creators under 19", body: null },
    { heading: "Eligible films", body: null },
    { heading: "Use of AI and third-party material", body: null },
    { heading: "Categories", body: null },
    { heading: "How to submit", body: null },
    { heading: "Screening links", body: null },
    { heading: "Judging", body: null },
    { heading: "Awards", body: null },
    { heading: "Rights and permissions", body: null },
    { heading: "Withdrawal and disqualification", body: null },
    { heading: "Liability", body: null },
    { heading: "Governing law", body: null },
  ],
};
