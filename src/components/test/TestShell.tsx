"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Play, Flag } from "lucide-react";
import type { TestSet } from "@/types/test";
import { BackArrow } from "@/components/common/BackArrow";
import { QuestionCard } from "./QuestionCard";
import { ResultScreen } from "./ResultScreen";
import { saveBestResult } from "@/lib/progress";
import { toGujaratiDigits } from "@/lib/utils";

interface TestShellProps {
  set: TestSet;
  subjectId: string;
  topicId: string;
  chapterTitle: string;
}

export function TestShell({
  set,
  subjectId,
  topicId,
  chapterTitle,
}: TestShellProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array<number | null>(set.questions.length).fill(null),
  );
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const correctCount = useMemo(
    () =>
      answers.reduce<number>(
        (sum, answer, i) =>
          answer !== null && answer === set.questions[i].correctAnswer
            ? sum + 1
            : sum,
        0,
      ),
    [answers, set.questions],
  );

  const attempted = answers.filter((a) => a !== null).length;
  const isLast = index === set.questions.length - 1;
  const progressPct = Math.round(((index + 1) / set.questions.length) * 100);

  // Parse chapter number for header badge if available
  const setNum = set.setId.replace(/\D/g, "") || "1";

  const handleAnswer = useCallback(
    (choice: number) => {
      setAnswers((current) => {
        if (current[index] !== null) return current;
        const next = [...current];
        next[index] = choice;
        return next;
      });
    },
    [index],
  );

  const finish = useCallback(() => {
    const finalCorrect = answers.reduce<number>(
      (sum, answer, i) =>
        answer !== null && answer === set.questions[i].correctAnswer
          ? sum + 1
          : sum,
      0,
    );
    saveBestResult(
      subjectId,
      topicId,
      set.setId,
      finalCorrect,
      set.questions.length,
    );
    setFinished(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [answers, set.questions, set.setId, subjectId, topicId]);

  const retry = useCallback(() => {
    setAnswers(Array<number | null>(set.questions.length).fill(null));
    setIndex(0);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [set.questions.length]);

  const backHref = `/chapter/${subjectId}/${topicId}/test`;

  return (
    <main className="mx-auto w-full max-w-[900px] px-3 py-3 sm:px-4 sm:py-5">
      {/* 🚀 Top Bar Header matching Maths screenshot */}
      <div className="relative mb-5 flex min-h-[44px] items-center justify-between">
        {/* Left: 3D Tactical Red Back Arrow button */}
        <BackArrow href={backHref} label="સેટ બદલો" />

        {/* Center: Top Pill Header Badges */}
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-purple-200 dark:border-purple-800/60 bg-purple-100/90 dark:bg-purple-950/80 px-3 py-1 text-xs font-black text-purple-600 dark:text-purple-300 uppercase tracking-wide">
            {set.title.toUpperCase()}
          </span>
          <span className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1 text-xs font-bold text-zinc-700 dark:text-zinc-200 max-w-[180px] sm:max-w-[280px] truncate">
            {chapterTitle} 🧍
          </span>
        </div>

        {/* Right spacing balance */}
        <div className="w-10 sm:w-12 hidden sm:block" />
      </div>

      {/* 🌟 Main Floating Card Container matching Maths screenshot */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-4 sm:p-6.5 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/60">
        {finished ? (
          <ResultScreen
            correct={correctCount}
            total={set.questions.length}
            subjectId={subjectId}
            topicId={topicId}
            onRetry={retry}
            questions={set.questions}
            userAnswers={answers}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {/* Question Card View */}
            <QuestionCard
              question={set.questions[index]}
              position={index + 1}
              answer={answers[index]}
              onAnswer={handleAnswer}
            />

            {/* 📊 Bottom Progress Info & Line Bar matching Maths screenshot */}
            <div className="mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center justify-between text-[0.72rem] sm:text-[0.76rem] font-black tracking-widest uppercase">
                <span className="text-indigo-600 dark:text-indigo-400">
                  PROGRESS: {index + 1} / {set.questions.length}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {progressPct}%
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 shadow-xs shadow-indigo-500/50 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* 🎯 Navigation Controls Bar matching Maths screenshot */}
            <div className="mt-1 flex items-center justify-between gap-3">
              {/* Back Circle Arrow */}
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-xs"
                title="અગાઉનો પ્રશ્ન"
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
              </button>

              {/* Middle Skip Pill Button */}
              <button
                type="button"
                onClick={() =>
                  setIndex((i) => Math.min(set.questions.length - 1, i + 1))
                }
                disabled={isLast}
                className="flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-6 sm:px-10 py-3 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-all shadow-xs disabled:opacity-40"
              >
                <Play size={13} fill="currentColor" strokeWidth={2} />
                <span>Skip</span>
              </button>

              {/* Right Prominent Next / Finish Button */}
              {isLast ? (
                <button
                  type="button"
                  onClick={finish}
                  className="flex flex-1 sm:max-w-[320px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all"
                >
                  <Flag size={16} strokeWidth={2.5} />
                  <span>પરિણામ જુઓ</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setIndex((i) => Math.min(set.questions.length - 1, i + 1))
                  }
                  className="flex flex-1 sm:max-w-[320px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all"
                >
                  <span>Next</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
