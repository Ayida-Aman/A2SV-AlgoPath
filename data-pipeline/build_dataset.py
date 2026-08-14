import sys
import os
import json
import re
from urllib.parse import urlparse

sys.stdout.reconfigure(encoding='utf-8')

# Ensure output directories exist
os.makedirs("data", exist_ok=True)
os.makedirs("reports", exist_ok=True)
os.makedirs("source", exist_ok=True)

print("Starting full curriculum extraction and dataset generation...")

# Load parsed messages
with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

# Inspect files directory
files_dir = r"C:\Users\amana\OneDrive\Documents\projects\A2SV-Legacy\ChatExport_2026-08-14\files"
all_disk_files = os.listdir(files_dir)
pdf_disk_files = sorted([f for f in all_disk_files if f.lower().endswith(".pdf")])
thumb_disk_files = sorted([f for f in all_disk_files if f.lower().endswith(".jpg") or f.lower().endswith(".png")])

print(f"Loaded {len(messages)} messages.")
print(f"Found {len(all_disk_files)} files in files/ ({len(pdf_disk_files)} PDFs, {len(thumb_disk_files)} thumbnails).")

