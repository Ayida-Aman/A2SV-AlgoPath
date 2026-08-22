import React from "react";
import Link from "next/link";
import {
  Code2,
  ExternalLink,
  Search,
  Filter,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import problemsData from "@/data/problems.json";

export const metadata = {
  title: "Practice Problems — A2SV Legacy",
};

export default function PracticePage() {
  const platformCounts = problemsData.reduce((acc, p) => {
    acc[p.platform] = (acc[p.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AppLayout requireAuth>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="subtle">Problem Catalog</Badge>
            <span className="text-xs text-muted-foreground">180 Canonical Practice Problems</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Curated Practice Problems
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Practice problems from LeetCode, Codeforces, HackerRank, and Eolymp aligned with each week&apos;s educational objectives.
          </p>
        </div>

        {/* Platform Breakdown Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {Object.entries(platformCounts).map(([platform, count]) => (
            <Card key={platform} variant="subtle" className="p-3 text-center">
              <span className="text-xl font-bold text-foreground">{count}</span>
              <p className="text-[11px] text-muted-foreground font-medium truncate mt-0.5">{platform}</p>
            </Card>
          ))}
        </div>

        {/* Search / Filter Shell */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Filter by problem title..."
              startIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" startIcon={<Filter className="h-3.5 w-3.5" />}>
              Filter by Phase
            </Button>
            <Button variant="outline" size="sm">
              All Platforms
            </Button>
          </div>
        </div>

        {/* Problem List Preview Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/70 bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Curriculum Week</th>
                  <th className="py-3 px-4">Source Day</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {problemsData.slice(0, 25).map((problem, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors group">
                    <td className="py-3 px-4 font-medium text-foreground">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{problem.title}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                      </a>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium text-[11px]">
                        {problem.platform}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      Week {problem.weekNumber}
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground font-mono">
                      Day {problem.sourceDay}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Solve ↗
                        </Button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border/40 bg-muted/20 text-center text-xs text-muted-foreground">
            Showing first 25 of 180 canonical problems. Full interactive filtering will be activated in later phases.
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
