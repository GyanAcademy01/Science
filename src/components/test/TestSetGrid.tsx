"use client";

import Link from "next/link";
import type { TestSet } from "@/types/test";
import { BeakerProgress } from "@/components/common/BeakerProgress";
import { useBestPercent } from "@/hooks/useBestPercent";
import { toGujaratiDigits } from "@/lib/utils";

interface TestSetGridProps {
  sets: TestSet[];
  subjectId: string;
  topicId: string;
}

interface TestSetCardProps {
  set: TestSet;
  subjectId: string;
  topicId: string;
  index: number;
}

function TestSetCard({ set, subjectId, topicId, index }: TestSetCardProps) {
  const percent = useBestPercent(subjectId, topicId, set.setId);

  return (
    <Link
      href={`/chapter/${subjectId}/${topicId}/test/${set.setId}`}
      className="card card-hover anim-fade-up flex flex-col items-center gap-1.5 p-3 text-center"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <BeakerProgress percent={percent} size={42} />
      <p className="text-[0.85rem] font-extrabold">
        ટેસ્ટ {toGujaratiDigits(set.setNumber)}
      </p>
      <p className="text-[0.68rem] font-semibold text-[var(--fg-muted)]">
        {set.range}
      </p>
      <span
        className="mt-0.5 rounded-full px-2 py-0.5 text-[0.68rem] font-bold"
        style={
          percent === null
            ? { background: "var(--surface-2)", color: "var(--fg-muted)" }
            : { background: "var(--grad-brand)", color: "#fff" }
        }
      >
        {percent === null ? "શરૂ કરો" : `${percent}%`}
      </span>
    </Link>
  );
}

/** 🧪 દરેક સેટ = beaker card, best score મુજબ liquid ભરાય છે */
export function TestSetGrid({ sets, subjectId, topicId }: TestSetGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {sets.map((set, index) => (
        <TestSetCard
          key={set.setId}
          set={set}
          subjectId={subjectId}
          topicId={topicId}
          index={index}
        />
      ))}
    </div>
  );
}
