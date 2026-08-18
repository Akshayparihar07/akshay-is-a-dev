"use client";

import * as React from "react";
import { motion, type Variants, type Transition } from "motion/react";
import AuiIcon from "@/components/react/AuiIcon";

type RadialNavProps = {
  size?: number;
  items: RadialNavItem[];
  menuButtonConfig?: MenuButtonConfig;
  defaultActiveId?: number;
  onActiveChange?: (id: number) => void;
};

type RadialNavItem = {
  id: number;
  icon: string;
  label: string;
  angle: number;
  href?: string;
  external?: boolean;
};

type MenuButtonConfig = {
  iconSize?: number;
  buttonSize?: number;
  buttonPadding?: number;
};

const defaultMenuButtonConfig: Required<MenuButtonConfig> = {
  iconSize: 20,
  buttonSize: 40,
  buttonPadding: 8,
};

const POINTER_BASE_DEG = 45;

const POINTER_ROT_SPRING = {
  type: "spring",
  stiffness: 220,
  damping: 26,
} as const;

function buttonMotionConfig(buttonSize: number) {
  return {
    initial: false as const,
    whileHover: "hover" as const,
    whileTap: "tap" as const,
    variants: {
      rest: { maxWidth: `${buttonSize}px` },
      hover: {
        maxWidth: "108px",
        transition: { type: "spring" as const, stiffness: 200, damping: 35, delay: 0.05 },
      },
      tap: { scale: 0.95 },
    },
    transition: { type: "spring" as const, stiffness: 200, damping: 25 },
  };
}

const LABEL_VARIANTS: Variants = {
  rest: { opacity: 0, x: 4 },
  hover: {
    opacity: 1,
    x: 0,
    visibility: "visible",
    width: "auto",
  },
  tap: { opacity: 1, x: 0, visibility: "visible", width: "auto" },
};

const LABEL_TRANSITION: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
};

function getPolarCoordinates(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

function calculateIconOffset({
  buttonSize,
  iconSize,
  buttonPadding,
  bias = 0,
}: {
  buttonSize: number;
  iconSize: number;
  buttonPadding: number;
  bias?: number;
}) {
  const centerOffset = (buttonSize - iconSize) / 2;
  return centerOffset - buttonPadding + bias;
}

function withDefaults<T extends Record<string, unknown>>(
  defaults: T,
  overrides?: Partial<T>,
): T {
  return { ...defaults, ...overrides };
}

function normalizeDeg(a: number) {
  return ((a % 360) + 360) % 360;
}

function toNearestTurn(prev: number | undefined, target: number) {
  const b = normalizeDeg(target);
  if (prev === undefined) return b;
  const k = Math.round((prev - b) / 360);
  return b + 360 * k;
}

function useShortestRotation(target: number) {
  const prevRef = React.useRef<number | undefined>(undefined);
  return React.useMemo(() => {
    const next = toNearestTurn(prevRef.current, target);
    prevRef.current = next;
    return next;
  }, [target]);
}

function MousePointer2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
    </svg>
  );
}

function MenuButton({
  item,
  isActive,
  onActivate,
  menuButtonConfig,
}: {
  item: RadialNavItem;
  isActive?: boolean;
  onActivate?: () => void;
  menuButtonConfig: Required<MenuButtonConfig>;
}) {
  const { icon, label, href, external } = item;
  const { iconSize, buttonSize, buttonPadding } = menuButtonConfig;
  const translateX = calculateIconOffset({
    ...menuButtonConfig,
    bias: -1,
  });

  const className =
    "relative flex items-center space-x-1 overflow-hidden whitespace-nowrap rounded-full border font-medium capitalize";
  const style = {
    height: buttonSize,
    minWidth: buttonSize,
    padding: buttonPadding,
    borderColor: "var(--text)",
    backgroundColor: "var(--bg)",
    color: "var(--text)",
  } as const;

  const content = (
    <>
      <span
        className="inline-flex shrink-0 items-center justify-center"
        style={{
          height: iconSize,
          width: iconSize,
          transform: `translateX(${translateX}px)`,
        }}
      >
        <AuiIcon name={icon} size={iconSize} />
      </span>
      <motion.span
        variants={LABEL_VARIANTS}
        transition={LABEL_TRANSITION}
        className="invisible w-0 text-xs"
      >
        {label}
      </motion.span>
    </>
  );

  if (href) {
    return (
      <motion.a
        {...buttonMotionConfig(buttonSize)}
        animate={isActive ? "hover" : "rest"}
        className={className}
        style={style}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onActivate}
        role="menuitem"
        aria-pressed={!!isActive}
        aria-label={label}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...buttonMotionConfig(buttonSize)}
      animate={isActive ? "hover" : "rest"}
      className={className}
      style={style}
      onClick={onActivate}
      type="button"
      role="menuitem"
      aria-pressed={!!isActive}
      aria-label={label}
    >
      {content}
    </motion.button>
  );
}

function RadialNav({
  size = 180,
  items,
  menuButtonConfig,
  defaultActiveId,
  onActiveChange,
}: RadialNavProps) {
  const orbitRadius = size / 2 - 0.5;
  const [activeId, setActiveId] = React.useState<number | null>(
    defaultActiveId ?? null,
  );

  const handleActivate = React.useCallback(
    (id: number) => {
      setActiveId(id);
      onActiveChange?.(id);
    },
    [onActiveChange],
  );

  const baseAngle =
    (items.find((it) => it.id === activeId)?.angle ?? 0) + POINTER_BASE_DEG;
  const rotateAngle = useShortestRotation(baseAngle);

  const resolvedMenuButtonConfig = withDefaults(
    defaultMenuButtonConfig,
    menuButtonConfig,
  );

  return (
    <div
      className="relative flex items-center justify-center rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: "var(--text)",
      }}
      role="menu"
      aria-label="Social links"
    >
      <motion.div
        initial={false}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: rotateAngle }}
        transition={POINTER_ROT_SPRING}
        style={{ originX: 0.5, originY: 0.5, color: "var(--text)" }}
        aria-hidden="true"
      >
        <MousePointer2 className="size-3.5" />
      </motion.div>
      {items.map((item) => {
        const { id, angle } = item;
        const { x, y } = getPolarCoordinates(angle, orbitRadius);
        return (
          <div
            key={id}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <MenuButton
              item={item}
              isActive={activeId === id}
              onActivate={() => handleActivate(id)}
              menuButtonConfig={resolvedMenuButtonConfig}
            />
          </div>
        );
      })}
    </div>
  );
}

export {
  RadialNav,
  type RadialNavItem,
  type MenuButtonConfig,
  type RadialNavProps,
};
