/**
 * Text that has not been approved yet. Pages render it inside a clearly
 * labelled "pending" panel, never as final copy. Replace a Pending value
 * with plain text once the approved wording arrives.
 */
export type Pending = { pending: true; note: string };

export const pending = (note: string): Pending => ({ pending: true, note });

export type Copy = string | Pending;

export const isPending = (v: unknown): v is Pending =>
  typeof v === "object" && v !== null && (v as Pending).pending === true;
