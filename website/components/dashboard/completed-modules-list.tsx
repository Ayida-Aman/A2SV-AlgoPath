import React from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { getWeekByNumber } from "@/lib/curriculum";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CompletedModulesListProps {
  completedWeeks: number[];
  loading?: boolean;
}

export function CompletedModulesList({
  completedWeeks,
  loading = false,
}: CompletedModulesListProps) {
  if (loading) {
    return (
      <Card className="p-5 space-y-3">
        <div className="h-4 w-36 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-muted/40 rounded-lg animate-pulse" />
          ))}
        </div>
      </Card>
    );
  }

  // If no completed weeks
  if (completedWeeks.length === 0) {
    return (
      <Card variant="subtle" className="p-5 text-center space-y-2 border-dashed border-border/70">
        <BookOpen className="h-5 w-5 text-muted-foreground mx-auto" />
        <h4 className="text-xs font-bold text-foreground">
          No Completed Modules Yet
        </h4>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
          Your completed weeks will appear here once you mark them complete during your studies.
        </p>
        <div className="pt-1">
          <Link href="/roadmap/week/1">
            <Button variant="outline" size="sm" className="text-xs">
              Start Week 1
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  // Sort completed weeks descending (highest week number first)
  const displayWeeks = [...completedWeeks].reverse().slice(0, 5);

  return (
    <Card className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
            Completed Modules ({completedWeeks.length})
          </h3>
        </div>
        <Link
          href="/roadmap"
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
        >
          <span>All Weeks</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="divide-y divide-border/40">
        {displayWeeks.map((weekNum) => {
          const week = getWeekByNumber(weekNum);
          if (!week) return null;

          return (
            <Link
              key={weekNum}
              href={`/roadmap/week/${weekNum}`}
              className="flex items-center justify-between py-2.5 group hover:bg-muted/30 px-2 -mx-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold shrink-0">
                  ✓
                </span>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate block">
                    Week {week.weekNumber}: {week.title}
                  </span>
                </div>
              </div>

              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
