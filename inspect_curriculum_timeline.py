import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

for c in categorized:
    d = c.get("day")
    t = c.get("type")
    txt = c.get("text", "")
    author = c.get("author")
    odate = c.get("orig_date")
    edate = c.get("export_date")
    mf = c.get("media_files")
    mt = c.get("media_title")
    
    first_lines = [l for l in txt.split("\n") if l.strip()][:3]
    print(f"ID: {c['id']:<10} | Type: {t:<22} | Day: {str(d):<10} | OrigDate: {str(odate):<30}")
    if mf or mt:
        print(f"   Files: {mf} | Title: {mt}")
    print(f"   Snippet: {' // '.join(first_lines)[:100]}")
    print()
