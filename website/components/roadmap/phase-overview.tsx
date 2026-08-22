import React from "react";
import { getAllPhases, getPhaseStats } from "@/lib/curriculum";
import { Card } from "@/components/ui/card";
import { PhaseBadge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

export function PhaseOverview() {
  const phases = getAllPhases();

  const phaseDescriptions: Record<string, string> = {
    foundation:
      "Build strong programming fundamentals, problem-solving habits, and core Python skills.",
    phase_1:
      "Master essential data structures and algorithms through structured problem solving.",
    phase_2:
      "Explore graphs, dynamic programming, trees, greedy algorithms, and advanced problem solving.",
    phase_3:
      "Put your DSA skills to work through advanced techniques and competitive programming.",
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Curriculum Overview
        </h2>
        <span className="text-xs text-muted-foreground">Click a phase to jump to its modules</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map((phase) => {
          const stats = getPhaseStats(phase.id);
          const startWeek = Math.min(...phase.weeks);
          const endWeek = Math.max(...phase.weeks);
          const conciseDescription =
            phaseDescriptions[phase.id] || phase.description;

          return (
            <a
              key={phase.id}
              href={`#phase-${phase.id}`}
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl block"
            >
              <Card
                variant="interactive"
                className="p-5 h-full flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:shadow-card-hover"
              >
                <div className="space-y-3">
                  {/* Top Meta Row with clean non-overlapping badge and week range */}
                  <div className="flex items-center justify-between gap-2.5">
                    <PhaseBadge phase={phase.id} />
                    <span className="text-[11px] font-mono font-semibold text-muted-foreground px-2 py-0.5 rounded-md bg-muted/80 border border-border/50 shrink-0">
                      W{startWeek}–W{endWeek}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {phase.name}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {conciseDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-foreground">
                      {phase.totalWeeks} Weeks
                    </span>
                    <span>·</span>
                    <span>{stats.totalProblems} Problems</span>
                  </div>
                  <ArrowDown className="h-3.5 w-3.5 text-primary group-hover:translate-y-0.5 transition-transform shrink-0" />
                </div>
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}
