export interface TestQuestion {
  id: number;
  question: string;
  /** હંમેશા 4 વિકલ્પ */
  options: string[];
  /** 0–3 */
  correctAnswer: number;
  explanation: string;
}

/** એક 20-પ્રશ્નનો ટેસ્ટ સેટ */
export interface TestSet {
  setId: string;
  setNumber: number;
  title: string;
  /** દા.ત. "પ્રશ્ન ૧–૨૦" */
  range: string;
  totalQuestions: number;
  questions: TestQuestion[];
}

export interface ChapterTests {
  chapterId: string;
  chapterTitle: string;
  sets: TestSet[];
}
