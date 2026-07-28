"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { InstallButton } from "@/components/common/InstallButton";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "હોમ" },
  { href: "/subjects", label: "વિષયો" },
  { href: "/about", label: "અમારા વિશે" },
  { href: "/contact-us", label: "સંપર્ક" },
];

export function Topbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="glass mx-auto flex max-w-[1200px] items-center justify-between gap-3 rounded-full px-3 py-2 sm:px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold"
          onClick={() => setOpen(false)}
        >
          <span
            className="hex grid h-8 w-8 place-items-center text-[0.95rem]"
            style={{ background: "var(--grad-brand)" }}
            aria-hidden
          >
            🔬
          </span>
          <span className="text-[1.05rem] leading-none">
            <span className="text-grad">{siteConfig.name}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[0.86rem] font-semibold transition-all duration-300",
                isActive(item.href)
                  ? "text-white"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
              )}
              style={
                isActive(item.href)
                  ? { background: "var(--grad-brand)" }
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <InstallButton />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "મેનૂ બંધ કરો" : "મેનૂ ખોલો"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--stroke)] bg-[var(--surface-2)] text-[var(--fg)] transition-all active:scale-95 md:hidden"
          >
            {open ? <X size={17} strokeWidth={2.4} /> : <Menu size={17} strokeWidth={2.4} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass anim-slide-down mx-auto mt-2 flex max-w-[1200px] flex-col gap-1 rounded-2xl p-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-4 py-2.5 text-[0.92rem] font-semibold transition-colors",
                isActive(item.href)
                  ? "text-white"
                  : "text-[var(--fg-muted)] hover:bg-[var(--surface-2)]",
              )}
              style={
                isActive(item.href)
                  ? { background: "var(--grad-brand)" }
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
