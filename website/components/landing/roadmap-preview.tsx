import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2, Layers, BookOpen, Code2 } from "lucide-react";
import { phases } from "@/lib/curriculum-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, PhaseBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

export function RoadmapPreview() {
  const phaseMetadata = [
    {
      ...phases[0],
      weeksRange: "Weeks 1–12",
      totalProblems: 39,
      keyTopics: ["Python Track", "Clean Code & Style", "Complexity Analysis", "7-Step Problem Solving", "Lists, Dicts, OOP"],
      variant: "foundation" as const,
      accentBorder: "border-emerald-500/30 dark:border-emerald-500/20",
    },
    {
      ...phases[1],
      weeksRange: "Weeks 13–25",
      totalProblems: 59,
      keyTopics: ["Arrays & 2D Matrices", "Two Pointers & Sliding Window", "Prefix Sum Arrays", "Linked Lists I & II", "Monotonic Stacks & Queues", "Binary Search"],
      variant: "core" as const,
      accentBorder: "border-blue-500/30 dark:border-blue-500/20",
    },
    {
      ...phases[2],
      weeksRange: "Weeks 26–36",
      totalProblems: 54,
      keyTopics: ["Binary Trees & BST", "Backtracking & Recursion II", "Graph Representations", "DFS & BFS Traversals", "Heaps & Priority Queues", "Dynamic Programming (DP)"],
      variant: "advanced" as const,
      accentBorder: "border-indigo-500/30 dark:border-indigo-500/20",
    },
    {
      ...phases[3],
      weeksRange: "Weeks 37–43",
      totalProblems: 39,
      keyTopics: ["Bitwise Operations", "Disjoint Set Union (DSU)", "Advanced & Non-Comparison Sort", "Number Theory & Sieve", "Tries (Prefix Trees)", "Shortest Paths (Dijkstra)", "String Matching (KMP)"],
      variant: "cp" as const,
      accentBorder: "border-amber-500/30 dark:border-amber-500/20",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/20 border-y border-border/60 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="subtle" className="font-semibold">
              The 4-Phase Progression
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              43 weeks. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
                One continuous journey.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every phase is carefully sequenced to build theoretical depth, algorithmic speed, and intuitive pattern recognition.
            </p>
          </div>
          <Link href="/roadmap">
            <Button
              variant="outline"
              size="md"
              className="group whitespace-nowrap"
              endIcon={<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            >
              Explore Full Roadmap (43 Weeks)
            </Button>
          </Link>
        </div>

        {/* Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {phaseMetadata.map((phase, idx) => (
            <Card
              key={phase.id}
              variant="interactive"
              className={`p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${phase.accentBorder}`}
            >
              <div className="space-y-4">
                {/* Header: Phase number & Week range */}
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground/5 text-foreground font-mono text-xs font-bold border border-border/60">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    {phase.weeksRange}
                  </span>
                </div>

                {/* Title & Badge */}
                <div>
                  <PhaseBadge phase={phase.id} className="mb-2" />
                  <h3 className="text-base font-bold text-foreground leading-snug">
                    {phase.name}
                  </h3>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {phase.totalWeeks} Weeks · {phase.totalProblems} Problems
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {phase.description}
                </p>

                {/* Key Concepts Pills */}
                <div className="space-y-1.5 pt-2 border-t border-border/40">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Core Focus Topics
                  </span>
                  <ul className="space-y-1 text-xs text-foreground/90">
                    {phase.keyTopics.slice(0, 4).map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-1.5 text-[11px]">
                        <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                        <span className="truncate">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 pt-3 border-t border-border/40">
                <ProgressBar
                  value={100}
                  variant={phase.variant}
                  size="sm"
                  label={`${phase.totalWeeks} Weeks Covered`}
                  animated={false}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 text-center">
          <Link href="/roadmap">
            <Button variant="primary" size="lg" endIcon={<ArrowRight className="h-4 w-4" />}>
              Explore the full roadmap 
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
