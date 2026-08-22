"use client";

import React from "react";
import { ProblemItem } from "@/types";
import { getProblemId, getWeekByNumber } from "@/lib/curriculum";
import { ProblemCard } from "@/components/practice/problem-card";
import { Card } from "@/components/ui/card";
import { Code2 } from "lucide-react";

interface WeekProblemsProps {
  problems: ProblemItem[];
  weekNumber: number;
}

export function WeekProblems({ problems, weekNumber }: WeekProblemsProps) {
  if (!problems || problems.length === 0) {
    return (
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">
            Practice Problems (0)
          </h2>
        </div>
        <Card variant="subtle" className="p-6 text-center text-xs text-muted-foreground border-dashed">
          No external practice problems assigned for this foundation or consolidation week. Focus on the core coding standards and theoretical concepts.
        </Card>
      </section>
    );
  }

  const week = getWeekByNumber(weekNumber);
  const weekTitle = week?.title || `Week ${weekNumber}`;
  const phaseId = week?.phase || "foundation";
  const phaseName = week?.phaseName || "Foundation";

  const enrichedProblems = problems.map((p) => ({
    ...p,
    id: getProblemId(p),
    weekNumber,
    weekTitle,
    phaseId,
    phaseName,
    topicSummary: p.topics?.[0] || weekTitle,
  }));

  return (
    <section className="space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">
            Curated Practice Problems ({problems.length})
          </h2>
        </div>
        <span className="text-xs text-muted-foreground">
          Track problem completions synced across your curriculum
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {enrichedProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </section>
  );
}
