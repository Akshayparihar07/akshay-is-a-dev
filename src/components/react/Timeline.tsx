import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AuiIcon from "./AuiIcon";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  logo?: string;
  description: string;
  tags: string[];
}

export default function Timeline({
  items,
}: {
  items: ExperienceItem[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* track */}
      <div
        className="absolute left-[7px] top-2 bottom-2 w-[2px] sm:left-[9px]"
        style={{ background: "var(--border)" }}
      />
      {/* animated beam, inspired by Aceternity's "scroll beam follow" timeline */}
      <motion.div
        className="absolute left-[7px] top-2 w-[2px] sm:left-[9px] rounded-full"
        style={{
          height: beamHeight,
          background: "linear-gradient(180deg, var(--accent-from), var(--accent-to))",
        }}
      />

      <ol className="space-y-10">
        {items.map((item, i) => (
          <li key={i} className="relative pl-8 sm:pl-10">
            <span
              className="absolute left-0 top-1.5 h-[16px] w-[16px] rounded-full border-2 sm:h-[18px] sm:w-[18px]"
              style={{ background: "var(--bg)", borderColor: "var(--accent-from)" }}
            />
            <p
              className="mb-1 inline-flex items-center gap-1.5 text-xs tracking-wide uppercase sm:text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <AuiIcon name="calendar" size={14} />
              {item.period}
            </p>
            <h3 className="flex items-center gap-2.5 text-lg font-bold sm:text-xl" style={{ color: "var(--text)" }}>
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={`${item.company} logo`}
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 rounded-md object-cover"
                />
              ) : null}
              <span>
                {item.role} <span style={{ color: "var(--text-muted)" }}>· {item.company}</span>
              </span>
            </h3>
            <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
              {item.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full border"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
