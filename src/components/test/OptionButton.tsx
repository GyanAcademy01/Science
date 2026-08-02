"use client";

import { Check, X } from "lucide-react";
import { cn, OPTION_LABELS } from "@/lib/utils";

interface OptionButtonProps {
  index: number;
  text: string;
  selected: boolean;
  isCorrect: boolean;
  revealed: boolean;
  onSelect: () => void;
}

export function OptionButton({
  index,
  text,
  selected,
  isCorrect,
  revealed,
  onSelect,
}: OptionButtonProps) {
  const showAsCorrect = revealed && isCorrect;
  const showAsWrong = revealed && selected && !isCorrect;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={revealed}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-xl sm:rounded-full border px-3.5 py-2 sm:px-4.5 sm:py-2.5 text-start text-xs sm:text-sm font-bold transition-all duration-200 shadow-2xs",
        // Default / unselected state
        !revealed && !selected && "border-zinc-200/90 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:shadow-xs active:scale-[0.99]",
        // Selected before reveal
        !revealed && selected && "border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-xs shadow-indigo-500/10 ring-2 ring-indigo-500/20",
        // Revealed correct
        showAsCorrect && "border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 shadow-xs shadow-emerald-500/15 anim-correct",
        // Revealed wrong
        showAsWrong && "border-rose-500 bg-rose-50/90 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 shadow-xs shadow-rose-500/15 anim-wrong",
        revealed && "cursor-default"
      )}
    >
      <span
        className={cn(
          "grid h-6.5 w-6.5 sm:h-7 sm:w-7 shrink-0 place-items-center rounded-full text-[0.7rem] sm:text-xs font-black transition-all duration-200 border",
          showAsCorrect
            ? "bg-emerald-500 border-emerald-500 text-white shadow-2xs"
            : showAsWrong
              ? "bg-rose-500 border-rose-500 text-white shadow-2xs"
              : selected
                ? "bg-indigo-600 border-indigo-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200/80 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-zinc-600"
        )}
      >
        {showAsCorrect ? (
          <Check size={14} strokeWidth={3} />
        ) : showAsWrong ? (
          <X size={14} strokeWidth={3} />
        ) : (
          OPTION_LABELS[index]
        )}
      </span>
      <span className="flex-1 leading-snug">{text}</span>
    </button>
  );
}
