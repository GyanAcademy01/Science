import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, Layers } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { siteStats } from "@/lib/data";
import { toGujaratiDigits } from "@/lib/utils";

export default function HomePage() {
  const stats = [
    { icon: Layers, color: "#06b6d4", value: toGujaratiDigits(siteStats.subjects), label: "વિષયો" },
    { icon: BookOpen, color: "#10b981", value: toGujaratiDigits(siteStats.chapters), label: "પ્રકરણો" },
    { icon: CheckCircle, color: "#8b5cf6", value: toGujaratiDigits(siteStats.questions), label: "પ્રશ્નો" },
  ];

  return (
    <main className="relative flex min-h-[calc(100vh-70px)] flex-col justify-between overflow-hidden">
      {/* Ambient glowing background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-8 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-10 left-[30%] h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-5 pt-8 sm:px-8 sm:pt-12 flex-1 flex flex-col justify-center items-center">
        {/* Logo Container - Exact TAT-GK style */}
        <div className="flex justify-center mb-1.5">
          <Image
            src="/gyan-logo.png"
            alt="Gyan Academy Logo"
            width={160}
            height={60}
            className="h-auto w-[140px] sm:w-[160px] object-contain drop-shadow-md"
            priority
          />
        </div>

        {/* Motivational Quote - TAT-GK style */}
        <div className="mb-4 text-center">
          <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 italic">
            &ldquo;વિજ્ઞાન એ માત્ર પ્રશ્નો પૂછવાની જ નહીં, પણ સત્ય સુધી પહોંચવાની કળા છે.&rdquo;
          </p>
          <div className="mt-1.5 mx-auto w-12 h-[2px] rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500" />
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600">
              વિજ્ઞાન
            </span>
          </h1>

          {/* Enhanced Vibrant Feature Highlights Line */}
          <div className="mt-4 flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 drop-shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
              Theory
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 font-medium">•</span>
            <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 drop-shadow-xs">
              <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] animate-pulse" />
              Test
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 font-medium">•</span>
            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 drop-shadow-xs">
              <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse" />
              PDF
            </span>
          </div>

          <div className="mt-7 flex items-center justify-center">
            <Link href="/subjects" prefetch>
              <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-95 cursor-pointer">
                અભ્યાસ શરૂ કરો
                <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </section>

        {/* Bottom Glassmorphic Stats Capsule Counter Bar */}
        <section className="mx-auto mt-6 sm:mt-8 w-full max-w-xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-cyan-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-2.5 sm:p-3.5 backdrop-blur-xl shadow-lg shadow-cyan-500/5">
            {/* Clean Category Line inside Bottom Capsule */}
            <div className="flex items-center justify-center gap-2 mb-2 pb-2 border-b border-zinc-200/70 dark:border-zinc-800/80 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300">
              <span>🎓 ધોરણ ૬ થી ૧૦</span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-cyan-600 dark:text-cyan-400">વિજ્ઞાન</span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-teal-600 dark:text-teal-400">પદ્ધતિશાસ્ત્ર</span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 divide-x divide-zinc-200/80 dark:divide-zinc-800">
              {stats.map((s) => {
                const IconComponent = s.icon;
                return (
                  <div key={s.label} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 px-2 py-0.5 text-center sm:text-left transition-all duration-300">
                    <span
                      className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                      style={{ backgroundColor: s.color }}
                    >
                      <IconComponent className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={2.4} />
                    </span>
                    <div className="flex flex-col justify-center">
                      <p className="text-base sm:text-xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                        {s.value}
                      </p>
                      <p className="mt-0.5 text-[10px] sm:text-xs font-bold text-zinc-500 dark:text-zinc-400 leading-none">
                        {s.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
