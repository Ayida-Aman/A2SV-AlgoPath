import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  Code2,
  Terminal,
  BookOpen,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, PhaseBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-primary/20 via-sky-500/15 to-transparent blur-3xl opacity-60 dark:opacity-40 rounded-full" />
      <div className="pointer-events-none absolute top-1/2 right-[-10%] w-[450px] h-[300px] bg-primary/10 blur-3xl rounded-full" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary-muted text-primary text-xs font-semibold shadow-sm animate-in fade-in duration-500">
              <Sparkles className="h-3.5 w-3.5 text-accent-electric animate-pulse" />
              <span>A 43-week DSA & Competitive Programming journey</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              Build the skills. <br />
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-primary dark:from-blue-400 dark:via-sky-300 dark:to-blue-500 bg-clip-text text-transparent">
                Continue the legacy.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A structured 43-week journey through DSA and competitive programming — built for students who are ready to grind. Master algorithms, solve curated problems, and stay consistent.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link href="/learn" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
                  endIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Start Your Journey →
                </Button>
              </Link>
              <Link href="/learn" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-medium"
                >
                  Explore the Roadmap
                </Button>
              </Link>
            </div>

            {/* Quick Micro-Proof Points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Zero fluff curriculum</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>LeetCode & Codeforces integration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>An independent community project shared publicly by A2SV students.</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity UI Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative behind glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 opacity-20 blur-xl dark:opacity-30" />

              {/* Main Product Card */}
              <Card className="relative overflow-hidden border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-card-hover">
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                      a2sv-legacy://roadmap/week-30
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold text-[11px]">
                    <Flame className="h-3.5 w-3.5 fill-amber-500" />
                    <span>14 Day Streak</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 space-y-5">
                  {/* Current Module Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <PhaseBadge phase="phase_2" />
                        <span className="text-xs font-semibold text-muted-foreground">Week 30 of 43</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground leading-tight">
                        Graph Traversal (DFS & BFS)
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Explore connected components, multi-source breadth-first search, and cycle detection.
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar Component */}
                  <div className="space-y-2 rounded-xl bg-muted/40 p-3.5 border border-border/40">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">Weekly Practice</span>
                      <span className="font-mono text-primary font-bold">12 / 15 Solved (80%)</span>
                    </div>
                    <ProgressBar
                      value={80}
                      variant="advanced"
                      size="md"
                      animated={false}
                    />
                  </div>

                  {/* Curated Problem Items */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Curated Practice Set
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-card border border-border/50 text-xs hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-2 font-medium text-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>Number of Islands</span>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                          LeetCode
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-card border border-border/50 text-xs hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-2 font-medium text-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>Rotting Oranges</span>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                          LeetCode
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-primary/5 border border-primary/30 text-xs">
                        <div className="flex items-center gap-2 font-semibold text-primary">
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-primary text-[9px]">
                            •
                          </span>
                          <span>Shortest Path in Binary Matrix</span>
                        </div>
                        <span className="text-[10px] font-semibold text-primary">
                          In Progress →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3 text-primary" />
                      <span>Lecture Slide: Graph Traversals.pdf</span>
                    </span>
                    <span className="font-semibold text-foreground">Cohort Pace: 100%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
