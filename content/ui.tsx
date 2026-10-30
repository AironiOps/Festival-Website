import type { ReactNode } from "react";

/**
 * Interface text for English pages: labels, headings, buttons and short
 * paragraphs that are not part of the festival's editable content files.
 * The Korean version is content/ko/ui.tsx and must have the same keys.
 *
 * Entries written as functions take `A`, a link component that adds the
 * language prefix automatically: A({ href: "/terms/", children: "…" }).
 */
export type LinkComp = (props: { href: string; children: ReactNode }) => ReactNode;

export const ui = {
  chrome: {
    skip: "Skip to content",
    testBar: "Test site · not public · content not final",
    home: "home",
    submitShort: "Submit",
    submitLong: "Submit your film",
    menu: "Menu",
    close: "Close",
    language: "Language",
    mainNav: "Main",
    footerFestival: "Festival",
    footerLegal: "Legal",
    footerPeople: "Jurors & staff",
    rights: "All rights reserved.",
    zone: "Seoul · KST UTC+9",
    pending: "Pending",
  },
  links: {
    juryRoom: "Jury Room",
    juryNote: "For invited jurors. Please use a computer or tablet. Phones are not supported.",
    staff: "Staff sign-in",
    newTab: " (opens in a new tab)",
    staffNewTab: " (Team Center, opens in a new tab)",
    notConfigured: "link not configured",
    englishOnly: null as string | null,
  },
  home: {
    call: "Call for entries",
    heroLines: ["World AI", "Film Festival"] as [string, string],
    keyFacts: "Key facts",
    factOpen: "Entries open",
    factClose: "Entries close",
    factFestival: "Festival",
    factOpenTo: "Open to",
    allCountries: "All countries",
    tba: "TBA",
    factsNote: "Dates are provisional and shown in Seoul time.",
    explore: "Explore the festival",
    festivalLabel: "The festival",
    festivalHeading: (
      <>
        Films made with AI, <em className="text-celadon">judged as cinema.</em>
      </>
    ),
    pillars: [
      ["International", "Entries are accepted from every country. Creators work in any language and genre."],
      ["Eight categories", "From advertisements and music videos to feature films, micro series and vertical work."],
      ["Blind selection", "A selection committee and a festival jury score each film without seeing who made it."],
    ] as [string, string][],
    categoriesLabel: "Categories",
    allCategories: "All category details →",
    enterLabel: "How to enter",
    enterHeading: "Upload to YouTube or Vimeo. Send us the link.",
    enterBody:
      "Your film stays on your own channel. The submission form takes your details, your film link and your consents, and the festival takes it from there.",
    readSteps: "Read the steps",
  },
  about: {
    title: "About",
    slate: "About the festival",
    mission: "Mission",
    scene: "Scene",
    objectives: "Objectives",
    organiser: "Organiser",
  },
  categories: {
    title: "Categories",
    slate: (n: number) => `${n} competition categories`,
    lede: "Each film is entered in one category. Every category has its own award.",
    cat: "Cat.",
    pendingDescription: "Description pending approval.",
    formNameLabel: null as string | null,
    footnote:
      "The submission form lists the categories you can choose from. If this page and the form ever differ, the form and the Entry Terms apply.",
  },
  howToEnter: {
    title: "How to enter",
    slate: "Entry guide",
    lede: "Four steps. Your film stays on your own YouTube or Vimeo channel; this website never hosts or stores entries.",
    take: (i: number, n: number) => `Take ${i} of ${n}`,
    steps: (A: LinkComp) => [
      {
        t: "Check you can enter",
        b: (
          <>
            Read the <A href="/terms/">Entry Terms</A> and the <A href="/categories/">categories</A>. Entry is open to creators in
            every country aged 14 or over. If you are under 19, a parent or guardian must consent.
          </>
        ),
      },
      {
        t: "Prepare your film and its link",
        b: (
          <>
            Upload the finished film to YouTube as an <strong>unlisted</strong> video, or to Vimeo. Check that the link plays in a
            private browser window without signing in. Keep it online and unchanged for the whole judging period.
          </>
        ),
      },
      {
        t: "Fill in the submission form",
        b: (
          <>
            Go to <A href="/submit/">Submit your film</A>. The form asks for your details, your country of residence, the film&apos;s
            information and link, and your consents. Your answers go directly to the festival&apos;s form provider.
          </>
        ),
      },
      {
        t: "See your confirmation",
        b: (
          <>
            When you submit, the form shows a confirmation on screen. The festival will contact you at the email address you gave if
            anything else is needed.
          </>
        ),
      },
    ],
    linksLabel: "Screening links",
    links: [
      "Only YouTube and Vimeo links are accepted. Links to file-sharing services or downloads are not.",
      "Reviewers watch through the festival's own player, which hides the channel name and title so judging stays blind.",
    ],
    linksPending: "Final technical requirements for screening links (resolution, running time, subtitles) to be confirmed.",
  },
  submit: {
    title: "Submit your film",
    description: "Submit a film using the official entry form.",
    slate: "Official entry form",
    lede: "Have your YouTube or Vimeo link ready.",
    eligibilityLabel: "Eligibility · working summary",
    eligibility: [
      "Open to creators in every country.",
      "Creators under 14 cannot enter.",
      "Creators aged 14 to 18 need a parent or guardian's consent before the entry goes forward.",
    ],
    summaryOnly: (A: LinkComp) => (
      <>
        Summary only. The <A href="/terms/">Entry Terms</A> govern; their final wording is being approved.
      </>
    ),
    beforeLabel: "Before you start",
    before: (A: LinkComp) => (
      <>
        Read the <A href="/terms/">Entry Terms</A> and the <A href="/privacy/">Privacy Policy</A>. They explain how the festival uses
        what you submit.
      </>
    ),
    helpLabel: "Need help?",
    readFaq: "Read the FAQ",
    closed: (A: LinkComp) => (
      <>
        If the form says it is closed, entries are not being accepted at the moment. Check the <A href="/dates/">important dates</A>.
      </>
    ),
    formHeading: "Submission form",
    formSlate: "Official entry form",
    formIntro: "The form opens in a panel over this page. Close it at any time to come back here.",
    formButton: "Open the entry form",
    formRegion: "Film submission form",
    formLanguageNote: null as string | null,
    noscript: "The submission form needs JavaScript.",
    openDirect: "Open the form directly",
    footnote: "The form is provided by Fillout. Your answers go directly to the festival; this website does not see or keep them.",
    placeholderTitle: "Integration placeholder",
    placeholderBody: "The submission form is not connected on this build. Set NEXT_PUBLIC_FILLOUT_FORM_ID to the original form ID.",
  },
  faq: {
    title: "FAQ",
    slate: "Questions",
    heading: "Frequently asked",
    lede: "Short answers. Where an answer and the Entry Terms differ, the Entry Terms apply.",
    stuck: (A: LinkComp) => (
      <>
        Still stuck? <A href="/contact/">Contact the festival</A>.
      </>
    ),
  },
  dates: {
    title: "Important dates",
    slate: "Schedule · Seoul time (KST)",
    lede: "Dates marked provisional may still move. Final dates are confirmed here.",
    allTba: "Dates to be announced.",
    provisional: "Provisional",
    tba: "To be announced",
    ongoing: "Ongoing",
  },
  lab: {
    title: "Lab",
    slate: "Workshops · Masterclasses",
    how: "How booking works",
    step: (i: number) => `Step ${i}`,
    book: "Book a session",
    privacy: (A: LinkComp) => (
      <>
        Your booking is handled under the festival&apos;s <A href="/privacy/">Privacy Policy</A>. Entering a film is separate: see{" "}
        <A href="/submit/">Submit your film</A>.
      </>
    ),
    footnote: "The form is provided by Zite (Fillout) and saves to the festival's booking records. This website does not see or keep your answers.",
    embedSlate: "Free · places limited · waitlist when full",
    embedIntro: "The booking form opens in a panel over this page. Close it at any time to come back here.",
    button: "Book a Lab session",
    region: "Lab workshop booking",
    openNewTab: "Open in a new tab",
    closePanel: "Close booking form",
    frameTitle: "WAiFF Lab workshop booking form",
    openForm: "Open the booking form",
    soonTitle: "Bookings open soon",
    soonBody: "The booking form will appear here once the first workshops are announced.",
    formLanguageNote: null as string | null,
  },
  contact: {
    title: "Contact",
    slate: "Contact",
    heading: "Get in touch",
    lede: "Questions about entering, your submission or the festival.",
    email: "Email",
    noFiles: "Don't send film files by email; use your YouTube or Vimeo link.",
    jurors: "Jurors",
  },
  legal: {
    lastUpdated: (d: string) => `Last updated ${d}`,
    draft: "Draft structure",
    outlineOnly:
      "This page shows the outline only. The approved text will be published here once counsel signs it off. Nothing on this page is binding yet.",
    contents: "Contents",
    sectionPending: "Approved text pending.",
    translationNote: null as string | null,
  },
};

export type UI = typeof ui;
