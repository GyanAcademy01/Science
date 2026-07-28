export interface Topic {
  id: string;
  number: string;
  title: string;
  fullTitle: string;
  hasTheory: boolean;
  hasTest: boolean;
  /** આ પ્રકરણમાં કુલ કેટલા ટેસ્ટ સેટ છે */
  testSets: number;
  pdfUrl?: string;
}

export interface Subject {
  id: string;
  name: string;
  /** emoji */
  icon: string;
  topicCount: number;
  questionCount: number;
  color: string;
  color2: string;
  description: string;
  topics: Topic[];
}
