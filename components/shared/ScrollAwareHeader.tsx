"use client";

import { useEffect, useState } from "react";

type ScrollAwareHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Wrapper that adds a drop-shadow once the user scrolls past a threshold.
 * Replaces the static border-b with a dynamic shadow on scroll.
 */
export default function ScrollAwareHeader({
  children,
  className = "",
}: ScrollAwareHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full bg-primary-50 dark:bg-[#000114]",
        scrolled
          ? "shadow-md dark:shadow-slate-900/80 border-b border-transparent"
          : "border-b border-grey-400/20 dark:border-slate-800",
        "transition-shadow duration-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </header>
  );
}
