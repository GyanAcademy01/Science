import type { TheoryTable } from "@/types/theory";

export interface TableThemeProps {
  headerGrad?: string;
  borderColor?: string;
  titleColor?: string;
}

/** 💡 કોષ્ટક કોષમાં રહેલ લખાણ (બુલેટ પોઇન્ટ્સ, ન્યૂ-લાઇન્સ) ને સ્વચ્છ અને યોગ્ય ગૅપ સાથે દર્શાવે છે */
function FormattedCell({ text }: { text: string }) {
  if (!text) return null;

  // Split only on real newlines
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  return (
    <div className="flex flex-col gap-1 text-[0.85rem] leading-[1.55]">
      {lines.map((line, idx) => {
        // Bullet point starting with "- " or "• "
        if (line.startsWith("- ") || line.startsWith("• ")) {
          const cleanText = line.replace(/^[-•]\s*/, "");
          return (
            <div key={idx} className="flex items-start gap-1.5 leading-[1.5]">
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/80" />
              <span className="flex-1">{cleanText}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="m-0 leading-[1.55]">
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
                className="px-3.5 py-2.5 text-[0.84rem] font-bold tracking-wide text-white"
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
                  className={`px-3.5 py-2.5 align-top ${
                    cellIndex === 0 ? "font-bold text-[var(--fg)] min-w-[120px] sm:min-w-[150px]" : ""
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
