import Link from "next/link";
import { siteConfig } from "@/lib/site";

const LINKS = [
  { href: "/subjects", label: "વિષયો" },
  { href: "/about", label: "અમારા વિશે" },
  { href: "/contact-us", label: "સંપર્ક" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--stroke)] px-4 py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-start">
        <div>
          <p className="text-[0.95rem] font-bold">
            🔬 {siteConfig.name}{" "}
            <span className="text-[var(--fg-muted)]">— Gyan Academy</span>
          </p>
          <p className="mt-1 text-[0.78rem] text-[var(--fg-muted)]">
            {siteConfig.place} · {siteConfig.phone.join(" | ")}
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.82rem] font-semibold text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
