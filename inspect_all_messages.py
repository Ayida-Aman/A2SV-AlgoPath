import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("all_messages_detail.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

print(f"Total messages: {len(messages)}")

files_dir = r"C:\Users\amana\OneDrive\Documents\projects\A2SV-Legacy\ChatExport_2026-08-14\files"
disk_files = os.listdir(files_dir)
pdf_files = [f for f in disk_files if f.endswith(".pdf")]
thumb_files = [f for f in disk_files if f.endswith(".jpg") or f.endswith(".png")]
print(f"Total files on disk in files/: {len(disk_files)}")
print(f"Total PDF files on disk: {len(pdf_files)}")
print(f"Total thumbnail files on disk: {len(thumb_files)}")

# Let's inspect each message
print("\n" + "="*80)
print("INSPECTING ALL MESSAGES")
print("="*80)

for m in messages:
    idx = m["index"]
    mid = m["id"]
    author = m["author"]
    date_title = m["date_title"]
    fwd = m["forwarded_from"]
    text = m["text"]
    media = m["media_files"]
    links = m["links"]
    
    first_line = text.split("\n")[0] if text else "(no text)"
    print(f"[{idx:02d}] ID: {mid} | Date: {date_title} | Author: {author} | Fwd: {fwd}")
    if media:
        print(f"     Media: {[mf.get('href') for mf in media]}")
    if links:
        print(f"     Links count: {len(links)} | Sample: {[l.get('href') for l in links[:3]]}")
    print(f"     Text snippet: {first_line[:100]}")
    print("-" * 60)
