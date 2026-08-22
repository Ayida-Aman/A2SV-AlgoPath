import React from "react";
import { BookOpen, CheckCircle2, Trophy, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

interface ProgressOverviewCardProps {
  completedCount: number;
  totalWeeks: number;
  percentage: number;
  loading?: boolean;
}

export function ProgressOverviewCard({
  completedCount,
  totalWeeks,
  percentage,
  loading = false,
}: ProgressOverviewCardProps) {
  if (loading) {
    return (
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Overall Curriculum Progress
          </span>
          <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="h-8 w-32 bg-muted/60 rounded animate-pulse" />
        <div className="h-2 w-full bg-muted/40 rounded-full animate-pulse" />
      </Card>
    );
  }

  return (
    <Card className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Curriculum Progress
        </span>
        <BookOpen className="h-4 w-4 text-primary shrink-0" />
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {completedCount} <span className="text-muted-foreground text-sm font-semibold">/ {totalWeeks}</span>
          </span>
          <span className="text-xs text-muted-foreground font-medium">Weeks</span>
        </div>
        <span className="text-sm font-bold font-mono text-primary px-2 py-0.5 rounded-md bg-primary/10">
          {percentage}%
        </span>
      </div>

      <ProgressBar
        value={percentage}
        size="md"
        variant={percentage === 100 ? "cp" : "primary"}
        className="mt-2"
      />

      <p className="text-[11px] text-muted-foreground pt-1">
        {completedCount === 0
          ? "Begin your journey by starting Week 1."
          : completedCount === totalWeeks
          ? "Mastery achieved! All 43 modules completed."
          : `${totalWeeks - completedCount} ${totalWeeks - completedCount === 1 ? "week" : "weeks"} remaining in the learning path.`}
      </p>
    </Card>
  );
}
