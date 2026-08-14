import sys
import json
import re
import os

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

# Let's inspect the files on disk
files_dir = r"C:\Users\amana\OneDrive\Documents\projects\A2SV-Legacy\ChatExport_2026-08-14\files"
all_files = os.listdir(files_dir)
pdf_files = [f for f in all_files if f.lower().endswith(".pdf")]
print(f"Total files on disk: {len(all_files)}")
print(f"Total PDFs on disk: {len(pdf_files)}")
for p in sorted(pdf_files):
    size = os.path.getsize(os.path.join(files_dir, p))
    print(f"  PDF: {p} ({size / 1024:.1f} KB)")

print("\n" + "="*80)
print("INSPECTING ALL 91 MESSAGES")
print("="*80)

for idx, m in enumerate(messages):
    text = m['text']
    media_files = [mf.get('href') for mf in m['media_info']]
    media_title = m.get('media_title')
    media_desc = m.get('media_desc')
    media_status = m.get('media_status')
    
    print(f"INDEX {idx:02d} | ID {m['id']:<10} | Author: {m['author_header']} | Orig Date: {m['orig_date']} | Fwd: {m['fwd_initials']}")
    if media_files or media_title or media_status:
        print(f"  MEDIA: title='{media_title}', status='{media_status}', files={media_files}")
    if m['links']:
        print(f"  LINKS count: {len(m['links'])}")
        for l in m['links']:
            print(f"    - [{l['text']}] -> {l['href']}")
    print(f"  TEXT:\n{text}")
    print("-" * 70)
