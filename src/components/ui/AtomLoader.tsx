import { AtomOrb } from "@/components/common/AtomOrb";

export function AtomLoader({ label = "લોડ થાય છે…" }: { label?: string }) {
  return (
    <div className="flex min-h-[50dvh] flex-col items-center justify-center gap-4">
      <AtomOrb size={120} />
      <p className="text-sm font-semibold text-[var(--fg-muted)]">{label}</p>
    </div>
  );
}
