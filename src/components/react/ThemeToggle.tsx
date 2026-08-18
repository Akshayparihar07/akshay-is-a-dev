import { useEffect, useState } from "react";
import { PullCord } from "pullcord";
import "pullcord/pullcord.css";
import { toggleTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hidden xl:block">
      <PullCord
        onPull={toggleTheme}
        pulled={!dark}
        ariaLabel="Toggle theme"
        config={{
          gravity: 900,
          damping: 0.98,
          iterations: 12,
          stretchMax: 52,
          stretchToggle: 22,
          maxVelocity: 42,
          sleepVelocity: 0.04,
        }}
      />
    </div>
  );
}
