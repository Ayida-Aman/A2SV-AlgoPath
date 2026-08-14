import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

for d in range(1, 44):
    posts = [c for c in categorized if c.get("day") == d and c.get("type") == "LEARNING_POST"]
    slides = [c for c in categorized if c.get("day") == d and c.get("type") == "LECTURE_SLIDE_POST"]
    print(f"============================== DAY {d:02d} ==============================")
    if posts:
        p = posts[0]
        print(f"Post ID: {p['id']}")
        print("--- FULL TEXT ---")
        print(p['text'])
        print("--- LINKS ---")
        for l in p['links']:
            print(f"  [{l['text']}] -> {l['href']}")
    if slides:
        print("--- SLIDES ---")
        for s in slides:
            print(f"  Slide: {s.get('media_files')} | Title: {s.get('media_title')} | Status: {s.get('media_status')}")
    print("\n")
