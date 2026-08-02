import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BackArrow } from "@/components/common/BackArrow";
import { subjects } from "@/lib/data";
import { toGujaratiDigits } from "@/lib/utils";

export const metadata: Metadata = {
  title: "વિષયો",
  description: "ધોરણ ૬થી ૧૦ વિજ્ઞાન અને વિજ્ઞાન પદ્ધતિશાસ્ત્રના વિષયો અને પ્રકરણો.",
};

export default function SubjectsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-3 pt-2 pb-4 sm:px-5 sm:pt-3 sm:pb-6">
      {/* 🚀 Header Bar matching Hindi Project style */}
      <div className="relative mb-5 flex min-h-[36px] items-center justify-center">
        <div className="absolute left-0">
          <BackArrow href="/" label="હોમ" />
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-full shadow-lg shadow-black/10 dark:shadow-black/40">
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-950/50 text-cyan-500 text-xs sm:text-sm">📚</div>
          <span className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight uppercase">વિજ્ઞાન એકેડેમી</span>
          <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-cyan-500">વિષયો</span>
          </div>
        </div>
      </div>

      {/* 🚀 Vertical List of Glassmorphic Capsule Bar Subject Cards */}
      <div className="flex flex-col gap-3 sm:gap-3.5">
        {subjects.map((subject, index) => (
          <Link key={subject.id} href={`/chapter/${subject.id}`} className="group block">
            <div
              className="anim-fade-up relative flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 px-4 py-3 sm:px-6 sm:py-3.5 backdrop-blur-xl shadow-lg shadow-black/15 dark:shadow-black/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/25 group-hover:border-cyan-500/40"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              {/* Left Side: Icon + Title & Integrated Sentence Description */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <span
                  className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-full text-xl text-white shadow-xs transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${subject.color}, ${subject.color2})`,
                  }}
                  aria-hidden
                >
                  {subject.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                    {subject.name}
                  </h2>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {subject.description} • {toGujaratiDigits(subject.topicCount)} પ્રકરણો અને {toGujaratiDigits(subject.questionCount)} પ્રશ્નો
                  </p>
                </div>
              </div>

              {/* Right Side: Action Circle */}
              <div className="flex items-center justify-end shrink-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 shadow-xs">
                  <ArrowRight size={17} strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
