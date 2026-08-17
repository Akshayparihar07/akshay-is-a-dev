import * as evaModule from "eva-icons";

type EvaPack = {
  icons: Record<string, { toSvg: (attrs?: Record<string, unknown>) => string }>;
};

const eva = (
  "icons" in evaModule && evaModule.icons
    ? evaModule
    : (evaModule as { default: EvaPack }).default
) as EvaPack;

export type EvaAnimationType = "zoom" | "pulse" | "shake" | "flip";

export type EvaSvgOptions = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  class?: string;
  animation?: {
    type: EvaAnimationType;
    hover?: boolean;
    infinite?: boolean;
  };
  [key: string]: unknown;
};

export function evaSvg(name: string, options: EvaSvgOptions = {}): string {
  const icon = eva.icons[name];
  if (!icon) throw new Error(`Unknown Eva icon: ${name}`);
  return icon.toSvg({
    width: 18,
    height: 18,
    fill: "currentColor",
    "aria-hidden": "true",
    focusable: "false",
    ...options,
  });
}

export function socialIcon(label: string): string {
  const map: Record<string, string> = {
    twitter: "twitter-outline",
    github: "github-outline",
    linkedin: "linkedin-outline",
    rss: "radio-outline",
  };
  return map[label.toLowerCase()] ?? "link-2-outline";
}

export function skillIcon(skill: string): string {
  const map: Record<string, string> = {
    python: "code-outline",
    typescript: "code-outline",
    javascript: "code-outline",
    react: "browser-outline",
    astro: "star-outline",
    pytorch: "flash-outline",
    postgresql: "layers-outline",
    "node.js": "npm-outline",
    llms: "bulb-outline",
    fastapi: "flash-outline",
  };
  return map[skill.toLowerCase()] ?? "hash-outline";
}
