import React from "react";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Code2,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge, PhaseBadge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import curriculumData from "@/data/curriculum.json";
import phasesData from "@/data/phases.json";

export const metadata = {
  title: "Curriculum Roadmap — A2SV Legacy",
};

export default function LearnPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="subtle">Curriculum Roadmap</Badge>
            <span className="text-xs text-muted-foreground">43 Weeks Reconstructed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Structured 43-Week Learning Journey
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Follow the complete chronological progression across 4 phases, 43 weekly modules, 180 curated problems, and 41 lecture slide decks.
          </p>
        </div>

        {/* Phase Summary Pill Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {phasesData.map((phase) => (
            <Card key={phase.id} variant="subtle" className="p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <PhaseBadge phase={phase.id} />
                <span className="text-xs font-semibold text-muted-foreground">{phase.totalWeeks} W</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{phase.description}</p>
            </Card>
          ))}
        </div>

        {/* Weekly Cards List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="text-base font-bold text-foreground tracking-tight">
              All 43 Weekly Lessons
            </h2>
            <span className="text-xs text-muted-foreground">
              Showing 43 of 43 weeks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curriculumData.map((week) => (
              <Card
                key={week.weekNumber}
                variant="interactive"
                className="p-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Card Top Meta */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-bold">
                        {week.weekNumber}
                      </span>
                      <PhaseBadge phase={week.phase} />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Day {week.sourceDays.join(", ")}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {week.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {week.description}
                    </p>
                  </div>

                  {/* Key Concepts Snippet */}
                  {week.concepts && week.concepts.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {week.concepts.slice(0, 3).map((concept, idx) => (
                        <span
                          key={idx}
                          className="inline-flex text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium"
                        >
                          {concept.name}
                        </span>
                      ))}
                      {week.concepts.length > 3 && (
                        <span className="inline-flex text-[10px] px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground">
                          +{week.concepts.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer / Problems & Slides Meta */}
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      <span>{week.problems.length} problems</span>
                    </span>
                    {week.materials.length > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5 text-accent-electric" />
                        <span>Slides</span>
                      </span>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
