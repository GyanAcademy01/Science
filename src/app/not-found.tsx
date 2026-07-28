import { LinkButton } from "@/components/ui/Button";
import { AtomOrb } from "@/components/common/AtomOrb";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60dvh] w-full max-w-[600px] flex-col items-center justify-center px-4 text-center">
      <AtomOrb size={130} />
      <h1 className="mt-4 text-[1.6rem]">
        <span className="text-grad">પાનું મળ્યું નહીં</span>
      </h1>
      <p className="mt-2 text-[0.9rem] text-[var(--fg-muted)]">
        તમે શોધો છો તે પાનું અહીં નથી. કદાચ સરનામું બદલાઈ ગયું હોય.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
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
