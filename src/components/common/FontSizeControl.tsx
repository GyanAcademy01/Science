"use client";

import { Type } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FONT_LABELS, FONT_SIZES, useFontSize } from "@/hooks/useFontSize";

/** TAT GK જેવી dropdown સાથે સમગ્ર app માટે અક્ષરનું માપ બદલવાનું નિયંત્રણ. */
export function FontSizeControl() {
  const { index, mounted, set } = useFontSize();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="અક્ષરનું માપ પસંદ કરો"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title="અક્ષરનું માપ"
        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[var(--stroke)] bg-[var(--surface-2)] text-[var(--fg)] transition-transform duration-150 hover:scale-105 hover:border-[var(--stroke-strong)] active:scale-95"
      >
        <span className="flex select-none items-end gap-px leading-none">
          <span className="text-[8px] font-black text-[var(--fg-muted)]">A</span>
          <span className="-mb-px text-[11px] font-black text-[var(--fg)]">A</span>
        </span>
      </button>

      {isOpen && (
        <div
          className="anim-slide-down absolute right-0 top-full z-[60] mt-2 w-[220px] origin-top-right"
          role="menu"
          aria-label="અક્ષરનું માપ"
        >
          <div className="overflow-hidden rounded-2xl border-2 border-[var(--stroke-strong)] bg-[var(--surface-solid)] shadow-2xl shadow-cyan-500/15">
            <div className="flex items-center gap-2.5 border-b border-[var(--stroke)] px-4 pb-3 pt-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 text-white shadow-md shadow-cyan-500/25">
                <Type size={16} strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold tracking-tight text-[var(--fg)]">
                અક્ષરનું માપ
              </span>
            </div>

            <div className="space-y-0.5 px-2 py-2">
              {FONT_SIZES.map((size, optionIndex) => {
                const isActive = index === optionIndex;
                const labelSize =
                  optionIndex === 0
                    ? "text-sm"
                    : optionIndex === 1
                      ? "text-base"
                      : optionIndex === 2
                        ? "text-[17px]"
                        : optionIndex === 3
                          ? "text-xl"
                          : "text-2xl";

                return (
                  <button
                    key={size}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isActive}
                    onClick={() => {
                      set(optionIndex);
                      setIsOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${
                      isActive
                        ? "bg-[var(--ok-soft)]"
                        : "hover:bg-[var(--surface-2)]"
                    }`}
                  >
                    <span
                      className={`${labelSize} font-semibold leading-none ${
                        isActive
                          ? "font-bold text-[var(--brand-2)]"
                          : "text-[var(--fg)]"
                      }`}
                    >
                      {FONT_LABELS[optionIndex]}
                    </span>
                    <span
                      className={`ml-2 shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        isActive
                          ? "bg-[var(--brand-2)] text-white"
                          : "bg-[var(--surface-2)] text-[var(--fg-muted)]"
                      }`}
                    >
                      {size}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="h-2" />
          </div>
        </div>
      )}
    </div>
  );
}
