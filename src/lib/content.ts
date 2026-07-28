import type { TheoryData } from "@/types/theory";
import type { ChapterTests, TestSet } from "@/types/test";
import * as std6 from "@/data/std6";
import * as std7 from "@/data/std7";

/** subjectId → topicId → theory */
const THEORY: Record<string, Record<string, TheoryData>> = {
  std6: {
    ch1: std6.std6_ch1_theory,
    ch2: std6.std6_ch2_theory,
    ch3: std6.std6_ch3_theory,
    ch4: std6.std6_ch4_theory,
    ch5: std6.std6_ch5_theory,
    ch6: std6.std6_ch6_theory,
    ch7: std6.std6_ch7_theory,
    ch8: std6.std6_ch8_theory,
    ch9: std6.std6_ch9_theory,
    ch10: std6.std6_ch10_theory,
    ch11: std6.std6_ch11_theory,
    ch12: std6.std6_ch12_theory,
  },
  std7: {
    ch1: std7.std7_ch1_theory,
    ch2: std7.std7_ch2_theory,
    ch3: std7.std7_ch3_theory,
    ch4: std7.std7_ch4_theory,
    ch5: std7.std7_ch5_theory,
    ch6: std7.std7_ch6_theory,
    ch7: std7.std7_ch7_theory,
    ch8: std7.std7_ch8_theory,
    ch9: std7.std7_ch9_theory,
    ch10: std7.std7_ch10_theory,
    ch11: std7.std7_ch11_theory,
    ch12: std7.std7_ch12_theory,
    ch13: std7.std7_ch13_theory,
    ch14: std7.std7_ch14_theory,
  },
};

/** subjectId → topicId → tests */
const TESTS: Record<string, Record<string, ChapterTests>> = {
  std6: {
    ch1: std6.std6_ch1_tests,
    ch2: std6.std6_ch2_tests,
    ch3: std6.std6_ch3_tests,
    ch4: std6.std6_ch4_tests,
    ch5: std6.std6_ch5_tests,
    ch6: std6.std6_ch6_tests,
    ch7: std6.std6_ch7_tests,
    ch8: std6.std6_ch8_tests,
    ch9: std6.std6_ch9_tests,
    ch10: std6.std6_ch10_tests,
    ch11: std6.std6_ch11_tests,
    ch12: std6.std6_ch12_tests,
  },
  std7: {
    ch1: std7.std7_ch1_tests,
    ch2: std7.std7_ch2_tests,
    ch3: std7.std7_ch3_tests,
    ch4: std7.std7_ch4_tests,
    ch5: std7.std7_ch5_tests,
    ch6: std7.std7_ch6_tests,
    ch7: std7.std7_ch7_tests,
    ch8: std7.std7_ch8_tests,
    ch9: std7.std7_ch9_tests,
    ch10: std7.std7_ch10_tests,
    ch11: std7.std7_ch11_tests,
    ch12: std7.std7_ch12_tests,
    ch13: std7.std7_ch13_tests,
    ch14: std7.std7_ch14_tests,
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
