import sys
import os
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

pdf_dir = r"d:\W\Gyan academy  project\Science\public\pdfs\વિજ્ઞાન પદ્ધતિશાસ્ત્ર"
out_dir = r"d:\W\Gyan academy  project\Science\.agents\worker_pedagogy_m5"

files = [
    ("ch9_raw.txt", os.path.join(pdf_dir, "9 - વિજ્ઞાન શિક્ષણમાં નાવીન્યકરણ.pdf")),
    ("ch10_raw.txt", os.path.join(pdf_dir, "10 - વિજ્ઞાન મંડળ.pdf")),
]

for out_name, pdf_path in files:
    print(f"Extracting {pdf_path}...")
    reader = pypdf.PdfReader(pdf_path)
    text_content = []
    text_content.append(f"--- TOTAL PAGES: {len(reader.pages)} ---")
    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ""
        text_content.append(f"=== PAGE {i+1} ===")
        text_content.append(text)
    
    out_file = os.path.join(out_dir, out_name)
    with open(out_file, "w", encoding="utf-8") as f:
        f.write("\n".join(text_content))
    print(f"Saved {out_name} ({len(text_content)} lines/sections)")
