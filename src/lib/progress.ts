import { emitClientStoreChange } from "./clientStore";
import { storageKeys } from "./site";

export interface TestResult {
  correct: number;
  total: number;
  /** 0–100 */
  percent: number;
  savedAt: number;
}

function key(subjectId: string, topicId: string, setId: string): string {
  return `${storageKeys.resultPrefix}-${subjectId}-${topicId}-${setId}`;
}

export function readResult(
  subjectId: string,
  topicId: string,
  setId: string,
): TestResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key(subjectId, topicId, setId));
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "correct" in parsed &&
      "total" in parsed
    ) {
      return parsed as TestResult;
    }
    return null;
  } catch {
    return null;
  }
}

/** હાલનો સ્કોર જૂના best કરતાં સારો હોય તો જ સાચવે */
export function saveBestResult(
  subjectId: string,
  topicId: string,
  setId: string,
  correct: number,
  total: number,
): void {
  if (typeof window === "undefined" || total <= 0) return;
  const percent = Math.round((correct / total) * 100);
  const previous = readResult(subjectId, topicId, setId);
  if (previous && previous.percent >= percent) return;
  try {
    const payload: TestResult = { correct, total, percent, savedAt: Date.now() };
    window.localStorage.setItem(
      key(subjectId, topicId, setId),
      JSON.stringify(payload),
    );
    emitClientStoreChange();
  } catch {
    /* quota / private mode — progress વગર પણ ટેસ્ટ ચાલવો જોઈએ */
  }
}
