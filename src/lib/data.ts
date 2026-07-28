import type { Subject, Topic } from "@/types/subject";

/**
 * ⚠️ id (std6, ch1, ch2, set1…) ક્યારેય બદલવા નહીં —
 * વિદ્યાર્થીની localStorage માં સચવાયેલી progress તૂટે.
 */
export const subjects: Subject[] = [
  {
    id: "std6",
    name: "ધોરણ 6",
    icon: "🔬",
    topicCount: 2,
    questionCount: 100,
    color: "#06b6d4",
    color2: "#7c3aed",
    description: "આહારના ઘટકો · વસ્તુઓના જૂથ બનાવવાં",
    topics: [
      {
        id: "ch1",
        number: "1",
        title: "આહારના ઘટકો",
        fullTitle: "પ્રકરણ 1 — આહારના ઘટકો",
        hasTheory: true,
        hasTest: true,
        testSets: 3,
        pdfUrl: "/pdfs/STD6/01_STD6_Ch01.pdf",
      },
      {
        id: "ch2",
        number: "2",
        title: "વસ્તુઓના જૂથ બનાવવાં",
        fullTitle: "પ્રકરણ 2 — વસ્તુઓના જૂથ બનાવવાં",
        hasTheory: true,
        hasTest: true,
        testSets: 2,
        pdfUrl: "/pdfs/STD6/02_STD6_Ch02.pdf",
      },
    ],
  },
];

export function getSubject(subjectId: string): Subject | undefined {
  return subjects.find((s) => s.id === subjectId);
}

export function getTopic(
  subjectId: string,
  topicId: string,
): { subject: Subject; topic: Topic } | undefined {
  const subject = getSubject(subjectId);
  const topic = subject?.topics.find((t) => t.id === topicId);
  if (!subject || !topic) return undefined;
  return { subject, topic };
}

export const siteStats = {
  subjects: subjects.length,
  chapters: subjects.reduce((n, s) => n + s.topicCount, 0),
  questions: subjects.reduce((n, s) => n + s.questionCount, 0),
};
