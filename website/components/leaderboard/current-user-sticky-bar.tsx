import React from "react";
import { LeaderboardEntry } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Code2, BookOpen, Flame } from "lucide-react";

interface CurrentUserStickyBarProps {
  currentUserEntry: LeaderboardEntry | null;
}

export function CurrentUserStickyBar({
  currentUserEntry,
}: CurrentUserStickyBarProps) {
  if (!currentUserEntry) return null;

  return (
    <div className="sticky bottom-4 z-20 mx-auto max-w-4xl p-3 rounded-2xl border border-primary/40 bg-card/95 backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20 text-primary font-mono font-bold text-xs shrink-0">
            #{currentUserEntry.rank || "—"}
          </div>

          <Avatar
            name={currentUserEntry.displayName}
            src={currentUserEntry.photoURL || undefined}
            size="sm"
            className="ring-2 ring-primary shrink-0"
          />

          <div className="min-w-0">
            <span className="font-bold text-xs sm:text-sm text-foreground truncate block">
              {currentUserEntry.displayName}
              <span className="text-primary ml-1.5 text-xs font-semibold">(Your Position)</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
          <div className="flex items-center gap-1 font-mono font-bold text-primary">
            <Star className="h-3.5 w-3.5" />
            <span>{currentUserEntry.totalPoints.toLocaleString()} pts</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-mono text-[11px]">
              <Code2 className="h-3 w-3 text-emerald-500" />
              {currentUserEntry.solvedProblems} solved
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px]">
              <BookOpen className="h-3 w-3 text-sky-500" />
              {currentUserEntry.completedWeeks}w
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-foreground">
              <Flame className="h-3 w-3 text-amber-500 fill-amber-500/30" />
              {currentUserEntry.currentStreak}d
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
