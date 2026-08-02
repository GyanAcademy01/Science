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
  const isAnswered = revealed;
  let btnStyles = "bg-white border-slate-100 text-slate-800";
  let badgeStyles = "bg-slate-50 border-slate-200 text-slate-400";

  if (isAnswered) {
    if (isCorrect) {
      btnStyles = "bg-emerald-50 border-emerald-300 ring-1 ring-emerald-100 text-emerald-700 shadow-lg shadow-emerald-100/50";
      badgeStyles = "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30 ring-0";
    } else if (selected) {
      btnStyles = "bg-red-50 border-red-300 ring-1 ring-red-100 text-red-700 shadow-lg shadow-red-100/50";
      badgeStyles = "bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/30 ring-0";
    } else {
      btnStyles = "bg-white opacity-40 border-slate-100 text-slate-300 pointer-events-none";
      badgeStyles = "bg-slate-50 border-slate-100 text-slate-300 ring-0 shadow-none";
    }
  } else if (selected) {
    btnStyles = "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/30";
    badgeStyles = "bg-white text-indigo-600 border-transparent";
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={revealed}
      aria-pressed={selected}
      className={`w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border-2 flex items-center gap-3 font-bold group/opt relative transition-all duration-200 ${btnStyles}`}
    >
      {/* Inner Glow for active selection */}
      {!isAnswered && selected && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none rounded-xl" />
      )}

      <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[0.8rem] font-black shrink-0 border-2 ${badgeStyles}`}>
        {OPTION_LABELS[index]}
      </span>

      <span className="flex-1 leading-snug">{text}</span>

      {/* Success/Error checkmark placeholder */}
      {isAnswered && isCorrect && selected && (
        <span className="ml-auto text-xl">✅</span>
      )}
      {isAnswered && !isCorrect && selected && (
        <span className="ml-auto text-xl">❌</span>
      )}
    </button>
  );
}
