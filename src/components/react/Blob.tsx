import { useEffect, useRef, useState } from "react";
import {
  BlobSpeech,
  JellyBlobMascot,
  type JellyBlobMood,
} from "feral-blob";
import "feral-blob/blob.css";

const PROTEST = ["Stop it!", "Quit it!", "Enough!", "Ow, stop!", "Hey!!"] as const;

type Overlay = "protest" | "hmm" | null;

function allMoods(line: string): Partial<Record<JellyBlobMood, string>> {
  return {
    neutral: line,
    happy: line,
    sad: line,
    angry: line,
    hmm: line,
    sideEye: line,
    password: line,
  };
}

function holdHandlers(setOn: (on: boolean) => void) {
  return {
    onPointerEnter: () => setOn(true),
    onPointerLeave: () => setOn(false),
    onPointerDown: () => setOn(true),
    onPointerUp: () => setOn(false),
    onPointerCancel: () => setOn(false),
    onFocus: () => setOn(true),
    onBlur: () => setOn(false),
  };
}

export default function Blob() {
  const [smile, setSmile] = useState(false);
  const [hmm, setHmm] = useState(false);
  const [sideEye, setSideEye] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [protest, setProtest] = useState("Stop it!");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const baseMood: JellyBlobMood = sideEye ? "sideEye" : hmm ? "hmm" : smile ? "happy" : "neutral";
  const speechMood: JellyBlobMood = overlay === "hmm" ? "hmm" : baseMood;
  const blobMood: JellyBlobMood = overlay === "hmm" ? "hmm" : baseMood;
  const messages =
    overlay === "protest"
      ? allMoods(protest)
      : overlay === "hmm"
        ? allMoods("Hmm… really?")
        : undefined;

  return (
    <div className="flex flex-col items-center">
      <div
        className="blob-speak"
        onPointerLeave={() => {
          clearTimers();
          setOverlay(null);
        }}
      >
        <BlobSpeech mood={speechMood} messages={messages} />
        <JellyBlobMascot
          mood={blobMood}
          className="helmet-blob"
          happyEyes={smile ? "smile" : "star"}
          onOverpoke={() => {
            clearTimers();
            setProtest(PROTEST[Math.floor(Math.random() * PROTEST.length)]);
            setOverlay("protest");
            timers.current.push(window.setTimeout(() => setOverlay("hmm"), 700));
            timers.current.push(window.setTimeout(() => setOverlay(null), 4200));
          }}
        />
      </div>

      <div
        className="mt-4 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Try a reaction — hover or press a button"
      >
        <button
          type="button"
          className={`helmet-react ${smile ? "is-active" : ""}`}
          {...holdHandlers((on) => {
            setSmile(on);
          })}
        >
          Smile eyes
        </button>
        <button
          type="button"
          className={`helmet-react ${hmm ? "is-active" : ""}`}
          {...holdHandlers(setHmm)}
        >
          Hmm
        </button>
        <button
          type="button"
          className={`helmet-react ${sideEye ? "is-active" : ""}`}
          {...holdHandlers(setSideEye)}
        >
          Side eye
        </button>
      </div>
      <p className="mt-2 text-center text-xs" style={{ color: "var(--text-muted)" }}>
        poke it — and point at the buttons
      </p>
    </div>
  );
}
