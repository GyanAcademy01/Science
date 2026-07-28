import Link from "next/link";
import { cn } from "@/lib/utils";

type Tone = "cyan" | "violet" | "amber" | "muted";

const TONE_CLASSES: Record<Tone, string> = {
  cyan: "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.04]",
  violet: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/40 hover:scale-[1.04]",
  amber: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/40 hover:scale-[1.04]",
  muted: "bg-[var(--surface-2)] text-[var(--fg)] border border-[var(--stroke)] hover:bg-[var(--surface)]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-300 active:scale-95 shrink-0";

interface ChipProps {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}

export function Chip({ tone = "muted", className, children }: ChipProps) {
  const toneClass = TONE_CLASSES[tone];
  return (
    <span className={cn(BASE, toneClass, className)}>
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
  const toneClass = TONE_CLASSES[tone];
  return (
    <Link
      href={href}
      className={cn(BASE, toneClass, className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
