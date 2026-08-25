import React from "react";
import { Trophy, Flame, Code2, BookOpen, Star, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LeaderboardHeaderProps {
  currentUserRank: number | null;
  totalPoints: number;
  solvedProblems: number;
  completedWeeks: number;
  currentStreak: number;
  totalScholars: number;
  isOptedIn: boolean;
  onToggleOptIn: () => void;
  loading?: boolean;
}

export function LeaderboardHeader({
  currentUserRank,
  totalPoints,
  solvedProblems,
  completedWeeks,
  currentStreak,
  totalScholars,
  isOptedIn,
  onToggleOptIn,
  loading = false,
}: LeaderboardHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Title & Privacy Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="subtle">43-Week Curriculum</Badge>
            <span className="text-xs font-mono text-muted-foreground">
              {totalScholars} {totalScholars === 1 ? "Active Scholar" : "Active Scholars"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Scholar Leaderboard
          </h1>

          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Compete with fellow scholars, celebrate consistency, and climb the rankings through completed modules, solved problems, and daily streaks.
          </p>
        </div>

        {/* Hide / Show Privacy Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant={isOptedIn ? "outline" : "primary"}
            size="sm"
            onClick={onToggleOptIn}
            startIcon={isOptedIn ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4" />}
            className="text-xs font-semibold px-4"
          >
            {isOptedIn ? "Hide" : "Show"}
          </Button>
        </div>
      </div>

      {/* Scholar's Own Personal Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
        {/* Your Rank */}
        <Card className="p-3.5 space-y-1 bg-card border-border/70">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Trophy className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>Your Rank</span>
          </div>
          {loading ? (
            <div className="h-7 w-14 bg-muted rounded animate-pulse" />
          ) : (
            <div className="text-xl font-extrabold font-mono text-foreground">
              {isOptedIn && currentUserRank ? `#${currentUserRank}` : "Hidden"}
            </div>
          )}
        </Card>

        {/* Your Points */}
        <Card className="p-3.5 space-y-1 bg-card border-border/70">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Star className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>Total Points</span>
          </div>
          {loading ? (
            <div className="h-7 w-16 bg-muted rounded animate-pulse" />
          ) : (
            <div className="text-xl font-extrabold font-mono text-foreground">
              {totalPoints.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">pts</span>
            </div>
          )}
        </Card>

        {/* Problems Solved */}
        <Card className="p-3.5 space-y-1 bg-card border-border/70">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Code2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Problems Solved</span>
          </div>
          {loading ? (
            <div className="h-7 w-12 bg-muted rounded animate-pulse" />
          ) : (
            <div className="text-xl font-extrabold font-mono text-foreground">
              {solvedProblems} <span className="text-xs font-normal text-muted-foreground">/ 180</span>
            </div>
          )}
        </Card>

        {/* Weeks Completed */}
        <Card className="p-3.5 space-y-1 bg-card border-border/70">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <BookOpen className="h-3.5 w-3.5 text-sky-500 shrink-0" />
            <span>Weeks Done</span>
          </div>
          {loading ? (
            <div className="h-7 w-12 bg-muted rounded animate-pulse" />
          ) : (
            <div className="text-xl font-extrabold font-mono text-foreground">
              {completedWeeks} <span className="text-xs font-normal text-muted-foreground">/ 43</span>
            </div>
          )}
        </Card>

        {/* Current Streak */}
        <Card className="p-3.5 space-y-1 bg-card border-border/70 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0 fill-amber-500/30" />
            <span>Current Streak</span>
          </div>
          {loading ? (
            <div className="h-7 w-12 bg-muted rounded animate-pulse" />
          ) : (
            <div className="text-xl font-extrabold font-mono text-foreground">
              {currentStreak} <span className="text-xs font-normal text-muted-foreground">{currentStreak === 1 ? "day" : "days"}</span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
