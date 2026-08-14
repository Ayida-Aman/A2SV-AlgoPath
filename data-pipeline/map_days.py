import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

# Let's track days 1 to 43
days_dict = {}
for d in range(1, 44):
    days_dict[d] = {
        "learning_posts": [],
        "slide_posts": [],
        "other_related": []
    }

unmapped_messages = []

for idx, m in enumerate(messages):
    text = m['text']
    media = m['media_info']
    media_title = m.get('media_title')
    links = m['links']
    mid = m['id']
    
    # Check if Day post
    # Look for Day X or day X
    day_match = re.search(r"\b[Dd]ay\s*(\d+)\b", text)
    
    # Check if message11 (Day 1)
    if not day_match and "Day 1" in text:
        day_match = re.search(r"Day\s*1\b", text)
    
    # Check if message13 (Day 1 slide: A2SV Python Track - Best Coding Practices.pdf)
    if idx == 6 and "A2SV Python Track - Best Coding Practices.pdf" in str(media):
        days_dict[1]["slide_posts"].append(m)
        continue
    if idx == 5 and "Focus_time_management" in str(media_title or text):
        days_dict[1]["other_related"].append(m) # Or related to Day 6
        continue
    if idx == 14 and "Contest Problems from Saturday" in text:
        # Contest after day 5, before day 6
        # Let's see if it belongs to day 5 or day 6 or contest
        days_dict[5]["other_related"].append(m)
        continue
    if idx in [81, 82]: # message88, message89: Sorting II Part I & Part II pdfs
        # Associated with Day 39
        days_dict[39]["slide_posts"].append(m)
        continue
        
    if day_match:
        d = int(day_match.group(1))
        if d in days_dict:
            if "lecture slide" in text.lower() or (len(text.strip().split('\n')) <= 3 and ("slide" in text.lower() or "lecture" in text.lower())):
                days_dict[d]["slide_posts"].append(m)
            else:
                days_dict[d]["learning_posts"].append(m)
        else:
            unmapped_messages.append(m)
    else:
        unmapped_messages.append(m)

print("=== MAPPING RESULTS FOR DAYS 1 TO 43 ===")
for d in range(1, 44):
    info = days_dict[d]
    lp = info["learning_posts"]
    sp = info["slide_posts"]
    oth = info["other_related"]
    print(f"Day {d:02d}: {len(lp)} learning post(s), {len(sp)} slide post(s), {len(oth)} other")
    if lp:
        first_line = lp[0]['text'].split('\n')[0].strip()
        if first_line.startswith("🚀") and len(lp[0]['text'].split('\n')) > 1:
            first_line = lp[0]['text'].split('\n')[0].strip() + " " + lp[0]['text'].split('\n')[1].strip()
        print(f"        Learning: {first_line[:80]}")
    else:
        print(f"        *** NO LEARNING POST FOR DAY {d} ***")
    if sp:
        sp_files = []
        for s in sp:
            sp_files.extend([mf.get('href') for mf in s.get('media_info', [])])
            if s.get('media_title'):
                sp_files.append(s.get('media_title'))
        print(f"        Slides: {sp_files} | text: {[s['text'].strip() for s in sp]}")
    else:
        print(f"        *** NO SLIDES ATTACHED FOR DAY {d} ***")

print(f"\nTotal unmapped messages: {len(unmapped_messages)}")
for m in unmapped_messages:
    print(f"  Unmapped ID {m['id']}: {repr(m['text'][:60])}")
