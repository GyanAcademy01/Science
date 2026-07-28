import Link from "next/link";
import { siteConfig } from "@/lib/site";

const LINKS = [
  { href: "/about", label: "અમારા વિશે" },
  { href: "/contact-us", label: "સંપર્ક" },
];

export function Footer() {
  return (
    <footer className="mt-3 border-t border-[var(--stroke)] px-3 py-1.5">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-1.5 text-center sm:flex-row sm:justify-between sm:text-start">
        <div>
          <p className="text-[0.82rem] font-bold leading-tight">
            🔬 {siteConfig.name}{" "}
            <span className="text-[var(--fg-muted)]">— Gyan Academy</span>
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
