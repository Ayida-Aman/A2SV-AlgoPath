import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("all_messages_detail.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

for m in messages:
    print(f"=== Message Index: {m['index']} | ID: {m['id']} ===")
    print(f"Date: {m['date_title']} ({m['date_text']}) | Author: {m['author']} | Fwd: {m['forwarded_from']}")
    print(f"Classes: {m['classes']}")
    if m['media_files']:
        print(f"Media Files: {m['media_files']}")
    if m['links']:
        print(f"Links count: {len(m['links'])}")
        for l in m['links']:
            print(f"  - [{l['text']}] -> {l['href']}")
    print(f"Text content:\n{m['text']}")
    print("\n" + "="*50 + "\n")
