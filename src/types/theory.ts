export type TheorySectionType = "text" | "points" | "table" | "qa" | "callout";

export interface TheoryTable {
  headers: string[];
  rows: string[][];
}

export interface TheoryQA {
  q: string;
  a: string;
}

export interface TheorySection {
  id: string;
  title: string;
  /** emoji — icon rail માં દેખાય છે */
  icon?: string;
  type: TheorySectionType;
  content?: string;
  points?: string[];
  tableData?: TheoryTable;
  qa?: TheoryQA[];
  /** 🖼️ વિઝ્યુઅલ ઈન્ફોગ્રાફિક ઈમેજ URL */
  imageUrl?: string;
  /** ઈમેજ નીચેનું કેપ્શન */
  imageCaption?: string;
}

export interface TheoryData {
  chapterId: string;
  chapterTitle: string;
  description: string;
  sections: TheorySection[];
}
