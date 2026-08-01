import fs from 'fs';
import path from 'path';

// Import all pedagogy data via relative paths
import {
  pedagogy_ch1_theory, pedagogy_ch1_tests,
  pedagogy_ch2_theory, pedagogy_ch2_tests,
  pedagogy_ch3_theory, pedagogy_ch3_tests,
  pedagogy_ch4_theory, pedagogy_ch4_tests,
  pedagogy_ch5_theory, pedagogy_ch5_tests,
  pedagogy_ch6_theory, pedagogy_ch6_tests,
  pedagogy_ch7_theory, pedagogy_ch7_tests,
  pedagogy_ch8_theory, pedagogy_ch8_tests,
  pedagogy_ch9_theory, pedagogy_ch9_tests,
  pedagogy_ch10_theory, pedagogy_ch10_tests,
} from '../../src/data/pedagogy';

import { subjects } from '../../src/lib/data';

interface VerificationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  totalQuestions: number;
  chapterQuestionCounts: Record<string, number>;
}

function runVerification(): VerificationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const chapterQuestionCounts: Record<string, number> = {};
  let totalQuestions = 0;

  console.log('=== STARTING PROGRAMMATIC PEDAGOGY VERIFICATION ===\n');

  // 1. Directory and File Existence Check
  console.log('1. Checking file and directory structure...');
  const baseDir = path.resolve(__dirname, '../../src/data/pedagogy');
  for (let i = 1; i <= 10; i++) {
    const chDir = path.join(baseDir, `ch${i}`);
    if (!fs.existsSync(chDir)) {
      errors.push(`Directory missing: ${chDir}`);
    } else {
      const theoryFile = path.join(chDir, 'theory.ts');
      const testFile = path.join(chDir, 'test.ts');
      if (!fs.existsSync(theoryFile)) errors.push(`Missing file: ${theoryFile}`);
      if (!fs.existsSync(testFile)) errors.push(`Missing file: ${testFile}`);
    }
  }

  // 2. Validate Theory Data
  console.log('2. Validating Theory Data...');
  const theories = [
    { ch: 1, data: pedagogy_ch1_theory },
    { ch: 2, data: pedagogy_ch2_theory },
    { ch: 3, data: pedagogy_ch3_theory },
    { ch: 4, data: pedagogy_ch4_theory },
    { ch: 5, data: pedagogy_ch5_theory },
    { ch: 6, data: pedagogy_ch6_theory },
    { ch: 7, data: pedagogy_ch7_theory },
    { ch: 8, data: pedagogy_ch8_theory },
    { ch: 9, data: pedagogy_ch9_theory },
    { ch: 10, data: pedagogy_ch10_theory },
  ];

  for (const { ch, data } of theories) {
    if (!data) {
      errors.push(`pedagogy_ch${ch}_theory is null or undefined`);
      continue;
    }
    if (data.chapterId !== `ch${ch}`) {
      errors.push(`Ch${ch} theory chapterId mismatch: expected 'ch${ch}', got '${data.chapterId}'`);
    }
    if (!data.chapterTitle || typeof data.chapterTitle !== 'string' || data.chapterTitle.trim() === '') {
      errors.push(`Ch${ch} theory chapterTitle is empty`);
    }
    if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
      errors.push(`Ch${ch} theory description is empty`);
    }
    if (!data.sections || !Array.isArray(data.sections) || data.sections.length === 0) {
      errors.push(`Ch${ch} theory sections array is missing or empty`);
    } else {
      for (let sIdx = 0; sIdx < data.sections.length; sIdx++) {
        const sec = data.sections[sIdx];
        if (!sec.title) errors.push(`Ch${ch} section ${sIdx} title missing`);
        if (!sec.type) errors.push(`Ch${ch} section ${sIdx} type missing`);
        
        if (sec.type === 'text' || sec.type === 'callout') {
          if (!sec.content || sec.content.trim() === '') {
            errors.push(`Ch${ch} section ${sIdx} (${sec.type}) content is empty`);
          }
        } else if (sec.type === 'points') {
          if (!sec.points || !Array.isArray(sec.points) || sec.points.length === 0) {
            errors.push(`Ch${ch} section ${sIdx} (points) points array is empty`);
          }
        } else if (sec.type === 'table') {
          if (!sec.tableData || !sec.tableData.headers || !sec.tableData.rows || sec.tableData.rows.length === 0) {
            errors.push(`Ch${ch} section ${sIdx} (table) tableData is empty`);
          }
        } else if (sec.type === 'qa') {
          if (!sec.qa || !Array.isArray(sec.qa) || sec.qa.length === 0) {
            errors.push(`Ch${ch} section ${sIdx} (qa) qa array is empty`);
          }
        }
      }
    }
    console.log(`- Chapter ${ch} theory: '${data.chapterTitle}' (${data.sections.length} sections)`);
  }

  // 3. Validate Test MCQs Data
  console.log('\n3. Validating Test MCQs Data...');
  const tests = [
    { ch: 1, data: pedagogy_ch1_tests },
    { ch: 2, data: pedagogy_ch2_tests },
    { ch: 3, data: pedagogy_ch3_tests },
    { ch: 4, data: pedagogy_ch4_tests },
    { ch: 5, data: pedagogy_ch5_tests },
    { ch: 6, data: pedagogy_ch6_tests },
    { ch: 7, data: pedagogy_ch7_tests },
    { ch: 8, data: pedagogy_ch8_tests },
    { ch: 9, data: pedagogy_ch9_tests },
    { ch: 10, data: pedagogy_ch10_tests },
  ];

  const gujaratiRegex = /[\u0A80-\u0AFF]/;
  const latexRegex = /\$|\\frac|\\sqrt|\\text|\\alpha|\\beta|\\theta|\\rightarrow/;

  for (const { ch, data } of tests) {
    if (!data) {
      errors.push(`pedagogy_ch${ch}_tests is null or undefined`);
      continue;
    }
    if (data.chapterId !== `ch${ch}`) {
      errors.push(`Ch${ch} test chapterId mismatch: expected 'ch${ch}', got '${data.chapterId}'`);
    }
    if (!data.sets || !Array.isArray(data.sets) || data.sets.length === 0) {
      errors.push(`Ch${ch} test sets array is missing or empty`);
      continue;
    }

    let chQuestions = 0;
    for (const set of data.sets) {
      if (!set.questions || !Array.isArray(set.questions)) {
        errors.push(`Ch${ch} set ${set.setId} questions missing`);
        continue;
      }
      chQuestions += set.questions.length;

      for (let qIdx = 0; qIdx < set.questions.length; qIdx++) {
        const q = set.questions[qIdx];
        const qIdStr = `Ch${ch} Set ${set.setId} Q${qIdx + 1} (${q.id})`;

        if (!q.id) errors.push(`${qIdStr}: missing id`);
        if (!q.question || q.question.trim() === '') errors.push(`${qIdStr}: empty question`);
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          errors.push(`${qIdStr}: options must be an array of exactly 4 strings, found ${q.options?.length}`);
        } else {
          for (let oIdx = 0; oIdx < 4; oIdx++) {
            if (!q.options[oIdx] || q.options[oIdx].trim() === '') {
              errors.push(`${qIdStr}: option[${oIdx}] is empty`);
            }
            if (latexRegex.test(q.options[oIdx])) {
              errors.push(`${qIdStr}: option[${oIdx}] contains raw LaTeX syntax or '$'`);
            }
          }
        }

        if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3 || !Number.isInteger(q.correctAnswer)) {
          errors.push(`${qIdStr}: invalid correctAnswer '${q.correctAnswer}' (must be 0, 1, 2, or 3)`);
        }

        if (!q.explanation || q.explanation.trim() === '') {
          errors.push(`${qIdStr}: missing or empty explanation`);
        }

        // Check for raw LaTeX syntax / broken `$` symbols
        if (latexRegex.test(q.question)) {
          errors.push(`${qIdStr}: question contains raw LaTeX syntax or '$'`);
        }
        if (q.explanation && latexRegex.test(q.explanation)) {
          errors.push(`${qIdStr}: explanation contains raw LaTeX syntax or '$'`);
        }

        // Check Gujarati Unicode presence
        if (!gujaratiRegex.test(q.question)) {
          warnings.push(`${qIdStr}: question does not contain Gujarati Unicode characters`);
        }
      }
    }

    chapterQuestionCounts[`ch${ch}`] = chQuestions;
    totalQuestions += chQuestions;
    console.log(`- Chapter ${ch} test: ${chQuestions} MCQs across ${data.sets.length} set(s)`);
  }

  console.log(`\nTotal MCQs counted: ${totalQuestions}`);
  if (totalQuestions !== 300) {
    errors.push(`Total question count mismatch: expected 300, got ${totalQuestions}`);
  }

  // 4. Validate Subject Metadata in src/lib/data.ts
  console.log('\n4. Validating Subject Metadata in src/lib/data.ts...');
  const pedSubject = subjects.find(s => s.id === 'pedagogy');
  if (!pedSubject) {
    errors.push(`Subject 'pedagogy' not found in subjects array in src/lib/data.ts`);
  } else {
    if (pedSubject.name !== 'વિજ્ઞાન પદ્ધતિશાસ્ત્ર') {
      errors.push(`Subject name mismatch: expected 'વિજ્ઞાન પદ્ધતિશાસ્ત્ર', got '${pedSubject.name}'`);
    }
    if (pedSubject.icon !== '🎓') {
      errors.push(`Subject icon mismatch: expected '🎓', got '${pedSubject.icon}'`);
    }
    if (pedSubject.topicCount !== 10) {
      errors.push(`Subject topicCount mismatch: expected 10, got ${pedSubject.topicCount}`);
    }
    if (pedSubject.questionCount !== 300) {
      errors.push(`Subject questionCount mismatch: expected 300, got ${pedSubject.questionCount}`);
    }
    if (pedSubject.color !== '#8b5cf6') {
      errors.push(`Subject color mismatch: expected '#8b5cf6', got '${pedSubject.color}'`);
    }
    if (pedSubject.color2 !== '#6d28d9') {
      errors.push(`Subject color2 mismatch: expected '#6d28d9', got '${pedSubject.color2}'`);
    }

    if (!pedSubject.topics || pedSubject.topics.length !== 10) {
      errors.push(`Subject topics array length mismatch: expected 10, got ${pedSubject.topics?.length}`);
    } else {
      for (let tIdx = 0; tIdx < 10; tIdx++) {
        const expectedId = `ch${tIdx + 1}`;
        const topic = pedSubject.topics[tIdx];
        if (topic.id !== expectedId) {
          errors.push(`Topic ${tIdx + 1} id mismatch: expected '${expectedId}', got '${topic.id}'`);
        }
        if (!topic.hasTheory || !topic.hasTest) {
          errors.push(`Topic ${expectedId} hasTheory/hasTest flag is false`);
        }
      }
    }
  }

  // 5. Anti-Cheating & Placeholder Check
  console.log('\n5. Checking for placeholders / dummy data / stubbing...');
  const suspiciousRegex = /\b(TODO|FIXME|placeholder|dummy|mock|Lorem ipsum|Option [A-D]\b|Question \d+)\b/i;
  for (let i = 1; i <= 10; i++) {
    const theoryPath = path.join(baseDir, `ch${i}`, 'theory.ts');
    const testPath = path.join(baseDir, `ch${i}`, 'test.ts');

    const tContent = fs.readFileSync(theoryPath, 'utf8');
    const qContent = fs.readFileSync(testPath, 'utf8');

    const tMatch = tContent.match(suspiciousRegex);
    if (tMatch) {
      errors.push(`Ch${i} theory.ts contains suspicious placeholder text: "${tMatch[0]}"`);
    }

    const qMatch = qContent.match(suspiciousRegex);
    if (qMatch) {
      errors.push(`Ch${i} test.ts contains suspicious placeholder text: "${qMatch[0]}"`);
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    totalQuestions,
    chapterQuestionCounts,
  };
}

const result = runVerification();

console.log('\n================ VERIFICATION SUMMARY ================');
console.log(`Passed: ${result.passed ? 'YES ✅' : 'NO ❌'}`);
console.log(`Total MCQs: ${result.totalQuestions}`);
console.log(`Total Errors: ${result.errors.length}`);
console.log(`Total Warnings: ${result.warnings.length}`);

if (result.errors.length > 0) {
  console.log('\nERRORS:');
  result.errors.forEach(e => console.log(`  ❌ ${e}`));
}

if (result.warnings.length > 0) {
  console.log('\nWARNINGS:');
  result.warnings.forEach(w => console.log(`  ⚠️ ${w}`));
}

if (!result.passed) {
  process.exit(1);
} else {
  process.exit(0);
}
