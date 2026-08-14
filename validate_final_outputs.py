import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')

# List of expected files
expected_files = [
    "data/raw_extracted_data.json",
    "data/curriculum.json",
    "data/problems.json",
    "data/file_inventory.json",
    "data/phases.json",
    "reports/AUDIT_REPORT.md",
    "reports/CURRICULUM_VALIDATION.md",
    "reports/REVIEW_NEEDED.md"
]

print("=== VERIFYING FINAL OUTPUT ARTIFACTS ===")
for ef in expected_files:
    exists = os.path.exists(ef)
    size = os.path.getsize(ef) if exists else 0
    print(f"[{'OK' if exists else 'MISSING'}] {ef:<35} Size: {size / 1024:.1f} KB")

# Validate JSON files
print("\n=== VALIDATING JSON STRUCTURES ===")
with open("data/curriculum.json", "r", encoding="utf-8") as f:
    curriculum = json.load(f)
print(f"Curriculum weeks count: {len(curriculum)}")
assert len(curriculum) == 43, f"Expected 43 weeks, got {len(curriculum)}"

with open("data/problems.json", "r", encoding="utf-8") as f:
    problems = json.load(f)
print(f"Unique problems count: {len(problems)}")
assert len(problems) == 180, f"Expected 180 unique problems, got {len(problems)}"

with open("data/file_inventory.json", "r", encoding="utf-8") as f:
    inventory = json.load(f)
print(f"File inventory count: {len(inventory)}")

with open("data/phases.json", "r", encoding="utf-8") as f:
    phases = json.load(f)
print(f"Phases count: {len(phases)}")
assert len(phases) == 4, f"Expected 4 phases, got {len(phases)}"

with open("data/raw_extracted_data.json", "r", encoding="utf-8") as f:
    raw = json.load(f)
print(f"Raw messages analyzed: {len(raw['messages'])}")

# Check week numbers sequence
week_nums = [w["weekNumber"] for w in curriculum]
assert week_nums == list(range(1, 44)), "Week numbers must be contiguous 1 to 43"

# Check phases
phase_distribution = {}
for w in curriculum:
    p = w["phase"]
    phase_distribution[p] = phase_distribution.get(p, 0) + 1
print(f"Phase distribution across weeks: {phase_distribution}")

# Check sourceDays coverage
all_src_days = set()
for w in curriculum:
    for d in w["sourceDays"]:
        all_src_days.add(d)
print(f"Total source days covered: {len(all_src_days)} (Days: {min(all_src_days)} to {max(all_src_days)})")
assert all_src_days == set(range(1, 44)), "All 43 source days must be mapped"

print("\nALL INTEGRITY AND VALIDATION CHECKS PASSED SUCCESSFULLY!")
