import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = "C:/Users/parih/Downloads/portfolio-astro/portfolio-astro/scripts/e2e-out";
const VIEWPORT = { width: 1280, height: 900 };

async function measureOfficial(page) {
  await page.goto("https://animate-ui.com/docs/components/community/motion-carousel", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(1500);

  const preview = page.locator("[data-slot='preview'], .preview, [class*='preview']").first();
  const carouselRoot = page.locator("[style*='--slide-height'], [class*='slide-height']").first();

  const root = (await carouselRoot.count())
    ? carouselRoot
    : page.locator("div.w-full.space-y-4").filter({ has: page.locator("button") }).first();

  await root.waitFor({ timeout: 15000 });

  const data = await root.evaluate((el) => {
    const styles = getComputedStyle(el);
    const viewport = el.querySelector(":scope > div");
    const track = viewport?.querySelector(":scope > div");
    const slides = track ? [...track.children] : [];
    const cards = slides.map((slide) => {
      const card = slide.firstElementChild;
      const r = slide.getBoundingClientRect();
      const cr = card?.getBoundingClientRect();
      return {
        slideW: Math.round(r.width),
        slideH: Math.round(r.height),
        cardW: cr ? Math.round(cr.width) : null,
        cardH: cr ? Math.round(cr.height) : null,
        className: slide.className,
        cardClass: card?.className ?? null,
      };
    });
    const buttons = [...el.querySelectorAll("button")].map((b) => ({
      label: b.getAttribute("aria-label") || b.textContent?.trim() || "",
      disabled: b.disabled,
      w: Math.round(b.getBoundingClientRect().width),
      h: Math.round(b.getBoundingClientRect().height),
    }));
    return {
      rootClass: el.className,
      slideHeight: styles.getPropertyValue("--slide-height").trim(),
      slideSpacing: styles.getPropertyValue("--slide-spacing").trim(),
      slideSize: styles.getPropertyValue("--slide-size").trim(),
      rootW: Math.round(el.getBoundingClientRect().width),
      viewportH: viewport ? Math.round(viewport.getBoundingClientRect().height) : null,
      slideCount: slides.length,
      cards,
      buttons,
    };
  });

  await root.screenshot({ path: path.join(OUT, "official-before.png") });

  const next = root.locator("button").last();
  await next.click();
  await page.waitForTimeout(700);
  await root.screenshot({ path: path.join(OUT, "official-after-next.png") });

  const after = await root.evaluate((el) => {
    const viewport = el.querySelector(":scope > div");
    const track = viewport?.querySelector(":scope > div");
    const transform = track ? getComputedStyle(track).transform : null;
    const lefts = track
      ? [...track.children].map((s) => Math.round(s.getBoundingClientRect().left))
      : [];
    return { transform, lefts };
  });

  return { ...data, afterClick: after };
}

async function measureLocal(page) {
  await page.goto("http://localhost:4321/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const root = page.locator("#projects").locator("div.w-full.space-y-4").first();
  await root.waitFor({ timeout: 15000 });

  const data = await root.evaluate((el) => {
    const styles = getComputedStyle(el);
    const viewport = el.querySelector(":scope > div");
    const track = viewport?.querySelector(":scope > div");
    const slides = track ? [...track.children] : [];
    const cards = slides.map((slide) => {
      const card = slide.firstElementChild;
      const r = slide.getBoundingClientRect();
      const cr = card?.getBoundingClientRect();
      return {
        slideW: Math.round(r.width),
        slideH: Math.round(r.height),
        cardW: cr ? Math.round(cr.width) : null,
        cardH: cr ? Math.round(cr.height) : null,
        className: slide.className,
        cardClass: card?.className ?? null,
      };
    });
    const buttons = [...el.querySelectorAll("button")].map((b) => ({
      label: b.getAttribute("aria-label") || b.textContent?.trim() || "",
      disabled: b.disabled,
      w: Math.round(b.getBoundingClientRect().width),
      h: Math.round(b.getBoundingClientRect().height),
    }));
    const lefts = slides.map((s) => Math.round(s.getBoundingClientRect().left));
    return {
      rootClass: el.className,
      slideHeight: styles.getPropertyValue("--slide-height").trim(),
      slideSpacing: styles.getPropertyValue("--slide-spacing").trim(),
      slideSize: styles.getPropertyValue("--slide-size").trim(),
      rootW: Math.round(el.getBoundingClientRect().width),
      viewportH: viewport ? Math.round(viewport.getBoundingClientRect().height) : null,
      slideCount: slides.length,
      cards,
      buttons,
      lefts,
      errors: window.__carouselErrors ?? [],
    };
  });

  const errors = await page.evaluate(() => {
    return (window.__pageErrors || []).slice(-10);
  });

  await root.screenshot({ path: path.join(OUT, "local-before.png") });

  const next = root.getByRole("button", { name: /next/i });
  await next.waitFor({ state: "visible", timeout: 15000 });
  await page.waitForFunction(
    () => {
      const btn = [...document.querySelectorAll("#projects button")].find((b) =>
        (b.getAttribute("aria-label") || "").toLowerCase().includes("next"),
      );
      return btn instanceof HTMLButtonElement && !btn.disabled;
    },
    null,
    { timeout: 15000 },
  );
  await next.click();
  await page.waitForTimeout(700);
  await root.screenshot({ path: path.join(OUT, "local-after-next.png") });

  const after = await root.evaluate((el) => {
    const viewport = el.querySelector(":scope > div");
    const track = viewport?.querySelector(":scope > div");
    const transform = track ? getComputedStyle(track).transform : null;
    const lefts = track
      ? [...track.children].map((s) => Math.round(s.getBoundingClientRect().left))
      : [];
    return { transform, lefts };
  });

  const nextDisabled = await next.isDisabled();
  return { ...data, nextDisabled, afterClick: after, pageErrors: errors };
}

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
});

await mkdir(OUT, { recursive: true });
const context = await browser.newContext({ viewport: VIEWPORT });
const page = await context.newPage();
page.on("pageerror", (err) => {
  console.error("PAGEERROR", err.message);
});
page.on("console", (msg) => {
  if (msg.type() === "error") console.error("CONSOLE", msg.text());
});

let official = null;
let local = null;
try {
  official = await measureOfficial(page);
} catch (err) {
  official = { error: String(err) };
  await page.screenshot({ path: path.join(OUT, "official-full.png"), fullPage: true });
}

try {
  local = await measureLocal(page);
} catch (err) {
  local = { error: String(err) };
  await page.screenshot({ path: path.join(OUT, "local-full.png"), fullPage: true });
}

await browser.close();

console.log(JSON.stringify({ official, local }, null, 2));
