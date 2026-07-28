"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "લાઇટ થીમ કરો" : "ડાર્ક થીમ કરો"}
      title={theme === "dark" ? "લાઇટ થીમ" : "ડાર્ક થીમ"}
      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--stroke)] bg-[var(--surface-2)] text-[var(--fg)] transition-all duration-300 hover:border-[var(--stroke-strong)] active:scale-95"
    >
      {mounted && theme === "dark" ? (
        <Sun size={17} strokeWidth={2.2} />
      ) : (
        <Moon size={17} strokeWidth={2.2} />
      )}
    </button>
  );
}
