import type { Metadata } from "next";
import { BookOpen, ClipboardCheck, FileText, Moon, Type, WifiOff } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { BackArrow } from "@/components/common/BackArrow";
import { AtomOrb } from "@/components/common/AtomOrb";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { siteStats } from "@/lib/data";
import { toGujaratiDigits } from "@/lib/utils";

export const metadata: Metadata = {
  title: "અમારા વિશે",
  description: siteConfig.description,
};

const FEATURES = [
  { icon: BookOpen, text: "દરેક પ્રકરણની મુદ્દાસર થિયરી અને કોષ્ટકો" },
  { icon: ClipboardCheck, text: "૨૦-૨૦ પ્રશ્નોના MCQ ટેસ્ટ સેટ, સમજૂતી સાથે" },
  { icon: FileText, text: "મૂળ PDF એપમાં જ ઝૂમ સાથે વાંચવાની સુવિધા" },
  { icon: Type, text: "અક્ષરનું માપ ૫ સ્તરે બદલી શકાય" },
  { icon: Moon, text: "લાઇટ અને ડાર્ક બંને થીમ" },
  { icon: WifiOff, text: "મોબાઇલમાં ઝડપી — એપ તરીકે ઇન્સ્ટોલ પણ થાય" },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[800px] px-3 py-3 sm:py-5">
      <BackArrow href="/" label="હોમ" />

      <header className="mt-3 mb-4 flex flex-col items-center text-center">
        <AtomOrb size={85} />
        <h1 className="mt-2 text-[1.25rem] sm:text-[1.6rem]">
          <span className="text-grad">અમારા વિશે</span>
        </h1>
        <p className="mt-1.5 max-w-[520px] text-[0.82rem] leading-relaxed text-[var(--fg-muted)]">
          {siteConfig.fullName} — ધોરણ ૬થી ૧૦ તથા વિજ્ઞાન પદ્ધતિશાસ્ત્ર માટે તૈયાર કરેલી વિજ્ઞાન
          અભ્યાસ એપ. અહીંનું બધું જ લખાણ Gyan Academy, {siteConfig.place} ની
          મૂળ પુસ્તિકા પર આધારિત છે.
        </p>
      </header>

      <Card accentTop className="p-3.5 sm:p-5">
        <h2 className="text-[1rem]">એપમાં શું છે?</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <li key={feature.text} className="flex items-start gap-2">
              <span
                className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[var(--r-sm)]"
                style={{ background: "rgba(6,182,212,0.12)" }}
              >
                <feature.icon size={14} strokeWidth={2.2} />
              </span>
              <span className="text-[0.8rem] leading-relaxed">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-2.5 p-3.5 sm:p-5">
        <h2 className="text-[1rem]">હાલનો અભ્યાસક્રમ</h2>
        <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[var(--fg-muted)]">
          ધોરણ ૬થી ૧૦ વિજ્ઞાન અને વિજ્ઞાન પદ્ધતિશાસ્ત્રનાં કુલ {toGujaratiDigits(siteStats.chapters)} પ્રકરણ અને
          કુલ {toGujaratiDigits(siteStats.questions)} MCQ પ્રશ્નો ઉપલબ્ધ છે — થિયરી, પ્રશ્નોત્તર અને મૂળ PDF સાથે.
        </p>
        <div className="mt-3">
          <LinkButton href="/subjects" size="md">
            અભ્યાસ શરૂ કરો
          </LinkButton>
        </div>
      </Card>
    </main>
  );
}
