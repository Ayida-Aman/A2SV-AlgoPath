import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

for idx in range(9):
    m = messages[idx]
    print(f"=== Message Index: {idx:02d} | ID {m['id']} ===")
    print(f"Author Header: {m['author_header']} | Orig Date: {m['orig_date']} | Export Date: {m['export_date']} | Fwd: {m['fwd_initials']}")
    print(f"Media Info: {m['media_info']}")
    print(f"Media Title: {m.get('media_title')}")
    print(f"Links: {m['links']}")
    print("Full Text:\n" + m['text'])
    print("="*60)
