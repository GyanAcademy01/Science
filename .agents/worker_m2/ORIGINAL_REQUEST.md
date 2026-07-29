## 2026-07-29T04:55:14Z
<USER_REQUEST>
You are Worker 2 for STD 8 Science Curriculum project.
Your working directory is: d:\W\Gyan academy  project\Science\.agents\worker_m2

Objective: Extract content from PDF files and create high quality theory and test TypeScript data files for STD 8 Chapters 6, 7, 8, and 9.

Source PDFs in `public/pdfs/ધોરણ 8/`:
- Ch 6: `6 - પ્રણીઓમાં પ્રજનન.pdf` -> Create `src/data/std8/ch6/theory.ts` & `src/data/std8/ch6/test.ts`
- Ch 7: `7 - કિશોરાવસ્થા તરફ.pdf` -> Create `src/data/std8/ch7/theory.ts` & `src/data/std8/ch7/test.ts`
- Ch 8: `8 - બળ અને દબાણ.pdf` -> Create `src/data/std8/ch8/theory.ts` & `src/data/std8/ch8/test.ts`
- Ch 9: `9 - ઘર્ષષણ.pdf` -> Create `src/data/std8/ch9/theory.ts` & `src/data/std8/ch9/test.ts`

Instructions & Specifications:
1. Examine `src/data/std8/ch1/theory.ts` and `src/data/std8/ch1/test.ts` to understand the exact structure and exports.
2. Read each corresponding PDF file in `public/pdfs/ધોરણ 8/` using `view_file`.
3. For each chapter (ch6, ch7, ch8, ch9):
   a. Create `src/data/std8/ch<N>/theory.ts`:
      - `import type { TheoryData } from "@/types/theory";`
      - `export const std8_ch<N>_theory: TheoryData = { chapterId: "ch<N>", chapterTitle: "...", description: "...", sections: [...] };`
      - Sections must use structured Gujarati tables (`type: "table"`, `tableData: { headers: [...], rows: [[...], ...] }`) covering all key topics, terms, definitions, scientific processes, and takeaways from the PDF.
   b. Create `src/data/std8/ch<N>/test.ts`:
      - `import type { ChapterTests } from "@/types/test";`
      - `export const std8_ch<N>_tests: ChapterTests = { chapterId: "ch<N>", chapterTitle: "...", sets: [...] };`
      - Include 2 test sets per chapter (e.g. set1 and set2 with 15-20 questions each, total 30-40 MCQs per chapter).
      - Every question must have `id`, `question` (Gujarati text), `options` (array of 4 Gujarati options), `correctAnswer` (0..3 zero-indexed integer), and `explanation` (Gujarati text).

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Update `progress.md` in `d:\W\Gyan academy  project\Science\.agents\worker_m2` during execution. When done, send a message to parent reporting completion and file paths created.
</USER_REQUEST>
