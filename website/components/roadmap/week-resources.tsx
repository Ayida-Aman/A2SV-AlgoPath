import React from "react";
import { MaterialItem } from "@/types";
import { Card } from "@/components/ui/card";
import { FileText, Download, CheckCircle, Info } from "lucide-react";

interface WeekResourcesProps {
  materials: MaterialItem[];
}

export function WeekResources({ materials }: WeekResourcesProps) {
  if (!materials || materials.length === 0) {
    return null;
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return "Included in Archive";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">
          Lecture Slides & Reference Materials ({materials.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {materials.map((mat, idx) => (
          <Card
            key={idx}
            variant="subtle"
            className="p-5 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Official A2SV Lecture Deck
                </span>
                <h3 className="text-sm font-bold text-foreground leading-snug break-words">
                  {mat.fileName}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Topic: <strong className="text-foreground/80">{mat.topic}</strong>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-mono">{formatFileSize(mat.sizeBytes)}</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Archive Verified</span>
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
