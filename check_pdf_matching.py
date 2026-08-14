import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')

files_dir = r"C:\Users\amana\OneDrive\Documents\projects\A2SV-Legacy\ChatExport_2026-08-14\files"
all_files = os.listdir(files_dir)
pdf_files = [f for f in all_files if f.lower().endswith(".pdf")]

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

# Find all PDFs referenced in messages
referenced_pdfs = {}
for m in messages:
    day = m.get("day")
    mid = m.get("id")
    # check media_files
    for mf in m.get("media_files", []):
        fn = os.path.basename(mf)
        if fn.lower().endswith(".pdf"):
            referenced_pdfs[fn] = {
                "message_id": mid,
                "day": day,
                "type": m.get("type"),
                "text": m.get("text")
            }
    # check media_title
    mt = m.get("media_title")
    if mt and mt.lower().endswith(".pdf"):
        fn = os.path.basename(mt)
        if fn not in referenced_pdfs:
            referenced_pdfs[fn] = {
                "message_id": mid,
                "day": day,
                "type": m.get("type"),
                "text": m.get("text"),
                "status": m.get("media_status")
            }

print(f"Total PDFs on disk: {len(pdf_files)}")
print(f"Total PDFs referenced in messages: {len(referenced_pdfs)}")

print("\n--- MATCHING CHECK ---")
disk_not_in_msgs = []
for pf in sorted(pdf_files):
    if pf in referenced_pdfs:
        ref = referenced_pdfs[pf]
        print(f"[MATCH] Disk: '{pf}' -> Day {ref['day']} (Msg: {ref['message_id']})")
    else:
        print(f"[UNMATCHED DISK FILE] Disk: '{pf}' NOT in message references!")
        disk_not_in_msgs.append(pf)

msgs_not_on_disk = []
for ref_fn, ref in referenced_pdfs.items():
    if ref_fn not in pdf_files:
        print(f"[MISSING ON DISK] Referenced '{ref_fn}' is NOT in files/ (Status: {ref.get('status')})")
        msgs_not_on_disk.append(ref_fn)

print(f"\nUnmatched on disk: {len(disk_not_in_msgs)}")
print(f"Referenced but missing on disk: {len(msgs_not_on_disk)}")
