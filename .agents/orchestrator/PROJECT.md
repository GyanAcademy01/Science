# Project: STD 9 Science Curriculum Completion (Chapters 1 to 13)

## Architecture
Next.js 14+ / React application with TypeScript.
- `public/pdfs/ધોરણ 9/`: Source PDF textbooks for STD 9 chapters in Gujarati.
- `src/data/std9/ch<N>/theory.ts`: Exports `std9_ch<N>_theory: TheoryData` with structured Gujarati tables and text.
- `src/data/std9/ch<N>/test.ts`: Exports `std9_ch<N>_tests: ChapterTests` with 20-40 MCQs in test sets (100 MCQs in 5 sets for Ch 13 Mega Test).
- `src/data/std9/index.ts`: Re-exports theory and test objects for all 13 chapters.
- `src/lib/data.ts`: Contains subject metadata (`std9` subject listing all 13 topics with question counts and test set counts).
- `src/lib/content.ts`: Maps `std9` theory and test modules in `THEORY` and `TESTS` records.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Chapters 1-3 Content | `ch1`, `ch2`, `ch3` `theory.ts` & `test.ts` | None | DONE (Conv: 41872b05-df6c-4b86-b906-6d5395e8c249) |
| 2 | Chapters 4-6 Content | `ch4`, `ch5`, `ch6` `theory.ts` & `test.ts` | None | DONE (Conv: 783ba70b-4e11-4e76-8ac9-76b5edd001a0) |
| 3 | Chapters 7-9 Content | `ch7`, `ch8`, `ch9` `theory.ts` & `test.ts` | None | DONE (Conv: fba2a480-8eec-4213-8b7e-278ac46631a5) |
| 4 | Chapters 10-12 Content | `ch10`, `ch11`, `ch12` `theory.ts` & `test.ts` | None | DONE (Conv: 849e58a9-0e4f-42bb-bdfa-b6877c24cd9e) |
| 5 | Chapter 13 Mega Test | `ch13` `theory.ts` (summary of ch1-12) & `test.ts` (100 MCQs) | Milestones 1-4 | DONE (Conv: 5c560568-ff6f-4871-81db-65eae54b9d51) |
| 6 | Registration & Build | `src/data/std9/index.ts`, `src/lib/data.ts`, `src/lib/content.ts`, `tsc`, `build`, git push | Milestones 1-5 | DONE (Conv: a815bd64-b51c-4dcc-8466-694d1c602d60) |

## Interface Contracts
- `TheoryData`: `{ chapterId: string, chapterTitle: string, description: string, sections: Section[] }`
- `ChapterTests`: `{ chapterId: string, chapterTitle: string, sets: TestSet[] }`
- Re-export naming convention: `std9_ch<N>_theory` and `std9_ch<N>_tests`.

## Code Layout
- `src/data/std9/ch<N>/theory.ts`
- `src/data/std9/ch<N>/test.ts`
- `src/data/std9/index.ts`
- `src/lib/data.ts`
- `src/lib/content.ts`
