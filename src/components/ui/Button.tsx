import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "soft" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-45 disabled:pointer-events-none select-none";

const VARIANTS: Record<Variant, string> = {
  solid: "text-white shadow-[0_6px_20px_rgba(6,182,212,0.3)] hover:brightness-110",
  soft: "text-[var(--fg)] hover:brightness-[1.06]",
  ghost: "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)]",
  outline:
    "text-[var(--fg)] border border-[var(--stroke-strong)] hover:bg-[var(--surface-2)]",
};

const SIZES: Record<Size, string> = {
  sm: "text-[0.8rem] px-3.5 py-2",
  md: "text-[0.92rem] px-5 py-2.5",
  lg: "text-[1.02rem] px-6 py-3.5 sm:text-[1.1rem]",
};

function styleFor(variant: Variant): React.CSSProperties | undefined {
  if (variant === "solid") return { background: "var(--grad-brand)" };
  if (variant === "soft") return { background: "var(--surface-2)" };
  return undefined;
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      style={styleFor(variant)}
      {...rest}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps extends CommonProps {
  href: string;
  prefetch?: boolean;
  "aria-label"?: string;
}

export function LinkButton({
  href,
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      style={styleFor(variant)}
      {...rest}
    >
      {children}
    </Link>
  );
}
