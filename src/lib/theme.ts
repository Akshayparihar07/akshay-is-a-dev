export function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  localStorage.setItem("theme", dark ? "dark" : "light");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#000000" : "#faf8f1");
}

export function toggleTheme() {
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
