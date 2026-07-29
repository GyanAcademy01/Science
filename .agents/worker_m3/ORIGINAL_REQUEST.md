## 2026-07-29T04:55:14Z
You are Worker 3 for STD 8 Science Curriculum project.
Your working directory is: d:\W\Gyan academy  project\Science\.agents\worker_m3

Objective: Extract content from PDF files and create high quality theory and test TypeScript data files for STD 8 Chapters 10, 11, 12, and 13.

Source PDFs in `public/pdfs/ધોરણ 8/`:
- Ch 10: `10 - ધ્વનિ.pdf` -> Create `src/data/std8/ch10/theory.ts` & `src/data/std8/ch10/test.ts`
- Ch 11: `11 - વિદ્યુતપ્રવાહની રાસાયણિક અસરો.pdf` -> Create `src/data/std8/ch11/theory.ts` & `src/data/std8/ch11/test.ts`
- Ch 12: `12 - કેટલીક કુદરતી ઘટનાઓ.pdf` -> Create `src/data/std8/ch12/theory.ts` & `src/data/std8/ch12/test.ts`
- Ch 13: `13 - પ્રકાશ.pdf` -> Create `src/data/std8/ch13/theory.ts` & `src/data/std8/ch13/test.ts`

Instructions & Specifications:
1. Examine `src/data/std8/ch1/theory.ts` and `src/data/std8/ch1/test.ts` to understand the exact structure and exports.
2. Read each corresponding PDF file in `public/pdfs/ધોરણ 8/` using `view_file`.
3. For each chapter (ch10, ch11, ch12, ch13):
   a. Create `src/data/std8/ch<N>/theory.ts`:
      - `import type { TheoryData } from "@/types/theory";`
      - `export const std8_ch<N>_theory: TheoryData = { chapterId: "ch<N>", chapterTitle: "...", description: "...", sections: [...] };`
      - Sections must use structured Gujarati tables (`type: "table"`, `tableData: { headers: [...], rows: [[...], ...] }`) covering all key topics, terms, definitions, scientific processes, and takeaways from the PDF.
   b. Create `src/data/std8/ch<N>/test.ts`:
      - `import type { ChapterTests } from "@/types/test";`
      - `export const std8_ch<N>_tests: ChapterTests = { chapterId: "ch<N>", chapterTitle: "...", sets: [...] };`
      - Include 2 test sets per chapter (e.g. set1 and set2 with 15-20 questions each, total 30-40 MCQs per chapter).
      - Every question must have `id`, `question` (Gujarati text), `options` (array of 4 Gujarati options), `correctAnswer` (0..3 zero-indexed integer), and `explanation` (Gujarati text).
