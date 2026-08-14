import sys
import json
import re
import os

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

# Let's inspect the exact text of every learning post
print("=== INSPECTING TEXT OF ALL 43 LEARNING POSTS ===")
for d in range(1, 44):
    posts = [c for c in categorized if c.get("day") == d and c.get("type") == "LEARNING_POST"]
    slides = [c for c in categorized if c.get("day") == d and c.get("type") == "LECTURE_SLIDE_POST"]
    print(f"--- DAY {d:02d} ---")
    if posts:
        p = posts[0]
        text = p["text"]
        # check quotes
        quote_match = re.search(r"Quote of the Day:?\s*\n?([^\n]+(?:\n[^\n]+)?)", text, re.IGNORECASE)
        print(f"Title line: {text.split('\n')[0] if text else ''}")
        print(f"Links count: {len(p['links'])}")
        if quote_match:
            print(f"Quote found: {quote_match.group(0).strip()}")
        else:
            print("Quote: (none)")
    else:
        print("NO LEARNING POST")
    print(f"Slide count: {len(slides)}")
    for s in slides:
        print(f"  Slide file: {s.get('media_files')} | {s.get('media_title')}")
    print()
