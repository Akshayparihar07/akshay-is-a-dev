import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface BlurFadeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  as?: "div" | "section" | "li";
}

/**
 * Inspired by Magic UI's "Blur Fade" — fades content in from a slight
 * blur + vertical offset the first time it scrolls into view.
 * Kept subtle on purpose (short duration, small offset) per the
 * "super minimal" direction — this is a polish detail, not a spectacle.
 */
export default function BlurFade({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 10,
  className,
  as = "div",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Tag = motion[as];

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y: yOffset, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
