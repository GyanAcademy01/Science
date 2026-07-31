## 2026-07-31T06:53:57Z

You are Worker 6 for STD 10 Science Curriculum Milestone 6 (Global Registration, Build Verification & Local Git Commit).
Your working directory is: d:\W\Gyan academy  project\Science\.agents\worker_m6

Tasks:
1. Verify `src/types/subject.ts` (register `std10` if needed).
2. Ensure `src/data/std10/index.ts` re-exports theory and tests for all 14 chapters (`ch1` to `ch14`).
3. Update `src/lib/data.ts` to add the `std10` subject entry in `subjects` array with:
   - `id: "std10"`, `name: "ધોરણ 10"`, `icon: "🔬"`, `topicCount: 14`, accurate `questionCount` (sum of MCQs across all 14 chapters), `color: "#059669"`, `color2: "#0284c7"`, `description: "સંપૂર્ણ ધોરણ ૧૦ વિજ્ઞાન પાઠ્યપુસ્તક (પ્રકરણ ૧ થી ૧૪)"`.
   - All 14 topics listed with accurate `testSets` count and exact `pdfUrl` matching files in `public/pdfs/ધોરણ 10/`.
4. Update `src/lib/content.ts`:
   - Import `* as std10 from "@/data/std10";`
   - Register `std10` in `THEORY` record for `ch1` to `ch14` (`ch1: std10.std10_ch1_theory`, ..., `ch14: std10.std10_ch14_theory`).
   - Register `std10` in `TESTS` record for `ch1` to `ch14` (`ch1: std10.std10_ch1_tests`, ..., `ch14: std10.std10_ch14_tests`).
5. Run verification commands:
   - `npx tsc --noEmit`
   - `npm run build`
6. Local Git Commit:
   - Run `git add .`
   - Run `git commit -m "feat(std10): complete STD 10 Science curriculum (Chapters 1 to 14)"`
   - CRITICAL: Do NOT run `git push origin main` until explicitly requested by the user.
7. MANDATORY INTEGRITY WARNING: DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
8. Document results in `d:\W\Gyan academy  project\Science\.agents\worker_m6\handoff.md` and update `progress.md`.
9. Send a completion message to parent when done.
