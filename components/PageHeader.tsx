import type { ReactNode } from "react";

/** Top of an inner page: slate label, display title, optional lede. */
export function PageHeader({ slate, title, lede, children }: { slate: string; title: string; lede?: string; children?: ReactNode }) {
  return (
    <header className="border-b border-ink-line">
      <div className="wrap pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="slate rise">{slate}</p>
        <h1 className="display rise rise-2 mt-4 text-[clamp(2.6rem,7vw,5.2rem)]">{title}</h1>
        {lede ? <p className="rise rise-3 prose-col mt-6 text-lg text-paper/80">{lede}</p> : null}
        {children}
      </div>
    </header>
  );
}
