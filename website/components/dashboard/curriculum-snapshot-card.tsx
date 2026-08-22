import React from "react";
import Link from "next/link";
import { BookOpen, Layers, Code2, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CurriculumSnapshotCardProps {
  solvedProblemsCount?: number;
}

export function CurriculumSnapshotCard({
  solvedProblemsCount,
}: CurriculumSnapshotCardProps) {
  return (
    <Card variant="subtle" className="p-5 space-y-3.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Curriculum Scope
        </span>
        <span className="text-[11px] font-mono text-muted-foreground">
          A2SV Learning Path
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <div className="p-3 rounded-lg bg-background/60 border border-border/50 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">Modules</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-foreground">43</span>
            <span className="text-xs text-muted-foreground font-medium">Weeks</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-background/60 border border-border/50 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Layers className="h-3.5 w-3.5 text-sky-500 shrink-0" />
            <span className="truncate">Phases</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-foreground">4</span>
            <span className="text-xs text-muted-foreground font-medium">Phases</span>
          </div>
        </div>

        <Link
          href="/practice"
          className="p-3 rounded-lg bg-background/60 border border-border/50 space-y-1 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors block group"
        >
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-emerald-500 transition-colors">
            <Code2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span className="truncate">Problems</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-foreground">
              {typeof solvedProblemsCount === "number" ? `${solvedProblemsCount}/` : ""}180
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {typeof solvedProblemsCount === "number" ? "Solved" : "Curated"}
            </span>
          </div>
        </Link>

        <div className="p-3 rounded-lg bg-background/60 border border-border/50 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span className="truncate">Slides</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-foreground">41</span>
            <span className="text-xs text-muted-foreground font-medium">Decks</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
