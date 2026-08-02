import { emitClientStoreChange } from "./clientStore";
import { storageKeys } from "./site";

export interface TestResult {
  correct: number;
  total: number;
  /** 0–100 */
  percent: number;
  savedAt: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseTestResult(value: unknown): TestResult | null {
  if (!isRecord(value)) return null;

  const { correct, total, percent, savedAt } = value;
  if (
    typeof correct !== "number" ||
    typeof total !== "number" ||
    typeof percent !== "number" ||
    typeof savedAt !== "number" ||
    !Number.isSafeInteger(correct) ||
    !Number.isSafeInteger(total) ||
    !Number.isSafeInteger(percent) ||
    !Number.isFinite(savedAt) ||
    total <= 0 ||
    correct < 0 ||
    correct > total ||
    percent < 0 ||
    percent > 100 ||
    savedAt < 0 ||
    percent !== Math.round((correct / total) * 100)
  ) {
    return null;
  }

  return { correct, total, percent, savedAt };
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
    return parseTestResult(JSON.parse(raw));
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
  if (
    typeof window === "undefined" ||
    !Number.isSafeInteger(correct) ||
    !Number.isSafeInteger(total) ||
    total <= 0 ||
    correct < 0 ||
    correct > total
  ) {
    return;
  }
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
