import type { TheoryTable } from "@/types/theory";

/** Theory ની કોષ્ટકો — mobile પર આડું scroll થાય છે, layout તૂટતું નથી */
export function DataTable({ data }: { data: TheoryTable }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {data.headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${row[0]}-${rowIndex}-${cellIndex}`}
                  className={cellIndex === 0 ? "font-semibold" : undefined}
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
