import React from "react";
import { RecentGrindDay } from "@/lib/firebase/progress";
import { Card } from "@/components/ui/card";
import { Calendar, Check, Flame } from "lucide-react";

interface GrindHistoryProps {
  recentDays: RecentGrindDay[];
  currentStreak: number;
  loading?: boolean;
}

export function GrindHistory({
  recentDays,
  currentStreak,
  loading = false,
}: GrindHistoryProps) {
  return (
    <Card className="p-5 space-y-4 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary shrink-0" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Recent Grind Activity (Past 7 Days)
          </h3>
        </div>

        <span className="text-[11px] font-mono text-muted-foreground">
          {currentStreak > 0 ? `${currentStreak} day streak active` : "No active streak"}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {loading
          ? [1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl bg-muted/40 animate-pulse flex flex-col items-center justify-center gap-1"
              />
            ))
          : recentDays.map((day) => (
              <div
                key={day.dateKey}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  day.isCompleted
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : day.isToday
                    ? "bg-primary/5 border-primary/40 text-foreground ring-1 ring-primary/30"
                    : "bg-muted/20 border-border/50 text-muted-foreground"
                }`}
              >
                <span className="text-[11px] font-semibold tracking-tight">
                  {day.dayLabel}
                </span>

                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    day.isCompleted
                      ? "bg-emerald-500 text-white shadow-sm"
                      : day.isToday
                      ? "border border-dashed border-primary/60 text-primary"
                      : "bg-muted/40 text-muted-foreground/50 text-[10px]"
                  }`}
                >
                  {day.isCompleted ? (
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  ) : day.isToday ? (
                    <Flame className="h-3 w-3 text-amber-500 fill-amber-500" />
                  ) : (
                    "·"
                  )}
                </div>
              </div>
            ))}
      </div>
    </Card>
  );
}
