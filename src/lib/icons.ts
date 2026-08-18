export function socialIcon(label: string): string {
  const map: Record<string, string> = {
    twitter: "twitter",
    github: "github",
    linkedin: "linkedin",
    rss: "radio",
  };
  return map[label.toLowerCase()] ?? "link-2";
}

export function skillIcon(skill: string): string {
  const map: Record<string, string> = {
    python: "terminal",
    typescript: "terminal",
    javascript: "terminal",
    react: "layout-dashboard",
    astro: "star",
    pytorch: "sparkle",
    postgresql: "layers",
    "node.js": "package",
    llms: "lightbulb",
    fastapi: "sparkle",
  };
  return map[skill.toLowerCase()] ?? "hash";
}
