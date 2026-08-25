"use client";

import React, { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useAuth } from "@/contexts/auth-context";
import { useLeaderboard } from "@/lib/firebase/leaderboard";
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header";
import {
  LeaderboardSearch,
  LeaderboardSortOption,
} from "@/components/leaderboard/leaderboard-search";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { LeaderboardEmptyState } from "@/components/leaderboard/leaderboard-empty-state";
import { CurrentUserStickyBar } from "@/components/leaderboard/current-user-sticky-bar";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LeaderboardPage() {
  const { currentUser } = useAuth();
  const {
    entries,
    currentUserEntry,
    currentUserRank,
    totalScholars,
    isOptedIn,
    toggleOptIn,
    loading,
    error,
  } = useLeaderboard();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<LeaderboardSortOption>("points");

  // Filter & Sort entries
  const filteredAndSortedEntries = useMemo(() => {
    let result = [...entries];

    // 1. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((e) => e.displayName.toLowerCase().includes(q));
    }

    // 2. Custom Sort
    if (sortBy === "problems") {
      result.sort((a, b) => b.solvedProblems - a.solvedProblems || b.totalPoints - a.totalPoints);
    } else if (sortBy === "weeks") {
      result.sort((a, b) => b.completedWeeks - a.completedWeeks || b.totalPoints - a.totalPoints);
    } else if (sortBy === "streak") {
      result.sort((a, b) => b.currentStreak - a.currentStreak || b.totalPoints - a.totalPoints);
    } else {
      // Default: Total points
      result.sort((a, b) => b.totalPoints - a.totalPoints || b.solvedProblems - a.solvedProblems);
    }

    return result;
  }, [entries, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSortBy("points");
  };

  const showStickyBar =
    Boolean(currentUserEntry) &&
    Boolean(currentUserRank && currentUserRank > 5) &&
    filteredAndSortedEntries.length > 5;

  return (
    <AppLayout requireAuth>
      <div className="space-y-6 max-w-7xl mx-auto pb-16 relative">
        {/* Error Notification */}
        {error && (
          <div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
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

        {/* 1. Header & Scholar's Own Stats Strip */}
        <LeaderboardHeader
          currentUserRank={currentUserRank}
          totalPoints={currentUserEntry?.totalPoints || 0}
          solvedProblems={currentUserEntry?.solvedProblems || 0}
          completedWeeks={currentUserEntry?.completedWeeks || 0}
          currentStreak={currentUserEntry?.currentStreak || 0}
          totalScholars={totalScholars}
          isOptedIn={isOptedIn}
          onToggleOptIn={toggleOptIn}
          loading={loading}
        />

        {/* 2. Search & Sort Bar */}
        {entries.length > 0 && (
          <LeaderboardSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalFiltered={filteredAndSortedEntries.length}
            totalScholars={totalScholars}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* 3. Main Rankings Table or Empty State */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-muted/40 animate-pulse"
              />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <LeaderboardEmptyState
            isOptedIn={isOptedIn}
            onJoinLeaderboard={toggleOptIn}
          />
        ) : (
          <LeaderboardTable
            entries={filteredAndSortedEntries}
            currentUserId={currentUser?.uid}
          />
        )}

        {/* 4. Sticky Current Scholar Position Bar (if outside top rankings) */}
        {showStickyBar && (
          <CurrentUserStickyBar currentUserEntry={currentUserEntry} />
        )}
      </div>
    </AppLayout>
  );
}
