import type { TheoryData } from "@/types/theory";
import type { ChapterTests, TestSet } from "@/types/test";
import * as std6 from "@/data/std6";

/** subjectId → topicId → theory */
const THEORY: Record<string, Record<string, TheoryData>> = {
  std6: {
    ch1: std6.std6_ch1_theory,
    ch2: std6.std6_ch2_theory,
  },
};

/** subjectId → topicId → tests */
const TESTS: Record<string, Record<string, ChapterTests>> = {
  std6: {
    ch1: std6.std6_ch1_tests,
    ch2: std6.std6_ch2_tests,
  },
};

export function getTheory(
  subjectId: string,
  topicId: string,
): TheoryData | undefined {
  return THEORY[subjectId]?.[topicId];
}

export function getChapterTests(
  subjectId: string,
  topicId: string,
): ChapterTests | undefined {
  return TESTS[subjectId]?.[topicId];
}

export function getTestSet(
  subjectId: string,
  topicId: string,
  setId: string,
): TestSet | undefined {
  return getChapterTests(subjectId, topicId)?.sets.find(
    (set) => set.setId === setId,
  );
}

/** generateStaticParams માટે — બધા (subjectId, topicId) જોડ */
export function allTopicParams(): { subjectId: string; topicId: string }[] {
  return Object.entries(THEORY).flatMap(([subjectId, topics]) =>
    Object.keys(topics).map((topicId) => ({ subjectId, topicId })),
  );
}

/** generateStaticParams માટે — બધા (subjectId, topicId, setId) જોડ */
export function allSetParams(): {
  subjectId: string;
  topicId: string;
  setId: string;
}[] {
  return Object.entries(TESTS).flatMap(([subjectId, topics]) =>
    Object.entries(topics).flatMap(([topicId, chapter]) =>
      chapter.sets.map((set) => ({ subjectId, topicId, setId: set.setId })),
    ),
  );
}
