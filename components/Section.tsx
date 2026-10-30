import type { ReactNode } from "react";

export function Section({ label, title, children, id }: { label?: string; title?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="border-b border-ink-line">
      <div className="wrap grid gap-8 py-16 md:grid-cols-[13rem_1fr] md:gap-12 md:py-20">
        <div>{label ? <p className="slate md:sticky md:top-28">{label}</p> : null}</div>
        <div className="min-w-0">
          {title ? <h2 className="display mb-6 text-[clamp(1.8rem,3.6vw,2.6rem)]">{title}</h2> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
