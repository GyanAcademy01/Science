import { BookOpen, ClipboardCheck, FileText, Sparkles } from "lucide-react";
import { AtomOrb } from "@/components/common/AtomOrb";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { siteStats } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { toGujaratiDigits } from "@/lib/utils";

const FEATURES = [
  {
    icon: BookOpen,
    title: "થિયરી",
    text: "દરેક પ્રકરણનો સાર, કોષ્ટકો અને મુદ્દાસર સમજૂતી — વાંચવામાં સરળ.",
    tone: "rgba(6,182,212,0.14)",
  },
  {
    icon: ClipboardCheck,
    title: "MCQ ટેસ્ટ",
    text: "૨૦-૨૦ પ્રશ્નોના સેટ. દરેક જવાબ સાથે તરત જ સમજૂતી મળે.",
    tone: "rgba(124,58,237,0.14)",
  },
  {
    icon: FileText,
    title: "મૂળ PDF",
    text: "Gyan Academy ની મૂળ પુસ્તિકા એપમાં જ ઝૂમ સાથે વાંચો.",
    tone: "rgba(245,158,11,0.16)",
  },
];

const STATS = [
  { label: "વિષય", value: siteStats.subjects },
  { label: "પ્રકરણ", value: siteStats.chapters },
  { label: "પ્રશ્નો", value: siteStats.questions },
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-2.5 py-3 sm:px-3 sm:py-5">
      {/* Hero */}
      <section className="grid items-center gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-7">
        <div className="anim-fade-up text-center lg:text-start">
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--stroke)] bg-[var(--surface-2)] px-2.5 py-1 text-[0.7rem] font-bold text-[var(--fg-muted)]">
            <Sparkles size={12} strokeWidth={2.4} />
            {siteConfig.tagline} · ગાંધીનગર
          </span>

          <h1 className="mt-3 text-[1.55rem] leading-tight sm:text-[1.8rem] lg:text-[2.35rem]">
            <span className="text-grad">વિજ્ઞાન</span>
            <br />
            ધોરણ 6 — સરળ અને સચોટ
          </h1>

          <p className="mx-auto mt-2 max-w-[480px] text-[0.82rem] leading-relaxed text-[var(--fg-muted)] sm:text-[0.9rem] lg:mx-0">
            થિયરી વાંચો, MCQ ટેસ્ટ આપો અને મૂળ PDF જુઓ — બધું એક જ જગ્યાએ,
            મોબાઇલમાં પણ ઝડપી.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
            <LinkButton href="/subjects" size="lg" className="shimmer-cta">
              શરૂ કરો
            </LinkButton>
            <LinkButton href="/chapter/std6" variant="outline" size="lg">
              પ્રકરણો જુઓ
            </LinkButton>
          </div>
        </div>

        <div className="anim-float flex justify-center lg:justify-end">
          <span className="hidden lg:block">
            <AtomOrb size={240} />
          </span>
          <span className="hidden sm:block lg:hidden">
            <AtomOrb size={180} />
          </span>
          <span className="sm:hidden">
            <AtomOrb size={120} animated={false} />
          </span>
        </div>
      </section>

      {/* Stats */}
      <section className="glass anim-fade-up mt-5 grid grid-cols-3 gap-1.5 rounded-[var(--r-lg)] px-2 py-3 sm:px-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-grad text-[1.25rem] font-extrabold leading-none sm:text-[1.55rem]">
              {toGujaratiDigits(stat.value)}
            </p>
            <p className="mt-0.5 text-[0.7rem] font-semibold text-[var(--fg-muted)] sm:text-[0.78rem]">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="mt-5">
        <h2 className="mb-3 text-center text-[1.05rem] sm:text-[1.2rem]">
          એપમાં શું મળશે?
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Card
              key={feature.title}
              hover
              className="anim-fade-up p-3 sm:p-3.5"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <span
                className="grid h-9 w-9 place-items-center rounded-[var(--r-md)]"
                style={{ background: feature.tone }}
              >
                <feature.icon size={17} strokeWidth={2.2} />
              </span>
              <h3 className="mt-2 text-[0.95rem]">{feature.title}</h3>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-[var(--fg-muted)]">
                {feature.text}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
