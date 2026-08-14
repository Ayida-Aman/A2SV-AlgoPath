import sys
import json
import re
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r"ChatExport_2026-08-14\messages.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

messages = soup.find_all("div", class_=re.compile(r"\bmessage\b"))

print(f"Total message elements in HTML: {len(messages)}")

for i, msg in enumerate(messages[:25]):
    print(f"--- MSG #{i} (id={msg.get('id')}) ---")
    body = msg.find("div", class_="body")
    if not body:
        print("NO BODY:", msg.prettify()[:200])
        continue
    
    from_name = body.find("div", class_="from_name")
    if from_name:
        print(f"from_name text: {repr(from_name.get_text(strip=True))}")
        print(f"from_name html: {repr(from_name.decode_contents())}")
        
    date_div = body.find("div", class_="date")
    if date_div:
        print(f"date title: {date_div.get('title')} | text: {date_div.get_text(strip=True)}")
        
    forwarded = body.find("div", class_="forwarded")
    if forwarded:
        print(f"forwarded text: {repr(forwarded.get_text(strip=True))}")
        print(f"forwarded html: {repr(forwarded.decode_contents())}")
        
    text_div = body.find("div", class_="text")
    if text_div:
        print(f"text preview: {repr(text_div.get_text(strip=True)[:100])}")
        
    media = body.find("div", class_="media_wrap")
    if media:
        print(f"media: {repr(media.get_text(strip=True))}")
