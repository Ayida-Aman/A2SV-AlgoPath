import React from "react";
import Link from "next/link";
import { Sparkles, Layers, BookOpen, Code2, FileText, ChevronRight } from "lucide-react";

export function RoadmapHero() {
  return (
    <div className="space-y-6 pt-2 pb-8 border-b border-border/60">
      {/* Breadcrumb Context */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Curriculum Roadmap</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary-muted text-primary text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-accent-electric" />
          <span>A2SV LEARNING PATH</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          From fundamentals to <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-primary dark:from-blue-400 dark:via-sky-300 dark:to-blue-500 bg-clip-text text-transparent">
            competitive programming.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Follow a structured path through programming fundamentals, core data structures and algorithms, advanced problem solving, and competitive programming across 43 weekly modules.
        </p>
      </div>

      {/* Compact Metrics Bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border/60 font-medium text-foreground">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span>4 Progressive Phases</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border/60 font-medium text-foreground">
          <BookOpen className="h-3.5 w-3.5 text-sky-500" />
          <span>43 Weekly Modules</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border/60 font-medium text-foreground">
          <Code2 className="h-3.5 w-3.5 text-emerald-500" />
          <span>180+ Curated Problems</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border/60 font-medium text-foreground">
          <FileText className="h-3.5 w-3.5 text-amber-500" />
          <span>41 Lecture Slides</span>
        </span>
      </div>
    </div>
  );
}
