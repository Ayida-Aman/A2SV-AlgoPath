"use client";

import React from "react";
import { MaterialItem } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink, BookOpen, AlertCircle, Sparkles } from "lucide-react";

interface WeekResourcesProps {
  materials: MaterialItem[];
}

export function WeekResources({ materials }: WeekResourcesProps) {
  const formatFileSize = (bytes?: number) => {
    if (!bytes || bytes === 0) return "Curriculum Slide";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  // Graceful state for weeks with no lecture materials (e.g. hands-on / contest review weeks)
  if (!materials || materials.length === 0) {
    return (
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">
            Lecture Materials
          </h2>
        </div>
        <Card variant="subtle" className="p-6 border-dashed border-border/70 text-center space-y-2">
          <BookOpen className="h-6 w-6 text-muted-foreground mx-auto" />
          <p className="text-sm font-bold text-foreground">
            Hands-On Coding & Practice Session
          </p>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            No formal slide deck was attached for this review week. Focus on mastering the curated practice problems and core algorithmic paradigms above.
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
          Official lecture slide decks hosted on Google Drive
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((mat, idx) => {
          const isAvailable = mat.available !== false && Boolean(mat.driveUrl);

          return (
            <Card
              key={idx}
              variant="default"
              className={`p-5 flex flex-col justify-between space-y-4 border transition-all ${
                isAvailable
                  ? "border-border/80 hover:border-primary/50 hover:shadow-xs bg-card"
                  : "border-border/50 bg-muted/10 opacity-85"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                    isAvailable
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-muted text-muted-foreground border-border/60"
                  }`}
                >
                  <FileText className="h-5 w-5" />
                </div>

                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Official Slide Deck
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-muted/60">
                      {formatFileSize(mat.sizeBytes)}
                    </span>
                    {!isAvailable && (
                      <Badge variant="subtle" className="text-[10px] py-0 px-1.5">
                        In Transit
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-foreground leading-snug break-words">
                    {mat.fileName}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Topic: <strong className="text-foreground/80 font-medium">{mat.topic}</strong>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-muted-foreground">
                  Format: PDF
                </span>

                {isAvailable && mat.driveUrl ? (
                  <a
                    href={mat.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      endIcon={<ExternalLink className="h-3.5 w-3.5" />}
                      className="text-xs font-semibold hover:border-primary hover:bg-primary/10 whitespace-nowrap"
                    >
                      Open Slides
                    </Button>
                  </a>
                ) : (
                  <div className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="text-xs font-medium text-muted-foreground cursor-not-allowed opacity-60"
                    >
                      Slides Unavailable
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
