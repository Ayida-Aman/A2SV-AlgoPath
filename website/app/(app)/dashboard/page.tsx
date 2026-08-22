import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Flame,
  Trophy,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, PhaseBadge, StatusBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

export const metadata = {
  title: "Dashboard — A2SV Legacy",
};

export default function DashboardPage() {
  return (
    <AppLayout requireAuth>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary-muted to-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="electric" dot>
                  Foundation Phase Active
                </Badge>
                <span className="text-xs text-muted-foreground">Week 1 of 43</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                Welcome to your DSA Journey
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                You are currently exploring <strong className="text-foreground">Week 1: Onboarding & Best Coding Practices</strong>. Master clean code standards before diving into algorithmic problem solving.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/learn">
                <Button variant="primary" endIcon={<ArrowRight className="h-4 w-4" />}>
                  Continue Week 1
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Curriculum
              </span>
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">1 / 43</span>
              <span className="text-xs text-muted-foreground">Weeks Started</span>
            </div>
            <ProgressBar value={2.3} size="sm" variant="primary" className="mt-3" />
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Problems
              </span>
              <Code2 className="h-4 w-4 text-accent-electric" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">0 / 180</span>
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <ProgressBar value={0} size="sm" variant="electric" className="mt-3" />
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Daily Streak
              </span>
              <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">1 Day</span>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Active Streak</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">Solve 1 problem today to keep streak</p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Current Phase
              </span>
              <Sparkles className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">Foundation</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">Weeks 1–12 · Python & Math</p>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Week Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="default">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <PhaseBadge phase="foundation" />
                    <StatusBadge status="in_progress" />
                  </div>
                  <CardTitle className="text-xl">Week 1: Onboarding & Best Coding Practices</CardTitle>
                </div>
                <Link href="/learn">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Introduces the A2SV DSA learning journey and core engineering standards for writing clean, readable, and maintainable code from day one.
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Learning Objectives
                  </h4>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>Set up competitive programming accounts on LeetCode, Codeforces, and HackerRank.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>Apply meaningful naming, DRY principles, and modular single-purpose functions.</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/40 pt-4 flex justify-between text-xs text-muted-foreground">
                <span>Lecture Slide: A2SV Python Track - Best Coding Practices.pdf</span>
                <span className="font-medium text-primary">0 / 3 Action Items Done</span>
              </CardFooter>
            </Card>

            {/* Next Up Preview */}
            <Card variant="subtle" className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Next Up
                  </span>
                  <h4 className="text-sm font-bold text-foreground mt-0.5">
                    Week 2: Python Fundamentals, Conditionals, Loops & Functions
                  </h4>
                </div>
                <Link href="/learn">
                  <Button variant="ghost" size="sm" endIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    Preview
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Sidebar / Phase Roadmap Quick Navigator */}
          <div className="space-y-6">
            <Card className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-foreground tracking-tight">
                Curriculum Progression
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Foundation</span>
                    <span className="text-muted-foreground">Weeks 1–12</span>
                  </div>
                  <ProgressBar value={8.3} size="sm" variant="foundation" />
                </div>

                <div className="p-3 rounded-lg bg-muted/40 border border-border/60 space-y-1.5 opacity-70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">Phase 1 — Core DSA</span>
                    <span className="text-muted-foreground">Weeks 13–25</span>
                  </div>
                  <ProgressBar value={0} size="sm" variant="core" />
                </div>

                <div className="p-3 rounded-lg bg-muted/40 border border-border/60 space-y-1.5 opacity-70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">Phase 2 — Advanced DSA</span>
                    <span className="text-muted-foreground">Weeks 26–36</span>
                  </div>
                  <ProgressBar value={0} size="sm" variant="advanced" />
                </div>

                <div className="p-3 rounded-lg bg-muted/40 border border-border/60 space-y-1.5 opacity-70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">Phase 3 — Competitive Prog.</span>
                    <span className="text-muted-foreground">Weeks 37–43</span>
                  </div>
                  <ProgressBar value={0} size="sm" variant="cp" />
                </div>
              </div>

              <Link href="/learn" className="block pt-2">
                <Button variant="outline" className="w-full justify-center text-xs">
                  Browse All 43 Weeks
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
