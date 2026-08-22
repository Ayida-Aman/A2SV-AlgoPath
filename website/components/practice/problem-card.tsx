"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { EnrichedProblem } from "@/lib/curriculum";
import { useProblemProgress } from "@/lib/firebase/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  CheckCircle2,
  Circle,
  Loader2,
  BookOpen,
  LogIn,
  X,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProblemCardProps {
  problem: EnrichedProblem;
  className?: string;
}

export function ProblemCard({ problem, className }: ProblemCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { solved, loading, isSaving, error, isAuthenticated, toggle } =
    useProblemProgress(problem.id);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const getPlatformClasses = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "leetcode":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30";
      case "codeforces":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30";
      case "hackerrank":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
      case "eolymp":
        return "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/30";
      case "geeksforgeeks":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30";
      case "kattis":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30";
      default:
        return "bg-secondary text-secondary-foreground border-border/60";
    }
  };

  const handleToggleSolved = async () => {
    setLocalError(null);

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      await toggle();
    } catch (err) {
      setLocalError("Unable to update solved state.");
    }
  };

  return (
    <>
      <Card
        variant="interactive"
        className={cn(
          "p-4 sm:p-5 flex flex-col justify-between group transition-all duration-200",
          solved
            ? "border-emerald-500/40 bg-emerald-500/[0.03] hover:border-emerald-500/60"
            : "hover:border-primary/50",
          className
        )}
      >
        <div className="space-y-3">
          {/* Top: Platform & Difficulty & Phase */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={cn(
                  "text-[11px] font-semibold px-2.5 py-0.5 rounded-full border",
                  getPlatformClasses(problem.platform)
                )}
              >
                {problem.platform}
              </span>

              {problem.difficulty && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50">
                  {problem.difficulty}
                </span>
              )}
            </div>

            {/* Curriculum Week Breadcrumb Link */}
            <Link
              href={`/roadmap/week/${problem.weekNumber}`}
              className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-muted-foreground hover:text-primary transition-colors shrink-0"
              title={`Go to Week ${problem.weekNumber}: ${problem.weekTitle}`}
            >
              <BookOpen className="h-3 w-3" />
              <span>W{problem.weekNumber}</span>
            </Link>
          </div>

          {/* Main: Title & Curriculum Association */}
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
              <a
                href={problem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline focus-visible:outline-none"
              >
                {problem.title}
              </a>
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link
                href={`/roadmap/week/${problem.weekNumber}`}
                className="hover:text-foreground transition-colors hover:underline truncate"
              >
                Week {problem.weekNumber} · {problem.weekTitle}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Actions: Solve Status Toggle + External Solve Link */}
        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between gap-2">
          {loading ? (
            <div className="h-7 w-24 bg-muted/50 rounded animate-pulse" />
          ) : (
            <Button
              onClick={handleToggleSolved}
              variant={solved ? "secondary" : "outline"}
              size="sm"
              disabled={isSaving}
              startIcon={
                isSaving ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                ) : solved ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                )
              }
              className={cn(
                "h-7 text-xs font-semibold px-2.5 transition-colors cursor-pointer",
                solved
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                  : "hover:border-primary/50 text-muted-foreground hover:text-foreground"
              )}
              aria-label={
                solved
                  ? `Mark ${problem.title} as unsolved`
                  : `Mark ${problem.title} as solved`
              }
            >
              {isSaving ? "Saving..." : solved ? "Solved" : "Mark Solved"}
            </Button>
          )}

          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline group/link py-1 px-2 rounded-md hover:bg-primary/5 transition-colors"
          >
            <span>Solve Problem</span>
            <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Inline Error Notice */}
        {(localError || error) && (
          <div className="mt-1.5 flex items-center gap-1 text-[11px] text-destructive">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>{localError || error}</span>
          </div>
        )}
      </Card>

      {/* Guest Sign-In Prompt Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm rounded-2xl border border-border/80 bg-card p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1.5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <LogIn className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Sign in to track solved problems
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Create a free account or sign in to track your solved problems across all 43 weeks and sync your progress.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="primary"
                className="w-full justify-center font-semibold"
                onClick={() => {
                  setShowAuthModal(false);
                  const redirectTarget = pathname || "/practice";
                  router.push(`/login?redirect=${encodeURIComponent(redirectTarget)}`);
                }}
              >
                Sign In / Register
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-center text-xs"
                onClick={() => setShowAuthModal(false)}
              >
                Continue Exploring
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
