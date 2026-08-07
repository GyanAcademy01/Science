"use client";

import { useCallback, useMemo, useState } from "react";
import { Flag } from "lucide-react";
import type { TestSet } from "@/types/test";
import { BackArrow } from "@/components/common/BackArrow";
import { QuestionCard } from "./QuestionCard";
import { ResultScreen } from "./ResultScreen";
import { saveBestResult } from "@/lib/progress";
import { toGujaratiDigits } from "@/lib/utils";
import { playCorrectSound, playWrongSound } from "@/lib/sounds";

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

  const isLast = index === set.questions.length - 1;
  const progressPct = Math.round(((index + 1) / set.questions.length) * 100);

  const handleAnswer = useCallback(
    (choice: number) => {
      setAnswers((current) => {
        if (current[index] !== null) return current;
        
        const isRight = choice === set.questions[index].correctAnswer;
        if (isRight) {
          playCorrectSound();
        } else {
          playWrongSound();
        }

        const next = [...current];
        next[index] = choice;
        return next;
      });
    },
    [index, set.questions],
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
    <main className="mx-auto w-full max-w-[760px] px-2.5 py-2.5 sm:px-4 sm:py-4">
      {/* 🚀 Compact Top Bar Header */}
      <div className="relative mb-3.5 flex min-h-[40px] items-center justify-center px-2">
        {/* Left: Back Arrow button floating absolutely */}
        <div className="absolute left-0 top-0 sm:top-1/2 sm:-translate-y-1/2">
          <BackArrow href={backHref} label="સેટ બદલો" />
        </div>

        {/* Center: Top Info Title/Badges */}
        <div className="flex flex-col items-center justify-center pt-1 sm:pt-0">
          {/* Top row: Subject, Ch, Test Num */}
          <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5">
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-600 text-[0.65rem] sm:text-[0.7rem] font-black tracking-widest shadow-sm">
              {subjectId === 'pedagogy' ? 'વિજ્ઞાન પદ્ધતિશાસ્ત્ર' : `ધોરણ ${toGujaratiDigits(subjectId.replace(/\D/g, ''))}`}
            </span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-600 text-[0.65rem] sm:text-[0.7rem] font-black tracking-widest shadow-sm">
              પ્રકરણ {toGujaratiDigits(topicId.replace(/\D/g, ''))}
            </span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-500 text-[0.65rem] sm:text-[0.7rem] font-black tracking-widest shadow-sm">
              ટેસ્ટ {toGujaratiDigits(set.setId.replace(/\D/g, ''))}
            </span>
          </div>
          {/* Bottom row: Chapter Title */}
          <h1 className="text-[0.75rem] sm:text-[0.85rem] font-black text-slate-800 tracking-tight flex items-center gap-1 text-center max-w-[200px] sm:max-w-[280px] truncate">
            {chapterTitle} 🧍
          </h1>
        </div>
      </div>

      {/* 🌟 Compact Main Floating Card Container */}
      <section className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-slate-100 p-2.5 sm:p-3 relative overflow-hidden group">
        {/* Decorative glow */}
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/5 rounded-full opacity-50" />

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
          <div className="relative z-10 flex flex-col gap-3.5">
            {/* Question Card View */}
            <QuestionCard
              question={set.questions[index]}
              position={index + 1}
              answer={answers[index]}
              onAnswer={handleAnswer}
            />

            {/* 📊 Bottom Progress Info & Line Bar */}
            <div className="mt-2 border-t border-slate-100 pt-2">
              <div className="flex items-center justify-between mb-1.5 px-1">
                <span className="text-[0.7rem] font-black text-slate-400 tracking-widest uppercase">
                  Progress: {index + 1} / {set.questions.length}
                </span>
                <span className="text-[0.7rem] font-black text-indigo-600 tracking-widest uppercase">
                  {progressPct}%
                </span>
              </div>
              
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner mb-3">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(79,70,229,0.3)] transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* 🎯 Compact Navigation Controls Bar */}
              <div className="flex gap-3">
                {/* Back Circle Arrow */}
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center shrink-0 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shadow-sm"
                  title="અગાઉનો પ્રશ્ન"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Middle Skip Pill Button */}
                <button
                  type="button"
                  onClick={() =>
                    setIndex((i) => Math.min(set.questions.length - 1, i + 1))
                  }
                  disabled={isLast}
                  className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm flex items-center justify-center gap-1.5 sm:gap-2 group/skip"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 4 15 12 5 20 5 4"></polygon>
                    <line x1="19" y1="5" x2="19" y2="19"></line>
                  </svg>
                  {index < set.questions.length - 1 ? 'Skip' : 'Skip & Finish'}
                </button>

                {/* Right Prominent Next / Finish Button */}
                {isLast ? (
                  <button
                    type="button"
                    onClick={finish}
                    className="flex-[2] px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-1.5 sm:gap-2 group/next"
                  >
                    <span>પરિણામ જુઓ</span>
                    <Flag size={15} strokeWidth={2.5} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setIndex((i) => Math.min(set.questions.length - 1, i + 1))
                    }
                    className="flex-[2] px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-1.5 sm:gap-2 group/next"
                  >
                    <span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
