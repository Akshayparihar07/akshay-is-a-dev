"use client";

import { RadialNav, type RadialNavItem } from "@/components/animate-ui/components/community/radial-nav";
import { socialIcon } from "@/lib/icons";

type Social = { label: string; url: string };

export default function SocialRadialNav({ socials }: { socials: Social[] }) {
  const items: RadialNavItem[] = socials.map((social, index) => ({
    id: index + 1,
    icon: socialIcon(social.label),
    label: social.label,
    angle: (360 / socials.length) * index + 45,
    href: social.url,
    external: /^https?:\/\//.test(social.url),
  }));

  return (
    <RadialNav
      items={items}
      size={92}
      menuButtonConfig={{ iconSize: 13, buttonSize: 26, buttonPadding: 5 }}
    />
  );
}
