import sys
import json
import re
import os

sys.stdout.reconfigure(encoding='utf-8')

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

# Helper function to extract quote
def extract_quote(text):
    # Match patterns like: Quote of the Day: "..." - Author or Quote of the Day\n"..."\n- Author
    q_match = re.search(r"Quote of the Day:?\s*\n?([^\n]+(?:\n[^\n]+)?)", text, re.IGNORECASE)
    if not q_match:
        return None
    raw_q = q_match.group(1).strip()
    
    # Try to split into quote text and author
    # e.g. "quote" - author or "quote" — author or "quote"\n— author
    # Look for quotes enclosed in "..." or “...”
    quote_text_match = re.search(r'["“](.+?)["”]', text[q_match.start():])
    author_match = re.search(r'["”]\s*[\-—–]\s*([^\n#@]+)', text[q_match.start():])
    
    if quote_text_match and author_match:
        return {
            "quote": quote_text_match.group(1).strip(),
            "author": author_match.group(1).strip()
        }
    elif quote_text_match:
        # maybe author is on next line
        tail = text[q_match.start() + quote_text_match.end():]
        tail_author = re.search(r'[\-—–]\s*([^\n#@]+)', tail)
        author = tail_author.group(1).strip() if tail_author else "Unknown"
        return {
            "quote": quote_text_match.group(1).strip(),
            "author": author
        }
    return {
        "quote": raw_q,
        "author": "Unknown"
    }

# Test quote extraction on all days
for d in range(1, 44):
    posts = [c for c in categorized if c.get("day") == d and c.get("type") == "LEARNING_POST"]
    if posts:
        p = posts[0]
        q = extract_quote(p["text"])
        print(f"Day {d:02d} Quote: {q}")
