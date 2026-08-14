"use client";

import React, { useState, useEffect } from "react";
import { getAllPhases } from "@/lib/curriculum";
import { cn } from "@/lib/utils";

export function PhaseNav() {
  const phases = getAllPhases();
  const [activePhase, setActivePhase] = useState<string>("foundation");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const phase of phases) {
        const el = document.getElementById(`phase-${phase.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActivePhase(phase.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [phases]);

  return (
    <div className="sticky top-16 z-30 w-full py-3 -mx-4 px-4 sm:mx-0 sm:px-0 bg-background/90 backdrop-blur-md border-b border-border/60 transition-colors">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground shrink-0 mr-1 hidden sm:inline">
          Phases:
        </span>
        {phases.map((phase) => {
          const isActive = activePhase === phase.id;
          const startWeek = Math.min(...phase.weeks);
          const endWeek = Math.max(...phase.weeks);

          return (
            <a
              key={phase.id}
              href={`#phase-${phase.id}`}
              onClick={() => setActivePhase(phase.id)}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all shrink-0",
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-blue-500/20"
                  : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border-border/70"
              )}
            >
              <span>{phase.name}</span>
              <span
                className={cn(
                  "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                W{startWeek}–{endWeek}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
