"use client";

import { useCallback, useSyncExternalStore } from "react";
import { storageKeys } from "@/lib/site";
import {
  emitClientStoreChange,
  getMountedServerSnapshot,
  getMountedSnapshot,
  subscribeClientStore,
} from "@/lib/clientStore";

export type Theme = "light" | "dark";

/**
 * થીમનું સાચું ઠેકાણું <html> નો `dark` class છે — તે layout ના boot script
 * દ્વારા paint પહેલાં જ સેટ થાય છે. તેથી અહીં state નહીં, સીધું DOM વાંચીએ છીએ.
 */
function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getThemeServerSnapshot(): Theme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeClientStore,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );
  const mounted = useSyncExternalStore(
    subscribeClientStore,
    getMountedSnapshot,
    getMountedServerSnapshot,
  );

  const toggle = useCallback(() => {
    const next: Theme = getThemeSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      window.localStorage.setItem(storageKeys.theme, next);
    } catch {
      /* private mode — theme આ session પૂરતું જ રહેશે */
    }
    emitClientStoreChange();
  }, []);

  return { theme, toggle, mounted };
}
