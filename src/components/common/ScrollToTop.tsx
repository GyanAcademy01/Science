"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="ઉપર જાઓ"
      className="fixed bottom-4 left-4 z-40 grid h-9 w-9 place-items-center rounded-full text-white shadow-[0_8px_24px_rgba(6,182,212,0.4)] transition-transform duration-300 hover:scale-110 active:scale-95"
      style={{ background: "var(--grad-brand)" }}
    >
      <ArrowUp size={16} strokeWidth={2.6} />
    </button>
  );
}
