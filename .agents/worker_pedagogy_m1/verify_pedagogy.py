import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

files_to_check = [
    "src/data/pedagogy/ch1/theory.ts",
    "src/data/pedagogy/ch1/test.ts",
    "src/data/pedagogy/ch2/theory.ts",
    "src/data/pedagogy/ch2/test.ts",
    "src/data/pedagogy/index.ts"
]

print("=== VERIFYING PEDAGOGY M1 FILES ===")

all_ok = True
for filepath in files_to_check:
    full_path = os.path.join(os.getcwd(), filepath)
    if not os.path.exists(full_path):
        print(f"[ERROR] File missing - {filepath}")
        all_ok = False
    else:
        size = os.path.getsize(full_path)
        print(f"[FOUND] {filepath} ({size} bytes)")

# Verify MCQs in test files
test_files = [
    ("src/data/pedagogy/ch1/test.ts", "pedagogy_ch1_tests"),
    ("src/data/pedagogy/ch2/test.ts", "pedagogy_ch2_tests")
]

for tf, varname in test_files:
    content = open(tf, 'r', encoding='utf-8').read()
    # Check sets
    set_matches = re.findall(r'setId:\s*"([^"]+)"', content)
    print(f"[{tf}] Found sets: {set_matches}")
    if len(set_matches) != 3:
        print(f"[ERROR] Expected 3 sets in {tf}, got {len(set_matches)}")
        all_ok = False
    
    # Count questions
    q_matches = re.findall(r'id:\s*(\d+),\s*question:', content)
    print(f"[{tf}] Found {len(q_matches)} questions")
    if len(q_matches) != 30:
        print(f"[ERROR] Expected 30 questions in {tf}, got {len(q_matches)}")
        all_ok = False

    # Check correctAnswer values range
    ans_matches = [int(a) for a in re.findall(r'correctAnswer:\s*(\d+)', content)]
    print(f"[{tf}] Correct Answer indices range: min={min(ans_matches)}, max={max(ans_matches)}")
    if min(ans_matches) < 0 or max(ans_matches) > 3:
        print(f"[ERROR] Invalid correctAnswer index in {tf}")
        all_ok = False

if all_ok:
    print("[SUCCESS] ALL VERIFICATIONS PASSED SUCCESSFULLY!")
else:
    print("[FAIL] VERIFICATION FAILURES ENCOUNTERED.")
