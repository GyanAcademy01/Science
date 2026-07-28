"use client";

import { Minus, Plus, Type } from "lucide-react";
import { useFontSize } from "@/hooks/useFontSize";

/** 📖 Theory વાંચતી વખતે અક્ષરનું માપ બદલવાનું નિયંત્રણ */
export function FontSizeControl() {
  const { label, increase, decrease, canIncrease, canDecrease, mounted } =
    useFontSize();

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-[var(--stroke)] bg-[var(--surface-2)] p-0.5">
      <button
        type="button"
        onClick={decrease}
        disabled={!canDecrease}
        aria-label="અક્ષર નાના કરો"
        className="grid h-6 w-6 place-items-center rounded-full text-[var(--fg)] transition-colors hover:bg-[var(--surface-solid)] disabled:opacity-35"
      >
        <Minus size={12} strokeWidth={2.6} />
      </button>
      <span className="flex min-w-[58px] items-center justify-center gap-1 text-[0.68rem] font-semibold text-[var(--fg-muted)]">
        <Type size={11} strokeWidth={2.4} />
        {mounted ? label : "અક્ષર"}
      </span>
      <button
        type="button"
        onClick={increase}
        disabled={!canIncrease}
        aria-label="અક્ષર મોટા કરો"
        className="grid h-6 w-6 place-items-center rounded-full text-[var(--fg)] transition-colors hover:bg-[var(--surface-solid)] disabled:opacity-35"
      >
        <Plus size={12} strokeWidth={2.6} />
      </button>
    </div>
  );
}
