## 2026-07-29T10:25:14Z
You are Worker 1 for STD 8 Science Curriculum project.
Your working directory is: d:\W\Gyan academy  project\Science\.agents\worker_m1

Objective: Extract content from PDF files and create high quality theory and test TypeScript data files for STD 8 Chapters 2, 3, 4, and 5.

Source PDFs in `public/pdfs/ધોરણ 8/`:
- Ch 2: `2 - સુક્ષ્મજીવો મિત્ર અને શત્રુ.pdf` -> Create `src/data/std8/ch2/theory.ts` & `src/data/std8/ch2/test.ts`
- Ch 3: `3 - કોલસો અને પેટ્રોલિયમ.pdf` -> Create `src/data/std8/ch3/theory.ts` & `src/data/std8/ch3/test.ts`
- Ch 4: `4 - દહન અને જ્યોત.pdf` -> Create `src/data/std8/ch4/theory.ts` & `src/data/std8/ch4/test.ts`
- Ch 5: `5 - વનસ્પતિઓ અને પ્રાણીઓનું સંરક્ષણ.pdf` -> Create `src/data/std8/ch5/theory.ts` & `src/data/std8/ch5/test.ts`

Instructions & Specifications:
1. Examine `src/data/std8/ch1/theory.ts` and `src/data/std8/ch1/test.ts` to understand the exact structure and exports.
2. Read each corresponding PDF file in `public/pdfs/ધોરણ 8/` using `view_file`.
3. For each chapter (ch2, ch3, ch4, ch5):
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

Update `progress.md` in `d:\W\Gyan academy  project\Science\.agents\worker_m1` during execution. When done, send a message to parent reporting completion and file paths created.
