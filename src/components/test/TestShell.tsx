"use client";

import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import type { TestSet } from "@/types/test";
import { Button } from "@/components/ui/Button";
import { BackArrow } from "@/components/common/BackArrow";
import { LiquidProgress } from "./LiquidProgress";
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
  const wrongCount = attempted - correctCount;
  const isLast = index === set.questions.length - 1;

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
    <main className="mx-auto w-full max-w-[860px] px-2.5 py-3 sm:px-3 sm:py-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <BackArrow href={backHref} label="સેટ બદલો" />
        <p className="truncate text-[0.76rem] font-semibold text-[var(--fg-muted)]">
          {chapterTitle} · {set.title}
        </p>
      </div>

      <section className="card p-3 sm:rounded-[var(--r-xl)] sm:p-5">
        {finished ? (
          <ResultScreen
            correct={correctCount}
            total={set.questions.length}
            subjectId={subjectId}
            topicId={topicId}
            onRetry={retry}
          />
        ) : (
          <>
            <div className="mb-1.5 flex items-center justify-between text-[0.74rem] font-semibold">
              <span className="text-[var(--fg-muted)]">
                પ્રશ્ન {toGujaratiDigits(index + 1)} /{" "}
                {toGujaratiDigits(set.questions.length)}
              </span>
              <span className="flex gap-2.5">
                <span style={{ color: "var(--ok)" }}>
                  ✓ {toGujaratiDigits(correctCount)}
                </span>
                <span style={{ color: "var(--bad)" }}>
                  ✕ {toGujaratiDigits(wrongCount)}
                </span>
              </span>
            </div>

            <LiquidProgress current={attempted} total={set.questions.length} />

            <div className="mt-3.5">
              <QuestionCard
                question={set.questions[index]}
                position={index + 1}
                answer={answers[index]}
                onAnswer={handleAnswer}
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 border-t border-[var(--stroke)] pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
              >
                <ChevronLeft size={14} strokeWidth={2.6} />
                પાછળ
              </Button>

              {isLast ? (
                <Button variant="solid" size="sm" onClick={finish}>
                  <Flag size={13} strokeWidth={2.6} />
                  પરિણામ જુઓ
                </Button>
              ) : (
                <Button
                  variant="solid"
                  size="sm"
                  onClick={() =>
                    setIndex((i) => Math.min(set.questions.length - 1, i + 1))
                  }
                >
                  આગળ
                  <ChevronRight size={14} strokeWidth={2.6} />
                </Button>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
