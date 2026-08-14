import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Code2, CheckCircle2, Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PracticePreview() {
  const sampleProblems = [
    {
      title: "Two Sum",
      platform: "LeetCode",
      week: "Week 7",
      topic: "Hash Maps & Sets",
      url: "https://leetcode.com/problems/two-sum/",
      platformBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    {
      title: "Group Anagrams",
      platform: "LeetCode",
      week: "Week 7",
      topic: "String Hashing",
      url: "https://leetcode.com/problems/group-anagrams/",
      platformBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    {
      title: "Way Too Long Words",
      platform: "Codeforces",
      week: "Week 4",
      topic: "String Simulation",
      url: "https://codeforces.com/problemset/problem/71/A",
      platformBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      title: "Reverse Linked List",
      platform: "LeetCode",
      week: "Week 20",
      topic: "Linked Lists I",
      url: "https://leetcode.com/problems/reverse-linked-list/",
      platformBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    {
      title: "Number of Islands",
      platform: "LeetCode",
      week: "Week 30",
      topic: "Graph Traversal (DFS)",
      url: "https://leetcode.com/problems/number-of-islands/",
      platformBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    {
      title: "Connected Components",
      platform: "Eolymp",
      week: "Week 30",
      topic: "Graph Theory",
      url: "https://www.eolymp.com/en/problems/4000",
      platformBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="subtle" className="font-semibold">
              Problem Catalog
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Learn it. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
                Then solve it.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every theoretical concept has corresponding practice problems from established coding platforms to solidify your implementation skills.
            </p>
          </div>
          <Link href="/practice">
            <Button variant="outline" size="md" endIcon={<ArrowRight className="h-4 w-4" />}>
              Browse All 180 Problems
            </Button>
          </Link>
        </div>

        {/* Practice Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleProblems.map((problem, idx) => (
            <Card
              key={idx}
              variant="interactive"
              className="p-5 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${problem.platformBg}`}
                  >
                    {problem.platform}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground font-medium">
                    {problem.week}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <span>{problem.title}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Topic: <span className="font-medium text-foreground/80">{problem.topic}</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">Canonical URL verified</span>
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <span>Solve Problem</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Platform Pills Bar */}
        <div className="mt-10 p-4 rounded-xl bg-card border border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary shrink-0" />
            <span>Supported Platforms:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-medium">
            <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
              LeetCode (150)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
              Codeforces (17)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
              HackerRank (7)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
              Eolymp (4)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
              GeeksforGeeks (1)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
              Kattis (1)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
