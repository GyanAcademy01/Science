## 2026-07-30T04:03:42Z
You are worker_m6 for STD 9 Science project.
Your Working Directory: d:\W\Gyan academy  project\Science\.agents\worker_m6
Project Root: d:\W\Gyan academy  project\Science

Objective: Complete global registration, route mapping, build verification, and git deployment for STD 9 Science (Chapters 1 to 13).

Requirements:
1. `src/data/std9/index.ts`: Re-export theory and test for all 13 chapters (`ch1` through `ch13`).
2. `src/lib/data.ts`: Add `std9` subject entry to `subjects` array:
   - id: "std9"
   - name: "ધોરણ 9"
   - icon: "🧪" (or appropriate icon)
   - topicCount: 13
   - questionCount: calculate exact total question count across all 13 chapters (Ch 1-12 have 30 MCQs each = 360, Ch 13 has 100 MCQs = 460 total)
   - color: "#3b82f6", color2: "#1d4ed8"
   - description: "સંપૂર્ણ ધોરણ ૯ વિજ્ઞાન પાઠ્યપુસ્તક (પ્રકરણ ૧ થી ૧૩)"
   - topics array: list all 13 topics (`ch1` to `ch13`) with accurate title, fullTitle, hasTheory: true, hasTest: true, testSets count (2 for ch1-12, 5 for ch13), and pdfUrl (e.g. "/pdfs/ધોરણ 9/1 - આપણી ી આસપાસમાં દ્રવ્ય.pdf", etc.).
3. `src/lib/content.ts`: Add `std9` entry to `THEORY` (ch1 to ch13 mapped to `std9.std9_ch<N>_theory`) and `TESTS` (ch1 to ch13 mapped to `std9.std9_ch<N>_tests`). Also ensure `import * as std9 from "@/data/std9"` is imported at top.
4. Run `npx tsc --noEmit` and confirm exit code 0 with 0 errors.
5. Run `npm run build` and confirm successful Next.js static site generation.
6. Commit all changes to git with a descriptive commit message and push to GitHub repository `origin main`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Write progress to `.agents/worker_m6/progress.md` and final handoff report to `.agents/worker_m6/handoff.md`. Send message when finished.
