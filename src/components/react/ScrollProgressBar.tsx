import {
  ScrollProgressProvider,
  ScrollProgress,
} from "@/components/animate-ui/primitives/animate/scroll-progress";

export default function ScrollProgressBar() {
  return (
    <ScrollProgressProvider global>
      <div className="pointer-events-none fixed right-3 bottom-3 left-3 z-50">
        <ScrollProgress
          mode="scaleX"
          className="h-1.5 w-full origin-left rounded-full"
          style={{ background: "var(--text)" }}
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </ScrollProgressProvider>
  );
}
