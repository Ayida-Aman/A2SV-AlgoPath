import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

for idx in range(min(20, len(messages))):
    m = messages[idx]
    print(f"=== Index {idx:02d} | ID {m['id']} | Author Header: {m['author_header']} | Orig Date: {m['orig_date']} | Fwd Init: {m['fwd_initials']} ===")
    print(f"Text content:\n{m['text']}")
    print(f"Media info: {m['media_info']}")
    print(f"Links: {m['links']}")
    print("-" * 50)
