"use client";

import * as React from "react";
import { motion, type Transition } from "motion/react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

type MotionCarouselProps = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  labels?: string[];
};

type EmblaControls = {
  selectedIndex: number;
  scrollSnaps: number[];
  prevDisabled: boolean;
  nextDisabled: boolean;
  onDotClick: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

type DotButtonProps = {
  selected?: boolean;
  label: string;
  onClick: () => void;
};

const transition: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 24,
  mass: 1,
};

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 pointer-events-none"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 pointer-events-none"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const useEmblaControls = (
  emblaApi: EmblaCarouselType | undefined,
): EmblaControls => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [prevDisabled, setPrevDisabled] = React.useState(true);
  const [nextDisabled, setNextDisabled] = React.useState(true);

  const onDotClick = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const updateSelectionState = (api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevDisabled(!api.canScrollPrev());
    setNextDisabled(!api.canScrollNext());
  };

  const onInit = React.useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
    updateSelectionState(api);
  }, []);

  const onSelect = React.useCallback((api: EmblaCarouselType) => {
    updateSelectionState(api);
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    emblaApi.on("reInit", onInit).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onInit).off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  };
};

function DotButton({ selected = false, label, onClick }: DotButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      initial={false}
      aria-label={label}
      className="flex cursor-pointer select-none items-center justify-center rounded-full border-none text-sm"
      style={{ background: "var(--text)", color: "var(--bg)" }}
      animate={{
        width: selected ? 68 : 12,
        height: selected ? 28 : 12,
      }}
      transition={transition}
    >
      <motion.span
        layout
        initial={false}
        className="block whitespace-nowrap px-3 py-1"
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1 : 0,
          filter: selected ? "blur(0px)" : "blur(4px)",
        }}
        transition={transition}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

function MotionCarousel({ slides, options, labels }: MotionCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  } = useEmblaControls(emblaApi);

  return (
    <div className="w-full space-y-4 rounded-2xl border p-3 sm:p-4 [--slide-height:10rem] sm:[--slide-height:13.5rem] md:[--slide-height:16.5rem] [--slide-spacing:1.5rem] [--slide-size:62%]"
      style={{ borderColor: "color-mix(in srgb, var(--text) 12%, transparent)" }}
    >
      <div
        className="overflow-hidden pb-4 pt-1"
        ref={emblaRef}
        onClick={(event) => {
          const slide = (event.target as HTMLElement).closest("[data-slide-index]");
          if (!(slide instanceof HTMLElement)) return;
          const index = Number(slide.dataset.slideIndex);
          if (Number.isNaN(index) || index === selectedIndex) return;
          onDotClick(index);
        }}
      >
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex;

            return (
              <motion.div
                key={index}
                data-slide-index={index}
                className={`h-[var(--slide-height)] mr-[var(--slide-spacing)] basis-[var(--slide-size)] flex-none flex min-w-0 ${isActive ? "" : "cursor-pointer"}`}
              >
                <motion.div
                  className={`size-full select-none overflow-hidden rounded-xl ${isActive ? "" : "pointer-events-none"}`}
                  style={{
                    boxShadow:
                      "0 8px 14px -10px color-mix(in srgb, var(--accent-from) 32%, transparent)",
                  }}
                  initial={false}
                  animate={{ scale: isActive ? 1 : 0.9 }}
                  transition={transition}
                >
                  {slide}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={onPrev}
          disabled={prevDisabled}
          className="inline-flex size-9 items-center justify-center rounded-md border-0 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: "var(--text)",
            color: "var(--bg)",
          }}
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              label={labels?.[index] ?? `Slide ${index + 1}`}
              selected={index === selectedIndex}
              onClick={() => onDotClick(index)}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next slide"
          onClick={onNext}
          disabled={nextDisabled}
          className="inline-flex size-9 items-center justify-center rounded-md border-0 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: "var(--text)",
            color: "var(--bg)",
          }}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

export { MotionCarousel };
export type { MotionCarouselProps };
