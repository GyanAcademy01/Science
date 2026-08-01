import type { TheoryData } from "@/types/theory";
import type { ChapterTests, TestSet } from "@/types/test";
import * as std6 from "@/data/std6";
import * as std7 from "@/data/std7";
import * as std8 from "@/data/std8";
import * as std9 from "@/data/std9";
import * as std10 from "@/data/std10";
import * as pedagogy from "@/data/pedagogy";

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
  std8: {
    ch1: std8.std8_ch1_theory,
    ch2: std8.std8_ch2_theory,
    ch3: std8.std8_ch3_theory,
    ch4: std8.std8_ch4_theory,
    ch5: std8.std8_ch5_theory,
    ch6: std8.std8_ch6_theory,
    ch7: std8.std8_ch7_theory,
    ch8: std8.std8_ch8_theory,
    ch9: std8.std8_ch9_theory,
    ch10: std8.std8_ch10_theory,
    ch11: std8.std8_ch11_theory,
    ch12: std8.std8_ch12_theory,
    ch13: std8.std8_ch13_theory,
    ch14: std8.std8_ch14_theory,
  },
  std9: {
    ch1: std9.std9_ch1_theory,
    ch2: std9.std9_ch2_theory,
    ch3: std9.std9_ch3_theory,
    ch4: std9.std9_ch4_theory,
    ch5: std9.std9_ch5_theory,
    ch6: std9.std9_ch6_theory,
    ch7: std9.std9_ch7_theory,
    ch8: std9.std9_ch8_theory,
    ch9: std9.std9_ch9_theory,
    ch10: std9.std9_ch10_theory,
    ch11: std9.std9_ch11_theory,
    ch12: std9.std9_ch12_theory,
    ch13: std9.std9_ch13_theory,
  },
  std10: {
    ch1: std10.std10_ch1_theory,
    ch2: std10.std10_ch2_theory,
    ch3: std10.std10_ch3_theory,
    ch4: std10.std10_ch4_theory,
    ch5: std10.std10_ch5_theory,
    ch6: std10.std10_ch6_theory,
    ch7: std10.std10_ch7_theory,
    ch8: std10.std10_ch8_theory,
    ch9: std10.std10_ch9_theory,
    ch10: std10.std10_ch10_theory,
    ch11: std10.std10_ch11_theory,
    ch12: std10.std10_ch12_theory,
    ch13: std10.std10_ch13_theory,
    ch14: std10.std10_ch14_theory,
  },
  pedagogy: {
    ch1: pedagogy.pedagogy_ch1_theory,
    ch2: pedagogy.pedagogy_ch2_theory,
    ch3: pedagogy.pedagogy_ch3_theory,
    ch4: pedagogy.pedagogy_ch4_theory,
    ch5: pedagogy.pedagogy_ch5_theory,
    ch6: pedagogy.pedagogy_ch6_theory,
    ch7: pedagogy.pedagogy_ch7_theory,
    ch8: pedagogy.pedagogy_ch8_theory,
    ch9: pedagogy.pedagogy_ch9_theory,
    ch10: pedagogy.pedagogy_ch10_theory,
    ch11: pedagogy.pedagogy_ch11_theory,
    ch12: pedagogy.pedagogy_ch12_theory,
    ch13: pedagogy.pedagogy_ch13_theory,
    ch14: pedagogy.pedagogy_ch14_theory,
    ch15: pedagogy.pedagogy_ch15_theory,
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
  std8: {
    ch1: std8.std8_ch1_tests,
    ch2: std8.std8_ch2_tests,
    ch3: std8.std8_ch3_tests,
    ch4: std8.std8_ch4_tests,
    ch5: std8.std8_ch5_tests,
    ch6: std8.std8_ch6_tests,
    ch7: std8.std8_ch7_tests,
    ch8: std8.std8_ch8_tests,
    ch9: std8.std8_ch9_tests,
    ch10: std8.std8_ch10_tests,
    ch11: std8.std8_ch11_tests,
    ch12: std8.std8_ch12_tests,
    ch13: std8.std8_ch13_tests,
    ch14: std8.std8_ch14_tests,
  },
  std9: {
    ch1: std9.std9_ch1_tests,
    ch2: std9.std9_ch2_tests,
    ch3: std9.std9_ch3_tests,
    ch4: std9.std9_ch4_tests,
    ch5: std9.std9_ch5_tests,
    ch6: std9.std9_ch6_tests,
    ch7: std9.std9_ch7_tests,
    ch8: std9.std9_ch8_tests,
    ch9: std9.std9_ch9_tests,
    ch10: std9.std9_ch10_tests,
    ch11: std9.std9_ch11_tests,
    ch12: std9.std9_ch12_tests,
    ch13: std9.std9_ch13_tests,
  },
  std10: {
    ch1: std10.std10_ch1_tests,
    ch2: std10.std10_ch2_tests,
    ch3: std10.std10_ch3_tests,
    ch4: std10.std10_ch4_tests,
    ch5: std10.std10_ch5_tests,
    ch6: std10.std10_ch6_tests,
    ch7: std10.std10_ch7_tests,
    ch8: std10.std10_ch8_tests,
    ch9: std10.std10_ch9_tests,
    ch10: std10.std10_ch10_tests,
    ch11: std10.std10_ch11_tests,
    ch12: std10.std10_ch12_tests,
    ch13: std10.std10_ch13_tests,
    ch14: std10.std10_ch14_tests,
  },
  pedagogy: {
    ch1: pedagogy.pedagogy_ch1_tests,
    ch2: pedagogy.pedagogy_ch2_tests,
    ch3: pedagogy.pedagogy_ch3_tests,
    ch4: pedagogy.pedagogy_ch4_tests,
    ch5: pedagogy.pedagogy_ch5_tests,
    ch6: pedagogy.pedagogy_ch6_tests,
    ch7: pedagogy.pedagogy_ch7_tests,
    ch8: pedagogy.pedagogy_ch8_tests,
    ch9: pedagogy.pedagogy_ch9_tests,
    ch10: pedagogy.pedagogy_ch10_tests,
    ch11: pedagogy.pedagogy_ch11_tests,
    ch12: pedagogy.pedagogy_ch12_tests,
    ch13: pedagogy.pedagogy_ch13_tests,
    ch14: pedagogy.pedagogy_ch14_tests,
    ch15: pedagogy.pedagogy_ch15_tests,
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
