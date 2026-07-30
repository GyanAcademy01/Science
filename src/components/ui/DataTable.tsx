import type { TheoryTable } from "@/types/theory";

export interface TableThemeProps {
  headerGrad?: string;
  borderColor?: string;
  titleColor?: string;
}

/** 💡 કોષ્ટક કોષમાં રહેલ લખાણ (બુલેટ પોઇન્ટ્સ, ન્યૂ-લાઇન્સ) ને સુંદર અને છૂટુંછવાયું ફોર્મેટ કરે છે */
function FormattedCell({ text }: { text: string }) {
  if (!text) return null;

  // Split lines by newline
  const lines = text.split("\n").filter((l) => l.trim().length > 0);

  return (
    <div
      className="flex flex-col gap-2.5 text-[0.88rem] leading-[1.8] tracking-[0.015em]"
      style={{ wordSpacing: "0.06em" }}
    >
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // If line contains multiple bullet points like "- item 1 - item 2"
        if (trimmed.includes(" - ") && !trimmed.startsWith("http")) {
          const parts = trimmed
            .split(/(?=\s+-\s+)/)
            .map((p) => p.replace(/^\s*-\s*/, "").trim())
            .filter(Boolean);

          if (parts.length > 1) {
            return (
              <ul key={idx} className="flex flex-col gap-2 pl-0.5">
                {parts.map((pt, pidx) => (
                  <li key={pidx} className="flex items-start gap-2.5">
                    <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/80 shadow-xs" />
                    <span className="flex-1">{pt}</span>
                  </li>
                ))}
              </ul>
            );
          }
        }

        // Single bullet point starting with "- " or "• "
        if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
          const cleanText = trimmed.replace(/^[-•]\s*/, "");
          return (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/80 shadow-xs" />
              <span className="flex-1">{cleanText}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="mb-0">
            {line}
          </p>
        );
      })}
    </div>
  );
}

/** Theory ની કોષ્ટકો — mobile પર આડું scroll થાય છે, layout તૂટતું નથી */
export function DataTable({
  data,
  theme,
}: {
  data: TheoryTable;
  theme?: TableThemeProps;
}) {
  return (
    <div className="table-wrap overflow-hidden rounded-[var(--r-md)] border border-[var(--stroke)] shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr
            style={
              theme?.headerGrad
                ? {
                    background: theme.headerGrad,
                    color: "#ffffff",
                  }
                : undefined
            }
          >
            {data.headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-[0.85rem] font-bold tracking-wide text-white"
                style={{ wordSpacing: "0.06em" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--stroke)]">
          {data.rows.map((row, rowIndex) => (
            <tr
              key={`${row[0]}-${rowIndex}`}
              className="transition-colors hover:bg-[var(--surface-2)]"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`${row[0]}-${rowIndex}-${cellIndex}`}
                  className={`px-4 py-3.5 align-top ${
                    cellIndex === 0 ? "font-bold text-[var(--fg)] min-w-[130px] sm:min-w-[170px]" : ""
                  }`}
                >
                  <FormattedCell text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
