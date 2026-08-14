# A2SV Legacy — Human Review & Nuance Report

**Document Purpose:** This report highlights items from the Telegram export that contain ambiguities, source typos, duplicate quotes, or download limitations. Each item includes evidence, interpretation, confidence level, and recommended handling.

---

## Item 1: Missing PDF Downloads Due to Telegram File Size Limits

- **Affected Source Days:** Day 6 (Message 23, Message 12)
- **Referenced Filenames:**
  1. `A2SV G5 Remote Focus, time management and planning.pdf` (8.9 MB)
  2. `A2SV_G6_Python_Track_Focus_time_management_and_planning.pdf` (9.0 MB)
- **Evidence:** In `messages.html`, message 23 contains the text `"Day 6 Lecture slide"` and an attachment placeholder with status `"Exceeds maximum size, change data exporting settings to download. 8.9 MB"`.
- **Interpretation:** The Telegram Desktop export client was configured with a file size threshold that omitted files larger than ~8 MB. The metadata and slide name are fully preserved in `data/file_inventory.json` with `onDisk: false`.
- **Confidence:** High
- **Recommended Action:** If desired, re-export the single file from Telegram with an increased file size limit or link to the external source repository. The curriculum retains the complete lesson content and practice problems.

---

## Item 2: Typo in Day 41 Hashtags (`#Day42`)

- **Affected Source Day:** Day 41 (Message 92)
- **Evidence:** The message text begins with `"🚀 Day 41: Tries (Prefix Trees)"` and covers Trie operations (Insertion, Search, Deletion). At the very end of the message, the hashtag is written as `#Day42` instead of `#Day41`.
- **Interpretation:** This is an accidental typographical error in the original Telegram post. The subsequent message (Message 94) is explicitly titled `"🚀 Day 42: Shortest Path Algorithms"`.
- **Confidence:** High
- **Recommended Action:** Preserve Day 41 as Week 41 (Tries) and Day 42 as Week 42 (Shortest Path). Document the source hashtag typo for auditing.

---

## Item 3: Repeated Quotes Across Consecutive Lesson Days

- **Evidence:**
  - Days 1 & 3: *"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."* (Martin Fowler)
  - Days 13 & 14: *"If you want to enjoy the rainbow, be prepared to endure the storm."* (Warren W. Wiersbe)
  - Days 20 & 21: *"If you fell down yesterday, stand up today."* (H. G. Wells)
  - Days 22 & 23: *"Be the one for the Queue not in the Queue"* (Kanika Sarna)
- **Interpretation:** The source author intentionally reinforced key mindset themes across multi-part topics (e.g. Linked Lists I & II, Stacks & Queues I & II, Arrays & Matrices).
- **Confidence:** High
- **Recommended Action:** Retain the exact quotes as posted in the source for each week. Do not artificially replace them.

---

## Item 4: Days Without Quotes (Hands-on / Review Sessions)

- **Affected Source Days:** Day 4 (Problem Solving), Day 8 (Contest Analysis), Day 12 (Consolidation), Day 16 (Sorting Review), Day 26 (Trees Introduction).
- **Evidence:** These posts did not include a `"Quote of the Day"` block in the Telegram text.
- **Interpretation:** Consistent with the source-of-truth rule, `quote` is set to `null` for these weeks rather than fabricating generic quotes.
- **Confidence:** High
- **Recommended Action:** Maintain `quote: null` in `curriculum.json`.

---

## Item 5: Contest Posts Integration (Saturday Contests)

- **Evidence:**
  - Message 21 (after Day 5): `"🚀 Keep the Momentum Going! - Contest Problems from Saturday"` (5 Codeforces problems: Division?, Word Capitalization, Petya and Strings, Stones on the Table, Only Pluses).
  - Message 36 (after Day 13): `"🚀 No Class, But No Days Off from Solving Problems!"` (5 Codeforces problems: Word on Paper, Rudolph and Tic-Tac-Toe, Remove Smallest, Minimize Inversions, Insert Digit).
- **Interpretation:** In the A2SV schedule, Saturday contests took place at the end of learning cycles (Week 5 and Week 13). They naturally belong to their respective week's problem set.
- **Confidence:** High
- **Recommended Action:** Associated Contest 1 problems with Week 5 (`sourceDays: [5]`) and Contest 2 problems with Week 13 (`sourceDays: [13]`), while preserving individual problem metadata.

---

## Item 6: Problem Difficulty Fields

- **Evidence:** The Telegram export posts do not specify explicit problem difficulty labels (Easy, Medium, Hard).
- **Interpretation:** In strict accordance with Section 7 of the specification (*"Do not invent difficulty if it is not available in the source. Use null if unknown."*), all problem objects store `"difficulty": null`.
- **Confidence:** High
- **Recommended Action:** Maintain `null` in the dataset. If difficulty labels are needed in future phases, fetch them programmatically via official platform APIs during web application development.
