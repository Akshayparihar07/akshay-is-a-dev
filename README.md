# Portfolio (Astro)

A centered, mobile-first portfolio with Hero / About / Experience / Projects / Blog sections,
built in Astro with a couple of React "islands" for animation (Framer Motion), styled with
Tailwind CSS v4, and set in a Comic Sans-style font.

## Quickstart

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static site to dist/
npm run preview   # preview the production build
```

## Edit your content

Everything on the page — your name, bio, experience, projects, blog posts, socials,
and even the color theme — comes from **one file**:

```
src/data/portfolio.json
```

Change the values there and the whole site updates. No need to touch any component.

## About the background color

I based the layout/structure on manthanguptaa.in (minimal, centered, blog-forward),
but I don't have live browser access in the environment I built this in, so I
couldn't read the site's actual computed `background-color` off the page — I used
a close, minimal off-white (`#FAF9F6`) as a placeholder instead.

To grab the real value: open manthanguptaa.in → right-click → Inspect → click the
`<body>` tag → check the "Computed" panel for `background-color` (or use the
eyedropper tool in your browser's dev tools). Then update `theme.background` (and
`theme.backgroundAlt` if you want) in `src/data/portfolio.json`.

## Component credits

`src/components/react/` contains small components inspired by (but re-implemented
from scratch for Astro, since Magic UI / Aceternity UI ship as Next.js-flavored
copy-paste snippets, not installable packages):

- `BlurFade.tsx` — Magic UI's "Blur Fade" scroll reveal
- `GradientText.tsx` — Magic UI's "Animated Gradient Text" (simplified to 2 stops per the "minimal gradient" brief)
- `ShimmerButton.tsx` — Magic UI's "Shimmer Button"
- `Timeline.tsx` — Aceternity UI's "Timeline" (sticky-feel entries + scroll-driven beam), used for the Experience section

## Fonts

Primary font is the system `Comic Sans MS`, falling back to the open-source
**Comic Neue** (loaded from Google Fonts) on systems that don't have Comic Sans
installed (most Linux, Android, iOS). Change the stack in `src/styles/global.css`
(`--font-comic`) if you want to swap it later.

## Stack

Astro 7 · React 19 (islands only) · Tailwind CSS v4 · Framer Motion · TypeScript
