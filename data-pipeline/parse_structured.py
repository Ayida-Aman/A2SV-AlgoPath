import sys
import json
import re
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r"ChatExport_2026-08-14\messages.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

messages = soup.find_all("div", class_=re.compile(r"\bmessage\b"))

all_msgs = []

for idx, msg in enumerate(messages):
    msg_id = msg.get("id", f"msg_{idx}")
    msg_classes = msg.get("class", [])
    
    # check joined class or service
    is_service = "service" in msg_classes
    
    body = msg.find("div", class_="body")
    
    # from_name
    from_name_div = body.find("div", class_="from_name") if body else None
    author_name = None
    orig_date_span = None
    if from_name_div:
        date_span = from_name_div.find("span", class_="date")
        if date_span:
            orig_date_span = date_span.get("title", date_span.get_text(strip=True))
            # get name without span
            # remove date_span from cloned copy
            name_text = "".join([c for c in from_name_div.contents if isinstance(c, str)]).strip()
            author_name = name_text if name_text else from_name_div.get_text(strip=True)
        else:
            author_name = from_name_div.get_text(strip=True)
            
    # message date (export/forward date)
    date_div = body.find("div", class_="date") if body else msg.find("div", class_="date")
    export_date = date_div.get("title", "") if date_div else ""
    
    # forwarded initials
    fwd_initials = None
    forwarded = body.find("div", class_="forwarded") if body else None
    if forwarded:
        init_div = forwarded.find("div", class_="initials")
        if init_div:
            fwd_initials = init_div.get_text(strip=True)
            
    # media wrap
    media_wrap = body.find("div", class_="media_wrap") if body else None
    media_info = []
    if media_wrap:
        for a in media_wrap.find_all("a"):
            href = a.get("href")
            media_title = a.get("title", "")
            media_text = a.get_text(separator=" ", strip=True)
            media_info.append({
                "href": href,
                "title": media_title,
                "text": media_text
            })
        # also check for media text or status (e.g. file size exceeded)
        status_div = media_wrap.find("div", class_="status")
        status_text = status_div.get_text(strip=True) if status_div else None
        title_div = media_wrap.find("div", class_="title")
        title_text = title_div.get_text(strip=True) if title_div else None
        desc_div = media_wrap.find("div", class_="description")
        desc_text = desc_div.get_text(strip=True) if desc_div else None
    else:
        status_text = None
        title_text = None
        desc_text = None
        
    # text
    text_div = body.find("div", class_="text") if body else None
    text_content = text_div.get_text(separator="\n", strip=True) if text_div else ""
    if not text_content and body:
        # maybe only media or service
        text_content = ""
        
    # text links
    links = []
    if text_div:
        for a in text_div.find_all("a"):
            links.append({
                "text": a.get_text(strip=True),
                "href": a.get("href")
            })
            
    all_msgs.append({
        "index": idx,
        "id": msg_id,
        "classes": msg_classes,
        "is_service": is_service,
        "author_header": author_name,
        "orig_date": orig_date_span,
        "export_date": export_date,
        "fwd_initials": fwd_initials,
        "text": text_content,
        "links": links,
        "media_info": media_info,
        "media_title": title_text,
        "media_desc": desc_text,
        "media_status": status_text
    })

print(f"Parsed {len(all_msgs)} messages.")
with open("all_msgs_structured.json", "w", encoding="utf-8") as f:
    json.dump(all_msgs, f, indent=2, ensure_ascii=False)

print("Saved all_msgs_structured.json")
