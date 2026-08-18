"use client";

import { easeOut, motion } from "motion/react";
import { useState } from "react";
import { skillIcon } from "@/lib/icons";

export type ProjectFlipCardProps = {
  name: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
};

const PATHS: Record<string, string[]> = {
  folder: [
    "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
  ],
  globe: ["M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", "M2 12h20"],
  github: [
    "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
    "M9 18c-4.51 2-5-2-7-2",
  ],
  terminal: ["M4 17l6-6-6-6", "M12 19h8"],
  star: [
    "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
  ],
  sparkle: [
    "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
  ],
  layers: ["M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"],
  hash: [],
};

function SmallIcon({ name, size }: { name: string; size: number }) {
  const paths = PATHS[name] ?? PATHS.hash;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "globe" ? <circle cx="12" cy="12" r="10" /> : null}
      {name === "hash" ? (
        <>
          <line x1="4" x2="20" y1="9" y2="9" />
          <line x1="4" x2="20" y1="15" y2="15" />
          <line x1="10" x2="8" y1="3" y2="21" />
          <line x1="16" x2="14" y1="3" y2="21" />
        </>
      ) : (
        paths.map((d) => <path key={d} d={d} />)
      )}
    </svg>
  );
}

const cardVariants = {
  front: { rotateY: 0, transition: { duration: 0.5, ease: easeOut } },
  back: { rotateY: 180, transition: { duration: 0.5, ease: easeOut } },
};

const faceStyle = {
  transformStyle: "preserve-3d" as const,
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
};

export default function ProjectFlipCard({
  name,
  description,
  image,
  tags,
  liveUrl,
  codeUrl,
}: ProjectFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  return (
    <article
      className="relative size-full cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => {
        if (isTouchDevice) setIsFlipped((v) => !v);
      }}
      onMouseEnter={() => {
        if (!isTouchDevice) setIsFlipped(true);
      }}
      onMouseLeave={() => {
        if (!isTouchDevice) setIsFlipped(false);
      }}
      aria-label={`${name}. Hover or tap to flip for details.`}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          ...faceStyle,
          backgroundColor: "var(--bg-alt)",
        }}
        animate={isFlipped ? "back" : "front"}
        variants={cardVariants}
      >
        <img
          src={image}
          alt={`${name} preview`}
          className="size-full object-cover"
          width={1600}
          height={1000}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          ...faceStyle,
          rotateY: 180,
          backgroundColor: "var(--bg-alt)",
        }}
        initial={{ rotateY: 180 }}
        animate={isFlipped ? "front" : "back"}
        variants={cardVariants}
      >
        <div className="flex h-full flex-col justify-center overflow-hidden p-3 sm:p-4">
          <h3
            className="inline-flex items-center gap-2 truncate text-base font-bold sm:text-lg"
            style={{ color: "var(--text)" }}
          >
            <span style={{ color: "var(--accent-from)" }}>
              <SmallIcon name="folder" size={16} />
            </span>
            {name}
          </h3>
          <p
            className="mt-1 line-clamp-2 text-xs sm:text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                <SmallIcon name={skillIcon(tag)} size={11} />
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-xs font-bold sm:text-sm">
            <a
              href={liveUrl}
              className="inline-flex items-center gap-1.5"
              style={{ color: "var(--accent-from)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <SmallIcon name="globe" size={14} />
              Live
            </a>
            <a
              href={codeUrl}
              className="inline-flex items-center gap-1.5"
              style={{ color: "var(--accent-to)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <SmallIcon name="github" size={14} />
              Code
            </a>
          </div>
        </div>
      </motion.div>
    </article>
  );
}
