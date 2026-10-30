"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/** SMPTE-style running timecode at 24 fps. Static under reduced motion. */
export function Timecode() {
  const [frames, setFrames] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      setFrames(Math.floor(((t - start) / 1000) * 24));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const f = frames % 24;
  const s = Math.floor(frames / 24);
  return (
    <span className="tabular" aria-hidden="true">
      {pad(Math.floor(s / 3600))}:{pad(Math.floor(s / 60) % 60)}:{pad(s % 60)}:{pad(f)}
    </span>
  );
}
