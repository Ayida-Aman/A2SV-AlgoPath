import React from "react";
import Link from "next/link";
import { WeekCurriculum } from "@/types";
import { Card } from "@/components/ui/card";
import { PhaseBadge } from "@/components/ui/badge";
import { Code2, FileText, ChevronRight } from "lucide-react";

interface WeekCardProps {
  week: WeekCurriculum;
  index: number;
}

export function WeekCard({ week }: WeekCardProps) {
  const problemCount = week.problems?.length || 0;
  const slideCount = week.materials?.length || 0;
  const concepts = week.concepts || [];
  const algorithms = week.algorithms || [];
  const dataStructures = week.dataStructures || [];

  return (
    <Link
      href={`/roadmap/week/${week.weekNumber}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
    >
      <Card
        variant="interactive"
        className="p-5 sm:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-card-hover"
      >
        <div className="space-y-4">
          {/* Top Row: Week Number & Phase Badge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {String(week.weekNumber).padStart(2, "0")}
              </span>
              <PhaseBadge phase={week.phase} />
            </div>

            <span className="text-[11px] font-mono text-muted-foreground font-medium">
              Week {week.weekNumber} of 43
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
              {week.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
              {week.description}
            </p>
          </div>

          {/* Concepts and Topics Tags */}
          {concepts.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex flex-wrap gap-1.5">
                {concepts.slice(0, 4).map((concept, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-flex text-[11px] px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50 font-medium"
                  >
                    {concept.name}
                  </span>
                ))}
                {concepts.length > 4 && (
                  <span className="inline-flex text-[11px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-medium">
                    +{concepts.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Algorithms & Data Structures Snippets if present */}
          {(algorithms.length > 0 || dataStructures.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
              {algorithms.length > 0 && (
                <span className="font-mono text-xs text-foreground/80">
                  ⚡ {algorithms.slice(0, 2).join(", ")}
                </span>
              )}
              {dataStructures.length > 0 && (
                <span className="font-mono text-xs text-foreground/80">
                  📦 {dataStructures.slice(0, 2).join(", ")}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Meta Row */}
        <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <Code2 className="h-3.5 w-3.5 text-primary" />
              <span>{problemCount} {problemCount === 1 ? "Problem" : "Problems"}</span>
            </span>

            {slideCount > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-accent-electric" />
                <span>{slideCount} {slideCount === 1 ? "Slide Deck" : "Slide Decks"}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
            <span>Study Week</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
