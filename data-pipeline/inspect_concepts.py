import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

for d in range(1, 44):
    posts = [c for c in categorized if c.get("day") == d and c.get("type") == "LEARNING_POST"]
    if not posts:
        continue
    p = posts[0]
    text = p["text"]
    
    # Check for sections like "What We Covered", "Key Takeaways", "Complexity", "Algorithms", etc.
    print(f"=== DAY {d:02d} CONTENT STRUCTURE ===")
    lines = text.split("\n")
    for l in lines:
        if any(h in l for h in ["Covered", "Takeaway", "Complexity", "Concepts", "Key Terms", "Operations", "Applications", "Pitfalls"]):
            print(f"  HEADER: {l}")
        elif "O(" in l or "O(1)" in l or "O(n" in l or "O(N" in l:
            print(f"  COMPLEXITY LINE: {l}")
    print()
