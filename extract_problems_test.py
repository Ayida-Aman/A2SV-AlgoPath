import sys
import json
import re
from urllib.parse import urlparse, parse_qs, urlunparse

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

# Build a mapping from message id to categorized item
cat_by_id = {c["id"]: c for c in categorized}

def normalize_url(url):
    if not url:
        return ""
    # Strip tracking params like ?utm_source=chatgpt.com, ?isFullScreen=true if appropriate
    parsed = urlparse(url)
    # clean trailing slashes
    path = parsed.path.rstrip('/')
    
    # For leetcode, remove query params and description
    if "leetcode.com" in parsed.netloc:
        # standard leetcode problem url: https://leetcode.com/problems/<slug>
        match = re.search(r"/problems/([^/]+)", path)
        if match:
            slug = match.group(1)
            return f"https://leetcode.com/problems/{slug}/"
        return f"{parsed.scheme}://{parsed.netloc}{path}"
    
    # For codeforces: contest or problemset
    if "codeforces.com" in parsed.netloc:
        # e.g. https://codeforces.com/problemset/problem/1669/A or /contest/231/problem/A
        return f"{parsed.scheme}://{parsed.netloc}{path}"
        
    # For hackerrank:
    if "hackerrank.com" in parsed.netloc:
        # challenges/<slug>/problem
        return f"{parsed.scheme}://{parsed.netloc}{path}"
        
    # For geeksforgeeks:
    if "geeksforgeeks.org" in parsed.netloc:
        return f"{parsed.scheme}://{parsed.netloc}{path}"
        
    # For kattis:
    if "kattis.com" in parsed.netloc:
        return f"{parsed.scheme}://{parsed.netloc}{path}"
        
    return url.strip()

def detect_platform(url):
    domain = urlparse(url).netloc.lower()
    if "leetcode.com" in domain:
        return "LeetCode"
    elif "codeforces.com" in domain:
        return "Codeforces"
    elif "hackerrank.com" in domain:
        return "HackerRank"
    elif "geeksforgeeks.org" in domain:
        return "GeeksforGeeks"
    elif "kattis.com" in domain:
        return "Kattis"
    elif "t.me" in domain or "telegram" in domain:
        return "Telegram"
    else:
        return "Other"

# Extract all problems
extracted_problems = []
all_urls = []

for m in categorized:
    text = m["text"]
    links = m["links"]
    day = m["day"]
    mid = m["id"]
    
    # Identify practice problem links
    for l in links:
        raw_url = l["href"]
        link_text = l["text"]
        if not raw_url:
            continue
            
        platform = detect_platform(raw_url)
        all_urls.append({
            "url": raw_url,
            "text": link_text,
            "platform": platform,
            "day": day,
            "msg_id": mid
        })
        
        if platform in ["LeetCode", "Codeforces", "HackerRank", "GeeksforGeeks", "Kattis"]:
            norm_url = normalize_url(raw_url)
            # Determine clean title
            clean_title = link_text.strip()
            # If link_text is bullet point or empty
            clean_title = re.sub(r"^[•\-\*\s]+", "", clean_title).strip()
            
            # If title is empty or just punctuation, extract from url or text
            if not clean_title or clean_title in ["•", "-", "*"]:
                # Try finding from url slug
                if platform == "LeetCode":
                    slug_match = re.search(r"/problems/([^/]+)", norm_url)
                    if slug_match:
                        clean_title = slug_match.group(1).replace("-", " ").title()
                elif platform == "HackerRank":
                    slug_match = re.search(r"/challenges/([^/]+)", norm_url)
                    if slug_match:
                        clean_title = slug_match.group(1).replace("-", " ").title()
                elif platform == "Codeforces":
                    clean_title = f"Codeforces Problem {norm_url.split('/')[-2]}/{norm_url.split('/')[-1]}"
                else:
                    clean_title = norm_url
                    
            extracted_problems.append({
                "raw_title": link_text,
                "title": clean_title,
                "platform": platform,
                "raw_url": raw_url,
                "url": norm_url,
                "sourceDay": day,
                "sourceMsgId": mid,
                "topics": []
            })

print(f"Total problem links extracted: {len(extracted_problems)}")
unique_urls = set(p["url"] for p in extracted_problems)
print(f"Unique problem URLs: {len(unique_urls)}")

# Platform breakdown
platform_counts = {}
for p in extracted_problems:
    platform_counts[p["platform"]] = platform_counts.get(p["platform"], 0) + 1
print("\nPlatform Breakdown (all occurrences):", platform_counts)

unique_by_url = {}
for p in extracted_problems:
    u = p["url"]
    if u not in unique_by_url:
        unique_by_url[u] = {
            "title": p["title"],
            "platform": p["platform"],
            "url": u,
            "occurrences": []
        }
    unique_by_url[u]["occurrences"].append({
        "sourceDay": p["sourceDay"],
        "sourceMsgId": p["sourceMsgId"],
        "raw_title": p["raw_title"]
    })

print(f"Unique canonical problems count: {len(unique_by_url)}")

# Unique platform breakdown
unique_platform_counts = {}
for p in unique_by_url.values():
    unique_platform_counts[p["platform"]] = unique_platform_counts.get(p["platform"], 0) + 1
print("Unique canonical problems by platform:", unique_platform_counts)

# Let's check duplicates
duplicates = [p for p in unique_by_url.values() if len(p["occurrences"]) > 1]
print(f"\nProblems appearing multiple times: {len(duplicates)}")
for d in duplicates:
    print(f"  - '{d['title']}' ({d['platform']}) -> Days: {[occ['sourceDay'] for occ in d['occurrences']]}")
