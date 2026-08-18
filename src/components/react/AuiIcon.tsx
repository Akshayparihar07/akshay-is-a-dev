"use client";

import { cn } from "@/lib/utils";
import { User } from "@/components/animate-ui/icons/user";
import { Menu } from "@/components/animate-ui/icons/menu";
import { X } from "@/components/animate-ui/icons/x";
import { ChevronLeft } from "@/components/animate-ui/icons/chevron-left";
import { ChevronRight } from "@/components/animate-ui/icons/chevron-right";
import { ArrowUp } from "@/components/animate-ui/icons/arrow-up";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";
import { Star } from "@/components/animate-ui/icons/star";
import { Layers } from "@/components/animate-ui/icons/layers";
import { Lightbulb } from "@/components/animate-ui/icons/lightbulb";
import { Terminal } from "@/components/animate-ui/icons/terminal";
import { Send } from "@/components/animate-ui/icons/send";
import { MessageCircle } from "@/components/animate-ui/icons/message-circle";
import { MessageCircleQuestion } from "@/components/animate-ui/icons/message-circle-question";
import { Radio } from "@/components/animate-ui/icons/radio";
import { Blocks } from "@/components/animate-ui/icons/blocks";
import { ClipboardList } from "@/components/animate-ui/icons/clipboard-list";
import { Sparkle } from "@/components/animate-ui/icons/sparkle";
import { Sun } from "@/components/animate-ui/icons/sun";
import { Moon } from "@/components/animate-ui/icons/moon";
import { LayoutDashboard } from "@/components/animate-ui/icons/layout-dashboard";
import { Link2 } from "@/components/animate-ui/icons/link-2";
import {
  Briefcase,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Folder,
  Globe,
  Calendar,
  Smile,
  Eye,
  Hash,
  Package,
} from "@/components/animate-ui/icons/extras";

const ICONS = {
  user: User,
  menu: Menu,
  x: X,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "arrow-up": ArrowUp,
  "arrow-right": ArrowRight,
  star: Star,
  layers: Layers,
  lightbulb: Lightbulb,
  terminal: Terminal,
  send: Send,
  "message-circle": MessageCircle,
  "message-circle-question": MessageCircleQuestion,
  radio: Radio,
  blocks: Blocks,
  "clipboard-list": ClipboardList,
  sparkle: Sparkle,
  sun: Sun,
  moon: Moon,
  "layout-dashboard": LayoutDashboard,
  "link-2": Link2,
  briefcase: Briefcase,
  "book-open": BookOpen,
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  folder: Folder,
  globe: Globe,
  calendar: Calendar,
  smile: Smile,
  eye: Eye,
  hash: Hash,
  package: Package,
} as const;

export type IconName = keyof typeof ICONS;

export type AuiIconProps = {
  name: string;
  size?: number;
  className?: string;
  loop?: boolean;
};

export default function AuiIcon({
  name,
  size = 18,
  className,
  loop = false,
}: AuiIconProps) {
  const resolved = name as IconName;
  const Comp = resolved in ICONS ? ICONS[resolved] : Hash;

  return (
    <Comp
      size={size}
      className={cn("inline-block shrink-0", className)}
      animateOnHover
      animateOnTap
      loop={loop}
      aria-hidden="true"
    />
  );
}
