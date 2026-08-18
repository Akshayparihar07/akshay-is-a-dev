import { useEffect, useId, useState } from "react";
import AuiIcon from "./AuiIcon";
import { socialIcon } from "@/lib/icons";
import { toggleTheme } from "@/lib/theme";

type NavLink = { href: string; label: string; icon: string };
type Social = { label: string; url: string };

export default function MobileNav({
  links,
  socials,
}: {
  links: NavLink[];
  socials: Social[];
}) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
        style={{ borderColor: "var(--border)", color: "var(--text)" }}
        aria-label="Toggle theme"
        onClick={toggleTheme}
      >
        <AuiIcon name={dark ? "moon" : "sun"} size={20} />
      </button>
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
          <div
            className="mx-auto mt-3 flex max-w-5xl gap-2 border-t pt-3"
            style={{ borderColor: "var(--border)" }}
          >
            {socials.map((social) => {
              const external = /^https?:\/\//.test(social.url);
              return (
                <a
                  key={social.label}
                  href={social.url}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border capitalize"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }}
                  aria-label={social.label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={() => setOpen(false)}
                >
                  <AuiIcon name={socialIcon(social.label)} size={18} />
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
