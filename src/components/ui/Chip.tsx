import Link from "next/link";
import { cn } from "@/lib/utils";

type Tone = "cyan" | "violet" | "amber" | "muted";

const TONES: Record<Tone, { bg: string; fg: string; border: string }> = {
  cyan: {
    bg: "rgba(6,182,212,0.12)",
    fg: "#0e7490",
    border: "rgba(6,182,212,0.3)",
  },
  violet: {
    bg: "rgba(124,58,237,0.12)",
    fg: "#6d28d9",
    border: "rgba(124,58,237,0.3)",
  },
  amber: {
    bg: "rgba(245,158,11,0.14)",
    fg: "#b45309",
    border: "rgba(245,158,11,0.32)",
  },
  muted: {
    bg: "var(--surface-2)",
    fg: "var(--fg-muted)",
    border: "var(--stroke)",
  },
};

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-full border font-semibold text-[0.78rem] px-3 py-1.5 transition-all duration-300 sm:text-[0.85rem] dark:brightness-150";

interface ChipProps {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}

export function Chip({ tone = "muted", className, children }: ChipProps) {
  const t = TONES[tone];
  return (
    <span
      className={cn(BASE, className)}
      style={{ background: t.bg, color: t.fg, borderColor: t.border }}
    >
      {children}
    </span>
  );
}

interface ChipLinkProps extends ChipProps {
  href: string;
  "aria-label"?: string;
}

export function ChipLink({
  href,
  tone = "muted",
  className,
  children,
  ...rest
}: ChipLinkProps) {
  const t = TONES[tone];
  return (
    <Link
      href={href}
      className={cn(BASE, "hover:brightness-105 active:scale-[0.97]", className)}
      style={{ background: t.bg, color: t.fg, borderColor: t.border }}
      {...rest}
    >
      {children}
    </Link>
  );
}
