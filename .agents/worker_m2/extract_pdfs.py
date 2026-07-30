import pypdf
import os

pdf_files = {
    "ch4": "public/pdfs/ધોરણ 9/4 - પરમાણુનું બંધારણ.pdf",
    "ch5": "public/pdfs/ધોરણ 9/5 - સજીવનો પાયાનો એકમ.pdf",
    "ch6": "public/pdfs/ધોરણ 9/6 - પેશીઓ.pdf"
}

output_dir = ".agents/worker_m2/extracted_texts"
os.makedirs(output_dir, exist_ok=True)

for key, pdf_path in pdf_files.items():
    reader = pypdf.PdfReader(pdf_path)
    full_text = []
    full_text.append(f"TOTAL PAGES: {len(reader.pages)}")
    for i, page in enumerate(reader.pages):
        full_text.append(f"--- PAGE {i+1} ---")
        full_text.append(page.extract_text() or "")
    
    out_file = os.path.join(output_dir, f"{key}_text.txt")
    with open(out_file, "w", encoding="utf-8") as f:
        f.write("\n".join(full_text))
    print(f"Extracted {key} ({len(reader.pages)} pages) -> {out_file}")
