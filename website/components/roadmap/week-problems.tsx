import React from "react";
import { ProblemItem } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, ExternalLink, Circle, CheckCircle2 } from "lucide-react";

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
          Solve on verified coding platforms
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {problems.map((problem, idx) => {
          return (
            <Card
              key={idx}
              variant="interactive"
              className="p-4 sm:p-5 flex flex-col justify-between group hover:border-primary/50"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getPlatformClasses(
                      problem.platform
                    )}`}
                  >
                    {problem.platform}
                  </span>

                  <span className="text-[11px] font-mono text-muted-foreground">
                    #{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {problem.title}
                  </h3>
                  {problem.difficulty && (
                    <span className="text-[11px] font-semibold text-muted-foreground mt-0.5 block">
                      Difficulty: {problem.difficulty}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground font-mono truncate max-w-[140px]">
                  {problem.platform}
                </span>

                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline group/link"
                >
                  <span>Solve Problem</span>
                  <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
