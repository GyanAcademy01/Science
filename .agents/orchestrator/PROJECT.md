# Project: Science Pedagogy Subject ("વિજ્ઞાન પદ્ધતિશાસ્ત્ર" - Chapters 1 to 10)

## Architecture
Next.js 14+ / React application with TypeScript.
- `public/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/`: Source PDF textbooks for Pedagogy chapters in Gujarati.
- `src/data/pedagogy/ch<N>/theory.ts`: Exports `pedagogy_ch<N>_theory: TheoryData` with structured Gujarati tables and text. Absolute ZERO raw LaTeX syntax or `$`. Use clean Unicode symbols.
- `src/data/pedagogy/ch<N>/test.ts`: Exports `pedagogy_ch<N>_tests: ChapterTests` with 30 MCQs in 3 test sets of 10 questions each for Ch 1 to 10.
- `src/data/pedagogy/index.ts`: Re-exports theory and test objects for all 10 chapters.
- `src/types/subject.ts`: Contains subject interfaces.
- `src/lib/data.ts`: Subject metadata (`pedagogy` subject listing all 10 topics with accurate topic counts, test set counts, and question counts = 300).
- `src/lib/content.ts`: Maps `pedagogy` theory and test modules in `THEORY` and `TESTS` records for Next.js static route generation.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Pedagogy Ch 1 & 2 Content | `ch1`, `ch2` `theory.ts` & `test.ts` | None | PLANNED |
| 2 | Pedagogy Ch 3 & 4 Content | `ch3`, `ch4` `theory.ts` & `test.ts` | None | PLANNED |
| 3 | Pedagogy Ch 5 & 6 Content | `ch5`, `ch6` `theory.ts` & `test.ts` | None | PLANNED |
| 4 | Pedagogy Ch 7 & 8 Content | `ch7`, `ch8` `theory.ts` & `test.ts` | None | PLANNED |
| 5 | Pedagogy Ch 9 & 10 Content | `ch9`, `ch10` `theory.ts` & `test.ts` | None | PLANNED |
| 6 | Global Registration & Build | `src/types/subject.ts`, `src/lib/data.ts`, `src/lib/content.ts`, `src/data/pedagogy/index.ts`, `tsc`, `build`, local git commit (NO PUSH) | Milestones 1-5 | PLANNED |

## Interface Contracts
- `TheoryData`: `{ chapterId: string, chapterTitle: string, description: string, sections: Section[] }`
- `ChapterTests`: `{ chapterId: string, chapterTitle: string, sets: TestSet[] }`
- Re-export naming convention: `pedagogy_ch<N>_theory` and `pedagogy_ch<N>_tests`.

## Code Layout
- `src/data/pedagogy/ch<N>/theory.ts`
- `src/data/pedagogy/ch<N>/test.ts`
- `src/data/pedagogy/index.ts`
- `src/types/subject.ts`
- `src/lib/data.ts`
- `src/lib/content.ts`
