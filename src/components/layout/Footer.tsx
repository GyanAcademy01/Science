import Link from "next/link";
import { siteConfig } from "@/lib/site";

const LINKS = [
  { href: "/subjects", label: "વિષયો" },
  { href: "/about", label: "અમારા વિશે" },
  { href: "/contact-us", label: "સંપર્ક" },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--stroke)] px-3 py-5">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-2.5 text-center sm:flex-row sm:justify-between sm:text-start">
        <div>
          <p className="text-[0.86rem] font-bold">
            🔬 {siteConfig.name}{" "}
            <span className="text-[var(--fg-muted)]">— Gyan Academy</span>
          </p>
          <p className="mt-0.5 text-[0.72rem] text-[var(--fg-muted)]">
            {siteConfig.place} · {siteConfig.phone.join(" | ")}
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.76rem] font-semibold text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
