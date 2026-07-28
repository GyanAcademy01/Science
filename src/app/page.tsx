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
    <main className="mx-auto w-full max-w-[1200px] px-3 py-6 sm:px-4 sm:py-10">
      {/* Hero */}
      <section className="grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div className="anim-fade-up text-center lg:text-start">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--stroke)] bg-[var(--surface-2)] px-3 py-1.5 text-[0.75rem] font-bold text-[var(--fg-muted)]">
            <Sparkles size={13} strokeWidth={2.4} />
            {siteConfig.tagline} · ગાંધીનગર
          </span>

          <h1 className="mt-4 text-[1.9rem] leading-tight sm:text-[2.2rem] lg:text-[3rem]">
            <span className="text-grad">વિજ્ઞાન</span>
            <br />
            ધોરણ 6 — સરળ અને સચોટ
          </h1>

          <p className="mx-auto mt-3 max-w-[520px] text-[0.9rem] leading-relaxed text-[var(--fg-muted)] sm:text-[1rem] lg:mx-0">
            થિયરી વાંચો, MCQ ટેસ્ટ આપો અને મૂળ PDF જુઓ — બધું એક જ જગ્યાએ,
            મોબાઇલમાં પણ ઝડપી.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
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
            <AtomOrb size={320} />
          </span>
          <span className="hidden sm:block lg:hidden">
            <AtomOrb size={240} />
          </span>
          <span className="sm:hidden">
            <AtomOrb size={160} animated={false} />
          </span>
        </div>
      </section>

      {/* Stats */}
      <section className="glass anim-fade-up mt-8 grid grid-cols-3 gap-2 rounded-[var(--r-lg)] px-2 py-4 sm:px-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-grad text-[1.5rem] font-extrabold leading-none sm:text-[1.9rem]">
              {toGujaratiDigits(stat.value)}
            </p>
            <p className="mt-1 text-[0.75rem] font-semibold text-[var(--fg-muted)] sm:text-[0.85rem]">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="mt-8">
        <h2 className="mb-4 text-center text-[1.2rem] sm:text-[1.4rem]">
          એપમાં શું મળશે?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Card
              key={feature.title}
              hover
              className="anim-fade-up p-4 sm:p-5"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-[var(--r-md)]"
                style={{ background: feature.tone }}
              >
                <feature.icon size={21} strokeWidth={2.2} />
              </span>
              <h3 className="mt-3 text-[1.05rem]">{feature.title}</h3>
              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[var(--fg-muted)]">
                {feature.text}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
