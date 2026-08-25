import React from "react";
import Link from "next/link";
import { Flame, CheckCircle2, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GrindHeroProps {
  currentStreak: number;
  todaySolvedCount: number;
  dailyTarget: number;
  isTodayComplete: boolean;
  percentage: number;
  loading?: boolean;
}

export function GrindHero({
  currentStreak,
  todaySolvedCount,
  dailyTarget,
  isTodayComplete,
  percentage,
  loading = false,
}: GrindHeroProps) {
  const remainingCount = Math.max(0, dailyTarget - todaySolvedCount);

  return (
    <div className="space-y-4">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="electric" dot>
              Daily Coding Routine
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">
              Target: {dailyTarget} Problems / Day
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Today&apos;s Grind
          </h1>

          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            Curated daily problem sets aligned with your curriculum position. Keep your streak alive and sharpen your problem-solving muscle.
          </p>
        </div>

        {/* Current Streak Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-sm">
            <Flame className="h-5 w-5 fill-amber-500 text-amber-500 animate-pulse" />
            <div className="text-left">
              <span className="text-xs font-medium block uppercase tracking-wider text-muted-foreground text-[10px]">
                Active Streak
              </span>
              <span className="text-base font-extrabold font-mono">
                {currentStreak} {currentStreak === 1 ? "Day" : "Days"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Today Progress Banner */}
      <Card
        className={`p-6 space-y-4 transition-all duration-300 ${
          isTodayComplete
            ? "border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-card to-card"
            : "border-border/80 bg-card"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {isTodayComplete ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            ) : (
              <Flame className="h-5 w-5 text-amber-500 shrink-0" />
            )}
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {isTodayComplete
                ? "🎉 Today's Grind Target Complete!"
                : "Daily Practice Goal"}
            </h2>
          </div>

          {loading ? (
            <div className="h-5 w-24 bg-muted rounded animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold font-mono text-foreground">
                {todaySolvedCount} <span className="text-xs text-muted-foreground font-normal">/ {dailyTarget} Solved</span>
              </span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isTodayComplete
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {percentage}%
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="h-2.5 w-full bg-muted/40 rounded-full animate-pulse" />
        ) : (
          <ProgressBar
            value={percentage}
            size="md"
            variant={isTodayComplete ? "cp" : "foundation"}
          />
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
          <span>
            {isTodayComplete
              ? "All 3 daily problems completed. Your streak is secured for today!"
              : remainingCount === 1
              ? "🔥 Just 1 more problem to complete today's grind!"
              : `${remainingCount} problems remaining to complete today's target.`}
          </span>

          {isTodayComplete && (
            <Link href="/practice" className="shrink-0">
              <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold text-primary" endIcon={<ArrowRight className="h-3 w-3" />}>
                Explore Full Practice Catalog
              </Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
}
