import React from "react";
import { stats } from "@/lib/curriculum-data";
import { Card } from "@/components/ui/card";
import { BookOpen, Code2, Layers, FileText, Globe } from "lucide-react";

export function Stats() {
  const statItems = [
    {
      label: "Curriculum Weeks",
      value: `${stats.totalWeeks}`,
      detail: "Structured weekly units",
      icon: BookOpen,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Curated Problems",
      value: `${stats.totalProblems}+`,
      detail: "LeetCode & Codeforces",
      icon: Code2,
      color: "text-sky-600 dark:text-sky-400",
    },
    {
      label: "Mastery Phases",
      value: `${stats.totalPhases}`,
      detail: "From Python to CP",
      icon: Layers,
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Lecture Slide Decks",
      value: `${stats.totalSlides}`,
      detail: "Official study materials",
      icon: FileText,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Coding Platforms",
      value: `${stats.totalPlatforms}`,
      detail: "Multi-platform practice",
      icon: Globe,
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <section className="py-12 border-y border-border/60 bg-muted/20 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Curriculum Breakdown
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
            Everything you need to keep grinding.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                variant="subtle"
                className="p-4 sm:p-5 text-center flex flex-col items-center justify-center transition-all duration-200 hover:border-primary/30"
              >
                <div className="mb-2 p-2 rounded-lg bg-background/80 border border-border/50 shadow-xs">
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {item.value}
                </span>
                <span className="text-xs font-semibold text-foreground mt-1">
                  {item.label}
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5">
                  {item.detail}
                </span>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
