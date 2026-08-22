import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, BookOpen, Code2, Sparkles, Trophy } from "lucide-react";
import { getWeekByNumber } from "@/lib/curriculum";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhaseBadge, StatusBadge } from "@/components/ui/badge";

interface ContinueLearningCardProps {
  nextIncompleteWeek: number | null;
  totalCompleted: number;
  loading?: boolean;
}

export function ContinueLearningCard({
  nextIncompleteWeek,
  totalCompleted,
  loading = false,
}: ContinueLearningCardProps) {
  if (loading) {
    return (
      <Card variant="default" className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-6 w-20 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-6 w-3/4 bg-muted/80 rounded animate-pulse" />
        <div className="h-16 w-full bg-muted/40 rounded animate-pulse" />
      </Card>
    );
  }

  // All 43 weeks completed
  if (totalCompleted === 43 || !nextIncompleteWeek) {
    return (
      <Card variant="default" className="border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-card to-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-500">
            <Trophy className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Curriculum Complete
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
            Congratulations! You&apos;ve completed all 43 weeks.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-xl">
            You have journeyed through Python foundations, core data structures, advanced graph algorithms, and competitive programming. Continue revisiting problem sets and practicing on coding platforms.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link href="/roadmap">
            <Button variant="primary" endIcon={<ArrowRight className="h-4 w-4" />}>
              Review Full Roadmap
            </Button>
          </Link>
          <Link href="/practice">
            <Button variant="outline">
              Practice Problem Catalog
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  const week = getWeekByNumber(nextIncompleteWeek);
  if (!week) return null;

  const problemCount = week.problems?.length || 0;
  const slideCount = week.materials?.length || 0;
  const objectives = week.learningObjectives || [];

  return (
    <Card variant="default" className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
              Continue Learning · Week {week.weekNumber}
            </span>
            <PhaseBadge phase={week.phase} />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            Week {week.weekNumber}: {week.title}
          </h2>
        </div>

        <Link href={`/roadmap/week/${week.weekNumber}`}>
          <Button variant="primary" size="sm" endIcon={<ArrowRight className="h-4 w-4" />}>
            Study Week {week.weekNumber}
          </Button>
        </Link>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {week.description}
      </p>

      {/* Learning Objectives Preview */}
      {objectives.length > 0 && (
        <div className="space-y-2 pt-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Core Objectives
          </h3>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {objectives.slice(0, 2).map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span className="line-clamp-1">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Module Meta Footer */}
      <div className="pt-3 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
            <Code2 className="h-3.5 w-3.5 text-primary" />
            <span>{problemCount} {problemCount === 1 ? "Problem" : "Problems"}</span>
          </span>
          {slideCount > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-sky-500" />
              <span>{slideCount} Slide Deck</span>
            </span>
          )}
        </div>

        <Link
          href={`/roadmap/week/${week.weekNumber}`}
          className="text-xs font-semibold text-primary hover:underline"
        >
          View Full Module Details →
        </Link>
      </div>
    </Card>
  );
}
