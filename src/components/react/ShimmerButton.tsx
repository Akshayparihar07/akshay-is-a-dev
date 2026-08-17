import type { ReactNode } from "react";

interface ShimmerButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export default function ShimmerButton({ href, children, variant = "primary" }: ShimmerButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
      style={
        isPrimary
          ? { background: "var(--text)", color: "var(--bg)" }
          : { border: "2px solid var(--border)", color: "var(--text)" }
      }
    >
      {isPrimary && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
          style={{
            background:
              "linear-gradient(120deg, transparent, color-mix(in srgb, var(--accent-to) 45%, transparent), transparent)",
          }}
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </a>
  );
}
