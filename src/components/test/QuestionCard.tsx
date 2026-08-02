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

// 🎨 Dynamic Vibrant Color Schemes for Question Header Banners
const QUESTION_BANNER_SCHEMES = [
  {
    // 1. Vibrant Green / Emerald / Teal (Q1, Q6, Q11...)
    bannerBg: "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500",
    shadow: "shadow-emerald-500/20",
    numBg: "bg-teal-700/40 border-white/20",
  },
  {
    // 2. Vibrant Indigo / Violet / Purple (Q2, Q7, Q12...)
    bannerBg: "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500",
    shadow: "shadow-indigo-500/20",
    numBg: "bg-purple-800/40 border-white/20",
  },
  {
    // 3. Vibrant Blue / Cyan (Q3, Q8, Q13...)
    bannerBg: "bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500",
    shadow: "shadow-cyan-500/20",
    numBg: "bg-blue-800/40 border-white/20",
  },
  {
    // 4. Vibrant Amber / Orange / Coral (Q4, Q9, Q14...)
    bannerBg: "bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500",
    shadow: "shadow-orange-500/20",
    numBg: "bg-orange-800/40 border-white/20",
  },
  {
    // 5. Vibrant Rose / Pink / Crimson (Q5, Q10, Q15...)
    bannerBg: "bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500",
    shadow: "shadow-rose-500/20",
    numBg: "bg-rose-800/40 border-white/20",
  },
];

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

  // Dynamic color scheme selection based on question position
  const scheme = QUESTION_BANNER_SCHEMES[(position - 1) % QUESTION_BANNER_SCHEMES.length];

  return (
    <div key={question.id} className="anim-fade-up flex flex-col gap-3.5 sm:gap-4">
      {/* 🚀 Dynamic Vibrant Question Banner Box matching Maths screenshot capsule shape */}
      <div
        className={`relative overflow-hidden rounded-2xl sm:rounded-full ${scheme.bannerBg} px-4 py-3 sm:px-6 sm:py-3.5 text-white shadow-lg ${scheme.shadow} flex items-center gap-3 sm:gap-4 transition-all duration-300`}
      >
        {/* Decorative glow overlay */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 blur-xl pointer-events-none rounded-full" />

        {/* Question Number Box */}
        <div
          className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-full ${scheme.numBg} border text-lg sm:text-xl font-black text-white shadow-inner`}
        >
          {gujaratiNum}
        </div>

        {/* Question Text */}
        <h2 className="flex-1 text-sm sm:text-base font-extrabold leading-snug text-white">
          {lines.map((line, index) => (
            <span key={`${question.id}-l${index}`} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* 🎯 Options List (Full Width Single Column Cards matching Maths screenshot) */}
      <div className="flex flex-col gap-2.5">
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
