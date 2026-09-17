"use client";

import { useEffect, useRef, useState } from "react";
import type { ShareBar } from "@/content/metrics";

/**
 * Horizontal bar chart drawn entirely in SVG (no charting library, no inline
 * styles) so it remains CSP-safe and has minimal JavaScript. Bars animate on
 * first view; the final values render server-side for no-JS visitors.
 */
export function ShareChart({
  title,
  bars,
}: {
  title: string;
  bars: ShareBar[];
}) {
  const [progress, setProgress] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const element = ref.current;
    if (!element) return;

    function animate() {
      setProgress(0);

      const duration = 1000;
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setProgress(eased);
        if (t < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          animate();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const max = Math.max(...bars.map((bar) => bar.value));

  return (
    <figure className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
      <figcaption className="sr-only">{title}</figcaption>
      <div ref={ref}>
        <ul className="space-y-5">
          {bars.map((bar) => {
            const width = Math.max(0, (bar.value / max) * 100 * progress);
            return (
              <li key={bar.id} className="flex items-center gap-4">
                <span className="w-28 shrink-0 truncate text-sm text-muted">
                  {bar.label}
                </span>
                <svg
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  className="h-2.5 min-w-0 flex-1"
                  aria-hidden="true"
                >
                  <rect
                    x="0"
                    y="0"
                    width="100"
                    height="10"
                    className="fill-hairline"
                  />
                  <rect
                    x="0"
                    y="0"
                    width={width}
                    height="10"
                    className={bar.accent ? "fill-accent" : "fill-competitor"}
                  />
                </svg>
                <span className="w-11 shrink-0 text-right font-mono text-sm text-ink">
                  {bar.value}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}
