import React from "react";
import { getAllPhases, getAllWeeks } from "@/lib/curriculum";
import { WeekCard } from "@/components/roadmap/week-card";
import { PhaseBadge } from "@/components/ui/badge";
import { Layers, Sparkles } from "lucide-react";

export function RoadmapTimeline() {
  const phases = getAllPhases();
  const weeks = getAllWeeks();

  return (
    <div className="space-y-16 pt-8 pb-16">
      {phases.map((phase, pIdx) => {
        const phaseWeeks = weeks.filter((w) => phase.weeks.includes(w.weekNumber));
        const startWeek = Math.min(...phase.weeks);
        const endWeek = Math.max(...phase.weeks);

        return (
          <section
            key={phase.id}
            id={`phase-${phase.id}`}
            className="scroll-mt-32 space-y-6"
          >
            {/* Phase Header Banner */}
            <div className="rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card-subtle to-card p-6 sm:p-8 space-y-3 relative overflow-hidden shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground font-mono text-sm font-bold shadow-sm shadow-blue-500/30">
                    0{pIdx + 1}
                  </span>
                  <PhaseBadge phase={phase.id} />
                </div>
                <span className="text-xs font-mono font-bold text-muted-foreground px-3 py-1 rounded-full bg-secondary border border-border/60">
                  Weeks {startWeek} to {endWeek} · {phase.totalWeeks} Weeks Total
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {phase.name}
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-4xl">
                {phase.description}
              </p>
            </div>

            {/* Vertical Timeline Structure */}
            <div className="relative pl-6 sm:pl-8 md:pl-10 space-y-6 before:absolute before:left-[11px] sm:before:left-[15px] md:before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-primary before:via-border before:to-border/40">
              {phaseWeeks.map((week, wIdx) => (
                <div key={week.weekNumber} className="relative">
                  {/* Timeline Milestone Node */}
                  <div className="absolute -left-[24px] sm:-left-[28px] md:-left-[32px] top-6 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 border-primary shadow-sm shadow-blue-500/20">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </div>

                  {/* Week Card Component */}
                  <WeekCard week={week} index={wIdx} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
