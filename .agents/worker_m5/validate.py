import re

# Check theory.ts
with open('src/data/std10/ch14/theory.ts', 'r', encoding='utf-8') as f:
    theory_txt = f.read()

assert '$' not in theory_txt, 'LaTeX $ found in theory.ts'
assert '\\frac' not in theory_txt, 'LaTeX \\frac found in theory.ts'

sections = re.findall(r'type:\s*"table"', theory_txt)
print(f'Theory section tables count: {len(sections)}')
assert len(sections) == 13, f'Expected 13 tables, got {len(sections)}'

# Check test.ts
with open('src/data/std10/ch14/test.ts', 'r', encoding='utf-8') as f:
    test_txt = f.read()

assert '$' not in test_txt, 'LaTeX $ found in test.ts'
assert '\\frac' not in test_txt, 'LaTeX \\frac found in test.ts'

# Count sets and questions
sets = re.findall(r'setId:\s*"(set\d+)"', test_txt)
print(f'Test sets found: {sets}')
assert len(sets) == 5, f'Expected 5 sets, got {len(sets)}'

correct_answers = re.findall(r'correctAnswer:\s*(\d+)', test_txt)
print(f'Total questions with correctAnswer: {len(correct_answers)}')
assert len(correct_answers) == 100, f'Expected 100 questions, got {len(correct_answers)}'

for i, ca in enumerate(correct_answers):
    val = int(ca)
    assert 0 <= val <= 3, f'Question {i+1} has invalid correctAnswer {val}'

print('All validation checks passed successfully!')
