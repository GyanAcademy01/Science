import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const dataSource = fs.readFileSync(path.join(root, "src/lib/data.ts"), "utf8");
const contentSource = fs.readFileSync(path.join(root, "src/lib/content.ts"), "utf8");
const subjectIds = ["std6", "std7", "std8", "std9", "std10", "pedagogy"];
const failures = [];
const topicsBySubject = new Map();
const pdfPaths = [];

for (const subjectId of subjectIds) {
  const marker = `  {\n    id: "${subjectId}",`;
  const start = dataSource.indexOf(marker);
  if (start < 0) {
    failures.push(`missing subject ${subjectId}`);
    continue;
  }

  const nextSubject = dataSource.indexOf('\n  {\n    id: "', start + marker.length);
  const block = dataSource.slice(start, nextSubject < 0 ? dataSource.length : nextSubject);
  const declaredCount = Number(block.match(/topicCount:\s*(\d+)/)?.[1] ?? 0);
  const topics = [...block.matchAll(/\n        id: "(ch\d+)"/g)].map((match) => match[1]);
  topicsBySubject.set(subjectId, topics);

  if (topics.length !== declaredCount) {
    failures.push(`${subjectId} declares ${declaredCount} topics but registers ${topics.length}`);
  }

  for (const pdfMatch of block.matchAll(/pdfUrl:\s*"([^"]+)"/g)) {
    const pdfPath = pdfMatch[1];
    pdfPaths.push(pdfPath);
    const diskPath = path.join(root, "public", pdfPath.replace(/^\//, ""));
    if (!pdfPath.startsWith("/pdfs/") || !pdfPath.endsWith(".pdf") || !fs.existsSync(diskPath)) {
      failures.push(`${subjectId} has missing or invalid PDF ${pdfPath}`);
    }
  }
}

if (pdfPaths.length !== 89) failures.push(`expected 89 PDF paths, found ${pdfPaths.length}`);
if (new Set(pdfPaths).size !== pdfPaths.length) failures.push("duplicate PDF path found");

function registeredIn(groupName, subjectId, topicId) {
  const groupStart = contentSource.indexOf(`const ${groupName}`);
  const subjectStart = contentSource.indexOf(`  ${subjectId}: {`, groupStart);
  if (groupStart < 0 || subjectStart < 0) return false;
  const nextSubject = contentSource.indexOf("\n  },\n  ", subjectStart + 1);
  const block = contentSource.slice(subjectStart, nextSubject < 0 ? contentSource.length : nextSubject);
  return new RegExp(`\\n    ${topicId}:`).test(block);
}

for (const [subjectId, topics] of topicsBySubject) {
  for (const topicId of topics) {
    if (!registeredIn("THEORY", subjectId, topicId)) failures.push(`missing theory registration ${subjectId}/${topicId}`);
    if (!registeredIn("TESTS", subjectId, topicId)) failures.push(`missing test registration ${subjectId}/${topicId}`);
  }
}

if (failures.length > 0) {
  console.error("Content verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  const topicCount = [...topicsBySubject.values()].reduce((total, topics) => total + topics.length, 0);
  console.log(`Content verification passed: ${topicCount} subject/topic routes, ${pdfPaths.length} PDF paths, theory/test registrations complete.`);
}
