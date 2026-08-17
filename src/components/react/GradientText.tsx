import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * Inspired by Magic UI's "Animated Gradient Text" — simplified to a
 * two-stop gradient (the brief asked for a "super minimal" gradient,
 * so this intentionally skips the 3-stop rainbow-shimmer version).
 */
export default function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_6s_ease_infinite] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--accent-from), var(--accent-to), var(--accent-from))",
      }}
    >
      {children}
    </span>
  );
}
