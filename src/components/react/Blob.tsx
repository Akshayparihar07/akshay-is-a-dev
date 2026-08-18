import { useEffect, useRef, useState } from "react";
import {
  BlobSpeech,
  JellyBlobMascot,
  type JellyBlobMood,
} from "feral-blob";
import "feral-blob/blob.css";
import AuiIcon from "./AuiIcon";

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
          aria-label="Smile eyes"
          {...holdHandlers((on) => {
            setSmile(on);
          })}
        >
          <AuiIcon name="smile" size={20} />
        </button>
        <button
          type="button"
          className={`helmet-react ${hmm ? "is-active" : ""}`}
          aria-label="Hmm"
          {...holdHandlers(setHmm)}
        >
          <AuiIcon name="message-circle-question" size={20} />
        </button>
        <button
          type="button"
          className={`helmet-react ${sideEye ? "is-active" : ""}`}
          aria-label="Side eye"
          {...holdHandlers(setSideEye)}
        >
          <AuiIcon name="eye" size={20} />
        </button>
      </div>
    </div>
  );
}
