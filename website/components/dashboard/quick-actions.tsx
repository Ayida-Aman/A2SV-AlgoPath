import React from "react";
import Link from "next/link";
import { BookOpen, Layers, Code2, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  nextIncompleteWeek: number | null;
}

export function QuickActions({ nextIncompleteWeek }: QuickActionsProps) {
  const targetWeek = nextIncompleteWeek || 1;

  return (
    <Card className="p-5 space-y-3.5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Quick Actions
      </h3>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Link href={`/roadmap/week/${targetWeek}`} className="flex-1">
          <Button
            variant="primary"
            className="w-full justify-between text-xs font-semibold"
            endIcon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            <span>{nextIncompleteWeek ? `Study Week ${nextIncompleteWeek}` : "Start Week 1"}</span>
          </Button>
        </Link>

        <Link href="/roadmap" className="flex-1">
          <Button
            variant="outline"
            className="w-full justify-between text-xs font-semibold"
            startIcon={<Layers className="h-3.5 w-3.5 text-primary" />}
          >
            <span>View Full Roadmap</span>
          </Button>
        </Link>

        <Link href="/practice" className="flex-1">
          <Button
            variant="outline"
            className="w-full justify-between text-xs font-semibold"
            startIcon={<Code2 className="h-3.5 w-3.5 text-emerald-500" />}
          >
            <span>Practice Problems (180)</span>
          </Button>
        </Link>
      </div>
    </Card>
  );
}
