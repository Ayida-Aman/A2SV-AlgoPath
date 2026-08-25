import React from "react";
import { Flame, Trophy, CheckCircle2, Code2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface GrindStatsProps {
  currentStreak: number;
  longestStreak: number;
  todaySolvedCount: number;
  dailyTarget: number;
  solvedProblemsCount: number;
  totalProblemsCount: number;
  loading?: boolean;
}

export function GrindStats({
  currentStreak,
  longestStreak,
  todaySolvedCount,
  dailyTarget,
  solvedProblemsCount,
  totalProblemsCount,
  loading = false,
}: GrindStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* 1. Current Streak */}
      <Card className="p-4 space-y-1.5 bg-card">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Flame className="h-4 w-4 text-amber-500 shrink-0 fill-amber-500/30" />
          <span>Current Streak</span>
        </div>
        {loading ? (
          <div className="h-7 w-16 bg-muted rounded animate-pulse" />
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold font-mono text-foreground">
              {currentStreak}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {currentStreak === 1 ? "day" : "days"}
            </span>
          </div>
        )}
      </Card>

      {/* 2. Best Streak */}
      <Card className="p-4 space-y-1.5 bg-card">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Trophy className="h-4 w-4 text-primary shrink-0" />
          <span>Best Streak</span>
        </div>
        {loading ? (
          <div className="h-7 w-16 bg-muted rounded animate-pulse" />
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold font-mono text-foreground">
              {longestStreak}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {longestStreak === 1 ? "day" : "days"}
            </span>
          </div>
        )}
      </Card>

      {/* 3. Today's Progress */}
      <Card className="p-4 space-y-1.5 bg-card">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>Today&apos;s Goal</span>
        </div>
        {loading ? (
          <div className="h-7 w-16 bg-muted rounded animate-pulse" />
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold font-mono text-foreground">
              {todaySolvedCount}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              / {dailyTarget}
            </span>
          </div>
        )}
      </Card>

      {/* 4. Total Solved */}
      <Card className="p-4 space-y-1.5 bg-card">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Code2 className="h-4 w-4 text-sky-500 shrink-0" />
          <span>Total Solved</span>
        </div>
        {loading ? (
          <div className="h-7 w-20 bg-muted rounded animate-pulse" />
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold font-mono text-foreground">
              {solvedProblemsCount}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              / {totalProblemsCount}
            </span>
          </div>
        )}
      </Card>
    </div>
  );
}
