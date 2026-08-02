"use client";

import Link from "next/link";
import { ArrowRight, Trophy, Play, CheckCircle2, ClipboardCheck } from "lucide-react";
import type { TestSet } from "@/types/test";
import { useBestPercent } from "@/hooks/useBestPercent";
import { toGujaratiDigits } from "@/lib/utils";

interface TestSetGridProps {
  sets: TestSet[];
  subjectId: string;
  topicId: string;
}

interface TestSetCardProps {
  set: TestSet;
  subjectId: string;
  topicId: string;
  index: number;
}

function TestSetCard({ set, subjectId, topicId, index }: TestSetCardProps) {
  const percent = useBestPercent(subjectId, topicId, set.setId);

  const getScoreBadge = () => {
    if (percent === null) return null;
    
    if (percent >= 80) {
      return (
        <span className="inline-flex h-9 sm:h-10 items-center gap-1 sm:gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 sm:px-3.5 text-[11px] sm:text-xs font-extrabold text-emerald-600 dark:text-emerald-400 shadow-xs">
          <Trophy size={13} className="text-emerald-500" /> {toGujaratiDigits(percent)}%
        </span>
      );
    }
    if (percent >= 50) {
      return (
        <span className="inline-flex h-9 sm:h-10 items-center gap-1 sm:gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 sm:px-3.5 text-[11px] sm:text-xs font-bold text-cyan-600 dark:text-cyan-400 shadow-xs">
          <CheckCircle2 size={13} className="text-cyan-500" /> {toGujaratiDigits(percent)}%
        </span>
      );
    }
    return (
      <span className="inline-flex h-9 sm:h-10 items-center gap-1 sm:gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 sm:px-3.5 text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-400 shadow-xs">
        {toGujaratiDigits(percent)}%
      </span>
    );
  };

  return (
    <Link
      href={`/chapter/${subjectId}/${topicId}/test/${set.setId}`}
      className="group relative flex items-center justify-between p-2 pr-4 sm:p-2.5 sm:pr-5 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/60 dark:hover:border-teal-500/60 hover:shadow-xl hover:shadow-teal-500/10 anim-fade-up w-full"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-r-full" />

      {/* Left side: Icon + Texts */}
      <div className="flex items-center gap-3 relative z-10 overflow-hidden">
        {/* Circle Icon */}
        <div className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-purple-600 dark:text-purple-400 transition-colors duration-300 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 group-hover:border-teal-200 dark:group-hover:border-teal-800/50">
          <ClipboardCheck size={22} strokeWidth={2.2} className="group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center min-w-0 py-1">
          <h3 className="text-[14px] sm:text-[15px] font-black text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate">
            ટેસ્ટ {toGujaratiDigits(set.setNumber)}
          </h3>
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate mt-0.5 flex items-center gap-1.5">
            <span className="shrink-0">{toGujaratiDigits(set.totalQuestions)} પ્રશ્નો</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0"></span>
            <span className="truncate">{set.range}</span>
          </p>
        </div>
      </div>

      {/* Right side: Play/Score */}
      <div className="flex items-center gap-2 relative z-10 shrink-0 ml-2">
        {percent === null ? (
          <div className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-all shadow-xs">
            <Play size={16} className="fill-current ml-0.5" />
          </div>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {getScoreBadge()}
            <div className="hidden sm:grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-xs">
              <ArrowRight size={16} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

/** 🧪 ૧ કોલમ (Vertical Card List - Capsule Design) layout */
export function TestSetGrid({ sets, subjectId, topicId }: TestSetGridProps) {
  return (
    <div className="flex flex-col gap-3 max-w-md mx-auto w-full px-2 sm:px-0">
      {sets.map((set, index) => (
        <TestSetCard
          key={set.setId}
          set={set}
          subjectId={subjectId}
          topicId={topicId}
          index={index}
        />
      ))}
    </div>
  );
}

