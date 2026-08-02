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

const Q_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
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
  
  // Pick a dynamic scheme based on position
  const qGrad = Q_GRADIENTS[(position - 1) % Q_GRADIENTS.length];

  return (
    <div key={question.id} className="anim-fade-up flex flex-col gap-2.5 sm:gap-3">
      {/* 🚀 Vibrant Dynamic Question Banner Box (Same to same as Maths project) */}
      <div 
        className="w-full px-3 py-3 sm:px-5 sm:py-4 rounded-[20px] relative shadow-xl overflow-hidden transition-all duration-300"
        style={{ background: qGrad }}
      >
        {/* Glossy overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.08) 100%)' }} />
        {/* Decorative circles */}
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -left-4 -bottom-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2.5 sm:gap-3">
          {/* Question Number */}
          <div className="text-white/30 text-[2rem] sm:text-[2.2rem] font-black leading-none tracking-tight flex-shrink-0">
            {gujaratiNum}
          </div>

          {/* Question Text */}
          <h2 className="text-white font-bold text-[0.95rem] sm:text-[1rem] leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] flex-1">
            {lines.map((line, index) => (
              <span key={`${question.id}-l${index}`} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
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
