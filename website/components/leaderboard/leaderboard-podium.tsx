import React from "react";
import { LeaderboardEntry } from "@/types";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Code2, BookOpen } from "lucide-react";

interface LeaderboardPodiumProps {
  podiumEntries: LeaderboardEntry[];
  currentUserId?: string | null;
  loading?: boolean;
}

export function LeaderboardPodium({
  podiumEntries,
  currentUserId,
  loading = false,
}: LeaderboardPodiumProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 rounded-2xl border border-border/60 bg-muted/30 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!podiumEntries || podiumEntries.length === 0) {
    return null;
  }

  const firstPlace = podiumEntries[0];
  const secondPlace = podiumEntries[1] || null;
  const thirdPlace = podiumEntries[2] || null;

  // Case 1: Exactly 1 scholar -> Center prominently
  if (podiumEntries.length === 1 && firstPlace) {
    return (
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500 shrink-0" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Top Performing Scholar
          </h2>
        </div>

        <div className="max-w-md mx-auto">
          <Card
            glow
            className={`p-6 md:p-7 text-center space-y-3.5 border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-card to-card shadow-lg ${
              firstPlace.uid === currentUserId ? "ring-2 ring-amber-500/60" : ""
            }`}
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 font-extrabold text-base shadow-sm">
              <Trophy className="h-5 w-5" />
            </div>

            <Avatar
              name={firstPlace.displayName}
              src={firstPlace.photoURL || undefined}
              size="xl"
              status="online"
              className="mx-auto ring-4 ring-amber-500/30"
            />

            <div>
              <h3 className="text-lg font-extrabold text-foreground truncate">
                {firstPlace.displayName}
                {firstPlace.uid === currentUserId && " (You)"}
              </h3>
              <p className="text-sm font-mono font-bold text-amber-500 dark:text-amber-400 mt-0.5">
                {firstPlace.totalPoints.toLocaleString()} points
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-mono font-medium">
                <Code2 className="h-3.5 w-3.5 text-emerald-500" />
                {firstPlace.solvedProblems} solved
              </span>
              <span className="inline-flex items-center gap-1 font-mono font-medium">
                <BookOpen className="h-3.5 w-3.5 text-sky-500" />
                {firstPlace.completedWeeks} weeks
              </span>
              <span className="inline-flex items-center gap-1 font-mono font-medium">
                <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500/30" />
                {firstPlace.currentStreak}d
              </span>
            </div>

            <Badge variant="electric" dot className="text-xs font-semibold">
              Rank #1 · Lead Scholar
            </Badge>
          </Card>
        </div>
      </div>
    );
  }

  // Case 2: Exactly 2 scholars -> 2-column balanced layout
  if (podiumEntries.length === 2 && firstPlace && secondPlace) {
    return (
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500 shrink-0" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Top Performing Scholars
          </h2>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          {/* 1st Place */}
          <Card
            glow
            className={`p-6 text-center space-y-3.5 border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-card to-card shadow-lg ${
              firstPlace.uid === currentUserId ? "ring-2 ring-amber-500/60" : ""
            }`}
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 font-extrabold text-base shadow-sm">
              <Trophy className="h-5 w-5" />
            </div>

            <Avatar
              name={firstPlace.displayName}
              src={firstPlace.photoURL || undefined}
              size="lg"
              status="online"
              className="mx-auto ring-4 ring-amber-500/30"
            />

            <div>
              <h3 className="font-extrabold text-foreground truncate">
                {firstPlace.displayName}
                {firstPlace.uid === currentUserId && " (You)"}
              </h3>
              <p className="text-xs font-mono font-bold text-amber-500 dark:text-amber-400 mt-0.5">
                {firstPlace.totalPoints.toLocaleString()} pts
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-mono">
                <Code2 className="h-3 w-3 text-emerald-500" />
                {firstPlace.solvedProblems}
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                <BookOpen className="h-3 w-3 text-sky-500" />
                {firstPlace.completedWeeks}w
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                <Flame className="h-3 w-3 text-amber-500" />
                {firstPlace.currentStreak}d
              </span>
            </div>

            <Badge variant="electric" dot className="text-[10px] font-semibold">
              Rank #1 · Lead Scholar
            </Badge>
          </Card>

          {/* 2nd Place */}
          <Card
            variant="subtle"
            className={`p-6 text-center space-y-3 transition-all ${
              secondPlace.uid === currentUserId
                ? "border-primary/50 ring-1 ring-primary/40 bg-primary/5"
                : ""
            }`}
          >
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-slate-400/20 text-slate-400 font-extrabold text-sm">
              #2
            </div>

            <Avatar
              name={secondPlace.displayName}
              src={secondPlace.photoURL || undefined}
              size="lg"
              className="mx-auto ring-2 ring-slate-400/30"
            />

            <div>
              <h3 className="font-bold text-foreground truncate">
                {secondPlace.displayName}
                {secondPlace.uid === currentUserId && " (You)"}
              </h3>
              <p className="text-xs font-mono font-bold text-primary mt-0.5">
                {secondPlace.totalPoints.toLocaleString()} pts
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-mono">
                <Code2 className="h-3 w-3 text-emerald-500" />
                {secondPlace.solvedProblems}
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                <BookOpen className="h-3 w-3 text-sky-500" />
                {secondPlace.completedWeeks}w
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                <Flame className="h-3 w-3 text-amber-500" />
                {secondPlace.currentStreak}d
              </span>
            </div>

            <Badge variant="secondary" className="text-[10px]">
              Rank #2 · Silver Scholar
            </Badge>
          </Card>
        </div>
      </div>
    );
  }

  // Case 3: 3 or more scholars -> Full 3-column Olympic Podium
  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center gap-2">
        <Trophy className="h-4 w-4 text-amber-500 shrink-0" />
        <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Top Performing Scholars
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* 2nd Place (Left on Desktop, 2nd on Mobile) */}
        {secondPlace && (
          <Card
            variant="subtle"
            className={`p-6 text-center space-y-3 order-2 md:order-1 transition-all ${
              secondPlace.uid === currentUserId
                ? "border-primary/50 ring-1 ring-primary/40 bg-primary/5"
                : ""
            }`}
          >
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-slate-400/20 text-slate-400 font-extrabold text-sm">
              #2
            </div>

            <Avatar
              name={secondPlace.displayName}
              src={secondPlace.photoURL || undefined}
              size="lg"
              className="mx-auto ring-2 ring-slate-400/30"
            />

            <div>
              <h3 className="font-bold text-foreground truncate">
                {secondPlace.displayName}
                {secondPlace.uid === currentUserId && " (You)"}
              </h3>
              <p className="text-xs font-mono font-bold text-primary mt-0.5">
                {secondPlace.totalPoints.toLocaleString()} pts
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-mono">
                <Code2 className="h-3 w-3 text-emerald-500" />
                {secondPlace.solvedProblems}
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                <BookOpen className="h-3 w-3 text-sky-500" />
                {secondPlace.completedWeeks}w
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                <Flame className="h-3 w-3 text-amber-500" />
                {secondPlace.currentStreak}d
              </span>
            </div>

            <Badge variant="secondary" className="text-[10px]">
              Rank #2 · Silver Scholar
            </Badge>
          </Card>
        )}

        {/* 1st Place (Center on Desktop, 1st on Mobile) */}
        {firstPlace && (
          <Card
            glow
            className={`p-6 md:p-7 text-center space-y-3.5 order-1 md:order-2 border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-card to-card shadow-lg ${
              firstPlace.uid === currentUserId
                ? "ring-2 ring-amber-500/60"
                : ""
            }`}
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 font-extrabold text-base shadow-sm">
              <Trophy className="h-5 w-5" />
            </div>

            <Avatar
              name={firstPlace.displayName}
              src={firstPlace.photoURL || undefined}
              size="xl"
              status="online"
              className="mx-auto ring-4 ring-amber-500/30"
            />

            <div>
              <h3 className="text-lg font-extrabold text-foreground truncate">
                {firstPlace.displayName}
                {firstPlace.uid === currentUserId && " (You)"}
              </h3>
              <p className="text-sm font-mono font-bold text-amber-500 dark:text-amber-400 mt-0.5">
                {firstPlace.totalPoints.toLocaleString()} points
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-mono font-medium">
                <Code2 className="h-3.5 w-3.5 text-emerald-500" />
                {firstPlace.solvedProblems} solved
              </span>
              <span className="inline-flex items-center gap-1 font-mono font-medium">
                <BookOpen className="h-3.5 w-3.5 text-sky-500" />
                {firstPlace.completedWeeks} weeks
              </span>
              <span className="inline-flex items-center gap-1 font-mono font-medium">
                <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500/30" />
                {firstPlace.currentStreak}d
              </span>
            </div>

            <Badge variant="electric" dot className="text-xs font-semibold">
              Rank #1 · Lead Scholar
            </Badge>
          </Card>
        )}

        {/* 3rd Place (Right on Desktop, 3rd on Mobile) */}
        {thirdPlace && (
          <Card
            variant="subtle"
            className={`p-6 text-center space-y-3 order-3 transition-all ${
              thirdPlace.uid === currentUserId
                ? "border-primary/50 ring-1 ring-primary/40 bg-primary/5"
                : ""
            }`}
          >
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-amber-700/20 text-amber-700 dark:text-amber-500 font-extrabold text-sm">
              #3
            </div>

            <Avatar
              name={thirdPlace.displayName}
              src={thirdPlace.photoURL || undefined}
              size="lg"
              className="mx-auto ring-2 ring-amber-700/30"
            />

            <div>
              <h3 className="font-bold text-foreground truncate">
                {thirdPlace.displayName}
                {thirdPlace.uid === currentUserId && " (You)"}
              </h3>
              <p className="text-xs font-mono font-bold text-primary mt-0.5">
                {thirdPlace.totalPoints.toLocaleString()} pts
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-mono">
                <Code2 className="h-3 w-3 text-emerald-500" />
                {thirdPlace.solvedProblems}
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                <BookOpen className="h-3 w-3 text-sky-500" />
                {thirdPlace.completedWeeks}w
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                <Flame className="h-3 w-3 text-amber-500" />
                {thirdPlace.currentStreak}d
              </span>
            </div>

            <Badge variant="secondary" className="text-[10px]">
              Rank #3 · Bronze Scholar
            </Badge>
          </Card>
        )}
      </div>
    </div>
  );
}
