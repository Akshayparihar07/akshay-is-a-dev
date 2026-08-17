import { useEffect, useState } from "react";
import { PullCord } from "pullcord";
import "pullcord/pullcord.css";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  localStorage.setItem("theme", dark ? "dark" : "light");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#000000" : "#faf8f1");
}

function toggleTheme() {
  const next = !document.documentElement.classList.contains("dark");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => void;
  };
  if (!doc.startViewTransition || reduced) {
    applyTheme(next);
    return;
  }
  doc.startViewTransition(() => applyTheme(next));
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <PullCord
      onPull={toggleTheme}
      pulled={!dark}
      ariaLabel="Toggle theme"
    />
  );
}
