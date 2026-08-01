## 2026-08-01T11:44:08Z
You are a Content Extraction and Generation Worker for Pedagogy Chapters 7 and 8.
Your working directory is `d:\W\Gyan academy  project\Science\.agents\worker_pedagogy_m4`.

Your task:
1. Extract textbook content from PDF files in `d:\W\Gyan academy  project\Science\public\pdfs\વિજ્ઞાન પદ્ધતિશાસ્ત્ર\`:
   - Ch 7: `7 - મૂલ્યાંકન.pdf`
   - Ch 8: `8 - નિદાનાત્મક-ઉપચારાત્મક શિક્ષણ.pdf`

2. Create the following 4 TypeScript files:
   - `src/data/pedagogy/ch7/theory.ts`: export `pedagogy_ch7_theory: TheoryData` (chapterId: 'ch7', chapterTitle: 'મૂલ્યાંકન', description, sections with rich Gujarati tables, NO raw LaTeX).
   - `src/data/pedagogy/ch7/test.ts`: export `pedagogy_ch7_tests: ChapterTests` (chapterId: 'ch7', chapterTitle: 'મૂલ્યાંકન', 3 sets x 10 MCQs = 30 MCQs with options, correctAnswer 0..3, explanations).
   - `src/data/pedagogy/ch8/theory.ts`: export `pedagogy_ch8_theory: TheoryData` (chapterId: 'ch8', chapterTitle: 'નિદાનાત્મક-ઉપચારાત્મક શિક્ષણ', description, sections).
   - `src/data/pedagogy/ch8/test.ts`: export `pedagogy_ch8_tests: ChapterTests` (chapterId: 'ch8', chapterTitle: 'નિદાનાત્મક-ઉપચારાત્મક શિક્ષણ', 3 sets x 10 MCQs = 30 MCQs).

3. Create `d:\W\Gyan academy  project\Science\.agents\worker_pedagogy_m4\handoff.md` summarizing your work.
