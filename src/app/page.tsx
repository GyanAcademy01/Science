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
        <div className="flex justify-center mb-3">
          <Image
            src="/gyan-logo.png"
            alt="Gyan Academy Logo"
            width={160}
            height={60}
            className="h-auto w-[140px] sm:w-[160px] object-contain drop-shadow-md"
            priority
          />
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-3xl text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-cyan-200/80 dark:border-cyan-800/60 bg-white/80 dark:bg-zinc-900/80 px-4 py-1.5 text-xs sm:text-xs font-extrabold shadow-sm backdrop-blur-md">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-white text-[10px] shadow-sm shrink-0">
              🎓
            </span>
            <span className="text-zinc-800 dark:text-zinc-200 font-extrabold tracking-tight">ધોરણ ૬ થી ૧૦</span>
            <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
            <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-extrabold">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
              વિજ્ઞાન
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
            <span className="text-teal-600 dark:text-teal-400 font-extrabold">
              પદ્ધતિશાસ્ત્ર
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-zinc-950 sm:text-3xl lg:text-4xl dark:text-white">
            વિજ્ઞાન શીખવાની
            <span className="mt-1 block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600">
              સૌથી સરળ અને સુંદર રીત.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-xs sm:text-sm font-medium leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
            ધોરણ ૬ થી ૧૦ ના વિજ્ઞાન અને પદ્ધતિશાસ્ત્રના તમામ પ્રકરણોની થીયરી, ઓરિજિનલ PDF અને ઇન્ટરેક્ટિવ MCQs ટેસ્ટ — બધું જ એક જ જગ્યાએ ડિજિટલ સ્વરૂપે.
          </p>

          <div className="mt-7 flex items-center justify-center">
            <Link href="/subjects" prefetch>
              <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-95 cursor-pointer">
                અભ્યાસ શરૂ કરો
                <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </section>

        {/* Bottom Glassmorphic Stats Capsule Counter Bar - Matching User Image */}
        <section className="mx-auto mt-10 sm:mt-12 w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-zinc-200/90 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-4 sm:p-5 backdrop-blur-2xl shadow-xl shadow-cyan-500/10">
            <div className="grid grid-cols-3 divide-x divide-zinc-200/80 dark:divide-zinc-800">
              {stats.map((s) => {
                const IconComponent = s.icon;
                return (
                  <div key={s.label} className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 px-3 py-1.5 text-center sm:text-left transition-all duration-300">
                    <span
                      className="flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl text-white shadow-md transition-transform hover:scale-105"
                      style={{ backgroundColor: s.color }}
                    >
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.4} />
                    </span>
                    <div className="flex flex-col justify-center">
                      <p className="text-xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                        {s.value}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm font-extrabold text-zinc-500 dark:text-zinc-400 leading-none">
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
