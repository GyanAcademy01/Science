## 2026-07-29T04:59:44Z
Objective: Global Registration, Route Mapping, Build Verification, and Git Commit & Push for STD 8 Chapters 1 to 14.

Tasks to execute:
1. Re-export all 14 STD 8 chapters from `src/data/std8/index.ts`:
   Export both theory (`std8_ch<N>_theory`) and test (`std8_ch<N>_tests`) for all chapters from `ch1` through `ch14`.
2. Update `src/lib/data.ts`:
   - Update `std8` subject entry:
     - `topicCount: 14`
     - `questionCount: 570`
     - `description: "સંપૂર્ણ ધોરણ ૮ વિજ્ઞાન પાઠ્યપુસ્તક (પ્રકરણ ૧ થી ૧૪)"`
     - Update `topics` array under `std8` to contain entries for all 14 chapters (`ch1` to `ch14`):
       - `ch1`: `1 - પાક ઉત્પાદન અને વ્યવસ્થાપન.pdf`, testSets: 2
       - `ch2`: `2 - સુક્ષ્મજીવો મિત્ર અને શત્રુ.pdf`, testSets: 2
       - `ch3`: `3 - કોલસો અને પેટ્રોલિયમ.pdf`, testSets: 2
       - `ch4`: `4 - દહન અને જ્યોત.pdf`, testSets: 2
       - `ch5`: `5 - વનસ્પતિઓ અને પ્રાણીઓનું સંરક્ષણ.pdf`, testSets: 2
       - `ch6`: `6 - પ્રણીઓમાં પ્રજનન.pdf`, testSets: 2
       - `ch7`: `7 - કિશોરાવસ્થા તરફ.pdf`, testSets: 2
       - `ch8`: `8 - બળ અને દબાણ.pdf`, testSets: 2
       - `ch9`: `9 - ઘર્ષષણ.pdf`, testSets: 2
       - `ch10`: `10 - ધ્વનિ.pdf`, testSets: 2
       - `ch11`: `11 - વિદ્યુતપ્રવાહની રાસાયણિક અસરો.pdf`, testSets: 2
       - `ch12`: `12 - કેટલીક કુદરતી ઘટનાઓ.pdf`, testSets: 2
       - `ch13`: `13 - પ્રકાશ.pdf`, testSets: 2
       - `ch14`: `14 - મેગા ટેસ્ટ.pdf`, testSets: 5
3. Update `src/lib/content.ts`:
   - Add entries for `ch1` through `ch14` in `std8` object within `THEORY` record (`ch1: std8.std8_ch1_theory`, ..., `ch14: std8.std8_ch14_theory`).
   - Add entries for `ch1` through `ch14` in `std8` object within `TESTS` record (`ch1: std8.std8_ch1_tests`, ..., `ch14: std8.std8_ch14_tests`).
4. Build Verification:
   - Run `npx tsc --noEmit` using `run_command` and confirm exit code 0.
   - Run `npm run build` using `run_command` and confirm exit code 0 and pre-rendered pages.
5. Deployment:
   - Add all changes to git, commit with message `feat: Complete STD 8 Science curriculum content (Chapters 2 to 14)`, and push to `origin main`.
