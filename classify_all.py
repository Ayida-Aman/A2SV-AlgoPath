import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

print(f"Total messages: {len(messages)}")

for i, m in enumerate(messages):
    text = m['text']
    # Extract Day if present
    day_match = re.search(r"Day\s*(\d+)", text, re.IGNORECASE)
    day_num = int(day_match.group(1)) if day_match else None
    
    # Extract Quote if present
    quote_match = re.search(r"Quote of the Day:?\s*\n?([^\n]+(?:\n[^\n]+)?)", text, re.IGNORECASE)
    
    # Extract problems (links or bullets)
    # Check media
    media_files = [mf.get('href') for mf in m['media_info']]
    media_title = m.get('media_title')
    
    # Type classification
    msg_type = "UNKNOWN"
    if m['is_service']:
        msg_type = "SERVICE"
    elif "Welcome to the A2SV Remote Education Journey" in text:
        msg_type = "WELCOME / DAY 1"
    elif "Day" in text and ("Lecture Slide" in text or "Lecture Slides" in text or (len(text.strip().split('\n')) <= 3 and ("Slide" in text or "slide" in text))):
        msg_type = "LECTURE_SLIDE_POST"
    elif day_num is not None:
        msg_type = f"DAY_{day_num}_LEARNING_POST"
    elif "Keep the Momentum Going! - Contest Problems" in text:
        msg_type = "CONTEST_DAY_OFF_POST"
    elif media_files or media_title:
        msg_type = "FILE_POST"
    elif "Hello" in text or "Channel" in text:
        msg_type = "CHAT_METADATA / UNRELATED"
        
    print(f"Idx {i:02d} | ID {m['id']:<10} | Type: {msg_type:<25} | Day: {str(day_num):<4} | Media: {media_files or media_title} | Links: {len(m['links'])}")
    if msg_type.startswith("DAY_") or msg_type == "WELCOME / DAY 1" or msg_type == "CONTEST_DAY_OFF_POST":
        lines = [l for l in text.split('\n') if l.strip()]
        title_line = lines[0] if len(lines) > 0 else ""
        if title_line.startswith("🚀") and len(lines) > 1:
            title_line = lines[0] + " " + lines[1]
        print(f"       Title/Snippet: {title_line[:90]}")
