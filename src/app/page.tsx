import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { LinkButton } from "@/components/ui/Button";
import { siteStats } from "@/lib/data";
import { toGujaratiDigits } from "@/lib/utils";

const STATS = [
  { label: "વિષય", value: siteStats.subjects },
  { label: "પ્રકરણ", value: siteStats.chapters },
  { label: "પ્રશ્નો", value: siteStats.questions },
];

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-70px)] flex-col justify-between">
      {/* 🚀 Centered Hero Section */}
      <main className="mx-auto flex w-full max-w-[800px] flex-1 flex-col items-center justify-center px-4 py-6 text-center sm:px-6">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          <span className="text-grad">વિજ્ઞાન</span>
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-[480px] text-xs leading-relaxed text-[var(--fg-muted)] sm:text-sm">
          થિયરી વાંચો, MCQ ટેસ્ટ આપી સ્વ-મૂલ્યાંકન કરો અને ઓરિજિનલ PDF જુઓ — બધું જ એક જ જગ્યાએ ડિજિટલ સ્વરૂપે.
        </p>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/subjects" size="lg" className="shimmer-cta rounded-full px-6 text-sm shadow-md shadow-cyan-500/20">
            શરૂ કરો <ArrowRight size={15} className="ml-1" />
          </LinkButton>
        </div>

        {/* Integrated Stats Row */}
        <div className="mt-6 pt-4 border-t border-[var(--stroke)] grid grid-cols-3 gap-2 w-full max-w-[400px]">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-grad text-lg sm:text-xl font-black leading-none">
                {toGujaratiDigits(s.value)}
              </p>
              <p className="mt-1 text-[0.72rem] font-bold text-[var(--fg)]">{s.label}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer - Full width at bottom */}
      <Footer />
    </div>
  );
}
