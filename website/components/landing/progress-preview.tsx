import React from "react";
import { Flame, CheckCircle2, TrendingUp, Calendar, Trophy, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge, PhaseBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

export function ProgressPreview() {
  // 14 days sample activity dots
  const activityDays = [
    { day: "M", active: true, count: 3 },
    { day: "T", active: true, count: 4 },
    { day: "W", active: true, count: 2 },
    { day: "T", active: true, count: 5 },
    { day: "F", active: true, count: 3 },
    { day: "S", active: true, count: 6 },
    { day: "S", active: true, count: 4 },
    { day: "M", active: true, count: 3 },
    { day: "T", active: true, count: 2 },
    { day: "W", active: true, count: 5 },
    { day: "T", active: true, count: 4 },
    { day: "F", active: true, count: 3 },
    { day: "S", active: true, count: 7 },
    { day: "S", active: true, count: 5 },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/20 border-y border-border/60 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy */}
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="subtle" className="font-semibold">
              Discipline & Momentum
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Consistency compounds. <br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
                Track every step of your progress.
              </span>
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed">
              Mastering algorithmic problem solving isn&apos;t about cramming 50 problems in a weekend. It&apos;s about solving 2–3 problems every day across 43 disciplined weeks.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                  <Flame className="h-4 w-4 fill-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Daily Streak Counter</h3>
                  <p className="text-xs text-muted-foreground">Keep the flame alive by solving at least one problem daily.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Weekly Completion Goals</h3>
                  <p className="text-xs text-muted-foreground">Clear 100% of weekly curated problem sets and review slide decks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Phase Milestone Badges</h3>
                  <p className="text-xs text-muted-foreground">Unlock phase completion certificates as you advance to competitive programming.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Mock Dashboard Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg">
              {/* Subtle backglow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-primary opacity-15 blur-xl" />

              <Card className="relative p-6 sm:p-7 space-y-6 shadow-2xl border-border/80 bg-card/95 backdrop-blur-xl">
                {/* Header Stats Row */}
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      <Flame className="h-5 w-5 fill-amber-500 text-amber-500 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-lg font-extrabold text-foreground leading-none block">
                        14 Day Streak
                      </span>
                      <span className="text-[11px] text-muted-foreground">Personal best record</span>
                    </div>
                  </div>
                  <Badge variant="electric" dot>
                    Phase 1 Active
                  </Badge>
                </div>

                {/* Current Week Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">Week 18: Matrix Prefix Sums</span>
                    </div>
                    <span className="font-mono text-primary font-bold">12 / 15 (80%)</span>
                  </div>
                  <ProgressBar value={80} size="md" variant="core" animated={false} />
                </div>

                {/* 14-Day Activity Heatmap Preview */}
                <div className="space-y-2 rounded-xl bg-muted/40 p-4 border border-border/40">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>Last 14 Days Activity</span>
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">53 Problems Solved</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {activityDays.map((act, aIdx) => (
                      <div key={aIdx} className="space-y-1">
                        <div
                          className="h-8 w-full rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary"
                          title={`${act.count} problems solved`}
                        >
                          {act.count}
                        </div>
                        <span className="text-[9px] text-muted-foreground font-mono">{act.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer preview notice */}
                <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-accent-electric" />
                    <span>Progress Tracking Interface Preview</span>
                  </span>
                  <span className="font-semibold text-foreground">Cohort Pace: Top 5%</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
