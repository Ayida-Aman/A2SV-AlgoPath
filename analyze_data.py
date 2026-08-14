import json
import re

with open("parsed_debug.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

print(f"Total messages: {len(messages)}")

day_posts = []
lecture_slide_posts = []
other_posts = []

for m in messages:
    text = m.get("text", "")
    classes = m.get("classes", [])
    msg_id = m.get("id", "")
    author = m.get("author")
    date_title = m.get("date_title")
    media = m.get("media_files", [])
    links = m.get("links", [])
    
    # Check if Day post
    day_match = re.search(r"Day\s*(\d+)", text, re.IGNORECASE)
    # Check if lecture slide
    is_lecture_slide = ("lecture slide" in text.lower()) or ("lecture" in text.lower() and len(media) > 0) or any(".pdf" in mf.get("href", "").lower() for mf in media)
    
    if day_match:
        day_num = int(day_match.group(1))
        # check if it's a lecture slide post or a learning post
        if "lecture slide" in text.lower() and not re.search(r"(?:topics?|concepts?|problems?|leetcode|quote)", text, re.IGNORECASE):
            lecture_slide_posts.append({
                "day": day_num,
                "msg": m
            })
        else:
            day_posts.append({
                "day": day_num,
                "msg": m
            })
    else:
        other_posts.append(m)

print(f"Day learning posts found: {len(day_posts)}")
print(f"Day lecture slide posts found: {len(lecture_slide_posts)}")
print(f"Other posts found: {len(other_posts)}")

print("\n--- DAY LEARNING POSTS SUMMARY ---")
days_seen = {}
for dp in day_posts:
    d = dp["day"]
    days_seen[d] = days_seen.get(d, 0) + 1
print(f"Unique Day numbers in learning posts: {sorted(days_seen.keys())}")
print(f"Total unique days: {len(days_seen)}")
for d, count in sorted(days_seen.items()):
    if count > 1:
        print(f"  Day {d} has {count} posts!")

print("\n--- LECTURE SLIDE POSTS SUMMARY ---")
for lsp in lecture_slide_posts:
    d = lsp["day"]
    files = [mf.get("href") for mf in lsp["msg"].get("media_files", [])]
    print(f"  Day {d}: {files} | text: {lsp['msg'].get('text')[:60]}")

print("\n--- OTHER POSTS SUMMARY ---")
for op in other_posts:
    txt = op.get("text", "").replace("\n", " ")
    print(f"  ID: {op.get('id')} | author: {op.get('author')} | media: {len(op.get('media_files'))} | text: {txt[:80]}")
