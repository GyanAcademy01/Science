import { Lightbulb } from "lucide-react";
import { OPTION_LABELS } from "@/lib/utils";

interface ExplanationPanelProps {
  correctIndex: number;
  correctText: string;
  explanation: string;
  wasRight: boolean;
}

export function ExplanationPanel({
  correctIndex,
  correctText,
  explanation,
  wasRight,
}: ExplanationPanelProps) {
  return (
    <div
      className="anim-slide-down mt-3 rounded-[var(--r-md)] border-s-[3px] p-3"
      style={{
        background: wasRight ? "var(--ok-soft)" : "var(--bad-soft)",
        borderInlineStartColor: wasRight ? "var(--ok)" : "var(--bad)",
      }}
    >
      <p className="flex items-center gap-1.5 text-[0.83rem] font-extrabold">
        {wasRight ? "✅ સાચો જવાબ!" : "❌ ખોટો જવાબ"}
      </p>
      {!wasRight && (
        <p className="mt-1 text-[0.8rem] font-semibold">
          સાચો જવાબ: ({OPTION_LABELS[correctIndex]}) {correctText}
        </p>
      )}
      <p className="mt-1.5 flex gap-1.5 text-[0.8rem] leading-relaxed">
        <Lightbulb
          size={14}
          strokeWidth={2.2}
          className="mt-0.5 shrink-0 text-[var(--accent-warm)]"
        />
        <span>{explanation}</span>
      </p>
    </div>
  );
}
