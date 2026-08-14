import sys
import json
from urllib.parse import urlparse

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

domains = {}
for m in messages:
    for l in m.get("links", []):
        href = l.get("href", "")
        if not href:
            continue
        domain = urlparse(href).netloc.lower()
        domains[domain] = domains.get(domain, 0) + 1

for d, count in sorted(domains.items(), key=lambda x: x[1], reverse=True):
    print(f"Domain: {d:<30} Count: {count}")
