import React from "react";
import { Search, Filter, X, CheckCircle2, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PracticeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedPlatform: string;
  onPlatformChange: (value: string) => void;
  selectedPhase: string;
  onPhaseChange: (value: string) => void;
  selectedStatus: "all" | "solved" | "unsolved";
  onStatusChange: (value: "all" | "solved" | "unsolved") => void;
  platforms: string[];
  totalResults: number;
  totalProblems: number;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function PracticeFilters({
  searchQuery,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
  selectedPhase,
  onPhaseChange,
  selectedStatus,
  onStatusChange,
  platforms,
  totalResults,
  totalProblems,
  onClearFilters,
  hasActiveFilters,
}: PracticeFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar & Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search Input */}
        <div className="flex-1 max-w-lg">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search problems by title, platform, topic, or week..."
            startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
            className="w-full bg-card"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="h-9 px-3 rounded-lg border border-border/80 bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Filter by Platform"
          >
            <option value="all">All Platforms</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Phase Filter */}
          <select
            value={selectedPhase}
            onChange={(e) => onPhaseChange(e.target.value)}
            className="h-9 px-3 rounded-lg border border-border/80 bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Filter by Phase"
          >
            <option value="all">All Phases</option>
            <option value="foundation">Foundation (W1–W12)</option>
            <option value="phase_1">Phase 1 — Core DSA (W13–W25)</option>
            <option value="phase_2">Phase 2 — Advanced DSA (W26–W36)</option>
            <option value="phase_3">Phase 3 — CP Track (W37–W43)</option>
          </select>

          {/* Status Filter */}
          <div className="inline-flex rounded-lg border border-border/80 bg-muted/40 p-0.5">
            <button
              onClick={() => onStatusChange("all")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedStatus === "all"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => onStatusChange("unsolved")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedStatus === "unsolved"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Unsolved
            </button>
            <button
              onClick={() => onStatusChange("solved")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedStatus === "solved"
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Solved
            </button>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              startIcon={<X className="h-3.5 w-3.5" />}
              className="text-xs text-muted-foreground hover:text-foreground h-9"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Results Count Line */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-0.5">
        <span>
          Showing <strong className="text-foreground font-semibold">{totalResults}</strong> of {totalProblems} problems
        </span>
        {hasActiveFilters && (
          <span className="text-[11px] font-mono text-primary">
            Filtered results
          </span>
        )}
      </div>
    </div>
  );
}
