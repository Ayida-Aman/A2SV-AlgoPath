import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Load problems and categorized messages
with open("data/problems.json", "r", encoding="utf-8") as f:
    canonical_problems = json.load(f)

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

with open("data/file_inventory.json", "r", encoding="utf-8") as f:
    file_inventory = json.load(f)

# Group problems by week
problems_by_week = {}
for p in canonical_problems:
    for occ in p["occurrences"]:
        w = occ["weekNumber"]
        if w not in problems_by_week:
            problems_by_week[w] = []
        # Add problem if not already in week's list
        if not any(item["url"] == p["url"] for item in problems_by_week[w]):
            problems_by_week[w].append({
                "title": p["title"],
                "platform": p["platform"],
                "url": p["url"],
                "sourceDay": occ["sourceDay"],
                "weekNumber": w,
                "difficulty": None,
                "topics": p.get("topics", [])
            })

# Group materials by week
materials_by_week = {}
for fi in file_inventory:
    w = fi.get("associatedWeek")
    if w is not None and fi.get("type") == "pdf":
        if w not in materials_by_week:
            materials_by_week[w] = []
        materials_by_week[w].append({
            "fileName": fi["fileName"],
            "relativePath": fi["relativePath"],
            "type": fi["type"],
            "sizeBytes": fi["sizeBytes"],
            "onDisk": fi["onDisk"],
            "topic": fi["topic"],
            "confidence": fi["confidence"]
        })

print(f"Problems grouped across {len(problems_by_week)} weeks.")
print(f"Materials grouped across {len(materials_by_week)} weeks.")
