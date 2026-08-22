import React from "react";
import { Code2, CheckCircle2, Trophy, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";

interface PracticeHeaderProps {
  solvedCount: number;
  totalCount: number;
  percentage: number;
  loading?: boolean;
}

export function PracticeHeader({
  solvedCount,
  totalCount,
  percentage,
  loading = false,
}: PracticeHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Title & Description */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Badge variant="subtle">Curated Problem Set</Badge>
          <span className="text-xs font-mono text-muted-foreground">
            {totalCount} Canonical Practice Problems
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Practice Problems
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Master the problems that power your 43-week A2SV learning journey. Solve on LeetCode, Codeforces, HackerRank, and Eolymp with cloud progress synchronization.
        </p>
      </div>

      {/* Progress Banner Card */}
      <Card className="p-5 space-y-3 bg-card border-border/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary shrink-0" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Problem Solving Progress
            </span>
          </div>

          {loading ? (
            <div className="h-4 w-28 bg-muted rounded animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">
                {solvedCount} <span className="text-xs text-muted-foreground font-normal">/ {totalCount} Solved</span>
              </span>
              <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                {percentage}%
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="h-2 w-full bg-muted/40 rounded-full animate-pulse" />
        ) : (
          <ProgressBar
            value={percentage}
            size="md"
            variant={percentage === 100 ? "cp" : "primary"}
          />
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-0.5">
          <span>
            {solvedCount === 0
              ? "Start solving problems to build your algorithmic problem solving profile."
              : solvedCount === totalCount
              ? "🎉 Outstanding! All 180 curriculum problems solved."
              : `${totalCount - solvedCount} problems remaining to complete the curriculum.`}
          </span>
        </div>
      </Card>
    </div>
  );
}
