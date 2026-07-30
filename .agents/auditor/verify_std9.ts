import * as std9 from "../../src/data/std9";

async function main() {
  console.log("=== VICTORY AUDITOR PROGRAMMATIC VERIFICATION FOR STD 9 ===");
  let totalErrors = 0;
  let totalQuestions = 0;

  // Check presence of exports for ch1 to ch13
  for (let i = 1; i <= 13; i++) {
    const theoryKey = `std9_ch${i}_theory`;
    const testKey = `std9_ch${i}_tests`;

    const theoryData = (std9 as any)[theoryKey];
    const testData = (std9 as any)[testKey];

    if (!theoryData) {
      console.error(`❌ MISSING EXPORT: ${theoryKey}`);
      totalErrors++;
    } else {
      // Check theory structure
      if (!theoryData.chapterId || !theoryData.chapterTitle || !Array.isArray(theoryData.sections)) {
        console.error(`❌ INVALID THEORY STRUCTURE in ${theoryKey}`);
        totalErrors++;
      } else {
        if (theoryData.sections.length === 0) {
          console.error(`❌ EMPTY SECTIONS in ${theoryKey}`);
          totalErrors++;
        }
        theoryData.sections.forEach((sec: any, sIdx: number) => {
          if (!sec.id || !sec.title || !sec.type) {
            console.error(`❌ INVALID SECTION at index ${sIdx} in ${theoryKey}`);
            totalErrors++;
          }
          if (sec.type === "table") {
            if (!sec.tableData || !Array.isArray(sec.tableData.headers) || !Array.isArray(sec.tableData.rows)) {
              console.error(`❌ INVALID TABLE DATA at index ${sIdx} in ${theoryKey}`);
              totalErrors++;
            }
          }
        });

        if (i === 13) {
          // ch13 must have 12 summary tables for prior chapters 1..12
          const sections = theoryData.sections;
          console.log(`Ch13 Theory Sections count: ${sections.length}`);
          let summaryTableCount = 0;
          sections.forEach((sec: any) => {
            if (sec.type === "table" && sec.tableData && sec.tableData.rows && sec.tableData.rows.length > 0) {
              summaryTableCount++;
            }
          });
          console.log(`Ch13 Summary Tables count: ${summaryTableCount}`);
          if (summaryTableCount < 12) {
            console.error(`❌ CH13 Theory contains only ${summaryTableCount} summary tables, expected at least 12`);
            totalErrors++;
          }
        }
      }
    }

    if (!testData) {
      console.error(`❌ MISSING EXPORT: ${testKey}`);
      totalErrors++;
    } else {
      if (!testData.chapterId || !Array.isArray(testData.sets)) {
        console.error(`❌ INVALID TEST STRUCTURE in ${testKey}`);
        totalErrors++;
      } else {
        let chapterQuestionsCount = 0;
        testData.sets.forEach((set: any, sIdx: number) => {
          if (!set.setId || !Array.isArray(set.questions)) {
            console.error(`❌ INVALID TEST SET in ${testKey} set index ${sIdx}`);
            totalErrors++;
            return;
          }
          set.questions.forEach((q: any, qIdx: number) => {
            chapterQuestionsCount++;
            totalQuestions++;
            // Check question validity
            if (!q.id || typeof q.question !== "string" || q.question.trim() === "") {
              console.error(`❌ Empty question text in ${testKey} set ${set.setId} Q${qIdx + 1}`);
              totalErrors++;
            }
            if (!Array.isArray(q.options) || q.options.length !== 4) {
              console.error(`❌ Question options count != 4 in ${testKey} set ${set.setId} Q${qIdx + 1}`);
              totalErrors++;
            } else {
              q.options.forEach((opt: string, oIdx: number) => {
                if (typeof opt !== "string" || opt.trim() === "") {
                  console.error(`❌ Empty option ${oIdx} in ${testKey} set ${set.setId} Q${qIdx + 1}`);
                  totalErrors++;
                }
              });
            }
            if (typeof q.correctAnswer !== "number" || q.correctAnswer < 0 || q.correctAnswer > 3) {
              console.error(`❌ Invalid correctAnswer (${q.correctAnswer}) in ${testKey} set ${set.setId} Q${qIdx + 1}`);
              totalErrors++;
            }
            if (typeof q.explanation !== "string" || q.explanation.trim() === "") {
              console.error(`❌ Empty explanation in ${testKey} set ${set.setId} Q${qIdx + 1}`);
              totalErrors++;
            }
          });
        });

        console.log(`Ch${i} Tests: ${testData.sets.length} sets, ${chapterQuestionsCount} questions.`);

        if (i <= 12) {
          if (chapterQuestionsCount < 20 || chapterQuestionsCount > 40) {
            console.error(`❌ Ch${i} question count ${chapterQuestionsCount} outside required range [20, 40]`);
            totalErrors++;
          }
        } else if (i === 13) {
          if (testData.sets.length !== 5) {
            console.error(`❌ Ch13 set count ${testData.sets.length} != 5`);
            totalErrors++;
          }
          if (chapterQuestionsCount !== 100) {
            console.error(`❌ Ch13 Mega Test question count ${chapterQuestionsCount} != 100`);
            totalErrors++;
          }
        }
      }
    }
  }

  console.log(`====================================================`);
  console.log(`Total questions checked across all 13 chapters: ${totalQuestions}`);
  console.log(`Total verification errors: ${totalErrors}`);
  console.log(`====================================================`);

  if (totalErrors > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Verification script error:", err);
  process.exit(1);
});
