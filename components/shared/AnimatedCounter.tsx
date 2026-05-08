"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  target: string; // e.g. "10K+", "4.9★", "500K+"
  duration?: number;
};

// Extract numeric part and suffix from strings like "10K+", "4.9★", "500K+"
const parse = (val: string) => {
  const match = val.match(/^([\d.]+)([A-Z★+%]*)(.*)$/i);
  if (!match) return { num: 0, suffix: val };
  return { num: parseFloat(match[1]), suffix: match[2] + match[3] };
};

export default function AnimatedCounter({
  target,
  duration = 1500,
}: AnimatedCounterProps) {
  const { num, suffix } = parse(target);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (num === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * num * 10) / 10);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num, duration]);

  // Format count: if original had decimal (like 4.9), show 1 decimal place
  const hasDecimal = target.includes(".");
  const display = hasDecimal ? count.toFixed(1) : Math.round(count);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
