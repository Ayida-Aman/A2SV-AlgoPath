import sys
import os
import json
import re
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

export_dir = r"C:\Users\amana\OneDrive\Documents\projects\A2SV-Legacy\ChatExport_2026-08-14"
html_path = os.path.join(export_dir, "messages.html")

with open(html_path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

messages = soup.find_all("div", class_=re.compile(r"\bmessage\b"))

parsed_messages = []

for idx, msg in enumerate(messages):
    msg_id = msg.get("id", f"msg_{idx}")
    msg_classes = msg.get("class", [])
    
    # Check if service message
    is_service = "service" in msg_classes
    
    # Body
    body = msg.find("div", class_="body")
    
    from_name_div = body.find("div", class_="from_name") if body else None
    # from_name might contain nested elements or text
    author = None
    if from_name_div:
        # clone or extract only direct text / clean up
        author = from_name_div.contents[0].strip() if from_name_div.contents else from_name_div.get_text(strip=True)
    
    date_div = body.find("div", class_="date") if body else msg.find("div", class_="date")
    date_title = date_div.get("title", "") if date_div else ""
    date_text = date_div.get_text(strip=True) if date_div else ""
    
    forwarded_div = body.find("div", class_="forwarded") if body else None
    forwarded_from = forwarded_div.get_text(strip=True) if forwarded_div else None
    
    # Media / File attachment
    media_wrap = body.find("div", class_="media_wrap") if body else None
    media_files = []
    if media_wrap:
        for a in media_wrap.find_all("a"):
            media_files.append({
                "href": a.get("href"),
                "text": a.get_text(strip=True),
                "title": a.get("title", "")
            })
        for media_div in media_wrap.find_all("div", class_="media"):
            # check for details, description, title, etc.
            pass
            
    # Text div
    text_div = body.find("div", class_="text") if body else None
    text_raw = text_div.get_text(separator="\n", strip=True) if text_div else ""
    
    # Extract links from text_div
    links = []
    if text_div:
        for a in text_div.find_all("a"):
            links.append({
                "href": a.get("href"),
                "text": a.get_text(strip=True)
            })
            
    # If no text_div but service or body has text
    if not text_raw and body:
        # Check if there are other text elements
        text_raw = body.get_text(separator="\n", strip=True)
    elif not text_raw and is_service:
        text_raw = msg.get_text(separator="\n", strip=True)
        
    parsed_messages.append({
        "index": idx,
        "id": msg_id,
        "classes": msg_classes,
        "is_service": is_service,
        "author": author,
        "date_title": date_title,
        "date_text": date_text,
        "forwarded_from": forwarded_from,
        "media_files": media_files,
        "text": text_raw,
        "links": links
    })

print(f"Total parsed: {len(parsed_messages)}")
with open("parsed_debug.json", "w", encoding="utf-8") as f:
    json.dump(parsed_messages, f, indent=2, ensure_ascii=False)

print("Saved parsed_debug.json")
