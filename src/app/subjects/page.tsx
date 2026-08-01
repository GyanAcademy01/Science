import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { BackArrow } from "@/components/common/BackArrow";
import { subjects } from "@/lib/data";
import { toGujaratiDigits } from "@/lib/utils";

export const metadata: Metadata = {
  title: "વિષયો",
  description: "ધોરણ 6 થી 10 વિજ્ઞાન અને પદ્ધતિશાસ્ત્રના વિષયો અને પ્રકરણો.",
};

export default function SubjectsPage() {
  return (
    <main className="mx-auto w-full max-w-[1240px] px-3 pt-1.5 pb-4 sm:px-5 sm:pt-2 sm:pb-6">
      <BackArrow href="/" label="હોમ" />

      <header className="mt-1 mb-3.5 sm:mb-4 text-center">
        <h1 className="text-[1.35rem] sm:text-[1.75rem] font-extrabold tracking-tight">
          <span className="text-grad">વિષયો</span>
        </h1>
        <p className="mt-1 text-[0.82rem] sm:text-[0.88rem] text-[var(--fg-muted)]">
          જે વિષય ભણવો હોય તે પસંદ કરો
        </p>
      </header>

      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, index) => (
          <Link key={subject.id} href={`/chapter/${subject.id}`} className="group block">
            <Card
              hover
              accentTop
              className="anim-fade-up flex flex-col justify-between min-h-[175px] sm:min-h-[195px] p-5 sm:p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-start gap-3.5 sm:gap-4">
                <span
                  className="hex grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center text-[1.35rem] sm:text-[1.55rem] shadow-sm transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${subject.color}, ${subject.color2})`,
                  }}
                  aria-hidden
                >
                  {subject.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[1.1rem] sm:text-[1.25rem] font-bold text-[var(--fg)] group-hover:text-[var(--brand-1)] transition-colors leading-snug">
                    {subject.name}
                  </h2>
                  <p className="mt-1 text-[0.82rem] sm:text-[0.88rem] leading-relaxed text-[var(--fg-muted)]">
                    {subject.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[var(--stroke)]/60 flex flex-wrap items-center gap-2">
                <Chip tone="cyan" className="px-3 py-1 text-[0.78rem] font-bold">
                  {toGujaratiDigits(subject.topicCount)} પ્રકરણ
                </Chip>
                <Chip tone="violet" className="px-3 py-1 text-[0.78rem] font-bold">
                  {toGujaratiDigits(subject.questionCount)} પ્રશ્નો
                </Chip>
                <span className="ms-auto text-[var(--fg-muted)] group-hover:text-[var(--brand-1)] transition-colors">
                  <ArrowRight size={18} strokeWidth={2.5} />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
