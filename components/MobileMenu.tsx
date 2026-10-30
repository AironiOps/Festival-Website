"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type Item = { href: string; label: string };

export function MobileMenu({
  items,
  submit,
  labels,
}: {
  items: Item[];
  submit: Item;
  labels: { menu: string; close: string; nav: string };
}) {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((typeof next === "function" ? next(open) : next) ? pathname : null);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div>
      <button
        ref={buttonRef}
        type="button"
        className="slate flex h-11 items-center gap-2 !text-paper"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? labels.close : labels.menu}
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span className={`absolute left-0 block h-px w-5 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 block h-px w-5 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
        </span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.25rem] z-40 overflow-y-auto border-t border-ink-line bg-ink"
      >
        <nav aria-label={labels.nav} className="wrap flex flex-col py-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="display border-b border-ink-line py-4 text-3xl no-underline"
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href={submit.href} className="btn btn-primary mt-8 justify-center">
            {submit.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}
