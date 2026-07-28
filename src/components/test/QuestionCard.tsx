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

  return (
    <div key={question.id} className="anim-fade-up">
      <div className="flex gap-2.5">
        <span
          className="select-none font-extrabold leading-none opacity-15"
          style={{ fontSize: "1.9rem" }}
          aria-hidden
        >
          {toGujaratiDigits(position)}
        </span>
        <h2 className="flex-1 pt-0.5 text-[0.9rem] font-bold leading-relaxed sm:text-[0.98rem]">
          {lines.map((line, index) => (
            <span key={`${question.id}-l${index}`} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className="mt-3 grid gap-2 lg:grid-cols-2">
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
