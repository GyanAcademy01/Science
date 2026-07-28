import { LinkButton } from "@/components/ui/Button";
import { AtomOrb } from "@/components/common/AtomOrb";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60dvh] w-full max-w-[600px] flex-col items-center justify-center px-4 text-center">
      <AtomOrb size={100} />
      <h1 className="mt-3 text-[1.3rem]">
        <span className="text-grad">પાનું મળ્યું નહીં</span>
      </h1>
      <p className="mt-1.5 text-[0.82rem] text-[var(--fg-muted)]">
        તમે શોધો છો તે પાનું અહીં નથી. કદાચ સરનામું બદલાઈ ગયું હોય.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <LinkButton href="/" size="md">
          હોમ પર જાઓ
        </LinkButton>
        <LinkButton href="/subjects" variant="outline" size="md">
          વિષયો જુઓ
        </LinkButton>
      </div>
    </main>
  );
}
