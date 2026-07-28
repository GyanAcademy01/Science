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
    <main className="mx-auto w-full max-w-[800px] px-4 py-6 sm:py-10">
      <BackArrow href="/" label="હોમ" />

      <header className="mt-4 mb-6 flex flex-col items-center text-center">
        <AtomOrb size={110} />
        <h1 className="mt-3 text-[1.5rem] sm:text-[2rem]">
          <span className="text-grad">અમારા વિશે</span>
        </h1>
        <p className="mt-2 max-w-[560px] text-[0.9rem] leading-relaxed text-[var(--fg-muted)]">
          {siteConfig.fullName} — ધોરણ 6 ના વિદ્યાર્થીઓ માટે તૈયાર કરેલી વિજ્ઞાન
          અભ્યાસ એપ. અહીંનું બધું જ લખાણ Gyan Academy, {siteConfig.place} ની
          મૂળ પુસ્તિકા પર આધારિત છે.
        </p>
      </header>

      <Card accentTop className="p-5 sm:p-7">
        <h2 className="text-[1.15rem]">એપમાં શું છે?</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <li key={feature.text} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[var(--r-sm)]"
                style={{ background: "rgba(6,182,212,0.12)" }}
              >
                <feature.icon size={16} strokeWidth={2.2} />
              </span>
              <span className="text-[0.88rem] leading-relaxed">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-4 p-5 sm:p-7">
        <h2 className="text-[1.15rem]">હાલનો અભ્યાસક્રમ</h2>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-[var(--fg-muted)]">
          ધોરણ 6 વિજ્ઞાનનાં {toGujaratiDigits(siteStats.chapters)} પ્રકરણ અને
          કુલ {toGujaratiDigits(siteStats.questions)} MCQ પ્રશ્નો ઉપલબ્ધ છે —
          આહારના ઘટકો તથા વસ્તુઓના જૂથ બનાવવાં. આગળનાં પ્રકરણો ક્રમશઃ ઉમેરાતાં
          જશે.
        </p>
        <div className="mt-4">
          <LinkButton href="/subjects" size="md">
            અભ્યાસ શરૂ કરો
          </LinkButton>
        </div>
      </Card>
    </main>
  );
}
