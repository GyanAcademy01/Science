import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  /** ટોચે gradient પટ્ટી */
  accentTop?: boolean;
}

export function Card({
  hover = false,
  accentTop = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "card relative overflow-hidden",
        hover && "card-hover",
        className,
      )}
      {...rest}
    >
      {accentTop && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: "var(--grad-hero)" }}
        />
      )}
      {children}
    </div>
  );
}
