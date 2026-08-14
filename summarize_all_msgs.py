import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

for idx, m in enumerate(messages):
    text = m['text']
    media = m['media_info']
    media_title = m.get('media_title')
    media_status = m.get('media_status')
    links = m['links']
    print(f"=== Index {idx:02d} | ID {m['id']} | Author Header: {m['author_header']} | Orig Date: {m['orig_date']} | Fwd Init: {m['fwd_initials']} ===")
    if media or media_title:
        print(f"  MEDIA: title='{media_title}', status='{media_status}', files={media}")
    if links:
        print(f"  LINKS ({len(links)}): {[l['href'] for l in links]}")
    lines = text.split("\n")
    print(f"  TEXT ({len(lines)} lines):")
    for l in lines[:5]:
        print(f"    {l}")
    if len(lines) > 5:
        print(f"    ... [{len(lines)-5} more lines]")
    print()
