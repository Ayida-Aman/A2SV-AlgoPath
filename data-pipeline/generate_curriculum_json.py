import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Run generate_datasets.py first
import generate_datasets

with open("data/problems.json", "r", encoding="utf-8") as f:
    canonical_problems = json.load(f)

with open("categorized_messages.json", "r", encoding="utf-8") as f:
    categorized = json.load(f)

with open("data/file_inventory.json", "r", encoding="utf-8") as f:
    file_inventory = json.load(f)

with open("data/phases.json", "r", encoding="utf-8") as f:
    phases = json.load(f)

# Group problems by week
problems_by_week = {}
for p in canonical_problems:
    for occ in p["occurrences"]:
        w = occ["weekNumber"]
        if w not in problems_by_week:
            problems_by_week[w] = []
        if not any(item["url"] == p["url"] for item in problems_by_week[w]):
            problems_by_week[w].append({
                "title": p["title"],
                "platform": p["platform"],
                "url": p["url"],
                "sourceDay": occ["sourceDay"],
                "weekNumber": w,
                "difficulty": None,
                "topics": p.get("topics", [])
            })

# Group materials by week
materials_by_week = {}
for fi in file_inventory:
    w = fi.get("associatedWeek")
    if w is not None and fi.get("type") == "pdf":
        if w not in materials_by_week:
            materials_by_week[w] = []
        materials_by_week[w].append({
            "fileName": fi["fileName"],
            "relativePath": fi["relativePath"],
            "type": fi["type"],
            "sizeBytes": fi["sizeBytes"],
            "onDisk": fi["onDisk"],
            "topic": fi["topic"],
            "confidence": fi["confidence"]
        })

# Detailed curriculum definitions for all 43 weeks
weeks_data = [
    # WEEK 1
    {
        "weekNumber": 1,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Onboarding & Best Coding Practices",
        "description": "Introduces the A2SV DSA learning journey and core engineering standards for writing clean, readable, and maintainable code from day one.",
        "sourceDays": [1],
        "learningObjectives": [
            "Set up competitive programming accounts on LeetCode, Codeforces, and HackerRank.",
            "Understand and apply clean code principles: meaningful naming, DRY (Don't Repeat Yourself), and modular single-purpose functions.",
            "Write concise, intent-focused comments without over-commenting obvious code.",
            "Integrate into collaborative discussion channels and establish structured problem-submission routines."
        ],
        "concepts": [
            {
                "name": "Meaningful Naming",
                "description": "Using descriptive, intention-revealing variable and function names (e.g., calculate_total instead of calc).",
                "complexity": None
            },
            {
                "name": "DRY Principle",
                "description": "Don't Repeat Yourself: eliminating redundant logic by extracting reusable functions and helper modules.",
                "complexity": None
            },
            {
                "name": "Clean Formatting & Modularity",
                "description": "Enforcing proper indentation, consistent style guidelines, and single-responsibility functional blocks.",
                "complexity": None
            },
            {
                "name": "Essential Comments",
                "description": "Documenting why code exists rather than redundantly stating what the syntax does.",
                "complexity": None
            }
        ],
        "algorithms": [],
        "dataStructures": [],
        "complexities": None,
        "problems": problems_by_week.get(1, []),
        "materials": materials_by_week.get(1, []),
        "quote": {
            "quote": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            "author": "Martin Fowler"
        },
        "source": {
            "author": "baka Codes",
            "telegramUrls": ["https://t.me/bakacodes", "https://t.me/codewithbakacommunity/6"],
            "dates": ["14.08.2026 10:14:08 UTC+03:00 (Export archive timestamp)"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 2
    {
        "weekNumber": 2,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Python Fundamentals, Conditionals, Loops & Functions",
        "description": "Covers essential Python programming mechanics including conditional logic, iteration with for/while loops, function definitions, and anonymous lambda expressions.",
        "sourceDays": [2],
        "learningObjectives": [
            "Master Python conditionals (if-elif-else) and loop structures (for, while).",
            "Define modular functions and write concise one-line lambda functions.",
            "Solve foundational algorithmic problems on LeetCode and HackerRank using basic control flow.",
            "Follow structured solution submission formats using hashtags and markdown code blocks."
        ],
        "concepts": [
            {
                "name": "Conditionals & Control Flow",
                "description": "Branching execution paths using if, elif, and else statements.",
                "complexity": None
            },
            {
                "name": "Loops & Iteration",
                "description": "Iterating over sequences and ranges using for and while loops.",
                "complexity": None
            },
            {
                "name": "Functions & Lambda Expressions",
                "description": "Declaring standard functions with def and anonymous inline functions with lambda.",
                "complexity": None
            },
            {
                "name": "Common Prefix Matching",
                "description": "Comparing strings character by character across an array to find common initial substrings.",
                "complexity": None
            }
        ],
        "algorithms": ["String Prefix Matching", "Modular Exponentiation"],
        "dataStructures": ["Strings", "Integers"],
        "complexities": None,
        "problems": problems_by_week.get(2, []),
        "materials": materials_by_week.get(2, []),
        "quote": {
            "quote": "A year from now, you may wish you had started today.",
            "author": "Karen Lamb"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/codewithbakacommunity/6", "https://t.me/bakacodes"],
            "dates": ["31.01.2025 15:16:49 UTC+03:00 (Slide)", "14.08.2026 10:23:59 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 3
    {
        "weekNumber": 3,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Clean Coding Standards & Code Review",
        "description": "Focuses on writing production-quality code, following industry-standard code styling, and conducting effective peer code reviews during algorithmic problem solving.",
        "sourceDays": [3],
        "learningObjectives": [
            "Apply clean code standards while solving practical array and string problems.",
            "Conduct structured peer code reviews to evaluate readability, edge-case coverage, and performance.",
            "Implement string reversal, character frequency filtering, and array concatenation.",
            "Develop the habit of active coding practice and daily streak accountability."
        ],
        "concepts": [
            {
                "name": "Code Review Guidelines",
                "description": "Systematically inspecting code for correctness, clarity, naming conventions, and modular decomposition.",
                "complexity": None
            },
            {
                "name": "Self-Documenting Code",
                "description": "Structuring logic so that variable and function names explain intent without unnecessary comment clutter.",
                "complexity": None
            },
            {
                "name": "Array Concatenation & Transformation",
                "description": "Creating expanded arrays by combining multiple lists or duplicating sequences.",
                "complexity": None
            }
        ],
        "algorithms": ["String Reversal", "Character Frequency Counting", "Array Concatenation"],
        "dataStructures": ["Arrays/Lists", "Strings"],
        "complexities": None,
        "problems": problems_by_week.get(3, []),
        "materials": materials_by_week.get(3, []),
        "quote": {
            "quote": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            "author": "Martin Fowler"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/codewithbakacommunity/6", "https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:23:59 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 4
    {
        "weekNumber": 4,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Problem-Solving Session: Arrays & Simulation",
        "description": "An intensive hands-on problem-solving session designed to test fundamentals through practical algorithmic challenges on LeetCode and Codeforces without lectures.",
        "sourceDays": [4],
        "learningObjectives": [
            "Deconstruct non-trivial problem statements into algorithmic steps.",
            "Handle edge cases and array monotonicity checks with minimal auxiliary space.",
            "Navigate Codeforces problem constraints, I/O formats, and submission guidelines.",
            "Debug failing test cases methodically under timed conditions."
        ],
        "concepts": [
            {
                "name": "Problem Decomposition",
                "description": "Breaking down wordy problem statements into discrete logical rules and edge case tests.",
                "complexity": None
            },
            {
                "name": "Array Monotonicity Verification",
                "description": "Checking if array elements are non-decreasing with at most one allowable modification.",
                "complexity": None
            },
            {
                "name": "Keyboard Row Character Mapping",
                "description": "Using character sets to verify if words can be typed using a single keyboard row.",
                "complexity": None
            }
        ],
        "algorithms": ["Non-decreasing Array Modification", "String Length Filtering & Abbreviation"],
        "dataStructures": ["Arrays/Lists", "Strings", "Sets"],
        "complexities": None,
        "problems": problems_by_week.get(4, []),
        "materials": materials_by_week.get(4, []),
        "quote": None,
        "source": {
            "author": "baka Codes",
            "telegramUrls": ["https://t.me/codewithbakacommunity/6", "https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:23:59 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 5
    {
        "weekNumber": 5,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Data Structure Basics: Lists & Tuples (+ Saturday Contest 1)",
        "description": "Explores Python lists and immutable tuples, list comprehensions, indexing/slicing mechanics, and incorporates Saturday Contest 1 competitive programming problems.",
        "sourceDays": [5],
        "learningObjectives": [
            "Master Python list operations: creation, indexing, negative slicing, and in-place methods.",
            "Write idiomatic Python list comprehensions for concise array transformations.",
            "Understand tuple immutability and memory optimization.",
            "Participate in timed 2-hour competitive programming contests and evaluate rankings."
        ],
        "concepts": [
            {
                "name": "Python Lists",
                "description": "Dynamic arrays supporting random access, slicing, and mutable list operations.",
                "complexity": None
            },
            {
                "name": "List Comprehensions",
                "description": "Concise syntax for creating lists based on existing iterables with inline filtering.",
                "complexity": None
            },
            {
                "name": "Python Tuples",
                "description": "Immutable sequence data structures used for fixed collections and dictionary keys.",
                "complexity": None
            },
            {
                "name": "Contest Problem-Solving",
                "description": "Solving timed competitive programming problems under strict time and memory limits.",
                "complexity": None
            }
        ],
        "algorithms": ["Array Permutation Mapping", "Maximum Product Selection", "Greedy Character Deletion", "Parity Division"],
        "dataStructures": ["Lists", "Tuples", "Strings"],
        "complexities": None,
        "problems": problems_by_week.get(5, []),
        "materials": materials_by_week.get(5, []),
        "quote": {
            "quote": "A boat doesn’t go forward if each one is rowing their own way.",
            "author": "Swahili Proverb"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/codewithbakacommunity/6", "https://t.me/bakacodes"],
            "dates": ["05.02.2025 09:50:11 UTC+03:00", "14.08.2026 10:23:59 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 6
    {
        "weekNumber": 6,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Soft Skills: Focus, Planning & Time Management",
        "description": "A dedicated soft-skills unit focusing on deep concentration, personal planning roadmaps, time management strategies, and community collaboration.",
        "sourceDays": [6],
        "learningObjectives": [
            "Build deep work habits to eliminate distractions during intensive problem-solving.",
            "Design realistic study schedules and interview preparation roadmaps.",
            "Apply time-boxing to maximize daily practice output without burnout.",
            "Solve complex string and array state simulation problems."
        ],
        "concepts": [
            {
                "name": "Deep Focus",
                "description": "Concentrating on challenging algorithmic tasks without context switching.",
                "complexity": None
            },
            {
                "name": "Goal Planning Roadmaps",
                "description": "Creating structured milestones for mastering DSA topics and interview readiness.",
                "complexity": None
            },
            {
                "name": "Time Management",
                "description": "Prioritizing high-yield learning activities and eliminating time-wasting habits.",
                "complexity": None
            },
            {
                "name": "Source Code Parsing Simulation",
                "description": "Simulating a state machine to parse and strip single-line and multi-line comments from code.",
                "complexity": None
            }
        ],
        "algorithms": ["State Machine String Parsing", "Query-based Array Value Updates"],
        "dataStructures": ["Lists", "Strings"],
        "complexities": None,
        "problems": problems_by_week.get(6, []),
        "materials": materials_by_week.get(6, []),
        "quote": {
            "quote": "Until you make the unconscious conscious, it will rule your life and you will call it fate.",
            "author": "Carl Jung"
        },
        "source": {
            "author": "baka Codes",
            "telegramUrls": ["https://t.me/codewithbakacommunity/6", "https://t.me/bakacodes"],
            "dates": ["07.02.2025 10:21:53 UTC+03:00", "14.08.2026 10:23:59 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 7
    {
        "weekNumber": 7,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Data Structure Basics: Sets & Dictionaries",
        "description": "Covers Python hash-based data structures (Sets and Dictionaries), their internal mechanics, valid key types, $O(1)$ lookups, and practical frequency tracking.",
        "sourceDays": [7],
        "learningObjectives": [
            "Understand hash table mechanics, hashability rules, and collision resolution principles.",
            "Leverage Python Sets for $O(1)$ membership testing and duplicate removal.",
            "Use Python Dictionaries for key-value mappings, frequency tables, and index transformation.",
            "Solve medium-difficulty array problems using mathematical index shifts and hash maps."
        ],
        "concepts": [
            {
                "name": "Python Sets",
                "description": "Unordered collections of unique hashable elements providing O(1) average lookup, insertion, and deletion.",
                "complexity": "O(1) average"
            },
            {
                "name": "Python Dictionaries",
                "description": "Key-value hash map data structure supporting fast key-based retrieval and mutation.",
                "complexity": "O(1) average"
            },
            {
                "name": "Hashability & Valid Operators",
                "description": "Rules governing immutable keys (strings, numbers, tuples) versus mutable objects (lists, sets).",
                "complexity": None
            },
            {
                "name": "Difference Transform Pattern",
                "description": "Transforming equation a[j] - a[i] = j - i into a[j] - j = a[i] - i to solve with hash maps in linear time.",
                "complexity": "O(n)"
            }
        ],
        "algorithms": ["Duplicate Detection", "Missing Number Identification", "Index-Value Difference Caching"],
        "dataStructures": ["Sets", "Dictionaries (Hash Maps)", "Arrays"],
        "complexities": None,
        "problems": problems_by_week.get(7, []),
        "materials": materials_by_week.get(7, []),
        "quote": {
            "quote": "Success is neither magical nor mysterious. Success is the natural consequence of consistently applying the basic fundamentals.",
            "author": "Jim Rohn"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/codewithbakacommunity/6"],
            "dates": ["14.08.2026 10:23:59 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 8
    {
        "weekNumber": 8,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Contest Analysis & Upsolving Strategies",
        "description": "A dedicated session on contest review, peer walkthroughs, failure point analysis, and upsolving challenging multi-variable problems.",
        "sourceDays": [8],
        "learningObjectives": [
            "Implement a consistent upsolving routine to solve 100% of missed contest problems.",
            "Analyze and articulate algorithmic trade-offs through peer code presentations.",
            "Apply sorted-tuple key hashing to group anagrams in linearithmic time.",
            "Reduce 4-variable search spaces ($O(n^4)$) to quadratic time ($O(n^2)$) using two-phase hash tables."
        ],
        "concepts": [
            {
                "name": "Contest Upsolving Methodology",
                "description": "Disciplined habit of analyzing and implementing solutions for all unsolved contest problems.",
                "complexity": None
            },
            {
                "name": "Peer Code Analysis",
                "description": "Walking through problem comprehension, alternative approaches, and implementation trade-offs.",
                "complexity": None
            },
            {
                "name": "Anagram Grouping via Canonical Keys",
                "description": "Using sorted character strings or 26-element frequency tuples as hash map keys.",
                "complexity": "O(N * K log K) or O(N * K)"
            },
            {
                "name": "Two-Phase Hash Table Pair Sums",
                "description": "Splitting 4 arrays into two pairs of 2, precomputing pairwise sums in O(n²) to achieve O(n²) total time.",
                "complexity": "O(n²)"
            }
        ],
        "algorithms": ["Anagram Hashing", "Pairwise Sum Precomputation (4Sum II)", "Character Frequency Matching"],
        "dataStructures": ["Hash Maps", "Hash Sets", "Arrays"],
        "complexities": None,
        "problems": problems_by_week.get(8, []),
        "materials": materials_by_week.get(8, []),
        "quote": None,
        "source": {
            "author": "baka Codes",
            "telegramUrls": ["https://t.me/codewithbaka"],
            "dates": ["14.08.2026 10:23:59 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 9
    {
        "weekNumber": 9,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Python Built-in Functions & Object-Oriented Classes",
        "description": "Explores Python built-in utilities (zip, enumerate, map, filter, sorted), object-oriented programming with classes, dunder methods, and common pitfalls.",
        "sourceDays": [9],
        "learningObjectives": [
            "Effectively use built-in functions: zip(), enumerate(), map(), filter(), sorted(), min(), and max().",
            "Define custom classes with __init__, self, instance attributes, and magic methods (__str__, __len__, __eq__).",
            "Avoid critical Python pitfalls: mutable default arguments and modifying collections during iteration.",
            "Implement Moore's Voting Algorithm for linear-time majority element detection with $O(1)$ space."
        ],
        "concepts": [
            {
                "name": "Python Built-in Functional Utilities",
                "description": "Leveraging zip(), enumerate(), map(), filter(), and sorted() for clean functional data transformations.",
                "complexity": None
            },
            {
                "name": "Object-Oriented Programming (OOP)",
                "description": "Creating reusable classes, encapsulating state, and defining instance methods.",
                "complexity": None
            },
            {
                "name": "Magic (Dunder) Methods",
                "description": "Overloading built-in operations using __str__, __repr__, __len__, and __eq__.",
                "complexity": None
            },
            {
                "name": "Mutable Default Arguments Pitfall",
                "description": "Understanding why default arguments like def fn(x=[]) persist across function calls and how to use None defaults.",
                "complexity": None
            }
        ],
        "algorithms": ["Boyer-Moore Voting Algorithm", "Custom Comparator Sorting", "String Alternation", "Hierarchical Domain Counting"],
        "dataStructures": ["Classes", "Dictionaries", "Lists", "Tuples"],
        "complexities": None,
        "problems": problems_by_week.get(9, []),
        "materials": materials_by_week.get(9, []),
        "quote": {
            "quote": "The difference between ordinary and extraordinary is that little extra. Add a touch of class to everything you do.",
            "author": "Jimmy Johnson"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["12.02.2025 09:33:38 UTC+03:00", "14.08.2026 10:23:59 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 10
    {
        "weekNumber": 10,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Asymptotic Analysis: Time & Space Complexity",
        "description": "Establishes formal theoretical principles for analyzing algorithm efficiency using Big-O notation, time-space trade-offs, and memory complexity.",
        "sourceDays": [10],
        "learningObjectives": [
            "Understand asymptotic growth rates: $O(1)$, $O(\\log n)$, $O(n)$, $O(n \\log n)$, $O(n^2)$, $O(2^n)$, $O(n!)$.",
            "Calculate both Time and Auxiliary Space complexities for iterative and recursive algorithms.",
            "Analyze time vs. space trade-offs when optimizing brute-force solutions.",
            "Solve array and string problems with optimal in-place index manipulation."
        ],
        "concepts": [
            {
                "name": "Big-O Notation & Asymptotic Bounds",
                "description": "Mathematical framework describing the limiting behavior of execution time or memory as input size grows.",
                "complexity": "O(1) to O(n!)"
            },
            {
                "name": "Time vs. Space Trade-offs",
                "description": "Balancing auxiliary memory usage (e.g. hash tables) to reduce algorithmic time complexity.",
                "complexity": None
            },
            {
                "name": "In-place Array Index Negation",
                "description": "Using element values as indices and negating values in-place to find duplicates in O(n) time and O(1) space.",
                "complexity": "O(n) time, O(1) space"
            }
        ],
        "algorithms": ["In-place Duplicate Finding", "Monotonic Array Verification", "Character Frequency Balancing"],
        "dataStructures": ["Arrays", "Hash Tables"],
        "complexities": {
            "ordersOfGrowth": ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)", "O(2^n)", "O(n!)"]
        },
        "problems": problems_by_week.get(10, []),
        "materials": materials_by_week.get(10, []),
        "quote": {
            "quote": "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
            "author": "Richard Feynman"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:23:59 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 11
    {
        "weekNumber": 11,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "The 7 Steps of Highly Effective Problem Solving",
        "description": "Introduces A2SV's core structured methodology for approaching any algorithmic problem from initial reading through optimization and validation.",
        "sourceDays": [11],
        "learningObjectives": [
            "Master the 7-Step A2SV Problem Solving Framework.",
            "Perform disciplined constraint and edge-case analysis before writing code.",
            "Design and analyze brute-force baselines prior to applying algorithmic optimizations.",
            "Dry-run logic against tricky edge cases to eliminate bugs before submission."
        ],
        "concepts": [
            {
                "name": "The 7 Steps Framework",
                "description": "1. Understand Problem, 2. Identify Constraints & Edge Cases, 3. Develop Brute Force, 4. Optimize Complexity, 5. Dry Run Test Cases, 6. Write Clean Code, 7. Review & Test.",
                "complexity": None
            },
            {
                "name": "Pigeonhole Principle in Problem Solving",
                "description": "Grouping identical answers and applying ceil division to compute minimum entity counts.",
                "complexity": "O(n)"
            },
            {
                "name": "Interval Coverage Check",
                "description": "Tracking covered ranges using boolean arrays or sorting intervals to verify continuous integer spans.",
                "complexity": "O(n)"
            }
        ],
        "algorithms": ["Interval Coverage Verification", "Pigeonhole Greedy Grouping (Rabbits in Forest)"],
        "dataStructures": ["Arrays", "Hash Maps"],
        "complexities": None,
        "problems": problems_by_week.get(11, []),
        "materials": materials_by_week.get(11, []),
        "quote": {
            "quote": "Practice doesn't make perfect, perfect practice makes perfect.",
            "author": "Vince Lombardi"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 12
    {
        "weekNumber": 12,
        "phase": "foundation",
        "phaseName": "Foundation",
        "title": "Problem-Solving Consolidation: Python Data Structures & Math",
        "description": "A comprehensive consolidation session applying all Foundation phase concepts (lists, sets, maps, classes, Big-O, 7-steps) to diverse challenge problems.",
        "sourceDays": [12],
        "learningObjectives": [
            "Synthesize Python data structures to solve mixed algorithmic problems.",
            "Apply mathematical digit simulation and digital root concepts ($O(1)$ math vs $O(\\log n)$ loops).",
            "Utilize character frequency counting and bitwise XOR for difference detection.",
            "Consolidate foundation knowledge in preparation for Core DSA (Phase 1)."
        ],
        "concepts": [
            {
                "name": "Digital Root & Math Simulation",
                "description": "Iterative digit summing versus the O(1) mathematical formula: 1 + (num - 1) % 9.",
                "complexity": "O(1) or O(log n)"
            },
            {
                "name": "Character Frequency Validation",
                "description": "Checking subset counts using collections.Counter or fixed-size 26-element arrays.",
                "complexity": "O(n)"
            },
            {
                "name": "XOR Difference Detection",
                "description": "Finding the single added character across two strings by XORing all character ordinals.",
                "complexity": "O(n) time, O(1) space"
            }
        ],
        "algorithms": ["Digital Root Computation", "Frequency Mapping", "Bitwise Character Difference Search"],
        "dataStructures": ["Hash Maps", "Strings", "Integers"],
        "complexities": None,
        "problems": problems_by_week.get(12, []),
        "materials": materials_by_week.get(12, []),
        "quote": None,
        "source": {
            "author": "baka Codes",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 13
    {
        "weekNumber": 13,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Array & List Operations (+ Saturday Contest 2)",
        "description": "Launches Phase 1 (Core DSA) with sequential memory structures, dynamic array resizing, in-place array mutation, and Saturday Contest 2 problems.",
        "sourceDays": [13],
        "learningObjectives": [
            "Understand sequential memory layout, cache locality, and $O(1)$ random access in arrays.",
            "Analyze dynamic array growth amortized $O(1)$ append vs. $O(n)$ insertion/deletion costs.",
            "Perform in-place array operations without extra space.",
            "Solve competitive programming contest problems involving simulation, greed, and sorting."
        ],
        "concepts": [
            {
                "name": "Contiguous Memory & Random Access",
                "description": "Array elements stored in adjacent memory addresses enabling direct O(1) index calculations.",
                "complexity": "O(1) access"
            },
            {
                "name": "Dynamic Array Resizing",
                "description": "Geometric resizing factors that yield amortized O(1) append operations.",
                "complexity": "O(1) amortized"
            },
            {
                "name": "Two-Pointer Zero Compaction",
                "description": "Shifting non-zero elements forward in-place while preserving relative order.",
                "complexity": "O(n) time, O(1) space"
            }
        ],
        "algorithms": ["In-place Array Shifting", "Relative Ordering Sort", "Arbitrary-Precision Increment Simulation", "Contest Grid Simulation"],
        "dataStructures": ["Arrays / Dynamic Lists", "Hash Maps"],
        "complexities": {
            "randomAccess": "O(1)",
            "appendAmortized": "O(1)",
            "insertOrDelete": "O(n)",
            "search": "O(n)"
        },
        "problems": problems_by_week.get(13, []),
        "materials": materials_by_week.get(13, []),
        "quote": {
            "quote": "If you want to enjoy the rainbow, be prepared to endure the storm.",
            "author": "Warren W. Wiersbe"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 14
    {
        "weekNumber": 14,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Matrices & 2D Grid Traversals",
        "description": "Covers two-dimensional array representations, row-major vs. column-major layouts, diagonal traversals, matrix transformations, and boundary edge cases.",
        "sourceDays": [14],
        "learningObjectives": [
            "Master 2D array coordinates, nested indexing (`matrix[row][col]`), and memory organization.",
            "Implement row-major, column-major, main-diagonal, and anti-diagonal traversals.",
            "Perform in-place matrix transformations: transposition, horizontal flipping, and dimension reshaping.",
            "Safely navigate non-square $M \\times N$ grids and handle empty/single-row boundary cases."
        ],
        "concepts": [
            {
                "name": "2D Grid Coordinates & Indexing",
                "description": "Representing grid planes where row r ranges [0, R-1] and col c ranges [0, C-1].",
                "complexity": None
            },
            {
                "name": "Matrix Transposition",
                "description": "Swapping matrix[r][c] with matrix[c][r] to swap rows and columns.",
                "complexity": "O(R * C)"
            },
            {
                "name": "Diagonal Invariant Properties",
                "description": "Main diagonals have constant r - c values; anti-diagonals have constant r + c values.",
                "complexity": "O(R * C)"
            },
            {
                "name": "Matrix Reshaping",
                "description": "Mapping 2D coordinates to 1D index (r * C + c) and back to new 2D dimensions.",
                "complexity": "O(R * C)"
            }
        ],
        "algorithms": ["Matrix Transposition", "Horizontal Inversion & In-place Bit Inversion", "Matrix Reshaping", "Diagonal Sum Accumulation"],
        "dataStructures": ["2D Arrays / Matrices"],
        "complexities": {
            "matrixTraversal": "O(m * n)",
            "auxiliarySpace": "O(1) in-place or O(m * n) for new matrix"
        },
        "problems": problems_by_week.get(14, []),
        "materials": materials_by_week.get(14, []),
        "quote": {
            "quote": "If you want to enjoy the rainbow, be prepared to endure the storm.",
            "author": "Warren W. Wiersbe"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 15
    {
        "weekNumber": 15,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Elementary Sorting Algorithms",
        "description": "Examines foundational comparison-based sorts (Bubble, Selection, Insertion) and non-comparison Counting Sort, analyzing stability, in-place memory, and Big-O bounds.",
        "sourceDays": [15],
        "learningObjectives": [
            "Understand sorting classifications: comparison vs. non-comparison, stability, and in-place memory.",
            "Implement Bubble Sort, Selection Sort, and Insertion Sort from first principles.",
            "Implement Counting Sort in $O(n + k)$ linear time for bounded integer domains.",
            "Apply sorting mechanics to solve Dutch National Flag (Sort Colors) and rank-reduction problems."
        ],
        "concepts": [
            {
                "name": "Sorting Stability",
                "description": "Preserving the relative order of duplicate elements in the sorted output.",
                "complexity": None
            },
            {
                "name": "Bubble Sort",
                "description": "Repeatedly stepping through list, swapping adjacent out-of-order elements.",
                "complexity": "O(n²)"
            },
            {
                "name": "Selection Sort",
                "description": "Finding minimum element from unsorted portion and swapping to sorted prefix.",
                "complexity": "O(n²)"
            },
            {
                "name": "Insertion Sort",
                "description": "Building sorted array one element at a time by inserting into correct position.",
                "complexity": "O(n²)"
            },
            {
                "name": "Counting Sort",
                "description": "Non-comparison sorting that counts key occurrences to place elements directly.",
                "complexity": "O(n + k)"
            }
        ],
        "algorithms": ["Bubble Sort", "Selection Sort", "Insertion Sort", "Counting Sort", "Dutch National Flag (3-Way Partition)"],
        "dataStructures": ["Arrays"],
        "complexities": {
            "bubbleSort": "O(n²)",
            "selectionSort": "O(n²)",
            "insertionSort": "O(n²)",
            "countingSort": "O(n + k)"
        },
        "problems": problems_by_week.get(15, []),
        "materials": materials_by_week.get(15, []),
        "quote": {
            "quote": "In the short term, you are as good as your intensity. In the long term you are only as good as your consistency.",
            "author": "Shane Parrish"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 16
    {
        "weekNumber": 16,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Sorting Consolidation & Time Complexity Comparison",
        "description": "Compares Best, Average, and Worst-case complexities of elementary sorts, exploring adaptive optimizations and custom comparator ordering.",
        "sourceDays": [16],
        "learningObjectives": [
            "Compare Best, Average, and Worst case runtimes across Bubble, Selection, Insertion, and Counting sorts.",
            "Identify when Insertion Sort achieves $O(n)$ linear time on nearly-sorted data.",
            "Implement custom string concatenation comparators (e.g. comparing $A+B$ vs $B+A$ for Largest Number).",
            "Apply greedy coin-picking strategies using reverse sorted arrays."
        ],
        "concepts": [
            {
                "name": "Asymptotic Complexity Comparison",
                "description": "Rigorous comparison table of best/avg/worst runtimes for elementary sorting algorithms.",
                "complexity": None
            },
            {
                "name": "Adaptive Sorting",
                "description": "Algorithms like optimized Bubble Sort with swap flags and Insertion Sort that run in O(n) on sorted data.",
                "complexity": "O(n) best case"
            },
            {
                "name": "Custom Comparator Ordering",
                "description": "Defining custom sorting transitivity rules (e.g. lambda x, y: cmp(y+x, x+y)) to arrange maximum numeric strings.",
                "complexity": "O(n log n)"
            }
        ],
        "algorithms": ["Custom String Concatenation Sorting", "Greedy Triplet Selection", "Anagram Frequency Verification"],
        "dataStructures": ["Arrays", "Strings"],
        "complexities": {
            "bubbleSort": {"best": "O(n)", "average": "O(n²)", "worst": "O(n²)"},
            "selectionSort": {"best": "O(n²)", "average": "O(n²)", "worst": "O(n²)"},
            "insertionSort": {"best": "O(n)", "average": "O(n²)", "worst": "O(n²)"},
            "countingSort": {"best": "O(n + k)", "average": "O(n + k)", "worst": "O(n + k)"}
        },
        "problems": problems_by_week.get(16, []),
        "materials": materials_by_week.get(16, []),
        "quote": None,
        "source": {
            "author": "baka Codes",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 17
    {
        "weekNumber": 17,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Two Pointers Technique",
        "description": "Replaces nested loop $O(n^2)$ brute forces with linear $O(n)$ scans using converging (opposite-direction) and fast-slow (same-direction) pointer patterns.",
        "sourceDays": [17],
        "learningObjectives": [
            "Master Two Pointers to solve search and optimization problems in $O(n)$ time and $O(1)$ space.",
            "Implement Converging Pointers: moving from left and right boundaries inward (Two Sum II, Container With Most Water).",
            "Implement Fast-Slow Pointers: modifying arrays in-place while maintaining read/write indices.",
            "Extend Two Pointers to solve 3Sum in $O(n^2)$ time with duplicate avoidance."
        ],
        "concepts": [
            {
                "name": "Two Pointers Paradigm",
                "description": "Iterating over sequences using two synchronized indices to reduce quadratic search spaces to linear time.",
                "complexity": "O(n)"
            },
            {
                "name": "Converging Pointers Pattern",
                "description": "Left and right pointers starting at opposite array ends, moving inward based on comparison with target.",
                "complexity": "O(n)"
            },
            {
                "name": "Greedy Boundary Squeezing",
                "description": "In Container With Most Water, shifting the shorter line inward because moving the taller line can never increase area.",
                "complexity": "O(n)"
            },
            {
                "name": "Duplicate Avoidance in K-Sum",
                "description": "Skipping adjacent identical values to ensure unique combinatorial solution sets.",
                "complexity": "O(n²)"
            }
        ],
        "algorithms": ["Sorted Array Two Sum ($O(n)$)", "Container With Most Water Area Maximization", "In-place Array Compaction", "3Sum Algorithm ($O(n^2)$)"],
        "dataStructures": ["Arrays", "Strings"],
        "complexities": {
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)"
        },
        "problems": problems_by_week.get(17, []),
        "materials": materials_by_week.get(17, []),
        "quote": {
            "quote": "There are no foolish questions, and no man becomes a fool until he has stopped asking questions",
            "author": "Charles Proteus Steinmetz"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 18
    {
        "weekNumber": 18,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Sliding Window Technique",
        "description": "Processes contiguous subarrays and substrings in linear $O(n)$ time using Fixed-Size and Dynamic (Variable-Size) window expansion and contraction.",
        "sourceDays": [18],
        "learningObjectives": [
            "Master Sliding Window to avoid $O(n^2)$ or $O(n \\cdot k)$ redundant subarray scans.",
            "Implement Fixed-Size Sliding Windows: maintain running window state by adding the right element and removing the leftmost element.",
            "Implement Variable-Size Sliding Windows: expand right pointer until an invariant is violated, then contract left pointer.",
            "Track character and element frequencies using hash tables inside dynamic windows."
        ],
        "concepts": [
            {
                "name": "Sliding Window Paradigm",
                "description": "Maintaining a continuous range [left, right] over an array or string that shifts or resizes dynamically.",
                "complexity": "O(n)"
            },
            {
                "name": "Fixed-Size Window Invariant",
                "description": "Window size remains exactly k; updates take O(1) per step by subtracting arr[i-k] and adding arr[i].",
                "complexity": "O(n) time, O(1) space"
            },
            {
                "name": "Dynamic Window Expansion & Contraction",
                "description": "Expanding right pointer to include elements, contracting left pointer when constraints (e.g. distinct count > k) are exceeded.",
                "complexity": "O(n) amortized"
            }
        ],
        "algorithms": ["Maximum Average Subarray", "Longest Substring Without Repeating Characters", "Fruit Into Baskets (K Distinct Elements)", "Max Consecutive Ones III", "Minimum Size Subarray Sum"],
        "dataStructures": ["Arrays", "Strings", "Hash Maps", "Hash Sets"],
        "complexities": {
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(k) or O(1)"
        },
        "problems": problems_by_week.get(18, []),
        "materials": materials_by_week.get(18, []),
        "quote": {
            "quote": "Your big opportunity may be right where you are now. Open your eyes, and you'll find it in your windows.",
            "author": "Napoleon Hill"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 19
    {
        "weekNumber": 19,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Prefix Sum Technique",
        "description": "Transforms $O(n)$ range sum queries into instantaneous $O(1)$ evaluations using precomputed cumulative sum arrays, combined with hash maps for subarray targets.",
        "sourceDays": [19],
        "learningObjectives": [
            "Understand cumulative prefix sum mechanics: $P[i] = P[i-1] + arr[i-1]$.",
            "Execute range sum queries in $O(1)$ time: $\\text{sum}(L, R) = P[R+1] - P[L]$.",
            "Combine prefix sums with hash maps to find subarrays with target sum $K$ in $O(n)$ time.",
            "Implement prefix and suffix product arrays to solve Product of Array Except Self without division."
        ],
        "concepts": [
            {
                "name": "Prefix Sum Precomputations",
                "description": "Pre-calculating cumulative totals in O(n) time to answer arbitrary range sum queries in O(1).",
                "complexity": "O(n) build, O(1) query"
            },
            {
                "name": "Prefix Sum + Hash Map Technique",
                "description": "Storing prefix sum frequencies in a map; if (current_sum - target) exists in map, a valid subarray ending at current index exists.",
                "complexity": "O(n) time, O(n) space"
            },
            {
                "name": "Prefix & Suffix Accumulator Arrays",
                "description": "Multiplying prefix products from the left and suffix products from the right to compute array products excluding index i.",
                "complexity": "O(n) time, O(1) auxiliary space"
            }
        ],
        "algorithms": ["1D Range Sum Query", "Subarray Sum Equals K ($O(n)$)", "Continuous Subarray Sum Modulo K", "Product of Array Except Self ($O(n)$)"],
        "dataStructures": ["Arrays", "Hash Maps"],
        "complexities": {
            "preprocessingTime": "O(n)",
            "queryTime": "O(1)",
            "spaceComplexity": "O(n)"
        },
        "problems": problems_by_week.get(19, []),
        "materials": materials_by_week.get(19, []),
        "quote": {
            "quote": "By failing to prepare, you are preparing to fail.",
            "author": "Benjamin Franklin"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 20
    {
        "weekNumber": 20,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Singly Linked Lists",
        "description": "Introduces pointer-based non-contiguous node data structures (`Node(val, next)`), head/tail insertion, node deletion, traversal, and the dummy node pattern.",
        "sourceDays": [20],
        "learningObjectives": [
            "Understand singly linked list node structure and pointer reference mechanics in memory.",
            "Implement core operations: traversal, insertion at head/tail/position, and node deletion.",
            "Master the Sentinel / Dummy Head Node pattern to handle edge cases cleanly.",
            "Merge two sorted linked lists and reorder nodes (odd-even indices) using pointer manipulation."
        ],
        "concepts": [
            {
                "name": "Linked List Node Structure",
                "description": "Non-contiguous dynamic structures consisting of a value and a reference pointer to the next node.",
                "complexity": None
            },
            {
                "name": "Dummy / Sentinel Node Pattern",
                "description": "Creating an auxiliary dummy node before the head to avoid special null head handling during insertions and deletions.",
                "complexity": "O(1) space"
            },
            {
                "name": "Fast & Slow Pointers for Midpoint",
                "description": "Using slow (1 step) and fast (2 steps) pointers to locate list midpoint in a single pass.",
                "complexity": "O(n) time, O(1) space"
            }
        ],
        "algorithms": ["Linked List Traversal", "Node Deletion in $O(1)$ and $O(n)$", "Midpoint Finding (Fast & Slow Pointers)", "Merging Two Sorted Lists", "Odd-Even Node Segregation"],
        "dataStructures": ["Singly Linked List"],
        "complexities": {
            "accessTime": "O(n)",
            "searchTime": "O(n)",
            "insertHead": "O(1)",
            "insertMiddle": "O(n)",
            "deleteHead": "O(1)",
            "spaceComplexity": "O(n)"
        },
        "problems": problems_by_week.get(20, []),
        "materials": materials_by_week.get(20, []),
        "quote": {
            "quote": "If you fell down yesterday, stand up today.",
            "author": "H. G. Wells"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 21
    {
        "weekNumber": 21,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Advanced Linked Lists: Doubly Linked Lists & Fast/Slow Pointers",
        "description": "Covers Doubly Linked Lists, in-place list reversal, Floyd's cycle-finding algorithm (Tortoise and Hare), and cycle entry detection.",
        "sourceDays": [21],
        "learningObjectives": [
            "Master Doubly Linked Lists supporting bidirectional traversal via `prev` and `next` pointers.",
            "Reverse singly and doubly linked lists in-place in $O(n)$ time and $O(1)$ auxiliary memory.",
            "Implement Floyd's Cycle Detection Algorithm to detect cycles in linked lists.",
            "Derive the mathematical proof for finding the exact cycle entry node.",
            "Verify palindrome linked lists in $O(n)$ time and $O(1)$ space."
        ],
        "concepts": [
            {
                "name": "Doubly Linked List Mechanics",
                "description": "Nodes maintaining both next and previous pointer references for O(1) bidirectional deletions.",
                "complexity": "O(1) deletion with node ref"
            },
            {
                "name": "In-place Pointer Reversal",
                "description": "Iteratively reversing next pointers using prev, curr, and next_node variables.",
                "complexity": "O(n) time, O(1) space"
            },
            {
                "name": "Floyd's Cycle-Finding Algorithm",
                "description": "Tortoise and Hare algorithm: slow moves 1 step, fast moves 2 steps; if they meet, a cycle exists.",
                "complexity": "O(n) time, O(1) space"
            },
            {
                "name": "Cycle Origin Mathematical Derivation",
                "description": "Resetting one pointer to head after collision and advancing both by 1 step finds the cycle start.",
                "complexity": "O(n)"
            }
        ],
        "algorithms": ["In-place Linked List Reversal", "Floyd's Cycle Detection", "Cycle Entry Point Finding", "Palindrome Linked List Verification"],
        "dataStructures": ["Singly Linked List", "Doubly Linked List"],
        "complexities": {
            "reversalTime": "O(n)",
            "cycleDetectionTime": "O(n)",
            "auxiliarySpace": "O(1)"
        },
        "problems": problems_by_week.get(21, []),
        "materials": materials_by_week.get(21, []),
        "quote": {
            "quote": "If you fell down yesterday, stand up today.",
            "author": "H. G. Wells"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 22
    {
        "weekNumber": 22,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Stacks, Queues & Monotonicity Fundamentals",
        "description": "Covers LIFO Stack and FIFO Queue mechanics, $O(1)$ operations with collections.deque, stack/queue cross-emulation, and Min Stack design.",
        "sourceDays": [22],
        "learningObjectives": [
            "Master LIFO Stack operations: `push()`, `pop()`, `peek()`, `is_empty()` in $O(1)$ time.",
            "Master FIFO Queue operations: `enqueue()`, `dequeue()`, `front()`, `is_empty()` in $O(1)$ time.",
            "Understand why Python `list.pop(0)` is $O(n)$ and utilize `collections.deque` for $O(1)$ operations.",
            "Implement cross-structure emulation: queues using two stacks and stacks using queues.",
            "Design a Min Stack supporting $O(1)$ `getMin()` retrieval."
        ],
        "concepts": [
            {
                "name": "LIFO Stack Principle",
                "description": "Last In, First Out data structure; elements are inserted and removed from the same top end.",
                "complexity": "O(1) all operations"
            },
            {
                "name": "FIFO Queue Principle",
                "description": "First In, First Out data structure; elements are inserted at rear and removed from front.",
                "complexity": "O(1) all operations"
            },
            {
                "name": "Python `collections.deque`",
                "description": "Doubly linked list-based queue supporting O(1) appends and pops from both ends.",
                "complexity": "O(1) both ends"
            },
            {
                "name": "Min Stack Auxiliary Tracking",
                "description": "Maintaining a parallel minimum stack or storing (val, current_min) tuples to retrieve minimum in O(1).",
                "complexity": "O(1) time, O(n) space"
            }
        ],
        "algorithms": ["Parentheses Matching & Bracket Validation", "Queue Simulation Using Two Stacks", "Stack Simulation Using Queue", "Min Stack State Tracking"],
        "dataStructures": ["Stacks", "Queues", "Double-Ended Queues (Deque)"],
        "complexities": {
            "stackPush": "O(1)",
            "stackPop": "O(1)",
            "stackPeek": "O(1)",
            "queueEnqueue": "O(1)",
            "queueDequeue": "O(1) with deque (O(n) with list)",
            "spaceComplexity": "O(n)"
        },
        "problems": problems_by_week.get(22, []),
        "materials": materials_by_week.get(22, []),
        "quote": {
            "quote": "Be the one for the Queue not in the Queue",
            "author": "Kanika Sarna"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 23
    {
        "weekNumber": 23,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Monotonic Stacks & Monotonic Queues",
        "description": "Explores the Monotonicity invariant, monotonic increasing/decreasing stacks/queues, amortized $O(n)$ analysis, and next greater/smaller element queries.",
        "sourceDays": [23],
        "learningObjectives": [
            "Understand the Monotonicity Invariant: keeping stack/queue elements strictly ordered.",
            "Implement Monotonic Stack for Next Greater Element and Daily Temperatures in $O(n)$ amortized time.",
            "Calculate maximum rectangular areas in histograms in $O(n)$ time using monotonic stacks.",
            "Implement Monotonic Deque for Sliding Window Maximum in $O(n)$ total time.",
            "Prove $O(1)$ amortized complexity: every element is pushed and popped at most once."
        ],
        "concepts": [
            {
                "name": "Monotonic Stack Invariant",
                "description": "Stack where elements are sorted (increasing or decreasing); popping violating elements before pushing.",
                "complexity": "O(n) total amortized"
            },
            {
                "name": "Monotonic Queue / Deque",
                "description": "Double-ended queue maintaining monotonic order by removing smaller elements from back and expired indices from front.",
                "complexity": "O(n) total amortized"
            },
            {
                "name": "Histogram Area Calculation",
                "description": "Finding left and right boundary limits for each bar using monotonic stack in linear time.",
                "complexity": "O(n) time, O(n) space"
            }
        ],
        "algorithms": ["Next Greater Element", "Daily Temperatures", "Largest Rectangle in Histogram", "Sliding Window Maximum ($O(n)$)", "132 Pattern Detection"],
        "dataStructures": ["Monotonic Stack", "Monotonic Deque"],
        "complexities": {
            "timeComplexity": "O(n) total (O(1) amortized per element)",
            "spaceComplexity": "O(n)"
        },
        "problems": problems_by_week.get(23, []),
        "materials": materials_by_week.get(23, []),
        "quote": {
            "quote": "Be the one for the Queue not in the Queue",
            "author": "Kanika Sarna"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 24
    {
        "weekNumber": 24,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Recursion Fundamentals & Call Stack Mechanics",
        "description": "Covers recursive problem decomposition (base case vs. recursive step), call stack frames, activation records, and logarithmic power calculations.",
        "sourceDays": [24],
        "learningObjectives": [
            "Deconstruct recursive functions into Base Cases and Recursive Steps.",
            "Understand the Call Stack: activation records, memory overhead, and stack overflow limits.",
            "Implement Binary Exponentiation (`Pow(x, n)`) in $O(\\log n)$ recursive time.",
            "Solve nested recursive string decoding (`Decode String`)."
        ],
        "concepts": [
            {
                "name": "Base Case vs. Recursive Step",
                "description": "Base case halts recursion; recursive step divides problem into self-similar subproblems.",
                "complexity": None
            },
            {
                "name": "Execution Call Stack Mechanics",
                "description": "Stack memory allocating activation records for parameters and return addresses for each call.",
                "complexity": "O(depth) memory"
            },
            {
                "name": "Binary Exponentiation (Divide & Conquer Power)",
                "description": "Computing x^n by squaring x^(n//2) in O(log n) recursive steps instead of O(n) multiplications.",
                "complexity": "O(log n) time"
            }
        ],
        "algorithms": ["Binary Exponentiation ($O(\\log n)$)", "Recursive Fibonacci", "Recursive String Reversal", "Power of Three Check", "Nested String Decoding"],
        "dataStructures": ["System Call Stack", "Recursion Tree"],
        "complexities": {
            "timeComplexity": "O(log n) for binary exp, O(n) for string decode",
            "spaceComplexity": "O(depth) due to call stack"
        },
        "problems": problems_by_week.get(24, []),
        "materials": materials_by_week.get(24, []),
        "quote": {
            "quote": "In order to understand recursion, one must first understand recursion.",
            "author": "Unknown"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 25
    {
        "weekNumber": 25,
        "phase": "phase_1",
        "phaseName": "Phase 1 — Core DSA",
        "title": "Binary Search & Search Space Reduction",
        "description": "Concludes Phase 1 with $O(\\log n)$ Divide & Conquer search in sorted arrays, boundary invariants, lower/upper bounds, and Binary Search on the Answer Space.",
        "sourceDays": [25],
        "learningObjectives": [
            "Master the Divide & Conquer search strategy to halve search spaces in $O(\\log n)$ time.",
            "Maintain loop invariants and safe midpoint calculation (`mid = left + (right - left) // 2`).",
            "Implement exact match, first/last occurrence, and boundary search patterns.",
            "Apply Binary Search on the Answer Space for optimization problems (Koko Eating Bananas)."
        ],
        "concepts": [
            {
                "name": "Binary Search Invariant",
                "description": "Halving search range each step based on monotonic property of sorted array or predicate.",
                "complexity": "O(log n)"
            },
            {
                "name": "Midpoint Overflow Prevention",
                "description": "Using left + (right - left) // 2 instead of (left + right) // 2 to avoid integer overflow.",
                "complexity": "O(1)"
            },
            {
                "name": "Binary Search on Answer Space",
                "description": "Searching monotonic feasibility function f(k) across answer domain [min_val, max_val].",
                "complexity": "O(n log(max - min))"
            }
        ],
        "algorithms": ["Classic Binary Search ($O(\\log n)$)", "First and Last Position Search", "Integer Square Root via Binary Search", "2D Matrix Binary Search", "Binary Search on Answer (Eating Speed Minimization)"],
        "dataStructures": ["Sorted Arrays"],
        "complexities": {
            "timeComplexity": "O(log n)",
            "spaceComplexity": "O(1) for iterative, O(log n) for recursive"
        },
        "problems": problems_by_week.get(25, []),
        "materials": materials_by_week.get(25, []),
        "quote": {
            "quote": "Believe you can and you're halfway there.",
            "author": "Theodore Roosevelt"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 26
    {
        "weekNumber": 26,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Tree Data Structures & Tree Traversals",
        "description": "Opens Phase 2 (Advanced DSA) with hierarchical tree structures, binary trees, depth/height properties, DFS traversals (Pre-order, In-order, Post-order), and BFS level-order.",
        "sourceDays": [26],
        "learningObjectives": [
            "Master hierarchical tree definitions: Root, Node, Edge, Leaf, Depth, Height, Subtree.",
            "Understand Binary Tree classifications: Full, Complete, Perfect, Degenerate.",
            "Implement recursive and iterative DFS tree traversals: Pre-order, In-order, Post-order.",
            "Implement BFS Level-order tree traversal using a FIFO queue.",
            "Compute maximum tree depth and evaluate symmetric / inverted trees."
        ],
        "concepts": [
            {
                "name": "Hierarchical Tree Terminology",
                "description": "Non-linear acyclic connected graph structure with a unique root node.",
                "complexity": None
            },
            {
                "name": "Depth-First Tree Traversals",
                "description": "Pre-order (Root, L, R), In-order (L, Root, R), and Post-order (L, R, Root) traversals.",
                "complexity": "O(n) time, O(h) space"
            },
            {
                "name": "Level-Order Tree Traversal (BFS)",
                "description": "Visiting nodes layer-by-layer using a FIFO queue.",
                "complexity": "O(n) time, O(w) space where w is max width"
            }
        ],
        "algorithms": ["Pre-order Traversal", "In-order Traversal", "Post-order Traversal", "Max Tree Depth Calculation", "Tree Inversion", "Symmetry Verification"],
        "dataStructures": ["Binary Trees", "Queues", "Stacks"],
        "complexities": {
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(h) where h is tree height (O(n) worst, O(log n) balanced)"
        },
        "problems": problems_by_week.get(26, []),
        "materials": materials_by_week.get(26, []),
        "quote": None,
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 27
    {
        "weekNumber": 27,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Binary Search Trees (BST) & Invariant Properties",
        "description": "Explores the BST invariant property, $O(h)$ search, insertion, and three-case node deletion (using in-order successors), tree validation, and lowest common ancestors.",
        "sourceDays": [27],
        "learningObjectives": [
            "Master the BST Invariant: left subtree $< node <$ right subtree.",
            "Implement BST Search, Insertion, and Deletion (0, 1, and 2 children with In-order Successor).",
            "Leverage the property that In-order Traversal of a BST produces strictly sorted output.",
            "Validate BST integrity using bounded recursive range checking `(low, high)`.",
            "Find Lowest Common Ancestor (LCA) in BST in $O(h)$ time."
        ],
        "concepts": [
            {
                "name": "BST Invariant Property",
                "description": "For every node, all left subtree values are strictly smaller, and all right subtree values are strictly greater.",
                "complexity": None
            },
            {
                "name": "BST Node Deletion",
                "description": "Handling cases: leaf node, single child, and two children (replacing with in-order successor).",
                "complexity": "O(h)"
            },
            {
                "name": "BST Range Validation",
                "description": "Checking node values against permissible (min_allowed, max_allowed) intervals.",
                "complexity": "O(n) time, O(h) space"
            }
        ],
        "algorithms": ["BST Search ($O(h)$)", "BST Insertion ($O(h)$)", "BST Node Deletion ($O(h)$)", "BST Validation", "BST Lowest Common Ancestor ($O(h)$)"],
        "dataStructures": ["Binary Search Tree (BST)"],
        "complexities": {
            "searchTime": "O(h) → O(log n) balanced, O(n) skewed",
            "insertTime": "O(h)",
            "deleteTime": "O(h)",
            "traversalTime": "O(n)",
            "spaceComplexity": "O(h)"
        },
        "problems": problems_by_week.get(27, []),
        "materials": materials_by_week.get(27, []),
        "quote": {
            "quote": "A tree with strong roots laughs at storms.",
            "author": "Malay Proverb"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 28
    {
        "weekNumber": 28,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Advanced Recursion: Backtracking & Divide and Conquer",
        "description": "Covers combinatorial search, State-Space tree exploration, feasibility pruning (Choose-Explore-Unchoose), Subsets, Permutations, Combinations, and N-Queens.",
        "sourceDays": [28],
        "learningObjectives": [
            "Master Backtracking pattern: Choose $\\to$ Explore (Recurse) $\\to$ Un-choose (Backtrack).",
            "Apply State-Space tree pruning to avoid exploring infeasible subtrees.",
            "Generate combinatorial outputs: Subsets ($O(2^n)$), Permutations ($O(n!)$), and Combinations ($O(\\binom{n}{k})$).",
            "Solve constraint satisfaction problems (N-Queens) with diagonal and column conflict tracking."
        ],
        "concepts": [
            {
                "name": "Backtracking Paradigm",
                "description": "Systematic depth-first search of solution spaces that abandons invalid candidate paths immediately upon constraint violation.",
                "complexity": "Exponential / Factorial"
            },
            {
                "name": "State-Space Tree Pruning",
                "description": "Using boolean flags or bitmasks to skip invalid choices before making recursive calls.",
                "complexity": None
            },
            {
                "name": "Combinatorial Generation",
                "description": "Constructing subsets (power set) and permutations systematically via recursion.",
                "complexity": "O(2^n) or O(n!)"
            }
        ],
        "algorithms": ["Subsets Generation ($O(2^n)$)", "Permutations Generation ($O(n!)$)", "Combinations Generation", "N-Queens Puzzle Solver", "Divide & Conquer Sorting"],
        "dataStructures": ["Recursion Tree", "State Lists", "Hash Sets"],
        "complexities": {
            "subsetsTime": "O(2^n)",
            "permutationsTime": "O(n!)",
            "spaceComplexity": "O(n) recursion stack"
        },
        "problems": problems_by_week.get(28, []),
        "materials": materials_by_week.get(28, []),
        "quote": {
            "quote": "The bad news is time flies. The good news is you’re the pilot.",
            "author": "Michael Altshuler"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 29
    {
        "weekNumber": 29,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Graph Theory Fundamentals & Representations",
        "description": "Introduces Graph Theory terminology, directed/undirected edges, weighted/unweighted graphs, Adjacency Matrix vs. Adjacency List, node degrees, sources, and sinks.",
        "sourceDays": [29],
        "learningObjectives": [
            "Master Graph Theory definitions: Vertices ($V$), Edges ($E$), Directed/Undirected, Weighted/Unweighted, Connected Components.",
            "Implement Adjacency Matrix ($O(1)$ edge lookup, $O(V^2)$ memory) and Adjacency List ($O(V + E)$ memory).",
            "Convert between Adjacency Matrices and Adjacency Lists.",
            "Compute in-degrees, out-degrees, and identify Graph Sources and Sinks."
        ],
        "concepts": [
            {
                "name": "Graph Classifications",
                "description": "Directed vs Undirected, Weighted vs Unweighted, Cyclic vs Acyclic, Connected vs Disconnected components.",
                "complexity": None
            },
            {
                "name": "Adjacency Matrix",
                "description": "2D V x V array where matrix[u][v] indicates edge existence; optimal for dense graphs.",
                "complexity": "O(V²) space, O(1) edge check"
            },
            {
                "name": "Adjacency List",
                "description": "Array / dictionary of neighbor lists; optimal for sparse graphs.",
                "complexity": "O(V + E) space, O(deg(u)) edge check"
            },
            {
                "name": "Degrees, Sources & Sinks",
                "description": "In-degree (incoming edges), Out-degree (outgoing edges), Source (in=0), Sink (out=0).",
                "complexity": "O(V + E)"
            }
        ],
        "algorithms": ["Graph Matrix-to-List Conversion", "Degree Computation", "Star Graph Center Identification", "Source & Sink Detection"],
        "dataStructures": ["Graphs (Adjacency Matrix, Adjacency List, Edge List)"],
        "complexities": {
            "adjacencyListSpace": "O(V + E)",
            "adjacencyMatrixSpace": "O(V²)",
            "edgeLookupList": "O(deg(u))",
            "edgeLookupMatrix": "O(1)"
        },
        "problems": problems_by_week.get(29, []),
        "materials": materials_by_week.get(29, []),
        "quote": {
            "quote": "You can always recognize truth by its beauty and simplicity.",
            "author": "Richard P. Feynman"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 30
    {
        "weekNumber": 30,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Depth-First Search (DFS) & Graph Traversals",
        "description": "Covers graph DFS traversal using recursion and explicit stacks, visited set tracking, connected component counting, flood fill, and 2D grid graph traversal.",
        "sourceDays": [30],
        "learningObjectives": [
            "Master Depth-First Search (DFS) on graphs using recursion and explicit stacks.",
            "Maintain a `visited` set to prevent infinite loops in cyclic graphs.",
            "Model 2D grid matrices as implicit graphs with 4-directional or 8-directional neighbor transitions.",
            "Count connected components (Number of Islands, Number of Provinces) and solve Flood Fill.",
            "Analyze DFS complexities: $O(V + E)$ time and $O(V)$ space."
        ],
        "concepts": [
            {
                "name": "Graph DFS Paradigm",
                "description": "Traversing as deep as possible along each branch before backtracking.",
                "complexity": "O(V + E) time, O(V) space"
            },
            {
                "name": "Visited Set Management",
                "description": "Tracking visited vertices to avoid cycles and redundant processing.",
                "complexity": "O(1) lookup"
            },
            {
                "name": "Implicit 2D Grid Graphs",
                "description": "Treating matrix cells as vertices with edges between adjacent cells (r±1, c) and (r, c±1).",
                "complexity": "O(R * C)"
            },
            {
                "name": "Connected Components Counting",
                "description": "Iterating over all vertices, triggering a new DFS whenever an unvisited vertex is encountered.",
                "complexity": "O(V + E)"
            }
        ],
        "algorithms": ["Graph DFS ($O(V + E)$)", "Flood Fill Algorithm", "Number of Islands (Grid DFS)", "Max Area of Island", "Cycle Detection in Undirected Graphs"],
        "dataStructures": ["Graphs", "Call Stack", "Visited Hash Set"],
        "complexities": {
            "timeComplexity": "O(V + E)",
            "spaceComplexity": "O(V) for visited set + call stack"
        },
        "problems": problems_by_week.get(30, []),
        "materials": materials_by_week.get(30, []),
        "quote": {
            "quote": "Turn your face to the sun and the shadows fall behind you.",
            "author": "Maori Proverb"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 31
    {
        "weekNumber": 31,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Breadth-First Search (BFS) & Shortest Path in Unweighted Graphs",
        "description": "Covers level-order BFS exploration using FIFO queues, shortest path guarantees in unweighted graphs, multi-source BFS, and state-space transitions.",
        "sourceDays": [31],
        "learningObjectives": [
            "Master Breadth-First Search (BFS) using a FIFO queue (`collections.deque`).",
            "Understand why BFS guarantees the shortest path (minimum edge count) in unweighted graphs.",
            "Implement Multi-Source BFS: enqueuing multiple starting nodes simultaneously (Rotting Oranges, 01 Matrix).",
            "Solve state-space shortest path puzzles (Word Ladder, Open the Lock) in $O(V + E)$ time."
        ],
        "concepts": [
            {
                "name": "Graph BFS Paradigm",
                "description": "Exploring all neighbor vertices at the current depth before moving to nodes at the next depth level.",
                "complexity": "O(V + E)"
            },
            {
                "name": "Shortest Path Guarantee in Unweighted Graphs",
                "description": "The first time a target vertex is dequeued in BFS is guaranteed to be the shortest path from the source.",
                "complexity": "O(V + E)"
            },
            {
                "name": "Multi-Source BFS",
                "description": "Initializing the queue with all initial source nodes at distance 0 to find distance to closest source.",
                "complexity": "O(V + E)"
            }
        ],
        "algorithms": ["Graph BFS ($O(V + E)$)", "Unweighted Shortest Path", "Multi-Source BFS (Rotting Oranges)", "Bidirectional / State BFS (Word Ladder, Open the Lock)"],
        "dataStructures": ["Graphs", "FIFO Queue (`collections.deque`)", "Visited Hash Set"],
        "complexities": {
            "timeComplexity": "O(V + E)",
            "spaceComplexity": "O(V)"
        },
        "problems": problems_by_week.get(31, []),
        "materials": materials_by_week.get(31, []),
        "quote": {
            "quote": "Exploration is really the essence of the human spirit.",
            "author": "Frank Borman"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:25:37 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 32
    {
        "weekNumber": 32,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Heaps & Priority Queues",
        "description": "Covers binary heap invariants (Min-Heap, Max-Heap), array-based tree indexing, $O(n)$ bottom-up heapify, Python heapq, Top-K elements, and running medians.",
        "sourceDays": [32],
        "learningObjectives": [
            "Master Heap properties: Complete Binary Trees satisfying Min-Heap or Max-Heap invariants.",
            "Understand array-based tree indexing: `left = 2*i + 1`, `right = 2*i + 2`, `parent = (i - 1) // 2`.",
            "Implement bubble-up ($O(\\log n)$), bubble-down ($O(\\log n)$), and bottom-up heapify ($O(n)$).",
            "Use Python `heapq` module for Top-K Frequent Elements, Kth Largest Element, and K-Way Merges.",
            "Design a two-heap (Min-Heap + Max-Heap) data structure for finding running medians from data streams."
        ],
        "concepts": [
            {
                "name": "Heap Invariant",
                "description": "Parent key is always <= children (Min-Heap) or >= children (Max-Heap).",
                "complexity": "O(1) peek"
            },
            {
                "name": "Linear Heap Construction (Heapify)",
                "description": "Building a valid heap bottom-up from an unordered array in O(n) time.",
                "complexity": "O(n)"
            },
            {
                "name": "Two-Heap Running Median",
                "description": "Maintaining a max-heap for lower half and min-heap for upper half to get median in O(1).",
                "complexity": "O(log n) insert, O(1) findMedian"
            }
        ],
        "algorithms": ["Bottom-up Heapify ($O(n)$)", "Heap Sort ($O(n \\log n)$)", "Top-K Selection ($O(n \\log k)$)", "K-Way Merging ($O(n \\log k)$)", "Two-Heap Running Median"],
        "dataStructures": ["Min-Heap", "Max-Heap", "Priority Queue", "Arrays"],
        "complexities": {
            "heapify": "O(n)",
            "heappush": "O(log n)",
            "heappop": "O(log n)",
            "peek": "O(1)",
            "spaceComplexity": "O(n)"
        },
        "problems": problems_by_week.get(32, []),
        "materials": materials_by_week.get(32, []),
        "quote": {
            "quote": "Actions express priorities.",
            "author": "Mahatma Gandhi"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:06 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 33
    {
        "weekNumber": 33,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Greedy Algorithms & Optimization Strategies",
        "description": "Covers greedy choices, local vs. global optimality, Greedy Choice Property, Optimal Substructure, proofing techniques (Induction, Contradiction, Exchange Arguments), and interval scheduling.",
        "sourceDays": [33],
        "learningObjectives": [
            "Understand Greedy Paradigm: making locally optimal choices at each step to reach a global optimum.",
            "Verify necessary properties: Greedy Choice Property and Optimal Substructure.",
            "Prove greedy correctness using Proof by Induction, Contradiction, and Exchange Arguments.",
            "Solve interval scheduling, balloon bursting, and greedy array modification problems.",
            "Identify greedy failure points where dynamic programming or complete search is required."
        ],
        "concepts": [
            {
                "name": "Greedy Paradigm",
                "description": "Constructing solutions step by step, choosing the immediate best option without backtracking.",
                "complexity": None
            },
            {
                "name": "Greedy Choice Property",
                "description": "A globally optimal solution can be reached by making locally optimal (greedy) choices.",
                "complexity": None
            },
            {
                "name": "Exchange Argument Proof",
                "description": "Proving that replacing any non-greedy choice with a greedy choice results in an equally good or better solution.",
                "complexity": None
            },
            {
                "name": "Interval Scheduling Optimization",
                "description": "Sorting intervals by end times to greedily maximize non-overlapping interval counts or minimize arrows.",
                "complexity": "O(n log n)"
            }
        ],
        "algorithms": ["Interval Scheduling / Balloon Bursting ($O(n \\log n)$)", "Greedy Coin/Bill Change", "Pigeonhole Grouping", "Minimum Replacements Array Sort"],
        "dataStructures": ["Arrays", "Priority Queues"],
        "complexities": {
            "timeComplexity": "Typically O(n log n) with sorting, or O(n)",
            "spaceComplexity": "O(1) or O(n)"
        },
        "problems": problems_by_week.get(33, []),
        "materials": materials_by_week.get(33, []),
        "quote": {
            "quote": "A problem well stated is a problem half solved.",
            "author": "John Dewey"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:06 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 34
    {
        "weekNumber": 34,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Topological Sort & Directed Acyclic Graphs (DAGs)",
        "description": "Covers linear task ordering on DAGs, dependency resolution systems, Kahn's algorithm (BFS with in-degrees), DFS post-order with 3-color cycle detection, and compiler build ordering.",
        "sourceDays": [34],
        "learningObjectives": [
            "Understand Topological Sort: linear vertex ordering where directed edge $u \\to v$ implies $u$ precedes $v$.",
            "Understand why topological sorting is possible strictly on Directed Acyclic Graphs (DAGs).",
            "Implement Kahn's Algorithm (BFS): initialize queue with in-degree 0 nodes, decrement neighbor in-degrees, detect cycles if processed count $< V$.",
            "Implement DFS-Based Topological Sort with 3-Color Cycle Detection (White, Gray, Black).",
            "Apply topological sort to course scheduling, package managers, and matrix constraint reconstruction."
        ],
        "concepts": [
            {
                "name": "Topological Sort Definition",
                "description": "Linear ordering of vertices in a directed graph such that for every directed edge u -> v, u appears before v.",
                "complexity": "O(V + E)"
            },
            {
                "name": "Kahn's Algorithm (BFS In-Degree)",
                "description": "Maintaining an in-degree array, processing 0-in-degree vertices, and reducing neighbor degrees iteratively.",
                "complexity": "O(V + E) time, O(V + E) space"
            },
            {
                "name": "3-Color DFS Cycle Detection",
                "description": "White (unvisited), Gray (currently exploring in call stack), Black (fully processed); finding a Gray neighbor indicates a cycle.",
                "complexity": "O(V + E)"
            }
        ],
        "algorithms": ["Kahn's Algorithm ($O(V + E)$)", "DFS 3-Color Topological Sort ($O(V + E)$)", "Alien Dictionary Alphabet Extraction", "DAG Ancestor Node Aggregation"],
        "dataStructures": ["Graph (Adjacency List)", "In-Degree Array", "Queue", "Color State Array"],
        "complexities": {
            "timeComplexity": "O(V + E)",
            "spaceComplexity": "O(V + E)"
        },
        "problems": problems_by_week.get(34, []),
        "materials": materials_by_week.get(34, []),
        "quote": {
            "quote": "Order is the shape upon which beauty depends.",
            "author": "Pearl S. Buck"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:06 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 35
    {
        "weekNumber": 35,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Dynamic Programming I: Top-Down Memoization",
        "description": "Introduces Dynamic Programming fundamentals, Overlapping Subproblems, Optimal Substructure, Top-Down Memoization, state space identification, and recurrence equations.",
        "sourceDays": [35],
        "learningObjectives": [
            "Master core DP requirements: Overlapping Subproblems and Optimal Substructure.",
            "Implement Top-Down DP: combining recursion with memoization caching (hash tables or arrays).",
            "Define state parameters and formulate recurrence relations (state transition equations).",
            "Transform exponential brute-force recursion ($O(2^n)$) into polynomial time ($O(n)$ or $O(n \\cdot W)$).",
            "Solve classic DP problems: Climbing Stairs, Partition Equal Subset Sum (0/1 Knapsack), Target Sum, and Coin Change."
        ],
        "concepts": [
            {
                "name": "Overlapping Subproblems",
                "description": "Problem re-evaluates the exact same smaller subproblems repeatedly during recursive exploration.",
                "complexity": None
            },
            {
                "name": "Optimal Substructure",
                "description": "Optimal solution to the overall problem can be constructed from optimal solutions to its subproblems.",
                "complexity": None
            },
            {
                "name": "Top-Down Memoization Cache",
                "description": "Caching computed state results in an array or dictionary, returning cached results on duplicate state visits.",
                "complexity": "O(states * transitions)"
            },
            {
                "name": "0/1 Knapsack Subsets Formulation",
                "description": "State transition: dp(index, remaining_sum) = dp(index+1, sum) or dp(index+1, sum - nums[index]).",
                "complexity": "O(n * target)"
            }
        ],
        "algorithms": ["Top-Down Memoized Recursion", "Climbing Stairs", "Partition Equal Subset Sum (0/1 Knapsack)", "Target Sum DP", "Coin Change (Min Coins DP)"],
        "dataStructures": ["Memoization Cache (Array / Hash Map)", "Recursion Call Stack"],
        "complexities": {
            "timeComplexity": "O(number of unique states * transitions per state)",
            "spaceComplexity": "O(number of unique states) + O(recursion depth)"
        },
        "problems": problems_by_week.get(35, []),
        "materials": materials_by_week.get(35, []),
        "quote": {
            "quote": "Those who cannot remember the past are condemned to repeat it.",
            "author": "George Santayana"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:06 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 36
    {
        "weekNumber": 36,
        "phase": "phase_2",
        "phaseName": "Phase 2 — Advanced DSA",
        "title": "Dynamic Programming II: Bottom-Up Tabulation",
        "description": "Concludes Phase 2 with Bottom-Up Tabulation, iterative DP tables, base case seeding, space optimization (rolling arrays / state compression), and 2D grid DP.",
        "sourceDays": [36],
        "learningObjectives": [
            "Master Bottom-Up DP: building iterative tables from base cases up to final target state.",
            "Eliminate recursion call stack overhead and avoid Python recursion depth limits.",
            "Implement Space Optimization (Rolling Array / State Compression): reduce $O(n)$ space to $O(1)$, or $O(m \\times n)$ to $O(n)$.",
            "Solve 1D and 2D grid path DP problems: Tribonacci, Triangle Minimum Path, Perfect Squares, and Unique Paths."
        ],
        "concepts": [
            {
                "name": "Bottom-Up Tabulation",
                "description": "Iteratively filling an array/table starting from base cases, evaluating dependencies in topological order.",
                "complexity": "O(states * transitions)"
            },
            {
                "name": "State Compression / Rolling Array",
                "description": "Retaining only the previous state row or last k values to reduce auxiliary memory from O(N) to O(1).",
                "complexity": "O(1) space"
            },
            {
                "name": "2D Grid DP Transitions",
                "description": "dp[r][c] = grid[r][c] + min(dp[r+1][c], dp[r+1][c+1]) for triangle and grid path optimization.",
                "complexity": "O(R * C)"
            }
        ],
        "algorithms": ["Tabulated DP", "Rolling Array Space Optimization", "Triangle Minimum Path Sum", "Perfect Squares Decomposition", "Unbounded Knapsack (Coin Change II)"],
        "dataStructures": ["1D / 2D DP Tables / Arrays"],
        "complexities": {
            "timeComplexity": "O(number of states * transition time)",
            "spaceComplexity": "O(number of states), optimizable to O(1) or O(columns)"
        },
        "problems": problems_by_week.get(36, []),
        "materials": materials_by_week.get(36, []),
        "quote": {
            "quote": "We worry top-down, but we invest bottom-up.",
            "author": "Seth Klarman"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:06 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 37
    {
        "weekNumber": 37,
        "phase": "phase_3",
        "phaseName": "Phase 3 — Competitive Programming",
        "title": "Bitwise Operations & Bit Manipulation",
        "description": "Opens Phase 3 (Competitive Programming) with bitwise operators, binary representations, bitmask tricks (LSB, clear bit, power of two), XOR properties, and subset generation.",
        "sourceDays": [37],
        "learningObjectives": [
            "Master bitwise operators: AND (`&`), OR (`|`), XOR (`^`), NOT (`~`), Left Shift (`<<`), Right Shift (`>>`).",
            "Apply bit manipulation idioms: check set bit, set bit, clear bit, toggle bit, extract lowest set bit (`n & -n`), clear lowest set bit (`n & (n - 1)`).",
            "Leverage XOR algebraic properties ($a \\oplus a = 0, a \\oplus 0 = a$) for single number problems.",
            "Generate all $2^n$ subsets iteratively using integer bitmasks."
        ],
        "concepts": [
            {
                "name": "Bitwise Primitive Operators",
                "description": "Performing bit-level logical operations directly in CPU hardware registers in O(1) time.",
                "complexity": "O(1)"
            },
            {
                "name": "Lowest Set Bit (LSB) Extraction",
                "description": "Using two's complement identity n & -n to isolate the lowest 1-bit.",
                "complexity": "O(1)"
            },
            {
                "name": "Brian Kernighan’s Algorithm",
                "description": "Counting set bits in O(set bits) time by repeatedly executing n = n & (n - 1).",
                "complexity": "O(set bits)"
            },
            {
                "name": "Bitmask Power Set Generation",
                "description": "Iterating integer mask from 0 to 2^n - 1 to represent element inclusions in O(n * 2^n) time.",
                "complexity": "O(n * 2^n)"
            }
        ],
        "algorithms": ["Brian Kernighan's Bit Counting", "Single Number via XOR", "Bitmask Subset Generation ($O(2^n)$)", "Binary Addition Simulation", "Bitmask Equation Matching"],
        "dataStructures": ["Integers / Bitmasks"],
        "complexities": {
            "timeComplexity": "O(1) per bitwise operation, O(number of bits) for bit traversal",
            "spaceComplexity": "O(1)"
        },
        "problems": problems_by_week.get(37, []),
        "materials": materials_by_week.get(37, []),
        "quote": {
            "quote": "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            "author": "Nelson Mandela"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:06 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 38
    {
        "weekNumber": 38,
        "phase": "phase_3",
        "phaseName": "Phase 3 — Competitive Programming",
        "title": "Disjoint Set Union (Union-Find)",
        "description": "Covers Disjoint Set Union (DSU), dynamic connectivity, Path Compression, Union by Rank/Size, Inverse Ackermann complexity $O(\\alpha(n))$, and Kruskal's MST / graph cycle detection.",
        "sourceDays": [38],
        "learningObjectives": [
            "Master Disjoint Set Union (DSU / Union-Find) to maintain dynamic partition of disjoint sets.",
            "Implement `find(x)` with Path Compression (flattening tree structure to point directly to root).",
            "Implement `union(x, y)` by Rank or Size (attaching smaller tree under larger tree root).",
            "Understand near-constant amortized complexity: $O(\\alpha(n))$ where $\\alpha$ is the Inverse Ackermann function.",
            "Apply DSU to detect cycles in undirected graphs, merge accounts, and evaluate grid connectivity."
        ],
        "concepts": [
            {
                "name": "Dynamic Connectivity",
                "description": "Maintaining connected components under incremental edge additions with near-instant query times.",
                "complexity": "O(α(n))"
            },
            {
                "name": "Path Compression",
                "description": "During find(x), pointing all visited nodes directly to the root, drastically flattening future lookups.",
                "complexity": "O(α(n)) amortized"
            },
            {
                "name": "Union by Rank / Size",
                "description": "Balancing tree depth by attaching the tree with smaller depth/size under the root of the larger tree.",
                "complexity": "O(α(n)) amortized"
            },
            {
                "name": "Graph Cycle Detection via DSU",
                "description": "If find(u) == find(v) before adding edge (u, v), adding the edge creates a cycle.",
                "complexity": "O(E * α(V))"
            }
        ],
        "algorithms": ["DSU Find with Path Compression", "DSU Union by Rank / Size", "Graph Cycle Detection", "Accounts Merging via DSU", "Grid Region Cutting via DSU"],
        "dataStructures": ["Disjoint Set Union (Parent & Rank Arrays)"],
        "complexities": {
            "findTime": "O(α(n)) amortized ≈ O(1)",
            "unionTime": "O(α(n)) amortized ≈ O(1)",
            "spaceComplexity": "O(n)"
        },
        "problems": problems_by_week.get(38, []),
        "materials": materials_by_week.get(38, []),
        "quote": {
            "quote": "In Union there is strength.",
            "author": "Aesop"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:06 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 39
    {
        "weekNumber": 39,
        "phase": "phase_3",
        "phaseName": "Phase 3 — Competitive Programming",
        "title": "Advanced Sorting: Divide & Conquer and Non-Comparison Sorting",
        "description": "Covers advanced sorting algorithms: Merge Sort ($O(n \\log n)$ stable), Quick Sort ($O(n \\log n)$ avg, in-place), Quickselect ($O(n)$ avg), Radix Sort, Bucket Sort, and linked list sorting.",
        "sourceDays": [39],
        "learningObjectives": [
            "Master advanced Divide & Conquer sorts: Merge Sort ($O(n \\log n)$ stable) and Quick Sort ($O(n \\log n)$ average).",
            "Implement Quickselect to find the $k$-th smallest/largest element in $O(n)$ average time without full sorting.",
            "Implement non-comparison linear sorts: Radix Sort ($O(d \\cdot (n + k))$) and Bucket Sort ($O(n)$ average).",
            "Sort Singly Linked Lists in $O(n \\log n)$ time and $O(\\log n)$ space using Merge Sort.",
            "Analyze stability, pivot selection strategies (Randomized / Median-of-Three), and worst-case safeguards."
        ],
        "concepts": [
            {
                "name": "Merge Sort & Subarray Merging",
                "description": "Recursively dividing array in half, sorting halves, and merging two sorted subarrays in O(n) linear time.",
                "complexity": "O(n log n) time, O(n) space"
            },
            {
                "name": "Quick Sort & Partitioning Schemes",
                "description": "Partitioning array around a pivot such that elements < pivot are on left and > pivot on right.",
                "complexity": "O(n log n) avg, O(n²) worst"
            },
            {
                "name": "Quickselect ($k$-th Order Statistic)",
                "description": "Partitioning only the half containing index k to find k-th element in linear average time.",
                "complexity": "O(n) average time"
            },
            {
                "name": "Non-Comparison Sorting (Radix & Bucket Sort)",
                "description": "Sorting by processing digit-by-digit or distributing elements into buckets.",
                "complexity": "O(d * (n + k)) or O(n)"
            }
        ],
        "algorithms": ["Merge Sort ($O(n \\log n)$)", "Quick Sort & 3-Way Partitioning", "Quickselect ($O(n)$ avg)", "Linked List Merge Sort", "Radix Sort", "Bucket Sort"],
        "dataStructures": ["Arrays", "Linked Lists"],
        "complexities": {
            "mergeSort": "O(n log n) time, O(n) space",
            "quickSort": "O(n log n) avg time, O(n²) worst, O(log n) space",
            "quickselect": "O(n) avg time, O(n²) worst",
            "radixSort": "O(d * (n + k)) time, O(n + k) space"
        },
        "problems": problems_by_week.get(39, []),
        "materials": materials_by_week.get(39, []),
        "quote": {
            "quote": "The first law of success is concentration — to bend all the energies to one point, and to go directly to that point, looking neither to the right nor to the left.",
            "author": "William Matthews"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:06 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 40
    {
        "weekNumber": 40,
        "phase": "phase_3",
        "phaseName": "Phase 3 — Competitive Programming",
        "title": "Numerics & Number Theory",
        "description": "Covers fundamental number theory: Euclidean GCD algorithm ($O(\\log n)$), Sieve of Eratosthenes ($O(n \\log \\log n)$), prime factorization, and modular arithmetic.",
        "sourceDays": [40],
        "learningObjectives": [
            "Master Euclidean Algorithm for Greatest Common Divisor (GCD) in $O(\\log(\\min(a, b)))$ time.",
            "Implement Sieve of Eratosthenes to precompute all prime numbers up to $N$ in $O(n \\log \\log n)$ time.",
            "Perform prime factorization and compute Least Common Multiples (LCM) via $\\text{lcm}(a, b) = \\frac{a \\cdot b}{\\gcd(a, b)}$.",
            "Apply Modular Arithmetic properties: addition, multiplication, and modular exponentiation ($O(\\log b)$)."
        ],
        "concepts": [
            {
                "name": "Euclidean GCD Algorithm",
                "description": "Computing gcd(a, b) = gcd(b, a % b) until remainder is zero in logarithmic steps.",
                "complexity": "O(log(min(a, b)))"
            },
            {
                "name": "Sieve of Eratosthenes",
                "description": "Iteratively marking multiples of each prime starting from p² to find all primes <= N.",
                "complexity": "O(n log log n)"
            },
            {
                "name": "Prime Factorization",
                "description": "Decomposing numbers into products of prime factors in O(sqrt(n)) time.",
                "complexity": "O(sqrt(n))"
            },
            {
                "name": "Modular Arithmetic Laws",
                "description": "Distributing modulo over addition and multiplication to prevent integer overflow in large calculations.",
                "complexity": "O(1)"
            }
        ],
        "algorithms": ["Euclidean GCD Algorithm ($O(\\log n)$)", "Sieve of Eratosthenes ($O(n \\log \\log n)$)", "Prime Factorization ($O(\\sqrt{n})$)", "Modular Exponentiation ($O(\\log b)$)"],
        "dataStructures": ["Boolean Prime Arrays / Bitsets", "Integers"],
        "complexities": {
            "gcdTime": "O(log(min(a, b)))",
            "sieveTime": "O(n log log n)",
            "primeCheckTrialDivision": "O(sqrt(n))",
            "spaceComplexity": "O(n) for sieve"
        },
        "problems": problems_by_week.get(40, []),
        "materials": materials_by_week.get(40, []),
        "quote": {
            "quote": "The enchanting charms of this sublime science reveal only to those who have the courage to go deeply into it.",
            "author": "Carl Friedrich Gauss"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:07 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 41
    {
        "weekNumber": 41,
        "phase": "phase_3",
        "phaseName": "Phase 3 — Competitive Programming",
        "title": "Tries (Prefix Trees) & Prefix Search",
        "description": "Covers Trie (Prefix Tree) data structures, node child pointers, end-of-word flags, $O(L)$ insertion/search/prefix matching, autocomplete suggestions, and wildcard searches.",
        "sourceDays": [41],
        "learningObjectives": [
            "Master Trie (Prefix Tree) node structure: `children` mapping/array of size 26 and `is_end` boolean.",
            "Implement Trie core operations: `insert(word)` ($O(L)$), `search(word)` ($O(L)$), `startsWith(prefix)` ($O(L)$), and `delete(word)`.",
            "Analyze Trie Space Complexity: $O(M \\times N \\times \\Sigma)$ with substantial common prefix sharing.",
            "Combine Tries with DFS for autocomplete search suggestions, longest common prefix, and wildcard search (`.`)."
        ],
        "concepts": [
            {
                "name": "Trie (Prefix Tree) Node Structure",
                "description": "Tree where edges represent characters and nodes mark valid word terminations.",
                "complexity": "O(L) per word of length L"
            },
            {
                "name": "Fast Prefix & Word Lookups",
                "description": "Retrieving whether any stored word starts with a given prefix in O(prefix_len) time.",
                "complexity": "O(L) time"
            },
            {
                "name": "Shared Prefix Space Optimization",
                "description": "Words sharing prefixes share initial root branches, saving memory compared to separate string storage.",
                "complexity": "O(M * N * alphabet_size) worst case"
            }
        ],
        "algorithms": ["Trie Insertion ($O(L)$)", "Trie Word Search ($O(L)$)", "Trie Prefix Search ($O(L)$)", "Trie Autocomplete Suggestions", "Trie Wildcard Search with DFS"],
        "dataStructures": ["Trie (Prefix Tree)"],
        "complexities": {
            "insertTime": "O(L)",
            "searchTime": "O(L)",
            "prefixSearchTime": "O(L)",
            "deletionTime": "O(L)",
            "spaceComplexity": "O(M * N * alphabet_size) worst case (often less with shared prefixes)"
        },
        "problems": problems_by_week.get(41, []),
        "materials": materials_by_week.get(41, []),
        "quote": {
            "quote": "If you can't do great things, do small things in a great way",
            "author": "Napoleon Hill"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:07 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 42
    {
        "weekNumber": 42,
        "phase": "phase_3",
        "phaseName": "Phase 3 — Competitive Programming",
        "title": "Shortest Path Algorithms: Dijkstra, Bellman-Ford, Floyd-Warshall",
        "description": "Covers Single-Source and All-Pairs shortest path algorithms: Dijkstra ($O((V+E)\\log V)$), Bellman-Ford ($O(V \\cdot E)$ with negative cycle detection), SPFA ($O(E)$ avg), and Floyd-Warshall ($O(V^3)$).",
        "sourceDays": [42],
        "learningObjectives": [
            "Master Single-Source and All-Pairs Shortest Path algorithms on weighted graphs.",
            "Implement Dijkstra's Algorithm using a Min-Heap / Priority Queue for non-negative edge weights in $O((V + E) \\log V)$ time.",
            "Implement Bellman-Ford Algorithm in $O(V \\cdot E)$ time with negative edge weights and Negative Cycle Detection.",
            "Implement Shortest Path Faster Algorithm (SPFA) with average $O(E)$ time.",
            "Implement Floyd-Warshall Algorithm for All-Pairs Shortest Path in $O(V^3)$ time and $O(V^2)$ space."
        ],
        "concepts": [
            {
                "name": "Edge Relaxation Principle",
                "description": "Updating dist[v] = min(dist[v], dist[u] + weight(u, v)) when a shorter path via u is discovered.",
                "complexity": "O(1)"
            },
            {
                "name": "Dijkstra's Algorithm",
                "description": "Greedy single-source shortest path using a min-heap; requires non-negative edge weights.",
                "complexity": "O((V + E) * log V) time, O(V) space"
            },
            {
                "name": "Bellman-Ford & Negative Cycles",
                "description": "Relaxing all E edges V-1 times; a further relaxation on the V-th pass proves the existence of a negative cycle.",
                "complexity": "O(V * E) time, O(V) space"
            },
            {
                "name": "Floyd-Warshall All-Pairs Algorithm",
                "description": "Dynamic programming evaluating dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) for all intermediate vertices k.",
                "complexity": "O(V³) time, O(V²) space"
            }
        ],
        "algorithms": ["Dijkstra's Algorithm ($O((V + E) \\log V)$)", "Bellman-Ford Algorithm ($O(V \\cdot E)$)", "Negative Cycle Detection", "Shortest Path Faster Algorithm (SPFA)", "Floyd-Warshall Algorithm ($O(V^3)$)"],
        "dataStructures": ["Weighted Graphs", "Min-Heap / Priority Queue", "Distance Arrays / Matrices"],
        "complexities": {
            "dijkstraTime": "O((V + E) * log V)",
            "dijkstraSpace": "O(V)",
            "bellmanFordTime": "O(V * E)",
            "bellmanFordSpace": "O(V)",
            "spfaAverageTime": "O(E)",
            "spfaWorstTime": "O(V * E)",
            "floydWarshallTime": "O(V³)",
            "floydWarshallSpace": "O(V²)"
        },
        "problems": problems_by_week.get(42, []),
        "materials": materials_by_week.get(42, []),
        "quote": {
            "quote": "To find the shortest path, sometimes you have to be willing to take the longer journey.",
            "author": "Unknown"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:07 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    },

    # WEEK 43
    {
        "weekNumber": 43,
        "phase": "phase_3",
        "phaseName": "Phase 3 — Competitive Programming",
        "title": "Advanced String Algorithms: KMP, Rabin-Karp, Z-Algorithm",
        "description": "Concludes the 43-week curriculum with linear-time substring search: Knuth-Morris-Pratt (LPS array, $O(N+M)$), Rabin-Karp (Rolling Hash, $O(N+M)$ avg), Z-Algorithm ($O(N+M)$), and Manacher's Algorithm ($O(N)$).",
        "sourceDays": [43],
        "learningObjectives": [
            "Replace brute-force $O(N \\times M)$ substring searches with linear-time $O(N + M)$ pattern matching.",
            "Implement Knuth-Morris-Pratt (KMP) Algorithm: build Longest Prefix Suffix (LPS) table in $O(M)$ and match in $O(N)$ without text backtracking.",
            "Implement Rabin-Karp Algorithm: Rolling Hash with modular arithmetic and hash collision resolution.",
            "Implement Z-Algorithm: compute $Z$-array where $Z[i]$ is the length of longest common prefix starting at index $i$ in $O(N + M)$ time.",
            "Understand Manacher's Algorithm for finding the Longest Palindromic Substring in linear $O(N)$ time."
        ],
        "concepts": [
            {
                "name": "Linear Substring Search Paradigm",
                "description": "Finding occurrences of pattern string P (length m) within text string T (length n) in O(n + m) time.",
                "complexity": "O(n + m)"
            },
            {
                "name": "KMP Longest Prefix Suffix (LPS)",
                "description": "Precomputing LPS array to shift pattern smartly upon mismatch without re-scanning matched text characters.",
                "complexity": "O(m) preprocess, O(n) match"
            },
            {
                "name": "Rabin-Karp Rolling Hash",
                "description": "Computing hash values of sliding substrings in O(1) by removing leading character and adding trailing character.",
                "complexity": "O(n + m) average, O(n * m) worst"
            },
            {
                "name": "Z-Algorithm & Z-Box Matching",
                "description": "Maintaining [L, R] segment boundaries to reuse previously matched character counts in O(n + m) total time.",
                "complexity": "O(n + m)"
            },
            {
                "name": "Manacher's Palindrome Algorithm",
                "description": "Inserting sentinel characters and expanding around centers while tracking palindrome boundaries in O(n) time.",
                "complexity": "O(n)"
            }
        ],
        "algorithms": ["Knuth-Morris-Pratt (KMP) Algorithm ($O(N + M)$)", "Rabin-Karp Rolling Hash Algorithm ($O(N + M)$ avg)", "Z-Algorithm ($O(N + M)$)", "Manacher's Palindromic Substring Algorithm ($O(N)$)"],
        "dataStructures": ["LPS Array", "Z-Array", "Rolling Hash State"],
        "complexities": {
            "bruteForce": "O(n * m)",
            "kmpTime": "O(n + m)",
            "kmpSpace": "O(m) for LPS array",
            "rabinKarpAverageTime": "O(n + m)",
            "rabinKarpWorstTime": "O(n * m)",
            "zAlgorithmTime": "O(n + m)",
            "manacherTime": "O(n)"
        },
        "problems": problems_by_week.get(43, []),
        "materials": materials_by_week.get(43, []),
        "quote": {
            "quote": "It is not enough to be in the right place at the right time. You should also have an open mind at the right time.",
            "author": "Paul Erdos"
        },
        "source": {
            "author": "baka Codes / Muluken Zewge",
            "telegramUrls": ["https://t.me/bakacodes"],
            "dates": ["14.08.2026 10:28:07 UTC+03:00"]
        },
        "status": "verified",
        "confidence": "high"
    }
]

print(f"Built curriculum data for {len(weeks_data)} weeks.")

# Save curriculum.json
with open("data/curriculum.json", "w", encoding="utf-8") as f:
    json.dump(weeks_data, f, indent=2, ensure_ascii=False)
print("Saved data/curriculum.json")

print("Generating markdown reports...")
