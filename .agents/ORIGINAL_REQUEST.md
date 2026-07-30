# Original User Request

## 2026-07-29T10:24:16Z

<USER_REQUEST>
Complete STD 8 Science Curriculum (Chapters 2 to 14) in the Next.js Science web application by reading PDF files from `public/pdfs/ધોરણ 8/`, creating `theory.ts` and `test.ts` for each chapter, registering them in `src/lib/data.ts` and `src/lib/content.ts`, verifying compilation/build, and pushing to GitHub.

Working directory: d:\W\Gyan academy  project\Science
Integrity mode: development

## Requirements

### R1. Complete Content Extraction & Generation for STD 8 Ch 2 to 14
- Read PDF files for STD 8 Chapters 2 through 14 from `public/pdfs/ધોરણ 8/`:
  - Ch 2: `2 - સુક્ષ્મજીવો મિત્ર અને શત્રુ.pdf`
  - Ch 3: `3 - કોલસો અને પેટ્રોલિયમ.pdf`
  - Ch 4: `4 - દહન અને જ્યોત.pdf`
  - Ch 5: `5 - વનસ્પતિઓ અને પ્રાણીઓનું સંરક્ષણ.pdf`
  - Ch 6: `6 - પ્રણીઓમાં પ્રજનન.pdf`
  - Ch 7: `7 - કિશોરાવસ્થા તરફ.pdf`
  - Ch 8: `8 - બળ અને દબાણ.pdf`
  - Ch 9: `9 - ઘર્ષષણ.pdf`
  - Ch 10: `10 - ધ્વનિ.pdf`
  - Ch 11: `11 - વિદ્યુતપ્રવાહની રાસાયણિક અસરો.pdf`
  - Ch 12: `12 - કેટલીક કુદરતી ઘટનાઓ.pdf`
  - Ch 13: `13 - પ્રકાશ.pdf`
  - Ch 14: `14 - મેગા ટેસ્ટ.pdf`
- For each chapter (Ch 2 to Ch 13), create `src/data/std8/ch<N>/theory.ts` with structured Gujarati theory tables (`TheoryData`) and `src/data/std8/ch<N>/test.ts` with 20 to 40 Gujarati MCQs divided into test sets (`ChapterTests`).
- For Chapter 14 (Mega Test), create `src/data/std8/ch14/theory.ts` containing comprehensive chapter-by-chapter summary tables for all 13 chapters of STD 8, and `src/data/std8/ch14/test.ts` containing 100 MCQs in 5 test sets of 20 questions each.

### R2. Global Registration & Route Mapping
- Re-export all 14 chapters from `src/data/std8/index.ts`.
- Update `src/lib/data.ts` to list all 14 topics under `std8` subject with accurate topic counts, test set counts, and question counts.
- Update `src/lib/content.ts` to map `std8` theory and test chapters in `THEORY` and `TESTS` records for Next.js static route generation (`generateStaticParams`).

### R3. Build Verification and Deployment
- Run `npx tsc --noEmit` to guarantee 0 TypeScript compilation errors.
- Run `npm run build` to verify Next.js static site generation for all 14 STD 8 chapters.
- Commit all created and updated files to git and push to GitHub repository `origin main`.

## Acceptance Criteria

### Content Completeness
- [ ] All 14 STD 8 chapters are present in `src/data/std8/` (from `ch1` to `ch14`).
- [ ] Chapter 14 theory contains individual, detailed summary tables for Chapters 1 through 13.
- [ ] All questions have valid Gujarati text, 4 options, `correctAnswer` index (0..3), and explanations.

### Technical & Build Health
- [ ] `npx tsc --noEmit` exits with status code 0.
- [ ] `npm run build` succeeds and pre-renders static HTML pages for all STD 8 chapters.
- [ ] Git working tree is clean and latest commits are pushed to `origin main`.
</USER_REQUEST>

## 2026-07-30T09:27:30Z

<USER_REQUEST>
Complete STD 9 Science Curriculum (Chapters 1 to 13) in the Next.js Science web application by reading PDF files from `public/pdfs/ધોરણ 9/`, creating `theory.ts` and `test.ts` for each chapter, registering them in `src/lib/data.ts` and `src/lib/content.ts`, verifying compilation/build, and pushing to GitHub.

Working directory: d:\W\Gyan academy  project\Science
Integrity mode: development

## Requirements

### R1. Complete Content Extraction & Generation for STD 9 Ch 1 to 13
- Read PDF files for STD 9 Chapters 1 through 13 from `public/pdfs/ધોરણ 9/`:
  - Ch 1: `1 - આપણી ી આસપાસમાં દ્રવ્ય.pdf`
  - Ch 2: `2 - આપણી ી આસપાસના દ્રવ્યો શુદ્ધ છે.pdf`
  - Ch 3: `3 - પરમાણુ અને અણુઓ.pdf`
  - Ch 4: `4 - પરમાણુનું બંધારણ.pdf`
  - Ch 5: `5 - સજીવનો પાયાનો એકમ.pdf`
  - Ch 6: `6 - પેશીઓ.pdf`
  - Ch 7: `7 - ગતિ.pdf`
  - Ch 8: `8 - બળ અને ગતિના નિયમો.pdf`
  - Ch 9: `9 - ગુરુત્વાકર્ષષણ.pdf`
  - Ch 10: `10 - કાર્યય અને ઊર્જા.pdf`
  - Ch 11: `11 - ધ્વનિ.pdf`
  - Ch 12: `12 - અન્નસ્ત્રોતોમાં સુધારણા.pdf`
  - Ch 13: `13 - મેગા ટેસ્ટ.pdf`
- For each chapter (Ch 1 to Ch 12), create `src/data/std9/ch<N>/theory.ts` with structured Gujarati theory tables (`TheoryData`) and `src/data/std9/ch<N>/test.ts` with 20 to 40 Gujarati MCQs divided into test sets (`ChapterTests`).
- For Chapter 13 (Mega Test), create `src/data/std9/ch13/theory.ts` containing comprehensive chapter-by-chapter summary tables covering all 12 prior chapters of STD 9, and `src/data/std9/ch13/test.ts` containing 100 MCQs in 5 test sets of 20 questions each.

### R2. Global Registration & Route Mapping
- Re-export all 13 chapters from `src/data/std9/index.ts`.
- Update `src/lib/data.ts` to list all 13 topics under `std9` subject with accurate topic counts, test set counts, and question counts.
- Update `src/lib/content.ts` to map `std9` theory and test chapters in `THEORY` and `TESTS` records for Next.js static route generation (`generateStaticParams`).

### R3. Build Verification and Deployment
- Run `npx tsc --noEmit` to guarantee 0 TypeScript compilation errors.
- Run `npm run build` to verify Next.js static site generation for all 13 STD 9 chapters.
- Commit all created and updated files to git and push to GitHub repository `origin main`.

## Acceptance Criteria

### Content Completeness
- [ ] All 13 STD 9 chapters are present in `src/data/std9/` (from `ch1` to `ch13`).
- [ ] Chapter 13 theory contains individual, detailed summary tables for Chapters 1 through 12.
- [ ] All questions have valid Gujarati text, 4 options, `correctAnswer` index (0..3), and explanations.

### Technical & Build Health
- [ ] `npx tsc --noEmit` exits with status code 0.
- [ ] `npm run build` succeeds and pre-renders static HTML pages for all STD 9 chapters.
- [ ] Git working tree is clean and latest commits are pushed to `origin main`.
</USER_REQUEST>
