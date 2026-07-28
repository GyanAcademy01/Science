"use client";

import { useCallback, useSyncExternalStore } from "react";
import { readResult } from "@/lib/progress";
import { subscribeClientStore } from "@/lib/clientStore";

/**
 * એક ટેસ્ટ સેટનો best score (%) — localStorage માંથી.
 * Primitive પાછું આપે છે, તેથી snapshot સ્થિર રહે છે.
 */
export function useBestPercent(
  subjectId: string,
  topicId: string,
  setId: string,
): number | null {
  const getSnapshot = useCallback(
    () => readResult(subjectId, topicId, setId)?.percent ?? null,
    [subjectId, topicId, setId],
  );

  return useSyncExternalStore(subscribeClientStore, getSnapshot, () => null);
}
