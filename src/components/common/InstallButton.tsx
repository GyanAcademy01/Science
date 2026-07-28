"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** PWA install — browser prompt આપે ત્યારે જ દેખાય છે */
export function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!deferred) return null;

  const install = async () => {
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } catch {
      /* user એ રદ કર્યું */
    } finally {
      setDeferred(null);
    }
  };

  return (
    <button
      type="button"
      onClick={install}
      aria-label="એપ ઇન્સ્ટોલ કરો"
      title="એપ ઇન્સ્ટોલ કરો"
      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--stroke)] bg-[var(--surface-2)] text-[var(--fg)] transition-all duration-300 hover:border-[var(--stroke-strong)] active:scale-95"
    >
      <Download size={16} strokeWidth={2.2} />
    </button>
  );
}
