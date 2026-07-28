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
    if (percent === null) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-1)]/10 border border-[var(--brand-1)]/30 px-2.5 py-0.5 text-xs font-bold text-[var(--brand-1)] transition-colors group-hover:bg-[var(--brand-1)] group-hover:text-white">
          <Play size={11} className="fill-current" /> શરૂ કરો
        </span>
      );
    }
    if (percent >= 80) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
          <Trophy size={12} /> {toGujaratiDigits(percent)}%
        </span>
      );
    }
    if (percent >= 50) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-bold text-cyan-600 dark:text-cyan-400">
          <CheckCircle2 size={12} /> {toGujaratiDigits(percent)}%
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
        {toGujaratiDigits(percent)}%
      </span>
    );
  };

  return (
    <Link
      href={`/chapter/${subjectId}/${topicId}/test/${set.setId}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] p-3.5 sm:p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--stroke-strong)] hover:shadow-lg anim-fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:scale-110 shadow-sm">
            <ClipboardCheck size={20} strokeWidth={2.2} />
          </div>
          <span className="rounded-full bg-[var(--surface-2)] border border-[var(--stroke)] px-2.5 py-0.5 text-[0.68rem] font-bold text-[var(--fg-muted)]">
            {toGujaratiDigits(set.totalQuestions)} પ્રશ્નો
          </span>
        </div>

        {/* Title & Range */}
        <div className="mt-3">
          <h3 className="text-sm font-extrabold text-[var(--fg)] group-hover:text-[var(--brand-1)] transition-colors">
            ટેસ્ટ {toGujaratiDigits(set.setNumber)}
          </h3>
          <p className="mt-0.5 text-xs text-[var(--fg-muted)] font-medium">
            {set.range}
          </p>
        </div>
      </div>

      {/* Footer / Score Action */}
      <div className="relative z-10 mt-4 pt-2.5 border-t border-[var(--stroke)] flex items-center justify-between">
        {getScoreBadge()}
        <ArrowRight size={14} className="text-[var(--fg-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand-1)]" />
      </div>
    </Link>
  );
}

/** 🧪 દરેક સેટ = Test Card */
export function TestSetGrid({ sets, subjectId, topicId }: TestSetGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
