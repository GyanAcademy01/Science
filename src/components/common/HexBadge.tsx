import { cn } from "@/lib/utils";

interface HexBadgeProps {
  children: React.ReactNode;
  className?: string;
  /** ષટ્કોણનું માપ (px) */
  size?: number;
  tone?: "brand" | "warm" | "muted";
}

const TONES: Record<NonNullable<HexBadgeProps["tone"]>, string> = {
  brand: "var(--grad-brand)",
  warm: "var(--grad-warm)",
  muted: "linear-gradient(135deg, #94a3b8, #64748b)",
};

/** ⬡ પ્રકરણ નંબર / icon માટે ષટ્કોણ badge */
export function HexBadge({
  children,
  className,
  size = 46,
  tone = "brand",
}: HexBadgeProps) {
  return (
    <span
      className={cn(
        "hex inline-grid shrink-0 place-items-center font-extrabold text-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: TONES[tone],
        fontSize: size * 0.4,
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}
