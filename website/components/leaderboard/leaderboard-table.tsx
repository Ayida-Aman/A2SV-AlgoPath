import React from "react";
import { LeaderboardEntry } from "@/types";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Code2, BookOpen, Star, Medal } from "lucide-react";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string | null;
}

export function LeaderboardTable({
  entries,
  currentUserId,
}: LeaderboardTableProps) {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/20 text-amber-500 font-bold text-xs">
            1
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-400/20 text-slate-400 font-bold text-xs">
            2
          </span>
        );
      case 3:
        return (
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-700/20 text-amber-700 dark:text-amber-500 font-bold text-xs">
            3
          </span>
        );
      default:
        return (
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            #{rank}
          </span>
        );
    }
  };

  return (
    <Card className="overflow-hidden border-border/80">
      {/* Desktop / Tablet Semantic Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border/70 bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="py-3 px-4 w-16 text-center">Rank</th>
              <th className="py-3 px-4">Scholar</th>
              <th className="py-3 px-4 text-right">Points</th>
              <th className="py-3 px-4 text-center">Problems</th>
              <th className="py-3 px-4 text-center">Weeks</th>
              <th className="py-3 px-4 text-center">Streak</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {entries.map((entry) => {
              const isCurrentUser = entry.uid === currentUserId;

              return (
                <tr
                  key={entry.uid}
                  className={`transition-colors ${
                    isCurrentUser
                      ? "bg-primary/10 hover:bg-primary/15 font-semibold"
                      : "hover:bg-muted/30"
                  }`}
                >
                  {/* Rank */}
                  <td className="py-3 px-4 text-center">
                    {getRankBadge(entry.rank || 0)}
                  </td>

                  {/* Scholar Identity */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar
                        name={entry.displayName}
                        src={entry.photoURL || undefined}
                        size="sm"
                        className={isCurrentUser ? "ring-2 ring-primary" : ""}
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-foreground text-xs sm:text-sm truncate block">
                          {entry.displayName}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[10px] font-mono text-primary uppercase font-bold block">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Points */}
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono font-bold text-sm text-foreground">
                      {entry.totalPoints.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-muted-foreground ml-1">pts</span>
                  </td>

                  {/* Problems Solved */}
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
                      <Code2 className="h-3 w-3 text-emerald-500" />
                      <strong className="text-foreground">{entry.solvedProblems}</strong>/180
                    </span>
                  </td>

                  {/* Weeks Completed */}
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
                      <BookOpen className="h-3 w-3 text-sky-500" />
                      <strong className="text-foreground">{entry.completedWeeks}</strong>/43
                    </span>
                  </td>

                  {/* Current Streak */}
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-foreground">
                      <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500/40" />
                      {entry.currentStreak}d
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (< 640px) */}
      <div className="sm:hidden divide-y divide-border/40">
        {entries.map((entry) => {
          const isCurrentUser = entry.uid === currentUserId;

          return (
            <div
              key={entry.uid}
              className={`p-4 space-y-2.5 transition-colors ${
                isCurrentUser ? "bg-primary/10 border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 text-center shrink-0">
                    {getRankBadge(entry.rank || 0)}
                  </div>
                  <Avatar
                    name={entry.displayName}
                    src={entry.photoURL || undefined}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-foreground truncate block">
                      {entry.displayName}
                    </span>
                    {isCurrentUser && (
                      <span className="text-[10px] font-mono text-primary uppercase font-bold block">
                        You
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-bold font-mono text-foreground">
                    {entry.totalPoints.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-0.5">pts</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/30">
                <span className="inline-flex items-center gap-1 font-mono">
                  <Code2 className="h-3 w-3 text-emerald-500" />
                  <span>{entry.solvedProblems} solved</span>
                </span>
                <span className="inline-flex items-center gap-1 font-mono">
                  <BookOpen className="h-3 w-3 text-sky-500" />
                  <span>{entry.completedWeeks} weeks</span>
                </span>
                <span className="inline-flex items-center gap-1 font-mono font-semibold text-foreground">
                  <Flame className="h-3 w-3 text-amber-500 fill-amber-500/30" />
                  <span>{entry.currentStreak}d</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
