## 2026-08-01T06:16:26Z
You are the Integration and Build Worker for Pedagogy Subject (Milestone 6).
Your working directory is `d:\W\Gyan academy  project\Science\.agents\worker_pedagogy_m6`. Create this directory if needed.

Your task:
1. Verify and update `src/data/pedagogy/index.ts` so that all 10 chapters (`ch1` through `ch10`) theory and test objects are re-exported cleanly:
   - `pedagogy_ch1_theory`, `pedagogy_ch1_tests`
   - `pedagogy_ch2_theory`, `pedagogy_ch2_tests`
   - `pedagogy_ch3_theory`, `pedagogy_ch3_tests`
   - `pedagogy_ch4_theory`, `pedagogy_ch4_tests`
   - `pedagogy_ch5_theory`, `pedagogy_ch5_tests`
   - `pedagogy_ch6_theory`, `pedagogy_ch6_tests`
   - `pedagogy_ch7_theory`, `pedagogy_ch7_tests`
   - `pedagogy_ch8_theory`, `pedagogy_ch8_tests`
   - `pedagogy_ch9_theory`, `pedagogy_ch9_tests`
   - `pedagogy_ch10_theory`, `pedagogy_ch10_tests`

2. Register the new subject in `src/lib/data.ts`:
   Add `pedagogy` to `subjects` array:
   ```typescript
   {
     id: "pedagogy",
     name: "વિજ્ઞાન પદ્ધતિશાસ્ત્ર",
     icon: "🎓",
     topicCount: 10,
     questionCount: 300,
     color: "#8b5cf6",
     color2: "#6d28d9",
     description: "વિજ્ઞાન પદ્ધતિશાસ્ત્ર પાઠ્યપુસ્તક (પ્રકરણ ૧ થી ૧૦)",
     topics: [
       {
         id: "ch1",
         number: "1",
         title: "વિજ્ઞાનનું સ્વરૂપ અને માળખું",
         fullTitle: "પ્રકરણ 1 — વિજ્ઞાનનું સ્વરૂપ અને માળખું",
         hasTheory: true,
         hasTest: true,
         testSets: 3,
         pdfUrl: "/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/1 - વિજ્ઞાનનું સ્વરૂપ અને માળખું.pdf",
       },
       {
         id: "ch2",
         number: "2",
         title: "કુદરતી વિજ્ઞાન ઉદ્દેશ્યો અને હેતુઓ",
         fullTitle: "પ્રકરણ 2 — કુદરતી વિજ્ઞાન ઉદ્દેશ્યો અને હેતુઓ",
         hasTheory: true,
         hasTest: true,
         testSets: 3,
         pdfUrl: "/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/2 - કુદરતી વિજ્ઞાન ઉદ્દેશ્યો અને હેતુઓ.pdf",
       },
       {
         id: "ch3",
         number: "3",
         title: "વિજ્ઞાનની સમજ અને કદર",
         fullTitle: "પ્રકરણ 3 — વિજ્ઞાનની સમજ અને કદર",
         hasTheory: true,
         hasTest: true,
         testSets: 3,
         pdfUrl: "/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/3 - વિજ્ઞાનની સમજ અને કદર.pdf",
       },
       {
         id: "ch4",
         number: "4",
         title: "અભિગમો",
         fullTitle: "પ્રકરણ 4 — અભિગમો",
         hasTheory: true,
         hasTest: true,
         testSets: 3,
         pdfUrl: "/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/4 - અભિગમો.pdf",
       },
       {
         id: "ch5",
         number: "5",
         title: "શિક્ષણ પદ્ધતિઓ",
         fullTitle: "પ્રકરણ 5 — શિક્ષણ પદ્ધતિઓ",
         hasTheory: true,
         hasTest: true,
         testSets: 3,
         pdfUrl: "/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/5 - શિક્ષણ પદ્ધતિઓ.pdf",
       },
       {
         id: "ch6",
         number: "6",
         title: "વિજ્ઞાન શિક્ષણમાં અધ્યયન-અધ્યાપન સામગ્રી",
         fullTitle: "પ્રકરણ 6 — વિજ્ઞાન શિક્ષણમાં અધ્યયન-અધ્યાપન સામગ્રી",
         hasTheory: true,
         hasTest: true,
         testSets: 3,
         pdfUrl: "/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/6 - વિજ્ઞાન શિક્ષણમાં અધ્યયન-અધ્યાપન સામગ્રી.pdf",
       },
       {
         id: "ch7",
         number: "7",
         title: "મૂલ્યાંકન",
         fullTitle: "પ્રકરણ 7 — મૂલ્યાંકન",
         hasTheory: true,
         hasTest: true,
         testSets: 3,
         pdfUrl: "/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/7 - મૂલ્યાંકન.pdf",
       },
       {
         id: "ch8",
         number: "8",
         title: "નિદાનાત્મક-ઉપચારાત્મક શિક્ષણ",
         fullTitle: "પ્રકરણ 8 — નિદાનાત્મક-ઉપચારાત્મક શિક્ષણ",
         hasTheory: true,
         hasTest: true,
         testSets: 3,
         pdfUrl: "/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/8 - નિદાનાત્મક-ઉપચારાત્મક શિક્ષણ.pdf",
       },
       {
         id: "ch9",
         number: "9",
         title: "વિજ્ઞાન શિક્ષણમાં નાવીન્યકરણ",
         fullTitle: "પ્રકરણ 9 — વિજ્ઞાન શિક્ષણમાં નાવીન્યકરણ",
         hasTheory: true,
         hasTest: true,
         testSets: 3,
         pdfUrl: "/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/9 - વિજ્ઞાન શિક્ષણમાં નાવીન્યકરણ.pdf",
       },
       {
         id: "ch10",
         number: "10",
         title: "વિજ્ઞાન મંડળ",
         fullTitle: "પ્રકરણ 10 — વિજ્ઞાન મંડળ",
         hasTheory: true,
         hasTest: true,
         testSets: 3,
         pdfUrl: "/pdfs/વિજ્ઞાન પદ્ધતિશાસ્ત્ર/10 - વિજ્ઞાન મંડળ.pdf",
       },
     ],
   }
   ```

3. Update `src/lib/content.ts`:
   - Import `* as pedagogy from "@/data/pedagogy";`
   - Map `pedagogy` in `THEORY` record:
     `pedagogy: { ch1: pedagogy.pedagogy_ch1_theory, ch2: pedagogy.pedagogy_ch2_theory, ..., ch10: pedagogy.pedagogy_ch10_theory }`
   - Map `pedagogy` in `TESTS` record:
     `pedagogy: { ch1: pedagogy.pedagogy_ch1_tests, ch2: pedagogy.pedagogy_ch2_tests, ..., ch10: pedagogy.pedagogy_ch10_tests }`

4. Run verification steps:
   - Run `npx tsc --noEmit` to verify TypeScript compilation.
   - Run `npm run build` to verify Next.js production build and static site generation for all Pedagogy pages.

5. Git Commit:
   - Run `git add .`
   - Run `git commit -m "feat(pedagogy): add વિજ્ઞાન પદ્ધતિશાસ્ત્ર subject with Chapters 1 to 10 theory and test content"`
   - **CRITICAL**: Do NOT run `git push origin main` or any `git push` command!

6. Create `d:\W\Gyan academy  project\Science\.agents\worker_pedagogy_m6\handoff.md` summarizing integration, build verification outputs, and git commit details.
