import React from "react";
import Link from "next/link";
import { EnrichedProblem } from "@/lib/curriculum";
import { ProblemCard } from "@/components/practice/problem-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Code2, CheckCircle2 } from "lucide-react";

interface GrindProblemListProps {
  problems: EnrichedProblem[];
  isTodayComplete: boolean;
  loading?: boolean;
}

export function GrindProblemList({
  problems,
  isTodayComplete,
  loading = false,
}: GrindProblemListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-5 w-48 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 rounded-xl border border-border/60 bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!problems || problems.length === 0) {
    return (
      <Card variant="subtle" className="p-8 text-center space-y-3 border-dashed">
        <Sparkles className="h-6 w-6 text-primary mx-auto" />
        <h3 className="text-base font-bold text-foreground">
          No Daily Recommendations Available
        </h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Explore the full practice catalog to pick problems across any of the 43 curriculum weeks.
        </p>
        <div className="pt-2">
          <Link href="/practice">
            <Button variant="primary" size="sm">
              Browse Practice Problems
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-primary shrink-0" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Today&apos;s Recommended Problems ({problems.length})
          </h3>
        </div>

        <span className="text-xs text-muted-foreground">
          Selected for your active curriculum position
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {problems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>

      {isTodayComplete && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-foreground">
                Target achieved! Hungry for more?
              </p>
              <p className="text-[11px] text-muted-foreground">
                Continue solving curated problems from the 180-problem curriculum catalog.
              </p>
            </div>
          </div>

          <Link href="/practice">
            <Button
              variant="outline"
              size="sm"
              className="text-xs shrink-0 font-semibold"
              endIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Explore Practice Catalog
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
