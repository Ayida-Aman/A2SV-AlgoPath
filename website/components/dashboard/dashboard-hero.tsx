import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, PhaseBadge } from "@/components/ui/badge";
import { PhaseInfo } from "@/types";

interface DashboardHeroProps {
  displayName: string;
  currentPhase: PhaseInfo | null;
  nextIncompleteWeek: number | null;
  totalCompleted: number;
}

export function DashboardHero({
  displayName,
  currentPhase,
  nextIncompleteWeek,
  totalCompleted,
}: DashboardHeroProps) {
  const isCompletedAll = totalCompleted === 43;

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary-muted to-card p-6 md:p-8 space-y-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {isCompletedAll ? (
              <Badge variant="success" dot>
                Curriculum Completed
              </Badge>
            ) : currentPhase ? (
              <PhaseBadge phase={currentPhase.id} />
            ) : (
              <Badge variant="electric" dot>
                Active Scholar
              </Badge>
            )}
            <span className="text-xs font-mono text-muted-foreground">
              {isCompletedAll
                ? "43 of 43 Weeks Finished"
                : nextIncompleteWeek
                ? `Week ${nextIncompleteWeek} of 43 In Progress`
                : "Week 1 of 43"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Welcome back, {displayName}
          </h1>

          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            {isCompletedAll
              ? "You have completed all 43 weeks of the structured A2SV DSA learning journey. Continue practicing and mastering competitive programming."
              : "Continue your journey through the structured 43-week A2SV Legacy curriculum."}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {isCompletedAll ? (
            <Link href="/roadmap">
              <Button variant="primary" endIcon={<ArrowRight className="h-4 w-4" />}>
                Review Roadmap
              </Button>
            </Link>
          ) : (
            <Link href={`/roadmap/week/${nextIncompleteWeek || 1}`}>
              <Button variant="primary" endIcon={<ArrowRight className="h-4 w-4" />}>
                {nextIncompleteWeek && nextIncompleteWeek > 1
                  ? `Continue Week ${nextIncompleteWeek}`
                  : "Start Week 1"}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
