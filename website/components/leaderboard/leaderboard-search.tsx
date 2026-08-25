import React from "react";
import { Search, Filter, X, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type LeaderboardSortOption = "points" | "problems" | "weeks" | "streak";

interface LeaderboardSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: LeaderboardSortOption;
  onSortChange: (sort: LeaderboardSortOption) => void;
  totalFiltered: number;
  totalScholars: number;
  onClearFilters: () => void;
}

export function LeaderboardSearch({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalFiltered,
  totalScholars,
  onClearFilters,
}: LeaderboardSearchProps) {
  const hasFilter = searchQuery.trim().length > 0 || sortBy !== "points";

  return (
    <div className="space-y-3 pt-4 border-t border-border/40">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Field */}
        <div className="flex-1 max-w-sm">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search scholars by display name..."
            startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
            className="w-full bg-card"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground hidden sm:inline-flex items-center gap-1">
            <ArrowUpDown className="h-3 w-3" />
            Sort by:
          </span>

          <div className="inline-flex rounded-lg border border-border/80 bg-muted/40 p-0.5">
            <button
              onClick={() => onSortChange("points")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                sortBy === "points"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Points
            </button>
            <button
              onClick={() => onSortChange("problems")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                sortBy === "problems"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Problems
            </button>
            <button
              onClick={() => onSortChange("weeks")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                sortBy === "weeks"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Weeks
            </button>
            <button
              onClick={() => onSortChange("streak")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                sortBy === "streak"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Streak
            </button>
          </div>

          {hasFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              startIcon={<X className="h-3.5 w-3.5" />}
              className="text-xs text-muted-foreground hover:text-foreground h-8"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground px-0.5">
        <span>
          Showing <strong className="text-foreground font-semibold">{totalFiltered}</strong> of {totalScholars} scholars
        </span>
      </div>
    </div>
  );
}
