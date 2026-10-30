import { pending, type Copy } from "./types";

/**
 * Lab: free workshops alongside the festival. Workshop titles, dates and seats
 * are managed in Team Center (Lab · Workshops) and appear live in the booking
 * form's workshop picker. This file only holds the page's fixed text.
 */
export const lab = {
  name: "WAiFF Lab",
  tagline: "Free, hands-on sessions for filmmakers working with AI.",
  intro:
    "The Lab runs alongside the festival: practical workshops and masterclasses led by people making films with AI. Sessions are free and open to anyone, whether or not you have entered a film.",
  steps: [
    { t: "Pick a session", b: "Choose a workshop in the booking form. Each one shows its date, time (Seoul) and the seats left." },
    { t: "Book your seat", b: "Seats are confirmed in the order bookings arrive. When a session is full, you join its waitlist." },
    { t: "Look out for your confirmation", b: "The festival confirms your place by email before the session, with joining details." },
  ],
  facts: [
    ["Cost", "Free"],
    ["Open to", "Everyone"],
    ["Format", "In person in Seoul, and online"],
    ["Time zone", "Korea Standard Time (KST)"],
  ] as [string, string][],
  ageRule: pending("Age requirement for Lab sessions to be confirmed by counsel.") as Copy,
  programmeNote: "The programme is being finalised. Sessions are added to the booking form as they are confirmed.",
};
