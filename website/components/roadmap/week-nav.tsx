import React from "react";
import Link from "next/link";
import { WeekCurriculum } from "@/types";
import { getAdjacentWeeks } from "@/lib/curriculum";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";

interface WeekNavProps {
  weekNumber: number;
}

export function WeekNav({ weekNumber }: WeekNavProps) {
  const { prevWeek, nextWeek } = getAdjacentWeeks(weekNumber);

  return (
    <div className="pt-8 border-t border-border/60">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Week Card / Button */}
        {prevWeek ? (
          <Link
            href={`/roadmap/week/${prevWeek.weekNumber}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
          >
            <Card
              variant="interactive"
              className="p-4 sm:p-5 h-full flex flex-col justify-between hover:border-primary/50"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Week ({prevWeek.weekNumber})</span>
              </div>
              <p className="text-sm font-bold text-foreground mt-2 line-clamp-1">
                {prevWeek.title}
              </p>
            </Card>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Next Week Card / Button */}
        {nextWeek ? (
          <Link
            href={`/roadmap/week/${nextWeek.weekNumber}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl sm:text-right"
          >
            <Card
              variant="interactive"
              className="p-4 sm:p-5 h-full flex flex-col justify-between hover:border-primary/50"
            >
              <div className="flex items-center sm:justify-end gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                <span>Next Week ({nextWeek.weekNumber})</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-sm font-bold text-foreground mt-2 line-clamp-1">
                {nextWeek.title}
              </p>
            </Card>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      {/* Back to Roadmap Root Button */}
      <div className="mt-6 text-center">
        <Link href="/roadmap">
          <Button variant="outline" size="sm" startIcon={<Layers className="h-4 w-4" />}>
            Back to Full Roadmap (43 Weeks)
          </Button>
        </Link>
      </div>
    </div>
  );
}
