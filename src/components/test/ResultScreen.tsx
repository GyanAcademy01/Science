"use client";

import { useState } from "react";
import { RotateCcw, LayoutGrid, BookOpen, CheckCircle2, XCircle, HelpCircle, Lightbulb } from "lucide-react";
import type { TestQuestion } from "@/types/test";
import { Button, LinkButton } from "@/components/ui/Button";
import { toGujaratiDigits } from "@/lib/utils";

interface ResultScreenProps {
  correct: number;
  total: number;
  subjectId: string;
  topicId: string;
  onRetry: () => void;
  questions?: TestQuestion[];
  userAnswers?: (number | null)[];
}

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function verdict(percent: number): { text: string; emoji: string } {
  if (percent >= 90) return { text: "શાનદાર! ખૂબ સરસ", emoji: "🏆" };
  if (percent >= 70) return { text: "સરસ કામ", emoji: "🎉" };
  if (percent >= 50) return { text: "ઠીક છે, વધુ મહેનત કરો", emoji: "💪" };
  return { text: "થિયરી ફરી વાંચો", emoji: "📖" };
}

export function ResultScreen({
  correct,
  total,
  subjectId,
  topicId,
  onRetry,
  questions = [],
  userAnswers = [],
}: ResultScreenProps) {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const wrong = total - correct;
  const { text, emoji } = verdict(percent);
  const offset = CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;

  const [filter, setFilter] = useState<"all" | "correct" | "wrong">("all");

  const stats = [
    { label: "સાચા", value: correct, color: "var(--ok)" },
    { label: "ખોટા", value: wrong, color: "var(--bad)" },
    { label: "ટકા", value: `${percent}%`, color: "var(--brand-2)" },
  ];

  const filteredQuestions = questions.map((q, idx) => ({
    q,
    idx,
    userAns: userAnswers[idx] ?? null,
    isCorrect: userAnswers[idx] !== null && userAnswers[idx] === q.correctAnswer,
  })).filter((item) => {
    if (filter === "correct") return item.isCorrect;
    if (filter === "wrong") return !item.isCorrect;
    return true;
  });

  return (
    <div className="anim-fade-up flex flex-col items-center text-center">
      {/* Verdict Header */}
      <p className="text-[1.9rem] leading-none">{emoji}</p>
      <h2 className="mt-1.5 text-[1.1rem] font-extrabold sm:text-[1.25rem]">{text}</h2>

      {/* Progress Ring */}
      <div className="relative my-4">
        <svg width="124" height="124" viewBox="0 0 124 124" role="img" aria-label={`સ્કોર ${percent} ટકા`}>
          <defs>
            <linearGradient id="score-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <circle
            cx="62"
            cy="62"
            r={RADIUS}
            fill="none"
            stroke="var(--surface-2)"
            strokeWidth="9"
          />
          <circle
            cx="62"
            cy="62"
            r={RADIUS}
            fill="none"
            stroke="url(#score-ring)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 62 62)"
            className="anim-ring"
            style={{ ["--ring-len" as string]: `${CIRCUMFERENCE}` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <p className="text-[1.55rem] font-extrabold leading-none">
              {toGujaratiDigits(correct)}
              <span className="text-[0.92rem] text-[var(--fg-muted)]">
                /{toGujaratiDigits(total)}
              </span>
            </p>
            <p className="mt-0.5 text-[0.7rem] font-semibold text-[var(--fg-muted)]">
              સાચા જવાબ
            </p>
          </div>
        </div>
      </div>

      {/* Stats Breakdown */}
      <div className="grid w-full grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[var(--r-md)] p-2.5"
            style={{ background: "var(--surface-2)" }}
          >
            <p className="text-[1rem] font-extrabold" style={{ color: stat.color }}>
              {typeof stat.value === "number"
                ? toGujaratiDigits(stat.value)
                : stat.value}
            </p>
            <p className="text-[0.7rem] font-semibold text-[var(--fg-muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <Button onClick={onRetry} variant="solid" size="md">
          <RotateCcw size={14} strokeWidth={2.4} />
          ફરી આપો
        </Button>
        <LinkButton
          href={`/chapter/${subjectId}/${topicId}/test`}
          variant="outline"
          size="md"
        >
          <LayoutGrid size={14} strokeWidth={2.4} />
          બીજો સેટ
        </LinkButton>
        <LinkButton
          href={`/chapter/${subjectId}/${topicId}/theory`}
          variant="ghost"
          size="md"
        >
          <BookOpen size={14} strokeWidth={2.4} />
          થિયરી વાંચો
        </LinkButton>
      </div>

      {/* 🔍 Questions Review Section */}
      {questions.length > 0 && (
        <section className="mt-8 w-full border-t border-[var(--stroke)] pt-6 text-start">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-[var(--fg)] flex items-center gap-1.5">
                📝 પ્રશ્નોત્તરી ચકાસણી (Questions Review)
              </h3>
              <p className="text-xs text-[var(--fg-muted)] mt-0.5">
                દરેક પ્રશ્નનો તમારો જવાબ અને સાચો જવાબ ચકાસો
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-[var(--surface-2)] p-1 rounded-full border border-[var(--stroke)] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  filter === "all"
                    ? "bg-[var(--brand-1)] text-white"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                બધા ({toGujaratiDigits(questions.length)})
              </button>
              <button
                type="button"
                onClick={() => setFilter("correct")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  filter === "correct"
                    ? "bg-emerald-600 text-white"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                સાચા ({toGujaratiDigits(correct)})
              </button>
              <button
                type="button"
                onClick={() => setFilter("wrong")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  filter === "wrong"
                    ? "bg-rose-600 text-white"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                ખોટા ({toGujaratiDigits(wrong)})
              </button>
            </div>
          </div>

          {/* Question Review Cards */}
          <div className="space-y-3">
            {filteredQuestions.map(({ q, idx, userAns, isCorrect }) => (
              <div
                key={q.id}
                className={`rounded-2xl border p-4 transition-all ${
                  isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10"
                    : userAns !== null
                    ? "border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10"
                    : "border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[var(--fg)]">
                      પ્રશ્ન {toGujaratiDigits(idx + 1)}.
                    </span>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={12} /> સાચો જવાબ
                      </span>
                    ) : userAns !== null ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                        <XCircle size={12} /> ખોટો જવાબ
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                        <HelpCircle size={12} /> જવાબ ન આપ્યો
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <p className="mt-2 text-sm font-semibold text-[var(--fg)]">
                  {q.question}
                </p>

                {/* Options List */}
                <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {q.options.map((opt, optionIdx) => {
                    const isUserChoice = userAns === optionIdx;
                    const isRightChoice = q.correctAnswer === optionIdx;

                    let optionStyle = "border-[var(--stroke)] bg-[var(--surface)] text-[var(--fg-muted)]";
                    if (isRightChoice) {
                      optionStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold";
                    } else if (isUserChoice && !isRightChoice) {
                      optionStyle = "border-rose-500 bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold line-through";
                    }

                    return (
                      <div
                        key={`${q.id}-${optionIdx}`}
                        className={`flex items-center justify-between rounded-xl border px-3 py-2 text-xs transition-colors ${optionStyle}`}
                      >
                        <span>
                          {toGujaratiDigits(optionIdx + 1)}. {opt}
                        </span>
                        {isRightChoice && (
                          <span className="text-[0.68rem] font-bold text-emerald-600 dark:text-emerald-400 ml-1">
                            ✓ સાચો
                          </span>
                        )}
                        {isUserChoice && !isRightChoice && (
                          <span className="text-[0.68rem] font-bold text-rose-600 dark:text-rose-400 ml-1">
                            ✕ તમારો જવાબ
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="mt-3 flex items-start gap-2 rounded-xl bg-[var(--surface-2)] p-2.5 text-xs text-[var(--fg-muted)] border border-[var(--stroke)]">
                    <Lightbulb size={14} className="shrink-0 text-amber-500 mt-0.5" />
                    <div>
                      <span className="font-bold text-[var(--fg)]">સમજૂતી: </span>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
