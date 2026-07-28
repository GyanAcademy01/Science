"use client";

import type { TheorySection } from "@/types/theory";
import { DataTable } from "@/components/ui/DataTable";
import { MoleculeBullet } from "@/components/common/MoleculeBullet";

export interface TopicBoxTheme {
  id: string;
  name: string;
  borderColor: string;
  iconBg: string;
  titleColor: string;
  headerGrad: string;
  cardBg: string;
}

/** 🎨 ૧૦ અલગ અલગ ટોપિક બોક્સ કલર થીમ્સ */
export const TOPIC_BOX_THEMES: TopicBoxTheme[] = [
  {
    id: "cyan",
    name: "સાગર સાયન",
    borderColor: "#06b6d4",
    iconBg: "rgba(6, 182, 212, 0.15)",
    titleColor: "#0891b2",
    headerGrad: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    cardBg: "rgba(6, 182, 212, 0.04)",
  },
  {
    id: "emerald",
    name: "લીલોતરી એમેરાલ્ડ",
    borderColor: "#10b981",
    iconBg: "rgba(16, 185, 129, 0.15)",
    titleColor: "#059669",
    headerGrad: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    cardBg: "rgba(16, 185, 129, 0.04)",
  },
  {
    id: "purple",
    name: "જાંબલી એમેથિસ્ટ",
    borderColor: "#8b5cf6",
    iconBg: "rgba(139, 92, 246, 0.15)",
    titleColor: "#7c3aed",
    headerGrad: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    cardBg: "rgba(139, 92, 246, 0.04)",
  },
  {
    id: "coral",
    name: "સૂર્યાસ્ત કોરલ",
    borderColor: "#f97316",
    iconBg: "rgba(249, 115, 22, 0.15)",
    titleColor: "#ea580c",
    headerGrad: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
    cardBg: "rgba(249, 115, 22, 0.04)",
  },
  {
    id: "indigo",
    name: "રોયલ ઇન્ડિગો",
    borderColor: "#6366f1",
    iconBg: "rgba(99, 102, 241, 0.15)",
    titleColor: "#4f46e5",
    headerGrad: "linear-gradient(135deg, #6366f1 0%, #3730a3 100%)",
    cardBg: "rgba(99, 102, 241, 0.04)",
  },
  {
    id: "rose",
    name: "ગુલાબી રોઝ",
    borderColor: "#f43f5e",
    iconBg: "rgba(244, 63, 94, 0.15)",
    titleColor: "#e11d48",
    headerGrad: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
    cardBg: "rgba(244, 63, 94, 0.04)",
  },
  {
    id: "amber",
    name: "સુવર્ણ અંબર",
    borderColor: "#d97706",
    iconBg: "rgba(217, 119, 6, 0.15)",
    titleColor: "#b45309",
    headerGrad: "linear-gradient(135deg, #d97706 0%, #92400e 100%)",
    cardBg: "rgba(217, 119, 6, 0.04)",
  },
  {
    id: "sage",
    name: "ઓલિવ સેજ",
    borderColor: "#65a30d",
    iconBg: "rgba(101, 163, 13, 0.15)",
    titleColor: "#4d7c0f",
    headerGrad: "linear-gradient(135deg, #65a30d 0%, #3f6212 100%)",
    cardBg: "rgba(101, 163, 13, 0.04)",
  },
  {
    id: "teal",
    name: "સાયબર ટીલ",
    borderColor: "#0d9488",
    iconBg: "rgba(13, 148, 136, 0.15)",
    titleColor: "#0f766e",
    headerGrad: "linear-gradient(135deg, #0d9488 0%, #115e59 100%)",
    cardBg: "rgba(13, 148, 136, 0.04)",
  },
  {
    id: "ruby",
    name: "રૂબી ક્રિમસન",
    borderColor: "#dc2626",
    iconBg: "rgba(220, 38, 38, 0.15)",
    titleColor: "#b91c1c",
    headerGrad: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    cardBg: "rgba(220, 38, 38, 0.04)",
  },
];

function SectionBody({
  section,
  theme,
}: {
  section: TheorySection;
  theme: TopicBoxTheme;
}) {
  switch (section.type) {
    case "points":
      return (
        <ul className="flex flex-col gap-2">
          {(section.points ?? []).map((point, index) => (
            <li key={`${section.id}-p${index}`} className="flex gap-2">
              <MoleculeBullet className="mt-[0.3em] shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return section.tableData ? (
        <DataTable data={section.tableData} theme={theme} />
      ) : null;

    case "qa":
      return (
        <div className="flex flex-col gap-3">
          {(section.qa ?? []).map((item, index) => (
            <div key={`${section.id}-qa${index}`}>
              <p
                className="font-bold text-[0.92rem]"
                style={{ color: theme.titleColor }}
              >
                પ્ર. {item.q}
              </p>
              <p className="mt-1">ઉ. {item.a}</p>
            </div>
          ))}
        </div>
      );

    case "callout":
      return (
        <div
          className="rounded-[var(--r-md)] border-s-4 p-3"
          style={{
            background: theme.iconBg,
            borderInlineStartColor: theme.borderColor,
          }}
        >
          {section.content}
        </div>
      );

    case "text":
    default:
      return (
        <>
          {(section.content ?? "").split("\n\n").map((para, index) => (
            <p key={`${section.id}-t${index}`}>{para}</p>
          ))}
        </>
      );
  }
}

export function TheoryRenderer({ sections }: { sections: TheorySection[] }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {sections.map((section, index) => {
        const theme = TOPIC_BOX_THEMES[index % TOPIC_BOX_THEMES.length];
        return (
          <article
            key={section.id}
            className="anim-fade-up rounded-[var(--r-lg)] border-s-4 bg-[var(--surface-solid)] p-3.5 sm:p-5 shadow-sm"
            style={{
              animationDelay: `${Math.min(index, 6) * 0.07}s`,
              borderInlineStartColor: theme.borderColor,
            }}
          >
            <header className="mb-3 flex items-center gap-2.5">
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--r-md)] text-[1.1rem]"
                style={{ background: theme.iconBg }}
                aria-hidden
              >
                {section.icon ?? "🔹"}
              </span>
              <h2
                className="text-[1.02rem] font-extrabold sm:text-[1.18rem]"
                style={{ color: theme.titleColor }}
              >
                {section.title}
              </h2>
            </header>

            <div className="reader ps-0 sm:ps-[46px]">
              <SectionBody section={section} theme={theme} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
