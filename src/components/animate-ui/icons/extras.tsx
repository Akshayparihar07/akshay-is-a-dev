"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from "@/components/animate-ui/icons/icon";

type ExtraProps = IconProps<string>;

const animations = {
  default: {
    group: {
      initial: { scale: 1, rotate: 0 },
      animate: {
        scale: [1, 1.12, 0.96, 1],
        rotate: [0, -8, 6, 0],
        transition: { duration: 0.55, ease: "easeInOut" },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function LucideSvg({ size, children, ...props }: ExtraProps & { children: React.ReactNode }) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.g variants={variants.group} initial="initial" animate={controls}>
        {children}
      </motion.g>
    </motion.svg>
  );
}

function wrap(Inner: React.ComponentType<ExtraProps>) {
  return function Wrapped(props: ExtraProps) {
    return <IconWrapper icon={Inner} {...props} />;
  };
}

function BriefcaseGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </LucideSvg>
  );
}

function BookOpenGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="M12 5v16" />
      <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
    </LucideSvg>
  );
}

function MailGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </LucideSvg>
  );
}

function GithubGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </LucideSvg>
  );
}

function LinkedinGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </LucideSvg>
  );
}

function TwitterGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </LucideSvg>
  );
}

function FolderGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </LucideSvg>
  );
}

function GlobeGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </LucideSvg>
  );
}

function CalendarGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="M8 2v3" />
      <path d="M16 2v3" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
    </LucideSvg>
  );
}

function SmileGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="M15 10V9" />
      <path d="M16.472 15a6 6 0 01-8.943 0" />
      <path d="M9 10V9" />
      <circle cx="12" cy="12" r="10" />
    </LucideSvg>
  );
}

function EyeGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </LucideSvg>
  );
}

function HashGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <line x1="4" x2="20" y1="9" y2="9" />
      <line x1="4" x2="20" y1="15" y2="15" />
      <line x1="10" x2="8" y1="3" y2="21" />
      <line x1="16" x2="14" y1="3" y2="21" />
    </LucideSvg>
  );
}

function PackageGlyph({ size, ...props }: ExtraProps) {
  return (
    <LucideSvg size={size} {...props}>
      <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
      <path d="M12 22V12" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <path d="m7.5 4.27 9 5.15" />
    </LucideSvg>
  );
}

const Briefcase = wrap(BriefcaseGlyph);
const BookOpen = wrap(BookOpenGlyph);
const Mail = wrap(MailGlyph);
const Github = wrap(GithubGlyph);
const Linkedin = wrap(LinkedinGlyph);
const Twitter = wrap(TwitterGlyph);
const Folder = wrap(FolderGlyph);
const Globe = wrap(GlobeGlyph);
const Calendar = wrap(CalendarGlyph);
const Smile = wrap(SmileGlyph);
const Eye = wrap(EyeGlyph);
const Hash = wrap(HashGlyph);
const Package = wrap(PackageGlyph);

export {
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
};
