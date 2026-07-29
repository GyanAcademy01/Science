# Project: STD 8 Science Curriculum Completion (Chapters 2 to 14)

## Architecture
Next.js 14+ / React application with TypeScript.
- `public/pdfs/ધોરણ 8/`: Source PDF textbooks for STD 8 chapters in Gujarati.
- `src/data/std8/ch<N>/theory.ts`: Exports `std8_ch<N>_theory: TheoryData` with structured Gujarati tables and text.
- `src/data/std8/ch<N>/test.ts`: Exports `std8_ch<N>_tests: ChapterTests` with 20-40 MCQs in test sets (100 MCQs in 5 sets for Ch 14 Mega Test).
- `src/data/std8/index.ts`: Re-exports theory and test objects for all 14 chapters.
- `src/lib/data.ts`: Contains subject metadata (`std8` subject listing all 14 topics with question counts and test set counts).
- `src/lib/content.ts`: Maps `std8` theory and test modules in `THEORY` and `TESTS` records.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Chapters 2-5 Content | `ch2`, `ch3`, `ch4`, `ch5` `theory.ts` & `test.ts` | None | DONE (Conv: 3504f652-7209-474e-9958-c2c29f3b09fd) |
| 2 | Chapters 6-9 Content | `ch6`, `ch7`, `ch8`, `ch9` `theory.ts` & `test.ts` | None | DONE (Conv: efd4e8f6-16c0-4d42-b35f-1eb6924b036d) |
| 3 | Chapters 10-13 Content | `ch10`, `ch11`, `ch12`, `ch13` `theory.ts` & `test.ts` | None | DONE (Conv: 94be16a6-54b4-49a6-b585-87ada891180c) |
| 4 | Chapter 14 Mega Test | `ch14` `theory.ts` (summary of ch1-13) & `test.ts` (100 MCQs) | Milestones 1-3 | DONE (Conv: cdac2105-e8f2-485c-b508-65e85d4e0316) |
| 5 | Registration & Build | `src/data/std8/index.ts`, `src/lib/data.ts`, `src/lib/content.ts`, `tsc`, `build`, git push | Milestones 1-4 | IN_PROGRESS |

## Interface Contracts
- `TheoryData`: `{ chapterId: string, chapterTitle: string, description: string, sections: Section[] }`
- `ChapterTests`: `{ chapterId: string, chapterTitle: string, sets: TestSet[] }`
- Re-export naming convention: `std8_ch<N>_theory` and `std8_ch<N>_tests`.

## Code Layout
- `src/data/std8/ch<N>/theory.ts`
- `src/data/std8/ch<N>/test.ts`
- `src/data/std8/index.ts`
- `src/lib/data.ts`
- `src/lib/content.ts`
