import { useEffect, useId, useState } from "react";
import AuiIcon from "./AuiIcon";

type NavLink = { href: string; label: string; icon: string };

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
        style={{ borderColor: "var(--border)", color: "var(--text)" }}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <AuiIcon name={open ? "x" : "menu"} size={22} />
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full border-b px-5 py-4"
          style={{
            background: "color-mix(in srgb, var(--bg) 96%, transparent)",
            backdropFilter: "blur(10px)",
            borderColor: "var(--border)",
          }}
        >
          <nav className="mx-auto flex max-w-5xl flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm"
                style={{ color: "var(--text)" }}
                onClick={() => setOpen(false)}
              >
                <AuiIcon name={link.icon} size={18} />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
