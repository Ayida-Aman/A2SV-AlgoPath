import React from "react";
import Link from "next/link";
import { WeekCurriculum } from "@/types";
import { PhaseBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Quote,
  Zap,
  Layers,
  Clock,
  ExternalLink,
} from "lucide-react";

interface WeekDetailProps {
  week: WeekCurriculum;
}

export function WeekDetail({ week }: WeekDetailProps) {
  const objectives = week.learningObjectives || [];
  const concepts = week.concepts || [];
  const algorithms = week.algorithms || [];
  const dataStructures = week.dataStructures || [];
  const quote = week.quote;

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/roadmap" className="hover:text-foreground transition-colors">
          Roadmap
        </Link>
        <ChevronRight className="h-3 w-3" />
        <a
          href={`/roadmap#phase-${week.phase}`}
          className="hover:text-foreground transition-colors"
        >
          {week.phaseName}
        </a>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-semibold">Week {week.weekNumber}</span>
      </nav>

      {/* Week Title & Overview Banner */}
      <div className="rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card-subtle to-card p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold shadow-sm shadow-blue-500/25">
              {String(week.weekNumber).padStart(2, "0")}
            </span>
            <PhaseBadge phase={week.phase} />
          </div>
          <span className="text-xs font-mono font-medium text-muted-foreground px-3 py-1 rounded-full bg-secondary border border-border/60">
            Source Day {week.sourceDays.join(", ")}
          </span>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            WEEK {week.weekNumber}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-1">
            {week.title}
          </h1>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
          {week.description}
        </p>

        {/* Source Attribution Meta */}
        <div className="pt-2 border-t border-border/40 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground">
          <span>Curriculum Source: <strong className="text-foreground">{week.source.author}</strong></span>
          <span>Verified Status: <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase">{week.status}</span></span>
          <span>Confidence: <strong className="text-foreground capitalize">{week.confidence}</strong></span>
        </div>
      </div>

      {/* Quote of the Day (if available) */}
      {quote && (
        <Card variant="subtle" className="p-5 border-l-4 border-l-primary bg-primary/5 space-y-2">
          <div className="flex items-start gap-3">
            <Quote className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm italic text-foreground leading-relaxed">
                &ldquo;{quote.quote}&rdquo;
              </p>
              <p className="text-xs font-semibold text-primary">
                — {quote.author}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* What You'll Learn / Learning Objectives */}
      {objectives.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              What You&apos;ll Learn
            </h2>
          </div>
          <Card className="p-5 sm:p-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {/* Core Concepts Grid */}
      {concepts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Core Concepts & Theoretical Framework
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concepts.map((concept, idx) => (
              <Card key={idx} variant="default" className="p-5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-foreground">
                    {concept.name}
                  </h3>
                  {concept.complexity && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                      {concept.complexity}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {concept.description}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Algorithms & Data Structures Tag List */}
      {(algorithms.length > 0 || dataStructures.length > 0) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {algorithms.length > 0 && (
            <Card className="p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Algorithms Covered</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {algorithms.map((algo, aIdx) => (
                  <span
                    key={aIdx}
                    className="inline-flex text-xs px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-medium"
                  >
                    {algo}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {dataStructures.length > 0 && (
            <Card className="p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                <Layers className="h-4 w-4 text-primary" />
                <span>Data Structures Applied</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {dataStructures.map((ds, dIdx) => (
                  <span
                    key={dIdx}
                    className="inline-flex text-xs px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 font-medium"
                  >
                    {ds}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </section>
      )}
    </div>
  );
}
