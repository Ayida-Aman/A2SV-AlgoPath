import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Trophy,
  Flame,
  CheckCircle2,
  Sparkles,
  Layers,
  Terminal,
  Compass,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge, PhaseBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section Placeholder */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Subtle decorative background glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary/15 to-accent-electric/15 blur-3xl opacity-50 dark:opacity-40 rounded-full" />

        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary-muted text-primary text-xs font-medium mb-6 animate-in fade-in duration-500">
            <Sparkles className="h-3.5 w-3.5 text-accent-electric" />
            <span>Independent 43-Week Community DSA Archive</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] max-w-4xl mx-auto">
            Build the skills. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-primary dark:from-blue-400 dark:via-sky-300 dark:to-blue-500 bg-clip-text text-transparent">
              Continue the legacy.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A meticulously reconstructed 43-week roadmap covering Python fundamentals, core data structures, advanced graph theory, dynamic programming, and competitive programming.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/learn" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                endIcon={<ArrowRight className="h-4 w-4" />}
              >
                Explore 43-Week Curriculum
              </Button>
            </Link>
            <Link href="/practice" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Browse 180 Problems
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card variant="subtle" className="text-center p-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground">43</span>
              <p className="text-xs text-muted-foreground font-medium mt-1">Curriculum Weeks</p>
            </Card>
            <Card variant="subtle" className="text-center p-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground">180</span>
              <p className="text-xs text-muted-foreground font-medium mt-1">Curated Problems</p>
            </Card>
            <Card variant="subtle" className="text-center p-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground">41</span>
              <p className="text-xs text-muted-foreground font-medium mt-1">Lecture Slides</p>
            </Card>
            <Card variant="subtle" className="text-center p-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground">4</span>
              <p className="text-xs text-muted-foreground font-medium mt-1">Structured Phases</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4 Phases Overview Preview */}
      <section className="py-16 border-t border-border/60 bg-muted/20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="subtle" className="mb-3">Four Phases</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Progressive DSA Mastery Roadmap
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              From absolute Python fundamentals to international competitive programming algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phase 0 */}
            <Card variant="interactive" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <PhaseBadge phase="foundation" />
                <span className="text-xs font-semibold text-muted-foreground">Weeks 1–12</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Foundation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Python syntax, best coding practices, time & space complexity analysis (Big-O), the 7-step problem-solving method, built-in data structures (Lists, Tuples, Sets, Dictionaries), and object-oriented classes.
              </p>
              <ProgressBar value={100} size="sm" variant="foundation" label="12 Weeks Included" />
            </Card>

            {/* Phase 1 */}
            <Card variant="interactive" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <PhaseBadge phase="phase_1" />
                <span className="text-xs font-semibold text-muted-foreground">Weeks 13–25</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Core DSA</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Arrays, 2D Matrices, Elementary Sorting, Two Pointers, Sliding Window, Prefix Sum, Singly/Doubly Linked Lists, Stacks, Queues, Monotonic Structures, Recursion I, and Binary Search.
              </p>
              <ProgressBar value={100} size="sm" variant="core" label="13 Weeks Included" />
            </Card>

            {/* Phase 2 */}
            <Card variant="interactive" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <PhaseBadge phase="phase_2" />
                <span className="text-xs font-semibold text-muted-foreground">Weeks 26–36</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Advanced DSA</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Binary Trees, Binary Search Trees (BST), Backtracking & Combinatorics, Graph Theory, DFS, BFS, Heaps / Priority Queues, Greedy Optimization, Topological Sort (DAGs), and Dynamic Programming.
              </p>
              <ProgressBar value={100} size="sm" variant="advanced" label="11 Weeks Included" />
            </Card>

            {/* Phase 3 */}
            <Card variant="interactive" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <PhaseBadge phase="phase_3" />
                <span className="text-xs font-semibold text-muted-foreground">Weeks 37–43</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Competitive Programming</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Bitwise Manipulation, Disjoint Set Union (Union-Find), Advanced Sorting (Merge/Quick/Radix), Numerics & Number Theory (GCD, Primes, Sieve), Tries, Shortest Paths, and Advanced String Matching (KMP, Z-Algorithm).
              </p>
              <ProgressBar value={100} size="sm" variant="cp" label="7 Weeks Included" />
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Placeholder Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card glow className="p-8 sm:p-12 border-primary/30 bg-gradient-to-b from-card to-card-subtle">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Ready to start your 43-week journey?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6">
              Explore weekly curriculum modules, solve curated LeetCode & Codeforces problems, and inspect official lecture slides.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/dashboard">
                <Button variant="primary" size="lg" endIcon={<ArrowRight className="h-4 w-4" />}>
                  Open Scholar Dashboard
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="outline" size="lg">
                  View Full Roadmap
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
