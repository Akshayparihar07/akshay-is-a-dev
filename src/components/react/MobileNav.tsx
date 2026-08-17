import { useEffect, useId, useState } from "react";

type NavLink = { href: string; label: string; icon: string };
type Social = { label: string; url: string };

export default function MobileNav({
  links,
  socials,
  menuIcon,
  closeIcon,
}: {
  links: NavLink[];
  socials: Social[];
  menuIcon: string;
  closeIcon: string;
}) {
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
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
        style={{ borderColor: "var(--border)", color: "var(--text)" }}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="inline-flex"
          dangerouslySetInnerHTML={{ __html: open ? closeIcon : menuIcon }}
        />
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
                className="eva-parent-hover inline-flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm"
                style={{ color: "var(--text)" }}
                onClick={() => setOpen(false)}
              >
                <span
                  className="inline-flex"
                  dangerouslySetInnerHTML={{ __html: link.icon }}
                />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
          <div
            className="mx-auto mt-3 flex max-w-5xl flex-wrap gap-4 border-t pt-3 text-sm"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize hover:opacity-70"
                onClick={() => setOpen(false)}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
