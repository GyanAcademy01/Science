const fs = require('fs');
for (let i = 1; i <= 13; i++) {
  const content = fs.readFileSync(`src/data/std10/ch${i}/theory.ts`, 'utf8');
  const m = content.match(/chapterTitle:\s*"([^"]+)"/);
  if (m) console.log(`ch${i}: ${m[1]}`);
}
