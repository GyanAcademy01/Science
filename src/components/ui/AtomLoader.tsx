import { AtomOrb } from "@/components/common/AtomOrb";

export function AtomLoader({ label = "લોડ થાય છે…" }: { label?: string }) {
  return (
    <div className="flex min-h-[50dvh] flex-col items-center justify-center gap-3">
      <AtomOrb size={90} />
      <p className="text-[0.8rem] font-semibold text-[var(--fg-muted)]">{label}</p>
    </div>
  );
}
