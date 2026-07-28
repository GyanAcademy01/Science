import { cn } from "@/lib/utils";

interface AtomOrbProps {
  size?: number;
  className?: string;
  /** true હોય તો orbit ફરે (mobile પર CSS આપોઆપ બંધ કરે છે) */
  animated?: boolean;
}

/** ⚛️ ન્યુક્લિયસ + 3 ફરતી orbit — આ થીમનું મુખ્ય ચિહ્ન */
export function AtomOrb({ size = 280, className, animated = true }: AtomOrbProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={cn("max-w-full", className)}
      role="img"
      aria-label="અણુનું ચિત્ર"
    >
      <defs>
        <linearGradient id="atom-ring-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="atom-ring-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <radialGradient id="atom-core">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#7c3aed" />
        </radialGradient>
      </defs>

      <g className={animated ? "anim-orbit" : undefined} style={{ transformOrigin: "100px 100px" }}>
        <ellipse
          cx="100"
          cy="100"
          rx="78"
          ry="30"
          fill="none"
          stroke="url(#atom-ring-a)"
          strokeWidth="2.5"
          opacity="0.85"
        />
        <circle cx="178" cy="100" r="6" fill="#06b6d4" />
      </g>

      <g
        className={animated ? "anim-orbit-rev" : undefined}
        style={{ transformOrigin: "100px 100px" }}
      >
        <ellipse
          cx="100"
          cy="100"
          rx="78"
          ry="30"
          fill="none"
          stroke="url(#atom-ring-b)"
          strokeWidth="2.5"
          opacity="0.75"
          transform="rotate(60 100 100)"
        />
        <circle cx="139" cy="32" r="5" fill="#a855f7" />
      </g>

      <g className={animated ? "anim-orbit" : undefined} style={{ transformOrigin: "100px 100px" }}>
        <ellipse
          cx="100"
          cy="100"
          rx="78"
          ry="30"
          fill="none"
          stroke="url(#atom-ring-a)"
          strokeWidth="2.5"
          opacity="0.6"
          transform="rotate(120 100 100)"
        />
        <circle cx="61" cy="32" r="5" fill="#10b981" />
      </g>

      <circle cx="100" cy="100" r="17" fill="url(#atom-core)" />
      <circle cx="100" cy="100" r="26" fill="none" stroke="url(#atom-core)" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
