# Project: STD 10 Science Curriculum Completion (Chapters 1 to 14)

## Architecture
Next.js 14+ / React application with TypeScript.
- `public/pdfs/ધોરણ 10/`: Source PDF textbooks for STD 10 chapters in Gujarati.
- `src/data/std10/ch<N>/theory.ts`: Exports `std10_ch<N>_theory: TheoryData` with structured Gujarati tables and text. Absolute ZERO raw LaTeX syntax or `$`. Use clean Unicode symbols (`H₂O`, `CO₂`, `°C`, `Ω`, `A`, `V`, `W`, `kWh`, `m/s`, `m/s²`, `N`, `J`, `p⁺`, `e⁻`, `n⁰`).
- `src/data/std10/ch<N>/test.ts`: Exports `std10_ch<N>_tests: ChapterTests` with 20-40 MCQs in test sets (100 MCQs in 5 sets of 20 questions for Ch 14 Mega Test).
- `src/data/std10/index.ts`: Re-exports theory and test objects for all 14 chapters.
- `src/lib/data.ts`: Contains subject metadata (`std10` subject listing all 14 topics with accurate topic counts, test set counts, and question counts).
- `src/lib/content.ts`: Maps `std10` theory and test modules in `THEORY` and `TESTS` records for Next.js static route generation.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Chapters 1-3 Content | `ch1`, `ch2`, `ch3` `theory.ts` & `test.ts` | None | DONE (Conv: 68004b5d-1bce-4492-ba62-23f9f0782062) |
| 2 | Chapters 4-6 Content | `ch4`, `ch5`, `ch6` `theory.ts` & `test.ts` | None | DONE (Conv: bcbc5957-2e7f-4e2a-b7d8-330aa7273d66) |
| 3 | Chapters 7-9 Content | `ch7`, `ch8`, `ch9` `theory.ts` & `test.ts` | None | DONE (Conv: a81d946b-e491-42de-b9f9-b1a462f46a86) |
| 4 | Chapters 10-13 Content | `ch10`, `ch11`, `ch12`, `ch13` `theory.ts` & `test.ts` | None | DONE (Conv: 34e616ee-035f-4e65-b880-22d5101b5c80) |
| 5 | Chapter 14 Mega Test | `ch14` `theory.ts` (summary of ch1-13) & `test.ts` (100 MCQs) | Milestones 1-4 | DONE (Conv: 0ab9300b-39cf-465a-8f36-218eecdce386) |
| 6 | Registration & Build | `src/data/std10/index.ts`, `src/lib/data.ts`, `src/lib/content.ts`, `tsc`, `build`, local git commit (NO PUSH) | Milestones 1-5 | IN_PROGRESS (Conv: 88b3138a-4b18-4c44-b3cc-9f75f7738e8f) |

## Interface Contracts
- `TheoryData`: `{ chapterId: string, chapterTitle: string, description: string, sections: Section[] }`
- `ChapterTests`: `{ chapterId: string, chapterTitle: string, sets: TestSet[] }`
- Re-export naming convention: `std10_ch<N>_theory` and `std10_ch<N>_tests`.

## Code Layout
- `src/data/std10/ch<N>/theory.ts`
- `src/data/std10/ch<N>/test.ts`
- `src/data/std10/index.ts`
- `src/lib/data.ts`
- `src/lib/content.ts`
