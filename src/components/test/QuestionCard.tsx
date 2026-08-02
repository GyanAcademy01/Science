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
    <div key={question.id} className="anim-fade-up flex flex-col gap-2.5 sm:gap-3">
      {/* 🚀 Vibrant Teal-Green Question Banner Box (Same to same as Maths project) */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 px-3.5 py-2 sm:px-5 sm:py-2.5 text-white shadow-md shadow-emerald-500/15 flex items-center gap-2.5 sm:gap-3 transition-all duration-300">
        {/* Decorative glow overlay */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 blur-xl pointer-events-none rounded-full" />

        {/* Question Number Box */}
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-full bg-teal-700/40 border border-white/20 text-sm sm:text-base font-black text-white shadow-inner">
          {gujaratiNum}
        </div>

        {/* Question Text */}
        <h2 className="flex-1 text-xs sm:text-sm font-extrabold leading-snug text-white">
          {lines.map((line, index) => (
            <span key={`${question.id}-l${index}`} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* 🎯 Options List (Compact Full Width Single Column Cards) */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
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
