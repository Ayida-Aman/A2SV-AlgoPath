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

parsed_list = []

for idx, msg in enumerate(messages):
    msg_id = msg.get("id", f"msg_{idx}")
    msg_classes = msg.get("class", [])
    
    # Body
    body = msg.find("div", class_="body")
    
    from_name_div = body.find("div", class_="from_name") if body else None
    author = None
    if from_name_div:
        author = from_name_div.contents[0].strip() if from_name_div.contents else from_name_div.get_text(strip=True)
    
    date_div = body.find("div", class_="date") if body else msg.find("div", class_="date")
    date_title = date_div.get("title", "") if date_div else ""
    date_text = date_div.get_text(strip=True) if date_div else ""
    
    forwarded_div = body.find("div", class_="forwarded") if body else None
    forwarded_from = forwarded_div.get_text(strip=True) if forwarded_div else None
    
    # Media
    media_wrap = body.find("div", class_="media_wrap") if body else None
    media_files = []
    if media_wrap:
        for a in media_wrap.find_all("a"):
            media_files.append({
                "href": a.get("href"),
                "text": a.get_text(strip=True),
                "title": a.get("title", "")
            })
            
    # Text
    text_div = body.find("div", class_="text") if body else None
    text_raw = text_div.get_text(separator="\n", strip=True) if text_div else ""
    if not text_raw and body:
        text_raw = body.get_text(separator="\n", strip=True)
    elif not text_raw:
        text_raw = msg.get_text(separator="\n", strip=True)
        
    # Links
    links = []
    if text_div:
        for a in text_div.find_all("a"):
            links.append({
                "href": a.get("href"),
                "text": a.get_text(strip=True)
            })
            
    parsed_list.append({
        "index": idx,
        "id": msg_id,
        "classes": msg_classes,
        "author": author,
        "date_title": date_title,
        "date_text": date_text,
        "forwarded_from": forwarded_from,
        "media_files": media_files,
        "text": text_raw,
        "links": links
    })

with open("all_messages_detail.json", "w", encoding="utf-8") as f:
    json.dump(parsed_list, f, indent=2, ensure_ascii=False)

print(f"Dumped {len(parsed_list)} messages to all_messages_detail.json")
