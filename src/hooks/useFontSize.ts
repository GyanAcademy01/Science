"use client";

import { useCallback, useSyncExternalStore } from "react";
import { storageKeys } from "@/lib/site";
import {
  emitClientStoreChange,
  getMountedServerSnapshot,
  getMountedSnapshot,
  subscribeClientStore,
} from "@/lib/clientStore";

export const FONT_SIZES = ["14px", "16px", "18px", "20px", "24px"] as const;
export const FONT_LABELS = ["અતિ નાનું", "નાનું", "મધ્યમ", "મોટું", "અતિ મોટું"];
const DEFAULT_INDEX = 1;

function getIndexSnapshot(): number {
  try {
    const stored = window.localStorage.getItem(storageKeys.fontSize);
    const parsed = stored === null ? NaN : parseInt(stored, 10);
    if (!Number.isNaN(parsed) && parsed >= 0 && parsed < FONT_SIZES.length) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_INDEX;
}

function getIndexServerSnapshot(): number {
  return DEFAULT_INDEX;
}

export function useFontSize() {
  const index = useSyncExternalStore(
    subscribeClientStore,
    getIndexSnapshot,
    getIndexServerSnapshot,
  );
  const mounted = useSyncExternalStore(
    subscribeClientStore,
    getMountedSnapshot,
    getMountedServerSnapshot,
  );

  const apply = useCallback((next: number) => {
    const clamped = Math.min(Math.max(next, 0), FONT_SIZES.length - 1);
    document.documentElement.style.setProperty(
      "--font-scale",
      FONT_SIZES[clamped],
    );
    try {
      window.localStorage.setItem(storageKeys.fontSize, String(clamped));
    } catch {
      /* ignore */
    }
    emitClientStoreChange();
  }, []);

  return {
    index,
    mounted,
    label: FONT_LABELS[index],
    increase: () => apply(index + 1),
    decrease: () => apply(index - 1),
    set: apply,
    canIncrease: index < FONT_SIZES.length - 1,
    canDecrease: index > 0,
  };
}
