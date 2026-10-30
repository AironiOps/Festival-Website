import { pending, type Copy } from "./types";

/** Questions and answers for /faq. Pending answers render as labelled placeholders. */
export const faq: { q: string; a: Copy }[] = [
  {
    q: "Who can enter?",
    a: "Creators who have made a film with the help of AI tools. Entry is open to individuals and teams. Full eligibility rules are set out in the Entry Terms.",
  },
  {
    q: "Which countries are eligible?",
    a: "All countries. You will be asked for your country of residence on the form.",
  },
  {
    q: "What ages can take part?",
    a: "Creators aged 14 or over may enter. If you are under 19, a parent or guardian must give consent before your entry goes forward; the festival contacts you about this after you submit. Creators under 14 cannot enter.",
  },
  {
    q: "How do I submit my film?",
    a: "Upload your film to YouTube or Vimeo, then fill in the submission form on the Submit page and paste in the link. The festival does not host your film.",
  },
  {
    q: "Where should my film be hosted?",
    a: "On YouTube (as an unlisted video) or Vimeo. The link must play without a password or sign-in for the whole judging period.",
  },
  {
    q: "Can I change my submission?",
    a: pending("Procedure for changing or withdrawing an entry to be confirmed."),
  },
  {
    q: "How are films judged?",
    a: "Each eligible film is scored by members of the selection committee against the festival's criteria. Shortlisted films are then scored by the festival jury. Reviewers score films without seeing the creator's name.",
  },
  {
    q: "Is there an entry fee?",
    a: pending("Fee position to be confirmed."),
  },
  {
    q: "How do I contact the festival?",
    a: "See the Contact page.",
  },
];
