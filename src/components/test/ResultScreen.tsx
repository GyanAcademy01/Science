"use client";

import { RotateCcw, LayoutGrid, BookOpen } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { toGujaratiDigits } from "@/lib/utils";

interface ResultScreenProps {
  correct: number;
  total: number;
  subjectId: string;
  topicId: string;
  onRetry: () => void;
}

const RADIUS = 66;
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
}: ResultScreenProps) {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const wrong = total - correct;
  const { text, emoji } = verdict(percent);
  const offset = CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;

  const stats = [
    { label: "સાચા", value: correct, color: "var(--ok)" },
    { label: "ખોટા", value: wrong, color: "var(--bad)" },
    { label: "ટકા", value: `${percent}%`, color: "var(--brand-2)" },
  ];

  return (
    <div className="anim-fade-up flex flex-col items-center text-center">
      <p className="text-[2.4rem] leading-none">{emoji}</p>
      <h2 className="mt-2 text-[1.3rem] font-extrabold sm:text-[1.5rem]">{text}</h2>

      <div className="relative my-5">
        <svg width="160" height="160" viewBox="0 0 160 160" role="img" aria-label={`સ્કોર ${percent} ટકા`}>
          <defs>
            <linearGradient id="score-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke="var(--surface-2)"
            strokeWidth="12"
          />
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke="url(#score-ring)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 80 80)"
            className="anim-ring"
            style={{ ["--ring-len" as string]: `${CIRCUMFERENCE}` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <p className="text-[1.9rem] font-extrabold leading-none">
              {toGujaratiDigits(correct)}
              <span className="text-[1.1rem] text-[var(--fg-muted)]">
                /{toGujaratiDigits(total)}
              </span>
            </p>
            <p className="mt-1 text-[0.78rem] font-semibold text-[var(--fg-muted)]">
              સાચા જવાબ
            </p>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-3 gap-2.5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[var(--r-md)] p-3"
            style={{ background: "var(--surface-2)" }}
          >
            <p className="text-[1.15rem] font-extrabold" style={{ color: stat.color }}>
              {typeof stat.value === "number"
                ? toGujaratiDigits(stat.value)
                : stat.value}
            </p>
            <p className="text-[0.75rem] font-semibold text-[var(--fg-muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
        <Button onClick={onRetry} variant="solid" size="md">
          <RotateCcw size={16} strokeWidth={2.4} />
          ફરી આપો
        </Button>
        <LinkButton
          href={`/chapter/${subjectId}/${topicId}/test`}
          variant="outline"
          size="md"
        >
          <LayoutGrid size={16} strokeWidth={2.4} />
          બીજો સેટ
        </LinkButton>
        <LinkButton
          href={`/chapter/${subjectId}/${topicId}/theory`}
          variant="ghost"
          size="md"
        >
          <BookOpen size={16} strokeWidth={2.4} />
          થિયરી વાંચો
        </LinkButton>
      </div>
    </div>
  );
}
