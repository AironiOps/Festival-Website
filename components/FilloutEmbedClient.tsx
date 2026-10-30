"use client";

import { useState } from "react";
import { FilloutSliderEmbed } from "@fillout/react";

/**
 * Browser-only wrapper for Fillout's official React embed, "slider" type:
 * the original form (by ID) slides in from the right over the page.
 * `parameters` only ever carries the language setting for Korean pages.
 * Answers go straight from the entrant's browser to Fillout; this site never
 * sees them. No onSubmit/onPageChange handlers are attached on purpose.
 */
export default function FilloutEmbedClient({
  formId,
  label,
  parameters,
}: {
  formId: string;
  label: string;
  parameters?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={() => setOpen(true)} aria-haspopup="dialog">
        {label}
        <svg aria-hidden="true" width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M0 5h12M8.5 1 12.5 5 8.5 9" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>
      <FilloutSliderEmbed
        filloutId={formId}
        isOpen={open}
        onClose={() => setOpen(false)}
        sliderDirection="right"
        inheritParameters
        parameters={parameters}
      />
    </>
  );
}
