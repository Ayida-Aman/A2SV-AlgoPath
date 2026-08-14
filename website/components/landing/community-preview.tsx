import React from "react";
import Link from "next/link";
import { Trophy, Users, Flame, ArrowRight, Sparkles, Medal, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

export function CommunityPreview() {
  const topScholars = [
    {
      rank: 1,
      name: "Baka Codes",
      role: "Cohort Pioneer",
      weeksCompleted: 43,
      problemsSolved: 180,
      streak: 43,
      badge: "Rank #1",
      avatarStatus: "online" as const,
    },
    {
      rank: 2,
      name: "Kidus M.",
      role: "Advanced Scholar",
      weeksCompleted: 42,
      problemsSolved: 174,
      streak: 38,
      badge: "Rank #2",
      avatarStatus: "online" as const,
    },
    {
      rank: 3,
      name: "Selamawit T.",
      role: "Core Scholar",
      weeksCompleted: 40,
      problemsSolved: 165,
      streak: 29,
      badge: "Rank #3",
      avatarStatus: "busy" as const,
    },
    {
      rank: 4,
      name: "Yosef K.",
      role: "Core Scholar",
      weeksCompleted: 38,
      problemsSolved: 152,
      streak: 21,
      badge: "Rank #4",
      avatarStatus: "offline" as const,
    },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mock Leaderboard Card */}
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
                        Cohort Global Ranking
                      </h3>
                      <p className="text-[11px] text-muted-foreground">Updated weekly upon contest submissions</p>
                    </div>
                  </div>
                  <Badge variant="subtle">Season 1</Badge>
                </div>

                {/* Ranking Rows */}
                <div className="space-y-2.5">
                  {topScholars.map((scholar) => (
                    <div
                      key={scholar.rank}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        scholar.rank === 1
                          ? "bg-primary/5 border-primary/40 shadow-xs"
                          : "bg-muted/30 border-border/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            scholar.rank === 1
                              ? "bg-amber-500 text-white"
                              : scholar.rank === 2
                              ? "bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                              : scholar.rank === 3
                              ? "bg-amber-700 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {scholar.rank}
                        </span>
                        <Avatar
                          name={scholar.name}
                          size="sm"
                          status={scholar.avatarStatus}
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-foreground">
                              {scholar.name}
                            </span>
                            {scholar.rank === 1 && (
                              <Medal className="h-3 w-3 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {scholar.weeksCompleted} Weeks · {scholar.problemsSolved} Solved
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                          <Flame className="h-3.5 w-3.5 fill-amber-500" />
                          <span>{scholar.streak}d</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer preview note */}
                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Peer accountability rankings</span>
                  <Link href="/leaderboard" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
                    <span>View All</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column: Copy & Grind Rooms Teaser */}
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
              Studying Data Structures & Algorithms is an intense mental challenge. A2SV Legacy is built around peer accountability, friendly competition, and shared study rooms.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-card border border-border/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Cohort Leaderboards</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Compete on problem solve count and daily consistency without toxic vanity metrics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent-electric" />
                  <h3 className="text-sm font-bold text-foreground">Virtual Grind Rooms</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Join timed Pomodoro study sessions with other engineers solving the same weekly modules.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link href="/leaderboard">
                <Button variant="outline" size="md">
                  Explore Leaderboard
                </Button>
              </Link>
              <Link href="/grind">
                <Button variant="ghost" size="md" endIcon={<ArrowRight className="h-4 w-4" />}>
                  Preview Grind Rooms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
