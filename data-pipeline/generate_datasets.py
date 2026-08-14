import sys
import os
import json
import re
from urllib.parse import urlparse

sys.stdout.reconfigure(encoding='utf-8')

# Ensure output directories
os.makedirs("data", exist_ok=True)
os.makedirs("reports", exist_ok=True)
os.makedirs("source", exist_ok=True)

# Load base data
with open("all_msgs_structured.json", "r", encoding="utf-8") as f:
    raw_messages = json.load(f)

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

files_dir = r"C:\Users\amana\OneDrive\Documents\projects\A2SV-Legacy\ChatExport_2026-08-14\files"
all_disk_files = os.listdir(files_dir)
pdf_disk_files = sorted([f for f in all_disk_files if f.lower().endswith(".pdf")])
thumb_disk_files = sorted([f for f in all_disk_files if f.lower().endswith(".jpg") or f.lower().endswith(".png")])

print(f"Loaded {len(raw_messages)} messages and {len(all_disk_files)} files.")

# URL Normalization & Platform detection
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
        return f"https://codeforces.com{path}"
        
    if "hackerrank.com" in domain:
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

KNOWN_TITLE_FIXES = {
    "https://codeforces.com/contest/1968/problem/G1": "Division + LCP (easy version)",
    "https://codeforces.com/contest/231/problem/A": "Team",
    "https://codeforces.com/problemset/problem/71/A": "Way Too Long Words",
    "https://codeforces.com/problemset/problem/136/A": "Presents",
    "https://codeforces.com/problemset/problem/1669/A": "Division?",
    "https://codeforces.com/problemset/problem/281/A": "Word Capitalization",
    "https://codeforces.com/problemset/problem/112/A": "Petya and Strings",
    "https://codeforces.com/problemset/problem/266/A": "Stones on the Table",
    "https://codeforces.com/problemset/problem/1992/A": "Only Pluses",
    "https://codeforces.com/problemset/problem/1520/D": "Same Differences",
    "https://codeforces.com/contest/1850/problem/B": "Word on Paper",
    "https://codeforces.com/contest/1850/problem/C": "Word on Paper",
    "https://codeforces.com/contest/1850/problem/D": "Balanced Round",
    "https://codeforces.com/problemset/problem/1850/B": "Ten Words of Wisdom",
    "https://codeforces.com/problemset/problem/1850/C": "Word on Paper",
    "https://codeforces.com/problemset/problem/1850/D": "Balanced Round",
    "https://codeforces.com/problemset/problem/1846/B": "Rudolph and Tic-Tac-Toe",
    "https://codeforces.com/problemset/problem/1399/A": "Remove Smallest",
    "https://codeforces.com/problemset/problem/1638/B": "Minimize Inversions",
    "https://codeforces.com/problemset/problem/1811/A": "Insert Digit",
    "https://codeforces.com/problemset/problem/1688/A": "Cirno's Perfect Bitmasks Classroom",
    "https://codeforces.com/contest/664/problem/A": "Complicated GCD",
    "https://codeforces.com/problemset/problem/1881/D": "Divide and Equalize",
    "https://codeforces.com/problemset/problem/601/A": "The Two Routes",
    "https://codeforces.com/problemset/problem/20/C": "Dijkstra?",
    "https://www.eolymp.com/en/problems/2472": "Operations on Graph",
    "https://basecamp.eolymp.com/en/problems/992": "Cities and Roads",
    "https://basecamp.eolymp.com/en/problems/3981": "From Adjacency Matrix to Adjacency List",
    "https://basecamp.eolymp.com/en/problems/3986": "Sources and Sinks",
    "https://practice.geeksforgeeks.org/problems/alien-dictionary/1": "Alien Dictionary",
    "https://open.kattis.com/problems/blockgame2": "Block Game 2"
}

def clean_problem_title(raw_title, norm_url, platform):
    if norm_url in KNOWN_TITLE_FIXES:
        return KNOWN_TITLE_FIXES[norm_url]
        
    title = re.sub(r"^[•\-\*\s]+", "", raw_title).strip()
    if not title or title.lower() in ["•", "-", "*", "solve", "problem", "the problem", "problems"]:
        if platform == "LeetCode":
            slug = re.search(r"/problems/([^/]+)", norm_url)
            if slug:
                title = slug.group(1).replace("-", " ").title()
        elif platform == "HackerRank":
            slug = re.search(r"/challenges/([^/]+)", norm_url)
            if slug:
                title = slug.group(1).replace("-", " ").title()
        elif platform == "Codeforces":
            parts = norm_url.rstrip('/').split('/')
            title = f"Codeforces Problem {parts[-2]}/{parts[-1]}"
        elif platform == "Eolymp":
            slug = re.search(r"/problems/(\d+)", norm_url)
            title = f"Eolymp Problem {slug.group(1)}" if slug else "Eolymp Problem"
        elif platform == "GeeksforGeeks":
            title = "Alien Dictionary"
        elif platform == "Kattis":
            title = "Block Game 2"
    return title

# 1. EXTRACT RAW DATA
print("1. Generating data/raw_extracted_data.json...")
raw_extracted_data = {
    "sourceExport": {
        "exportPath": "ChatExport_2026-08-14",
        "chatTitle": "Test (Forwarded A2SV Channel Archive)",
        "originalAuthors": [
            "baka Codes (@bakacodes, @codewithbaka)",
            "Muluken Zewge",
            "A2SV Education Team"
        ],
        "dateRange": "31.01.2025 – 14.08.2026",
        "totalMessagesAnalyzed": len(raw_messages),
        "totalFilesDiscovered": len(all_disk_files),
        "totalPdfSlides": len(pdf_disk_files)
    },
    "messages": raw_messages,
    "categorizedMessages": categorized
}

with open("data/raw_extracted_data.json", "w", encoding="utf-8") as f:
    json.dump(raw_extracted_data, f, indent=2, ensure_ascii=False)
print("Saved data/raw_extracted_data.json")

# 2. EXTRACT FILE INVENTORY
print("2. Generating data/file_inventory.json...")
day_to_pdf_map = {
    1: ["A2SV Python Track - Best Coding Practices.pdf"],
    2: ["A2SV_G6_Remote_Python_Track_Python_Basics,_Conditionals,_Loops_and.pdf"],
    3: ["A2SV Python Track - Best Coding Practices and Code review.pdf"],
    5: ["A2SV G6 Remote - Python Track-DS Basics(Lists and Tuples).pdf"],
    6: ["A2SV G5 Remote Focus, time management and planning.pdf"],
    7: ["A2SV_Remote_G6_Python_Track_DS_Basics_2_Sets_and_Dictionaries.pdf"],
    9: ["A2SV_Remote_G5_Python_Track_Built_in_functions_and_classes.pdf"],
    10: ["A2SV_Remote_G6_Python_Track_Time_and_Space_Complexity_1.pdf"],
    11: ["A2SV_Remote_G6_The_7_Steps_of_Highly_Effective_Problem_Solving.pdf"],
    13: ["A2SV Arrays_Lists .pdf"],
    14: ["A2SV Matrices.pdf"],
    15: ["_A2SV Remote G6 - Education Phase I - Sorting Part 1.pdf"],
    17: ["A2SV G6 Remote Education - Education Phase I - Two Pointers.pdf"],
    18: ["A2SV_G6_Remote_Education_Education_Phase_I_Sliding_Window_Lecture.pdf"],
    19: ["A2SV_G6_Remote_Education_Education_Phase_I_Prefix_Sum_no_code.pdf"],
    20: ["A2SV G6 Linked List Lecture I.pdf"],
    21: ["A2SV final __ Linked List Lecture II.pdf"],
    22: ["A2SV_Remote_Stacks,_Queues_and_Monotonicity_Lecture_Part_I.pdf"],
    23: ["A2SV_Remote_G6_Stacks,_Queues_and_Monotonicity_Lecture_Part_II_without.pdf"],
    24: ["_A2SV __ Recursion I.pdf"],
    25: ["Binary Search.pdf"],
    26: ["Trees_I.pdf"],
    27: ["Trees_II.pdf"],
    28: ["Recursion_II.pdf"],
    29: ["Graph.pdf"],
    30: ["DFS Lecture .pdf"],
    31: ["BFS Lecture.pdf"],
    32: ["Heap Lecture.pdf"],
    33: ["Greedy Lecture.pdf"],
    34: ["Topological Sort Lecture.pdf"],
    35: ["Top-Down DP.pdf"],
    36: ["Bottom Up DP.pdf"],
    37: ["Bitwise Operations.pdf"],
    38: ["Union Find.pdf"],
    39: ["Sorting II - Part I.pdf", "Sorting II - Part II.pdf"],
    40: ["Numerics Lecture.pdf"],
    41: ["Trie Lecture.pdf"],
    42: ["Shortest Path Lecture.pdf"],
    43: ["Advanced String Algorithms.pdf"]
}

pdf_to_day_map = {}
for d, flist in day_to_pdf_map.items():
    for fn in flist:
        pdf_to_day_map[fn] = d

file_inventory = []

for fn in all_disk_files:
    fpath = f"files/{fn}"
    full_path = os.path.join(files_dir, fn)
    size = os.path.getsize(full_path) if os.path.exists(full_path) else 0
    is_pdf = fn.lower().endswith(".pdf")
    is_thumb = fn.lower().endswith(".jpg") or fn.lower().endswith(".png")
    
    file_type = "pdf" if is_pdf else ("image_thumbnail" if is_thumb else "other")
    
    matched_day = None
    if is_pdf and fn in pdf_to_day_map:
        matched_day = pdf_to_day_map[fn]
    elif is_thumb:
        base_pdf = fn.replace("_thumb.jpg", "").replace("_thumb.png", "")
        if base_pdf in pdf_to_day_map:
            matched_day = pdf_to_day_map[base_pdf]
            
    topic = fn.replace(".pdf", "").replace(".pdf_thumb.jpg", "").replace("_", " ").strip()
    
    file_inventory.append({
        "fileName": fn,
        "relativePath": fpath,
        "type": file_type,
        "sizeBytes": size,
        "onDisk": True,
        "associatedSourceDay": matched_day,
        "associatedWeek": matched_day,
        "topic": topic,
        "confidence": "high" if matched_day else "medium",
        "notes": "Telegram export attachment"
    })

# Add the 2 referenced files that exceeded export download limits
missing_referenced = [
    {
        "fileName": "A2SV G5 Remote Focus, time management and planning.pdf",
        "relativePath": "files/A2SV G5 Remote Focus, time management and planning.pdf",
        "type": "pdf",
        "sizeBytes": 9332326,
        "onDisk": False,
        "associatedSourceDay": 6,
        "associatedWeek": 6,
        "topic": "Focus, Time Management & Planning",
        "confidence": "high",
        "notes": "Referenced in Telegram message23 (Day 6 Lecture Slide). File download exceeded max export size in Telegram client."
    },
    {
        "fileName": "A2SV_G6_Python_Track_Focus_time_management_and_planning.pdf",
        "relativePath": "files/A2SV_G6_Python_Track_Focus_time_management_and_planning.pdf",
        "type": "pdf",
        "sizeBytes": 9437184,
        "onDisk": False,
        "associatedSourceDay": 6,
        "associatedWeek": 6,
        "topic": "Focus, Time Management & Planning Note",
        "confidence": "high",
        "notes": "Referenced in Telegram message12 (metadata forward). File download exceeded max export size in Telegram client."
    }
]
file_inventory.extend(missing_referenced)

with open("data/file_inventory.json", "w", encoding="utf-8") as f:
    json.dump(file_inventory, f, indent=2, ensure_ascii=False)
print("Saved data/file_inventory.json")

# 3. EXTRACT PHASES
print("3. Generating data/phases.json...")
phases_data = [
    {
        "id": "foundation",
        "name": "Foundation",
        "description": "Establish core programming competencies in Python, best coding practices, clean architecture, complexity analysis (Big-O), the 7-step problem-solving methodology, and essential built-in data structures (Lists, Tuples, Sets, Dictionaries, Classes).",
        "weeks": list(range(1, 13)),
        "totalWeeks": 12
    },
    {
        "id": "phase_1",
        "name": "Phase 1 — Core DSA",
        "description": "Master foundational data structures and fundamental algorithmic paradigms: Arrays, Matrices, Elementary Sorting, Two Pointers, Sliding Window, Prefix Sum, Singly/Doubly Linked Lists, Stacks, Queues, Monotonic Structures, Recursion Fundamentals, and Binary Search.",
        "weeks": list(range(13, 26)),
        "totalWeeks": 13
    },
    {
        "id": "phase_2",
        "name": "Phase 2 — Advanced DSA",
        "description": "Dive deep into non-linear data structures, advanced recursion, and foundational graph algorithms: Binary Trees, Binary Search Trees (BST), Backtracking, Divide & Conquer, Graph Representations, Depth-First Search (DFS), Breadth-First Search (BFS), Heaps/Priority Queues, Greedy Optimization, Topological Sort, and Dynamic Programming (Top-Down & Bottom-Up).",
        "weeks": list(range(26, 37)),
        "totalWeeks": 11
    },
    {
        "id": "phase_3",
        "name": "Phase 3 — Competitive Programming",
        "description": "Tackle advanced competitive programming paradigms and specialized data structures: Bitwise Operations, Disjoint Set Union (Union-Find), Advanced & Non-Comparison Sorting, Numerics & Number Theory, Trie (Prefix Tree), All-Pairs & Single-Source Shortest Paths (Dijkstra, Bellman-Ford, Floyd-Warshall), and Advanced String Algorithms (KMP, Rabin-Karp, Z-Algorithm).",
        "weeks": list(range(37, 44)),
        "totalWeeks": 7
    }
]

with open("data/phases.json", "w", encoding="utf-8") as f:
    json.dump(phases_data, f, indent=2, ensure_ascii=False)
print("Saved data/phases.json")

# 4. EXTRACT PROBLEMS
print("4. Extracting problems and building data/problems.json...")
raw_problems_list = []

for c in categorized:
    mid = c["id"]
    day = c["day"]
    links = c["links"]
    
    # week mapping: if day is Contest_1, week is 5; if Contest_2, week is 13; else week is day number
    week_num = 5 if day == "Contest_1" else (13 if day == "Contest_2" else day)
    
    for l in links:
        href = l.get("href", "")
        raw_title = l.get("text", "").strip()
        if not href:
            continue
        platform = get_platform(href)
        if platform == "Other":
            continue
            
        norm_url = normalize_problem_url(href)
        clean_title = clean_problem_title(raw_title, norm_url, platform)
        
        raw_problems_list.append({
            "raw_title": raw_title,
            "title": clean_title,
            "platform": platform,
            "url": norm_url,
            "sourceDay": day,
            "weekNumber": week_num,
            "difficulty": None, # Stored as null per instruction
            "topics": [],
            "sourcePostUrl": href,
            "sourceMsgId": mid
        })

print(f"Total raw problem occurrences extracted: {len(raw_problems_list)}")

# Deduplicate into canonical problems
canonical_problems_dict = {}
for p in raw_problems_list:
    u = p["url"]
    if u not in canonical_problems_dict:
        canonical_problems_dict[u] = {
            "title": p["title"],
            "platform": p["platform"],
            "url": u,
            "difficulty": None,
            "topics": [],
            "sourceDay": p["sourceDay"],
            "weekNumber": p["weekNumber"],
            "occurrences": []
        }
    # Update title if current title is better
    if len(p["title"]) > len(canonical_problems_dict[u]["title"]) and not p["title"].startswith("Codeforces Problem"):
        canonical_problems_dict[u]["title"] = p["title"]
        
    canonical_problems_dict[u]["occurrences"].append({
        "sourceDay": p["sourceDay"],
        "weekNumber": p["weekNumber"],
        "sourceMsgId": p["sourceMsgId"],
        "rawTitle": p["raw_title"]
    })

canonical_problems_list = list(canonical_problems_dict.values())
print(f"Total canonical unique problems: {len(canonical_problems_list)}")

with open("data/problems.json", "w", encoding="utf-8") as f:
    json.dump(canonical_problems_list, f, indent=2, ensure_ascii=False)
print("Saved data/problems.json")

