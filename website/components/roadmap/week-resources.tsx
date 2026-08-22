import React from "react";
import { MaterialItem } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Sparkles, BookOpen } from "lucide-react";

interface WeekResourcesProps {
  materials: MaterialItem[];
}

export function WeekResources({ materials }: WeekResourcesProps) {
  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return "Curriculum Slide";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  // Section 15: Handle missing lecture materials gracefully
  if (!materials || materials.length === 0) {
    return (
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">
            Lecture Materials
          </h2>
        </div>
        <Card variant="subtle" className="p-5 border-dashed border-border/70 text-center space-y-1.5">
          <BookOpen className="h-5 w-5 text-muted-foreground mx-auto" />
          <p className="text-sm font-medium text-foreground">
            Lecture slides unavailable for this week.
          </p>
          <p className="text-xs text-muted-foreground">
            Focus on mastering the curated practice problems and core algorithmic paradigms above.
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">
            Lecture Materials ({materials.length})
          </h2>
        </div>
        <span className="text-xs text-muted-foreground">
          Study the official lecture slides for this module
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((mat, idx) => (
          <Card
            key={idx}
            variant="default"
            className="p-5 flex flex-col justify-between space-y-4 border-border/80 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 mt-0.5">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Official Slide Deck
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.2 rounded bg-muted">
                    {formatFileSize(mat.sizeBytes)}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground leading-snug break-words">
                  {mat.fileName}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Topic: <strong className="text-foreground/80 font-medium">{mat.topic}</strong>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">
                Format: PDF
              </span>

              <Button
                variant="outline"
                size="sm"
                endIcon={<ExternalLink className="h-3.5 w-3.5" />}
                className="text-xs font-semibold hover:border-primary hover:bg-primary/10 whitespace-nowrap"
              >
                Open Slides
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
