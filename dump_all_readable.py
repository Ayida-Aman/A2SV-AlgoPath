import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

for idx, m in enumerate(messages):
    print(f"=== Message Index: {idx:02d} | ID: {m['id']} ===")
    print(f"Author Header: {m['author_header']} | Orig Date: {m['orig_date']} | Export Date: {m['export_date']} | Fwd Initials: {m['fwd_initials']}")
    print(f"Classes: {m['classes']}")
    if m['media_info']:
        print(f"Media files: {m['media_info']}")
    if m['media_title']:
        print(f"Media title: {m['media_title']} | Status: {m['media_status']}")
    if m['links']:
        print(f"Links ({len(m['links'])}):")
        for l in m['links']:
            print(f"   [{l['text']}] -> {l['href']}")
    print("Text:")
    print(m['text'])
    print("\n" + "="*70 + "\n")
