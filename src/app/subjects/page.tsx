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
  description: "ધોરણ 6 વિજ્ઞાનના વિષયો અને પ્રકરણો.",
};

export default function SubjectsPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-3 py-6 sm:px-4 sm:py-10">
      <BackArrow href="/" label="હોમ" />

      <header className="mt-4 mb-6 text-center">
        <h1 className="text-[1.5rem] sm:text-[2rem]">
          <span className="text-grad">વિષયો</span>
        </h1>
        <p className="mt-2 text-[0.88rem] text-[var(--fg-muted)]">
          જે વિષય ભણવો હોય તે પસંદ કરો
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, index) => (
          <Link key={subject.id} href={`/chapter/${subject.id}`}>
            <Card
              hover
              accentTop
              className="anim-fade-up h-full p-5"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="hex grid h-12 w-12 shrink-0 place-items-center text-[1.4rem]"
                  style={{
                    background: `linear-gradient(135deg, ${subject.color}, ${subject.color2})`,
                  }}
                  aria-hidden
                >
                  {subject.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[1.15rem]">{subject.name}</h2>
                  <p className="mt-1 text-[0.85rem] leading-relaxed text-[var(--fg-muted)]">
                    {subject.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Chip tone="cyan">
                  {toGujaratiDigits(subject.topicCount)} પ્રકરણ
                </Chip>
                <Chip tone="violet">
                  {toGujaratiDigits(subject.questionCount)} પ્રશ્નો
                </Chip>
                <span className="ms-auto text-[var(--fg-muted)]">
                  <ArrowRight size={18} strokeWidth={2.4} />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
