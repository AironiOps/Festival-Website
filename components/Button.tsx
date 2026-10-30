import Link from "next/link";
import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode; variant?: "primary" | "ghost"; className?: string };

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      {children}
    </Link>
  );
}

export function Arrow() {
  return (
    <svg aria-hidden="true" width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M0 5h12M8.5 1 12.5 5 8.5 9" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function ExternalIcon() {
  return (
    <svg aria-hidden="true" width="11" height="11" viewBox="0 0 11 11" fill="none" className="inline-block">
      <path d="M4 1h6v6M10 1 1 10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
