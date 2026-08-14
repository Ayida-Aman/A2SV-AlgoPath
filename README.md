# A2SV Legacy

> **Build the skills. Continue the legacy.**

An independent, community-driven educational platform dedicated to preserving, structuring, and teaching an intensive **43-week Data Structures, Algorithms, and Competitive Programming** learning journey.

---

## ⚠️ Important Disclaimer

**A2SV Legacy is an independent educational project.** It is **not** the official A2SV website and is **not** affiliated with, operated by, or endorsed by A2SV. All extracted source learning posts and lecture slides are attributed to their original authors (**baka Codes**, **Muluken Zewge**, and the **A2SV Education Team**).

---

## 📁 Repository Architecture

The repository is organized into two distinct subsystems:

```
A2SV-Legacy/
├── website/                  # Next.js Web Application & Design System
│   ├── app/                  # Next.js 15 App Router (Pages, Layouts)
│   ├── components/           # Reusable UI Primitives & Navigation Shells
│   │   ├── layout/           # AppLayout, PublicLayout, Sidebar, Navbar
│   │   └── ui/               # Button, Card, Badge, Input, ProgressBar, Avatar
│   ├── data/                 # Application-Ready Datasets (curriculum, problems, phases)
│   ├── lib/                  # Utilities (cn, ThemeProvider)
│   ├── types/                # TypeScript Interfaces
│   ├── public/               # Static assets
│   ├── package.json          # Dependencies & Scripts
│   ├── tailwind.config.ts    # HSL Design Tokens (A2SV Blue, Electric Blue, Navy)
│   └── tsconfig.json         # TypeScript Path Aliases (@/*)
│
├── data-pipeline/            # Telegram Export Extraction & Reconstruction Pipeline
│   ├── ChatExport_2026-08-14/# Raw Telegram Desktop HTML/PDF export
│   ├── data/                 # Extraction outputs (raw & structured JSONs)
│   ├── reports/              # Audit, validation, and review reports
│   │   ├── AUDIT_REPORT.md
│   │   ├── CURRICULUM_VALIDATION.md
│   │   └── REVIEW_NEEDED.md
│   ├── visual_references/    # Visual UI inspirations and reference mockups
│   └── *.py                  # Extraction, classification, parsing, and report scripts
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started with the Website

To run the Next.js frontend application locally:

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify the production build:

```bash
cd website
npm run build
```

---

## 📊 43-Week Curriculum Structure

| Phase | Weeks | Focus Topics | Problems |
| :--- | :---: | :--- | :---: |
| **Foundation** | Weeks 1–12 | Python Syntax, Best Coding Practices, Big-O Complexity, 7-Step Method, Built-in Structures, OOP | 39 |
| **Phase 1 — Core DSA** | Weeks 13–25 | Arrays, Matrices, Two Pointers, Sliding Window, Prefix Sum, Linked Lists, Stacks, Queues, Binary Search | 59 |
| **Phase 2 — Advanced DSA** | Weeks 26–36 | Trees, BST, Backtracking, Graphs, DFS, BFS, Heaps, Greedy, Topological Sort, Dynamic Programming | 54 |
| **Phase 3 — Competitive Programming** | Weeks 37–43 | Bitwise Ops, Disjoint Set Union (DSU), Advanced Sorting, Number Theory, Tries, Shortest Paths, Strings | 39 |
| **Total** | **43 Weeks** | **Complete DSA & Competitive Programming Progression** | **180 Unique Problems** |
