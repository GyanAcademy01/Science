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
    topicCount: 12,
    questionCount: 480,
    color: "#06b6d4",
    color2: "#7c3aed",
    description: "સંપૂર્ણ ધોરણ ૬ વિજ્ઞાન પાઠ્યપુસ્તક (પ્રકરણ ૧ થી ૧૨)",
    topics: [
      {
        id: "ch1",
        number: "1",
        title: "આહારના ઘટકો",
        fullTitle: "પ્રકરણ 1 — આહારના ઘટકો",
        hasTheory: true,
        hasTest: true,
        testSets: 3,
        pdfUrl: "/pdfs/ધોરણ 6/1 - આહારના ઘટકો.pdf",
      },
      {
        id: "ch2",
        number: "2",
        title: "વસ્તુઓના જૂથ બનાવવાં",
        fullTitle: "પ્રકરણ 2 — વસ્તુઓના જૂથ બનાવવાં",
        hasTheory: true,
        hasTest: true,
        testSets: 2,
        pdfUrl: "/pdfs/ધોરણ 6/2 - વસ્તુઓના જૂથ બનાવવાં.pdf",
      },
      {
        id: "ch3",
        number: "3",
        title: "પદાર્થોનું અલગીકરણ",
        fullTitle: "પ્રકરણ 3 — પદાર્થોનું અલગીકરણ",
        hasTheory: true,
        hasTest: true,
        testSets: 2,
        pdfUrl: "/pdfs/ધોરણ 6/3 - પદાર્થોનું અલગીકરણ.pdf",
      },
      {
        id: "ch4",
        number: "4",
        title: "વનસ્પતિની જાણકારી મેળવીએ",
        fullTitle: "પ્રકરણ 4 — વનસ્પતિની જાણકારી મેળવીએ",
        hasTheory: true,
        hasTest: true,
        testSets: 2,
        pdfUrl: "/pdfs/ધોરણ 6/4 - વનસ્પતિની જાણકારી મેળવીએ.pdf",
      },
      {
        id: "ch5",
        number: "5",
        title: "શરીરનું હલનચલન",
        fullTitle: "પ્રકરણ 5 — શરીરનું હલનચલન",
        hasTheory: true,
        hasTest: true,
        testSets: 2,
        pdfUrl: "/pdfs/ધોરણ 6/5 - શરીરનું હલનચલન.pdf",
      },
      {
        id: "ch6",
        number: "6",
        title: "સજીવો – લક્ષણો અને નિવાસસ્થાન",
        fullTitle: "પ્રકરણ 6 — સજીવો – લક્ષણો અને નિવાસસ્થાન",
        hasTheory: true,
        hasTest: true,
        testSets: 2,
        pdfUrl: "/pdfs/ધોરણ 6/6 - સજીવો  લક્ષણો અને નિવા ાસસ્થાન.pdf",
      },
      {
        id: "ch7",
        number: "7",
        title: "ગતિ અને અંતરનું માપન",
        fullTitle: "પ્રકરણ 7 — ગતિ અને અંતરનું માપન",
        hasTheory: true,
        hasTest: true,
        testSets: 2,
        pdfUrl: "/pdfs/ધોરણ 6/7 - ગતિ અને અંતરનું માપન.pdf",
      },
      {
        id: "ch8",
        number: "8",
        title: "પ્રકાશ, પડછાયો અને પરાવર્તન",
        fullTitle: "પ્રકરણ 8 — પ્રકાશ, પડછાયો અને પરાવર્તન",
        hasTheory: true,
        hasTest: true,
        testSets: 2,
        pdfUrl: "/pdfs/ધોરણ 6/8 - પ્રકાશ પડછાયો અને પરાવર્તતતન.pdf",
      },
      {
        id: "ch9",
        number: "9",
        title: "વિદ્યુત તથા પરિપથ",
        fullTitle: "પ્રકરણ 9 — વિદ્યુત તથા પરિપથ",
        hasTheory: true,
        hasTest: true,
        testSets: 1,
        pdfUrl: "/pdfs/ધોરણ 6/9 - વિદ્યુત તથા પરિપથ.pdf",
      },
      {
        id: "ch10",
        number: "10",
        title: "ચુંબક સાથે ગમ્મત",
        fullTitle: "પ્રકરણ 10 — ચુંબક સાથે ગમ્મત",
        hasTheory: true,
        hasTest: true,
        testSets: 2,
        pdfUrl: "/pdfs/ધોરણ 6/10 - ચુંબક સાથે ગમ્મત.pdf",
      },
      {
        id: "ch11",
        number: "11",
        title: "આપણી આસપાસની હવા",
        fullTitle: "પ્રકરણ 11 — આપણી આસપાસની હવા",
        hasTheory: true,
        hasTest: true,
        testSets: 1,
        pdfUrl: "/pdfs/ધોરણ 6/11 - આપણી આસપાસની હવા.pdf",
      },
      {
        id: "ch12",
        number: "12",
        title: "મેગા ટેસ્ટ (સંપૂર્ણ પુનરાવર્તન)",
        fullTitle: "પ્રકરણ 12 — મેગા ટેસ્ટ (૧૦૦ પ્રશ્નો)",
        hasTheory: true,
        hasTest: true,
        testSets: 5,
        pdfUrl: "/pdfs/ધોરણ 6/12 - મેગા ટેસ્ટ.pdf",
      },
    ],
  },
  {
    id: "std7",
    name: "ધોરણ 7",
    icon: "🌱",
    topicCount: 1,
    questionCount: 40,
    color: "#10b981",
    color2: "#059669",
    description: "ધોરણ ૭ વિજ્ઞાન — પાઠ્યપુસ્તક આધારિત સ્માર્ટ થીયરી અને પ્રશ્નોત્તરી",
    topics: [
      {
        id: "ch1",
        number: "1",
        title: "વનસ્પતિમાં પોષણ",
        fullTitle: "પ્રકરણ 1 — વનસ્પતિમાં પોષણ",
        hasTheory: true,
        hasTest: true,
        testSets: 2,
        pdfUrl: "/pdfs/ધોરણ 7/1 - વનસ્પતિમાં પોષણ.pdf",
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
