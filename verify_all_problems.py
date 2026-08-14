import sys
import json
import re
from urllib.parse import urlparse

sys.stdout.reconfigure(encoding='utf-8')

with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

cat_by_id = {c["id"]: c for c in categorized}

def normalize_problem_url(url):
    if not url:
        return ""
    parsed = urlparse(url.strip())
    domain = parsed.netloc.lower()
    path = parsed.path.rstrip('/')
    
    if "leetcode.com" in domain:
        match = re.search(r"/problems/([^/]+)", path)
        if match:
            return f"https://leetcode.com/problems/{match.group(1)}/"
        return f"https://leetcode.com{path}/"
        
    if "codeforces.com" in domain:
        # e.g., /problemset/problem/1669/A or /contest/231/problem/A
        return f"https://codeforces.com{path}"
        
    if "hackerrank.com" in domain:
        # e.g., /challenges/py-if-else/problem
        match = re.search(r"/challenges/([^/]+)", path)
        if match:
            return f"https://www.hackerrank.com/challenges/{match.group(1)}/problem"
        return f"https://www.hackerrank.com{path}"
        
    if "eolymp.com" in domain:
        match = re.search(r"/problems/(\d+)", path)
        if match:
            return f"https://www.eolymp.com/en/problems/{match.group(1)}"
        return f"https://www.eolymp.com{path}"
        
    if "geeksforgeeks.org" in domain:
        match = re.search(r"/problems/([^/]+)", path)
        if match:
            return f"https://practice.geeksforgeeks.org/problems/{match.group(1)}"
        return f"https://practice.geeksforgeeks.org{path}"
        
    if "kattis.com" in domain:
        match = re.search(r"/problems/([^/]+)", path)
        if match:
            return f"https://open.kattis.com/problems/{match.group(1)}"
        return f"https://open.kattis.com{path}"
        
    return url.strip()

def get_platform(url):
    domain = urlparse(url).netloc.lower()
    if "leetcode.com" in domain:
        return "LeetCode"
    elif "codeforces.com" in domain:
        return "Codeforces"
    elif "hackerrank.com" in domain:
        return "HackerRank"
    elif "eolymp.com" in domain:
        return "Eolymp"
    elif "geeksforgeeks.org" in domain:
        return "GeeksforGeeks"
    elif "kattis.com" in domain:
        return "Kattis"
    return "Other"

all_problems = []

for c in categorized:
    mid = c["id"]
    day = c["day"]
    links = c["links"]
    text = c["text"]
    
    for l in links:
        href = l.get("href", "")
        raw_title = l.get("text", "").strip()
        if not href:
            continue
        platform = get_platform(href)
        if platform == "Other":
            continue
            
        norm_url = normalize_problem_url(href)
        
        # Clean title
        clean_title = re.sub(r"^[•\-\*\s]+", "", raw_title).strip()
        if not clean_title or clean_title in ["•", "-", "*", "Solve", "problem"]:
            if platform == "LeetCode":
                slug = re.search(r"/problems/([^/]+)", norm_url)
                clean_title = slug.group(1).replace("-", " ").title() if slug else "LeetCode Problem"
            elif platform == "HackerRank":
                slug = re.search(r"/challenges/([^/]+)", norm_url)
                clean_title = slug.group(1).replace("-", " ").title() if slug else "HackerRank Problem"
            elif platform == "Codeforces":
                # Check if contest or problemset
                parts = norm_url.rstrip('/').split('/')
                clean_title = f"Codeforces {parts[-2]}{parts[-1]}"
            elif platform == "Eolymp":
                slug = re.search(r"/problems/(\d+)", norm_url)
                clean_title = f"Eolymp Problem {slug.group(1)}" if slug else "Eolymp Problem"
            elif platform == "GeeksforGeeks":
                clean_title = "Alien Dictionary"
            elif platform == "Kattis":
                clean_title = "Block Game 2"
                
        all_problems.append({
            "raw_title": raw_title,
            "title": clean_title,
            "platform": platform,
            "raw_url": href,
            "url": norm_url,
            "sourceDay": day,
            "sourceMsgId": mid
        })

print(f"Total problem links extracted: {len(all_problems)}")
unique_urls = set(p["url"] for p in all_problems)
print(f"Unique problem URLs: {len(unique_urls)}")

# Canonical map
canonical_problems = {}
for p in all_problems:
    u = p["url"]
    if u not in canonical_problems:
        canonical_problems[u] = {
            "title": p["title"],
            "platform": p["platform"],
            "url": u,
            "occurrences": []
        }
    # Keep best title (longest non-generic)
    curr_title = canonical_problems[u]["title"]
    if len(p["title"]) > len(curr_title) and not p["title"].startswith("Codeforces Problem"):
        canonical_problems[u]["title"] = p["title"]
        
    canonical_problems[u]["occurrences"].append({
        "sourceDay": p["sourceDay"],
        "sourceMsgId": p["sourceMsgId"],
        "raw_title": p["raw_title"]
    })

print(f"Total unique canonical problems: {len(canonical_problems)}")

platform_breakdown = {}
for p in all_problems:
    platform_breakdown[p["platform"]] = platform_breakdown.get(p["platform"], 0) + 1

unique_platform_breakdown = {}
for p in canonical_problems.values():
    unique_platform_breakdown[p["platform"]] = unique_platform_breakdown.get(p["platform"], 0) + 1

print("\nTotal Problem Links by Platform:", platform_breakdown)
print("Unique Problems by Platform:", unique_platform_breakdown)
