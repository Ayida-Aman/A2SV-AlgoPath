import sys
import json
import re
import os

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

files_dir = r"C:\Users\amana\OneDrive\Documents\projects\A2SV-Legacy\ChatExport_2026-08-14\files"
all_disk_files = set(os.listdir(files_dir))
pdf_disk_files = set(f for f in all_disk_files if f.lower().endswith(".pdf"))
thumb_disk_files = set(f for f in all_disk_files if f.lower().endswith(".jpg") or f.lower().endswith(".png"))

print(f"Total messages: {len(messages)}")
print(f"Total files on disk: {len(all_disk_files)}")
print(f"Total PDFs on disk: {len(pdf_disk_files)}")
print(f"Total thumbs on disk: {len(thumb_disk_files)}")

# Message categorization
# Let's inspect each message index and assign exact classification
categorized = []

for idx, m in enumerate(messages):
    text = m['text']
    media_files = [mf.get('href') for mf in m['media_info']]
    media_title = m.get('media_title')
    media_status = m.get('media_status')
    links = m['links']
    mid = m['id']
    author = m['author_header']
    orig_date = m['orig_date']
    fwd_init = m['fwd_initials']
    
    cat = {
        "index": idx,
        "id": mid,
        "author": author,
        "orig_date": orig_date,
        "fwd_initials": fwd_init,
        "text": text,
        "media_files": media_files,
        "media_title": media_title,
        "media_status": media_status,
        "links": links,
        "type": "UNKNOWN",
        "day": None,
        "topic": None
    }
    
    # Specific message classification
    if idx == 0:
        cat["type"] = "SERVICE_DATE_HEADER"
    elif idx == 1:
        cat["type"] = "SERVICE_CHANNEL_CREATED"
    elif idx == 2:
        cat["type"] = "CHAT_GREETING"
    elif idx == 3:
        cat["type"] = "SERVICE_DATE_HEADER"
    elif idx == 4: # message11
        cat["type"] = "LEARNING_POST"
        cat["day"] = 1
        cat["topic"] = "Onboarding & Best Coding Practices"
    elif idx == 5: # message12
        cat["type"] = "FORWARDED_METADATA_OR_PLACEHOLDER"
        cat["day"] = 1 # or Day 6 planning reference
        cat["topic"] = "Focus time management and planning note"
    elif idx == 6: # message13
        cat["type"] = "LECTURE_SLIDE_POST"
        cat["day"] = 1
        cat["topic"] = "Best Coding Practices (Slide)"
    elif idx == 14: # message21
        cat["type"] = "CONTEST_PRACTICE_POST"
        cat["day"] = "Contest_1" # Day off after Day 5
        cat["topic"] = "Contest Problems (Division, Word Capitalization, Petya, Stones, Only Pluses)"
    elif idx == 29: # message36
        cat["type"] = "CONTEST_PRACTICE_POST"
        cat["day"] = "Contest_2" # Day off after Day 13
        cat["topic"] = "No Class Contest Problems (Word on Paper, Rudolph and Tic-Tac-Toe, Remove Smallest, Minimize Inversions, Insert Digit)"
    elif idx in [81, 82]: # message88, message89
        cat["type"] = "LECTURE_SLIDE_POST"
        cat["day"] = 39
        cat["topic"] = "Sorting II (Part I & II Slides)"
    else:
        # Check text
        day_match = re.search(r"Day\s*(\d+)", text, re.IGNORECASE)
        if day_match:
            d = int(day_match.group(1))
            cat["day"] = d
            # Is it slide or learning post?
            lines = [l.strip() for l in text.split('\n') if l.strip()]
            if len(lines) <= 2 and any(w in text.lower() for w in ["slide", "slides"]):
                cat["type"] = "LECTURE_SLIDE_POST"
                cat["topic"] = lines[0]
            else:
                cat["type"] = "LEARNING_POST"
                # extract topic from title
                cat["topic"] = lines[0] if lines else f"Day {d}"
        elif media_files or media_title:
            cat["type"] = "LECTURE_SLIDE_POST"
            cat["topic"] = media_title or "Attached File"
            
    categorized.append(cat)

with open("categorized_messages.json", "w", encoding="utf-8") as f:
    json.dump(categorized, f, indent=2, ensure_ascii=False)

print("Saved categorized_messages.json")

# Print summary table of all messages
print("\n" + "="*100)
print(f"{'Idx':<4} | {'ID':<10} | {'Type':<25} | {'Day':<10} | {'Media File':<40} | {'Links':<5}")
print("="*100)
for c in categorized:
    mf = c['media_files'][0] if c['media_files'] else (c['media_title'] or "")
    mf = os.path.basename(mf) if mf else ""
    print(f"{c['index']:<4} | {c['id']:<10} | {c['type']:<25} | {str(c['day']):<10} | {mf[:40]:<40} | {len(c['links']):<5}")
