interface LiquidProgressProps {
  current: number;
  total: number;
}

/** 🧪 ટેસ્ટની ઉપર દેખાતી liquid-fill પ્રગતિપટ્ટી */
export function LiquidProgress({ current, total }: LiquidProgressProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full"
      style={{ background: "var(--surface-2)" }}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label="ટેસ્ટની પ્રગતિ"
    >
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${percent}%`, background: "var(--grad-hero)" }}
      />
    </div>
  );
}
