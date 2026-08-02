"use client";

import type { TestQuestion } from "@/types/test";
import { OptionButton } from "./OptionButton";
import { ExplanationPanel } from "./ExplanationPanel";
import { toGujaratiDigits } from "@/lib/utils";

interface QuestionCardProps {
  question: TestQuestion;
  position: number;
  answer: number | null;
  onAnswer: (index: number) => void;
}

export function QuestionCard({
  question,
  position,
  answer,
  onAnswer,
}: QuestionCardProps) {
  const revealed = answer !== null;
  const wasRight = answer === question.correctAnswer;
  const lines = question.question.split("\n");

  // Format question number with leading zero (01, 02, 03...)
  const formattedNum = position < 10 ? `0${position}` : `${position}`;
  const gujaratiNum = toGujaratiDigits(formattedNum);

  return (
    <div key={question.id} className="anim-fade-up flex flex-col gap-4">
      {/* 🚀 Vibrant Green Question Banner Box matching Maths screenshot */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 p-4 sm:p-5.5 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-3.5 sm:gap-4">
        {/* Subtle decorative glow overlay */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 blur-xl pointer-events-none rounded-full" />

        {/* Question Number Box */}
        <div className="flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-teal-700/40 border border-white/20 text-xl sm:text-2xl font-black text-white shadow-inner">
          {gujaratiNum}
        </div>

        {/* Question Text */}
        <h2 className="flex-1 text-sm sm:text-base md:text-lg font-bold leading-relaxed text-white">
          {lines.map((line, index) => (
            <span key={`${question.id}-l${index}`} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* 🎯 Options List (Full Width Single Column Cards matching Maths screenshot) */}
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {question.options.map((option, index) => (
          <OptionButton
            key={`${question.id}-o${index}`}
            index={index}
            text={option}
            selected={answer === index}
            isCorrect={index === question.correctAnswer}
            revealed={revealed}
            onSelect={() => onAnswer(index)}
          />
        ))}
      </div>

      {revealed && (
        <ExplanationPanel
          correctIndex={question.correctAnswer}
          correctText={question.options[question.correctAnswer]}
          explanation={question.explanation}
          wasRight={wasRight}
        />
      )}
    </div>
  );
}
