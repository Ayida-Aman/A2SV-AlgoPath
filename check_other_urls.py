import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

other_urls = []
for m in messages:
    for l in m.get("links", []):
        href = l.get("href", "")
        text = l.get("text", "")
        if not href:
            continue
        if not any(domain in href.lower() for domain in ["leetcode.com", "codeforces.com", "hackerrank.com", "geeksforgeeks.org", "kattis.com"]):
            other_urls.append({
                "msg_id": m.get("id"),
                "text": text,
                "href": href
            })

print(f"Total non-problem URLs: {len(other_urls)}")
unique_other_urls = {}
for u in other_urls:
    unique_other_urls[u["href"]] = unique_other_urls.get(u["href"], 0) + 1

for u, count in sorted(unique_other_urls.items(), key=lambda x: x[1], reverse=True):
    print(f"  {count}x: {u}")
