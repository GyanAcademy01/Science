import type { TheorySection } from "@/types/theory";
import { DataTable } from "@/components/ui/DataTable";
import { MoleculeBullet } from "@/components/common/MoleculeBullet";

function SectionBody({ section }: { section: TheorySection }) {
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
      return section.tableData ? <DataTable data={section.tableData} /> : null;

    case "qa":
      return (
        <div className="flex flex-col gap-3">
          {(section.qa ?? []).map((item, index) => (
            <div key={`${section.id}-qa${index}`}>
              <p className="font-bold text-[var(--brand-2)]">પ્ર. {item.q}</p>
              <p className="mt-1">ઉ. {item.a}</p>
            </div>
          ))}
        </div>
      );

    case "callout":
      return (
        <div
          className="rounded-[var(--r-md)] border-s-[3px] p-3"
          style={{
            background: "rgba(6,182,212,0.08)",
            borderInlineStartColor: "var(--brand-1)",
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
    <div className="flex flex-col gap-2.5 sm:gap-3">
      {sections.map((section, index) => (
        <article
          key={section.id}
          className="card anim-fade-up p-3 sm:p-4"
          style={{ animationDelay: `${Math.min(index, 6) * 0.07}s` }}
        >
          <header className="mb-2 flex items-center gap-2.5">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[var(--r-md)] text-[0.98rem]"
              style={{ background: "rgba(6,182,212,0.12)" }}
              aria-hidden
            >
              {section.icon ?? "🔹"}
            </span>
            <h2 className="text-[0.98rem] font-extrabold sm:text-[1.12rem]">
              {section.title}
            </h2>
          </header>

          <div className="reader ps-0 sm:ps-[42px]">
            <SectionBody section={section} />
          </div>
        </article>
      ))}
    </div>
  );
}
