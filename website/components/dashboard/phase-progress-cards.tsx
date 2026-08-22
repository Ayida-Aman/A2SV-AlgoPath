import React from "react";
import Link from "next/link";
import { PhaseProgressSummary } from "@/lib/firebase/progress";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Layers, ChevronRight } from "lucide-react";

interface PhaseProgressCardsProps {
  phaseProgress: PhaseProgressSummary[];
  loading?: boolean;
}

export function PhaseProgressCards({
  phaseProgress,
  loading = false,
}: PhaseProgressCardsProps) {
  const getPhaseVariant = (phaseId: string) => {
    switch (phaseId) {
      case "foundation":
        return "foundation";
      case "phase_1":
        return "core";
      case "phase_2":
        return "advanced";
      case "phase_3":
        return "cp";
      default:
        return "primary";
    }
  };

  if (loading) {
    return (
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-muted/40 rounded-lg animate-pulse" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary shrink-0" />
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Phase Progression
          </h3>
        </div>
        <Link
          href="/roadmap"
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
        >
          <span>Roadmap</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {phaseProgress.map(({ phase, completedCount, totalWeeks, percentage }) => {
          const startWeek = Math.min(...phase.weeks);
          const endWeek = Math.max(...phase.weeks);

          return (
            <Link
              key={phase.id}
              href={`/roadmap#phase-${phase.id}`}
              className="block group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-lg"
            >
              <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-2.5 hover:border-primary/40 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {phase.name}
                    </div>
                    <div className="text-[11px] font-mono text-muted-foreground">
                      Weeks {startWeek}–{endWeek}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs shrink-0 whitespace-nowrap pt-0.5">
                    <span className="font-bold text-foreground">
                      {completedCount}/{totalWeeks}
                    </span>
                    <span className="text-[10px] font-semibold text-muted-foreground bg-muted/80 px-1.5 py-0.5 rounded border border-border/50">
                      {percentage}%
                    </span>
                  </div>
                </div>

                <ProgressBar
                  value={percentage}
                  size="sm"
                  variant={getPhaseVariant(phase.id)}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
