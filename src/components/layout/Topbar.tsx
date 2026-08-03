"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { InstallButton } from "@/components/common/InstallButton";
import { FontSizeControl } from "@/components/common/FontSizeControl";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "હોમ" },
];

export function Topbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 px-2.5 pt-2 sm:px-3">
      <div className="glass mx-auto flex max-w-[1200px] items-center justify-between gap-2 rounded-full px-2.5 py-1.5 sm:px-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 font-extrabold"
          onClick={() => setOpen(false)}
        >
          <span
            className="hex grid h-7 w-7 place-items-center text-[0.85rem]"
            style={{ background: "var(--grad-brand)" }}
            aria-hidden
          >
            🔬
          </span>
          <span className="hidden sm:inline text-[0.95rem] leading-none">
            <span className="text-grad">{siteConfig.name}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1 text-[0.8rem] font-semibold transition-all duration-300",
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

        <div className="flex items-center gap-1.5">
          <InstallButton />
          <FontSizeControl />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "મેનૂ બંધ કરો" : "મેનૂ ખોલો"}
            aria-expanded={open}
            className="grid h-8 w-8 place-items-center rounded-full border border-[var(--stroke)] bg-[var(--surface-2)] text-[var(--fg)] transition-all active:scale-95 md:hidden"
          >
            {open ? <X size={15} strokeWidth={2.4} /> : <Menu size={15} strokeWidth={2.4} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass anim-slide-down mx-auto mt-1.5 flex max-w-[1200px] flex-col gap-0.5 rounded-xl p-1.5 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2 text-[0.85rem] font-semibold transition-colors",
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
