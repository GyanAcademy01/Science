import { cn } from "@/lib/utils";

interface BeakerProgressProps {
  /** 0–100. null = હજી ટેસ્ટ આપ્યો નથી */
  percent: number | null;
  size?: number;
  className?: string;
}

function liquidColor(percent: number): string {
  if (percent >= 80) return "#10b981";
  if (percent >= 50) return "#06b6d4";
  if (percent >= 35) return "#f59e0b";
  return "#ef4444";
}

/** 🧪 best-score મુજબ ભરાતું beaker — Test-set card નું મુખ્ય ચિહ્ન */
export function BeakerProgress({
  percent,
  size = 48,
  className,
}: BeakerProgressProps) {
  const filled = percent ?? 0;
  // beaker નો અંદરનો ભાગ y = 20 (ઉપર) થી y = 60 (તળિયું)
  const innerTop = 20;
  const innerBottom = 60;
  const height = ((innerBottom - innerTop) * filled) / 100;
  const y = innerBottom - height;
  const color = liquidColor(filled);

  return (
    <svg
      viewBox="0 0 56 72"
      width={size}
      height={size * (72 / 56)}
      className={cn("shrink-0", className)}
      role="img"
      aria-label={percent === null ? "ટેસ્ટ બાકી" : `સ્કોર ${percent} ટકા`}
    >
      <defs>
        <clipPath id={`beaker-clip-${size}`}>
          <path d="M20 10 L20 30 L8 58 Q6 64 13 64 L43 64 Q50 64 48 58 L36 30 L36 10 Z" />
        </clipPath>
      </defs>

      {percent !== null && filled > 0 && (
        <g clipPath={`url(#beaker-clip-${size})`}>
          <rect
            x="0"
            y={y}
            width="56"
            height={innerBottom - y + 8}
            fill={color}
            opacity="0.85"
            className="anim-liquid"
          />
        </g>
      )}

      <path
        d="M20 10 L20 30 L8 58 Q6 64 13 64 L43 64 Q50 64 48 58 L36 30 L36 10"
        fill="none"
        stroke="var(--brand-1)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <line x1="16" y1="10" x2="40" y2="10" stroke="var(--brand-2)" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="38" y1="44" x2="45" y2="44" stroke="var(--brand-1)" strokeWidth="1.6" opacity="0.6" />
      <line x1="35" y1="37" x2="41" y2="37" stroke="var(--brand-1)" strokeWidth="1.6" opacity="0.6" />
    </svg>
  );
}
