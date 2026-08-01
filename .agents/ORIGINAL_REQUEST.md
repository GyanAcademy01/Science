# Original User Request

## 2026-08-01T06:13:09Z

Add new subject "વિજ્ઞાન પદ્ધતિશાસ્ત્ર" (subjectId: "pedagogy") with Chapters 1 to 10 in the Next.js Science web application by reading PDF files from `public/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/`, creating `theory.ts` and `test.ts` for each chapter, registering them in `src/types/subject.ts`, `src/lib/data.ts`, `src/lib/content.ts`, and `src/data/pedagogy/index.ts`, verifying compilation/build, and committing locally (do NOT push to GitHub until explicitly requested).

Working directory: d:\W\Gyan academy  project\Science
Integrity mode: development

## Requirements

### R1. Subject Definition & Registration
- Register new subject in `src/types/subject.ts` if needed.
- Add `pedagogy` subject in `src/lib/data.ts` with metadata:
  - id: "pedagogy"
  - name: "વિજ્ઞાન પદ્ધતિશાસ્ત્ર"
  - icon: "🎓"
  - topicCount: 10
  - questionCount: 300
  - color: "#8b5cf6"
  - color2: "#6d28d9"
  - description: "વિજ્ઞાન પદ્ધતિશાસ્ત્ર પાઠ્યપુસ્તક (પ્રકરણ ૧ થી ૧૦)"
  - topics: 10 topics (ch1 to ch10) corresponding to the 10 chapters.

### R2. Complete Content Extraction & Generation for Pedagogy Ch 1 to 10
- Use 10 subagents/workers to process the 10 chapters in parallel!
- Read PDF files for Chapters 1 through 10 from `public/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/`:
  - Ch 1: `1 - વિજ્ઞાનનું સ્વરૂપ અને માળખું.pdf`
  - Ch 2: `2 - કુદરતી વિજ્ઞાન ઉદ્દેશ્યો અને હેતુઓ.pdf`
  - Ch 3: `3 - વિજ્ઞાનની સમજ અને કદર.pdf`
  - Ch 4: `4 - અભિગમો.pdf`
  - Ch 5: `5 - શિક્ષણ પદ્ધતિઓ.pdf`
  - Ch 6: `6 - વિજ્ઞાન શિક્ષણમાં અધ્યયન-અધ્યાપન સામગ્રી.pdf`
  - Ch 7: `7 - મૂલ્યાંકન.pdf`
  - Ch 8: `8 - નિદાનાત્મક-ઉપચારાત્મક શિક્ષણ.pdf`
  - Ch 9: `9 - વિજ્ઞાન શિક્ષણમાં નાવીન્યકરણ.pdf`
  - Ch 10: `10 - વિજ્ઞાન મંડળ.pdf`
- For each chapter (Ch 1 to Ch 10), create `src/data/pedagogy/ch<N>/theory.ts` with smart Gujarati theory tables (`TheoryData`) without raw LaTeX (all Unicode), and `src/data/pedagogy/ch<N>/test.ts` with 30 Gujarati MCQs divided into test sets (`ChapterTests`).

### R3. Global Registration & Route Mapping
- Re-export all 10 chapters from `src/data/pedagogy/index.ts`.
- Update `src/lib/data.ts` to map `pedagogy` topics.
- Update `src/lib/content.ts` to map `pedagogy` theory and test records in `THEORY` and `TESTS` records for Next.js static route generation (`generateStaticParams`).

### R4. Build Verification and Git Commit Rule
- Run `npx tsc --noEmit` to guarantee 0 TypeScript compilation errors.
- Run `npm run build` to verify Next.js static site generation for all 10 Pedagogy chapters.
- Commit all created and updated files to local git repository (`git commit`).
- **CRITICAL:** Do NOT run `git push origin main` until the user explicitly requests it.

## Acceptance Criteria

### Content Completeness
- [ ] All 10 Pedagogy chapters are present in `src/data/pedagogy/` (from `ch1` to `ch10`).
- [ ] All questions have valid Gujarati text, 4 options, `correctAnswer` index (0..3), and explanations.
- [ ] No raw LaTeX syntax or broken `$` symbols in theory or test files.

### Technical & Build Health
- [ ] `npx tsc --noEmit` exits with status code 0.
- [ ] `npm run build` succeeds and pre-renders static HTML pages for all 10 Pedagogy chapters.
- [ ] Local git working tree is clean after local commit.
- [ ] No automatic `git push` to GitHub without explicit user instruction.
