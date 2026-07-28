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

  const style: React.CSSProperties = showAsCorrect
    ? { background: "var(--ok-soft)", borderColor: "var(--ok)" }
    : showAsWrong
      ? { background: "var(--bad-soft)", borderColor: "var(--bad)" }
      : selected
        ? { background: "var(--surface-2)", borderColor: "var(--stroke-strong)" }
        : { background: "var(--surface-2)", borderColor: "var(--stroke)" };

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={revealed}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-3 rounded-[var(--r-md)] border p-3 text-start text-[0.92rem] font-medium transition-all duration-300 sm:p-3.5 sm:text-[0.98rem]",
        !revealed && "hover:border-[var(--stroke-strong)] active:scale-[0.99]",
        revealed && "cursor-default",
        showAsCorrect && "anim-correct",
        showAsWrong && "anim-wrong",
      )}
      style={style}
    >
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.85rem] font-extrabold"
        style={
          showAsCorrect
            ? { background: "var(--ok)", color: "#fff" }
            : showAsWrong
              ? { background: "var(--bad)", color: "#fff" }
              : { background: "var(--surface-solid)", color: "var(--fg-muted)" }
        }
      >
        {showAsCorrect ? (
          <Check size={16} strokeWidth={3} />
        ) : showAsWrong ? (
          <X size={16} strokeWidth={3} />
        ) : (
          OPTION_LABELS[index]
        )}
      </span>
      <span className="flex-1">{text}</span>
    </button>
  );
}
