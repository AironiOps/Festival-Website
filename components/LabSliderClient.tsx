"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalIcon } from "./Button";

/**
 * Opens the Lab booking app (a public Zite app) in a panel that slides in from
 * the right, matching the Fillout slider used for film entries. The app runs
 * in its own frame; this site never sees the answers. A new-tab link sits in
 * the panel header in case a browser blocks the frame.
 */
type Labels = { button: string; region: string; openNewTab: string; close: string; frameTitle: string };

export default function LabSliderClient({ url, labels }: { url: string; labels: Labels }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setShown(true));
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      setShown(false);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={triggerRef} type="button" className="btn btn-primary" onClick={() => setOpen(true)} aria-haspopup="dialog">
        {labels.button}
        <svg aria-hidden="true" width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M0 5h12M8.5 1 12.5 5 8.5 9" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={labels.region}>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className={`absolute inset-0 h-full w-full cursor-default bg-black/70 transition-opacity duration-300 motion-reduce:transition-none ${shown ? "opacity-100" : "opacity-0"}`}
            onClick={() => setOpen(false)}
          />
          <div
            className={`absolute inset-y-0 right-0 flex w-full flex-col bg-[#0E0E10] shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none sm:w-[min(80vw,1100px)] ${shown ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex items-center justify-between gap-4 border-b border-ink-line px-4 py-3 sm:px-6">
              <a className="text-sm text-paper/70 underline underline-offset-4 hover:text-paper" href={url} target="_blank" rel="noopener noreferrer">
                {labels.openNewTab} <ExternalIcon />
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center text-paper/80 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={labels.close}
              >
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <iframe
              src={url}
              title={labels.frameTitle}
              className="min-h-0 w-full flex-1 border-0 bg-[#0E0E10]"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      )}
    </>
  );
}
