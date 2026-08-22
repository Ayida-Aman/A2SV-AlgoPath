"use client";

import React, { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useUserProgress } from "@/lib/firebase/progress";
import { getAllEnrichedProblems, EnrichedProblem } from "@/lib/curriculum";
import { PracticeHeader } from "@/components/practice/practice-header";
import { PracticeFilters } from "@/components/practice/practice-filters";
import { ProblemCard } from "@/components/practice/problem-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, AlertCircle, RefreshCw, Sparkles, FilterX } from "lucide-react";

export default function PracticePage() {
  const {
    completedProblems,
    solvedProblemsCount,
    totalProblemsCount,
    problemsPercentage,
    loading: progressLoading,
    error: progressError,
  } = useUserProgress();

  const allProblems = useMemo<EnrichedProblem[]>(() => {
    return getAllEnrichedProblems();
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "solved" | "unsolved">("all");

  const platforms = useMemo(() => {
    const list = Array.from(new Set(allProblems.map((p) => p.platform)));
    return list.sort();
  }, [allProblems]);

  const filteredProblems = useMemo(() => {
    return allProblems.filter((problem) => {
      // 1. Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = problem.title.toLowerCase().includes(q);
        const matchPlatform = problem.platform.toLowerCase().includes(q);
        const matchWeekTitle = problem.weekTitle.toLowerCase().includes(q);
        const matchTopics = problem.topics?.some((t) => t.toLowerCase().includes(q)) || false;
        const matchTopicSummary = problem.topicSummary.toLowerCase().includes(q);
        const matchDiff = problem.difficulty?.toLowerCase().includes(q) || false;

        if (
          !matchTitle &&
          !matchPlatform &&
          !matchWeekTitle &&
          !matchTopics &&
          !matchTopicSummary &&
          !matchDiff
        ) {
          return false;
        }
      }

      // 2. Platform filter
      if (selectedPlatform !== "all") {
        if (problem.platform.toLowerCase() !== selectedPlatform.toLowerCase()) {
          return false;
        }
      }

      // 3. Phase filter
      if (selectedPhase !== "all") {
        if (problem.phaseId !== selectedPhase) {
          return false;
        }
      }

      // 4. Solved Status filter
      if (selectedStatus !== "all") {
        const isSolved = completedProblems.includes(problem.id);
        if (selectedStatus === "solved" && !isSolved) return false;
        if (selectedStatus === "unsolved" && isSolved) return false;
      }

      return true;
    });
  }, [allProblems, searchQuery, selectedPlatform, selectedPhase, selectedStatus, completedProblems]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedPlatform !== "all" ||
    selectedPhase !== "all" ||
    selectedStatus !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedPlatform("all");
    setSelectedPhase("all");
    setSelectedStatus("all");
  };

  return (
    <AppLayout requireAuth>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Error Notice */}
        {progressError && (
          <div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{progressError}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="text-xs border-destructive/40 hover:bg-destructive/20 h-7"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Try Again
            </Button>
          </div>
        )}

        {/* Practice Header & Aggregate Progress */}
        <PracticeHeader
          solvedCount={solvedProblemsCount}
          totalCount={totalProblemsCount || allProblems.length}
          percentage={problemsPercentage}
          loading={progressLoading}
        />

        {/* Search & Filter Suite */}
        <PracticeFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          selectedPhase={selectedPhase}
          onPhaseChange={setSelectedPhase}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          platforms={platforms}
          totalResults={filteredProblems.length}
          totalProblems={allProblems.length}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Problem Cards Grid or Empty State */}
        {filteredProblems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        ) : (
          <Card
            variant="subtle"
            className="p-10 text-center space-y-3 border-dashed border-border/80"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground mx-auto">
              <FilterX className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">
                No problems found
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No problems match your current search and filter criteria. Try clearing some filters or searching with different keywords.
              </p>
            </div>
            {hasActiveFilters && (
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-xs"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
