import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** ગુજરાતી વાચકો માટે "પાછળ" — તીર ડાબે તરફ મુકાય તે માટે rotate નહીં, ArrowLeft જ યોગ્ય */
export function BackArrow({
  href,
  label = "પાછળ",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--stroke)] bg-[var(--surface-2)] px-3.5 py-2 text-[0.82rem] font-semibold text-[var(--fg-muted)] transition-all duration-300 hover:border-[var(--stroke-strong)] hover:text-[var(--fg)] active:scale-95"
    >
      <ArrowRight size={15} strokeWidth={2.4} className="rotate-180" />
      {label}
    </Link>
  );
}
