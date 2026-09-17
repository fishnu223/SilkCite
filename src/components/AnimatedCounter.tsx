"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated number that counts up when it scrolls into view. Renders the final
 * value server-side (so no-JS visitors still see the real number) and animates
 * from zero on first view. Honors prefers-reduced-motion by keeping the final
 * value.
 */
export function AnimatedCounter({
  value,
  decimals,
  suffix,
}: {
  value: number;
  decimals: number;
  suffix: string;
}) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function animate() {
      const duration = 1200;
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setDisplay(value * eased);
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
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
