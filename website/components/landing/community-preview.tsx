"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Users,
  Flame,
  ArrowRight,
  Sparkles,
  Medal,
  ShieldCheck,
  AlertCircle,
  Code2,
} from "lucide-react";
import { useTopLeaderboard } from "@/lib/firebase/leaderboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

export function CommunityPreview() {
  const { topEntries, totalScholars, loading, error } = useTopLeaderboard(5);

  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Real Leaderboard Card */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative mx-auto max-w-lg">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-xl" />

              <Card className="relative p-6 sm:p-7 space-y-5 shadow-2xl border-border/80 bg-card/95 backdrop-blur-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground leading-tight">
                        Global Scholar Ranking
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        Real-time standings across 43 curriculum weeks
                      </p>
                    </div>
                  </div>
                  <Badge variant="subtle" className="text-[10px]">
                    Live Season
                  </Badge>
                </div>

                {/* State A: Loading Skeleton */}
                {loading && (
                  <div className="space-y-2.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-muted/20 animate-pulse"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-muted/60" />
                          <div className="h-8 w-8 rounded-full bg-muted/60" />
                          <div className="space-y-1.5">
                            <div className="h-3.5 w-24 bg-muted/60 rounded" />
                            <div className="h-2.5 w-32 bg-muted/40 rounded" />
                          </div>
                        </div>
                        <div className="h-5 w-16 bg-muted/50 rounded-full" />
                      </div>
                    ))}
                  </div>
                )}

                {/* State B: Error State */}
                {!loading && error && (
                  <div className="p-6 rounded-xl border border-destructive/30 bg-destructive/10 text-center space-y-2">
                    <AlertCircle className="h-6 w-6 text-destructive mx-auto" />
                    <p className="text-xs font-semibold text-foreground">
                      {error}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Leaderboard data will refresh automatically once connection is restored.
                    </p>
                  </div>
                )}

                {/* State C: Empty State */}
                {!loading && !error && topEntries.length === 0 && (
                  <div className="p-8 rounded-xl border border-dashed border-border/70 text-center space-y-3">
                    <Sparkles className="h-8 w-8 text-primary mx-auto opacity-70" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground">
                        Global ranking is just getting started
                      </p>
                      <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                        Be one of the first scholars to solve problems and claim the #1 spot on the leaderboard.
                      </p>
                    </div>
                    <div className="pt-2">
                      <Link href="/register">
                        <Button variant="primary" size="sm" className="text-xs font-semibold">
                          Join the Leaderboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                {/* State D: Real Ranking Rows */}
                {!loading && !error && topEntries.length > 0 && (
                  <div className="space-y-2.5">
                    {topEntries.map((scholar) => (
                      <div
                        key={scholar.uid}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          scholar.rank === 1
                            ? "bg-amber-500/5 border-amber-500/30 shadow-xs"
                            : scholar.rank === 2
                            ? "bg-slate-500/5 border-slate-400/30"
                            : scholar.rank === 3
                            ? "bg-amber-700/5 border-amber-700/30"
                            : "bg-muted/20 border-border/50 hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Rank Pill */}
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                              scholar.rank === 1
                                ? "bg-amber-500 text-white shadow-xs"
                                : scholar.rank === 2
                                ? "bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                                : scholar.rank === 3
                                ? "bg-amber-700 text-white"
                                : "bg-muted text-muted-foreground font-mono"
                            }`}
                          >
                            {scholar.rank}
                          </span>

                          {/* Avatar */}
                          <Avatar
                            name={scholar.displayName}
                            size="sm"
                            className="shrink-0"
                          />

                          {/* Scholar Info */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-foreground truncate">
                                {scholar.displayName}
                              </span>
                              {scholar.rank === 1 && (
                                <Medal className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground block truncate">
                              {scholar.completedWeeks} {scholar.completedWeeks === 1 ? "Week" : "Weeks"} · {scholar.solvedProblems} Solved
                            </span>
                          </div>
                        </div>

                        {/* Right: Points & Streak */}
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {scholar.currentStreak > 0 && (
                            <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                              <Flame className="h-3 w-3 fill-amber-500 text-amber-500" />
                              <span>{scholar.currentStreak}d</span>
                            </div>
                          )}

                          <div className="text-right">
                            <span className="text-xs font-extrabold font-mono text-primary block">
                              {scholar.totalPoints.toLocaleString()}
                            </span>
                            <span className="text-[9px] text-muted-foreground uppercase tracking-wider block">
                              pts
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer preview note */}
                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {totalScholars > 0
                      ? `${totalScholars} ${totalScholars === 1 ? "scholar" : "scholars"} competing`
                      : "Peer accountability standings"}
                  </span>
                  <Link
                    href="/leaderboard"
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-1 text-xs"
                  >
                    <span>View Full Leaderboard</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column: Copy & Community Teaser */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <Badge variant="subtle" className="font-semibold">
              Community & Accountability
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Don&apos;t grind alone. <br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
                Study with driven peers.
              </span>
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed">
              Studying Data Structures & Algorithms is an intense mental marathon. A2SV AlgoPath brings real-time peer accountability, friendly leaderboard competition, and structured daily routines to keep your momentum alive.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span>Authoritative Scoring</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Points mathematically derived from curriculum milestones, problem solutions, and active streaks.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                  <Flame className="h-4 w-4 text-amber-500" />
                  <span>Daily Grind & Streaks</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Build unbreakable daily problem-solving habits with curated 3-problem daily targets.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/leaderboard">
                <Button variant="outline" size="md" endIcon={<ArrowRight className="h-4 w-4" />}>
                  Explore Full Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
