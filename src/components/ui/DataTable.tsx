import type { TheoryTable } from "@/types/theory";

export interface TableThemeProps {
  headerGrad?: string;
  borderColor?: string;
  titleColor?: string;
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
                className="px-3 py-2.5 text-[0.82rem] font-bold tracking-wide text-white"
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
                  className={`px-3 py-2 text-[0.85rem] ${
                    cellIndex === 0 ? "font-bold text-[var(--fg)]" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
