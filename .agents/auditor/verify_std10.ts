import * as fs from "fs";
import * as path from "path";
import * as std10 from "../../src/data/std10";

async function main() {
  console.log("=== VICTORY AUDITOR PROGRAMMATIC VERIFICATION FOR STD 10 ===");
  let totalErrors = 0;
  let totalQuestions = 0;

  // 1. Check presence of exports for ch1 to ch14
  for (let i = 1; i <= 14; i++) {
    const theoryKey = `std10_ch${i}_theory`;
    const testKey = `std10_ch${i}_tests`;

    const theoryData = (std10 as any)[theoryKey];
    const testData = (std10 as any)[testKey];

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

        if (i === 14) {
          // ch14 must have summary tables for chapters 1..13
          const sections = theoryData.sections;
          console.log(`Ch14 Theory Sections count: ${sections.length}`);
          let summaryTableCount = 0;
          sections.forEach((sec: any) => {
            if (sec.type === "table" && sec.tableData && sec.tableData.rows && sec.tableData.rows.length > 0) {
              summaryTableCount++;
            }
          });
          console.log(`Ch14 Summary Tables count: ${summaryTableCount}`);
          if (summaryTableCount < 13) {
            console.error(`❌ CH14 Theory contains only ${summaryTableCount} summary tables, expected at least 13`);
            totalErrors++;
          } else {
            console.log(`✅ CH14 Theory contains ${summaryTableCount} summary tables (passed >= 13 requirement)`);
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

        if (i <= 13) {
          if (chapterQuestionsCount < 20 || chapterQuestionsCount > 40) {
            console.error(`❌ Ch${i} question count ${chapterQuestionsCount} outside required range [20, 40]`);
            totalErrors++;
          }
        } else if (i === 14) {
          if (testData.sets.length !== 5) {
            console.error(`❌ Ch14 set count ${testData.sets.length} != 5`);
            totalErrors++;
          }
          if (chapterQuestionsCount !== 100) {
            console.error(`❌ Ch14 Mega Test question count ${chapterQuestionsCount} != 100`);
            totalErrors++;
          } else {
            console.log(`✅ Ch14 Mega Test question count: 100 across 5 test sets of 20 Qs each`);
          }
        }
      }
    }
  }

  // 2. Check for LaTeX syntax and '$' symbols in src/data/std10/
  console.log("\n--- Checking for raw LaTeX syntax and '$' symbols ---");
  const std10Dir = path.resolve(__dirname, "../../src/data/std10");
  function checkFilesRecursively(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        checkFilesRecursively(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const lines = content.split("\n");
        lines.forEach((line, lineIdx) => {
          if (line.includes("$")) {
            console.error(`❌ '$' symbol found in ${path.relative(process.cwd(), fullPath)}:${lineIdx + 1}: ${line.trim()}`);
            totalErrors++;
          }
          const latexRegex = /\\(frac|text|sqrt|rightarrow|degree|alpha|beta|gamma|theta|pi|cdot|Delta|Omega|sum|infty|approx|neq|le|ge|times|div|pm)/;
          if (latexRegex.test(line)) {
            console.error(`❌ Raw LaTeX command found in ${path.relative(process.cwd(), fullPath)}:${lineIdx + 1}: ${line.trim()}`);
            totalErrors++;
          }
        });
      }
    }
  }
  checkFilesRecursively(std10Dir);

  console.log(`====================================================`);
  console.log(`Total questions checked across all 14 chapters: ${totalQuestions}`);
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
