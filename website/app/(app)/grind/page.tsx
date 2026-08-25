"use client";

import React from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useGrindProgress } from "@/lib/firebase/progress";
import { GrindHero } from "@/components/grind/grind-hero";
import { GrindStats } from "@/components/grind/grind-stats";
import { GrindProblemList } from "@/components/grind/grind-problem-list";
import { GrindHistory } from "@/components/grind/grind-history";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GrindPage() {
  const {
    todayProblems,
    todaySolvedCount,
    dailyTarget,
    isTodayComplete,
    todayProgressPercentage,
    currentStreak,
    longestStreak,
    recentDays,
    solvedProblemsCount,
    totalProblemsCount,
    loading,
    error,
  } = useGrindProgress();

  return (
    <AppLayout requireAuth>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Error Fallback Notice */}
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

        {/* 1. Daily Hero & Progress Banner */}
        <GrindHero
          currentStreak={currentStreak}
          todaySolvedCount={todaySolvedCount}
          dailyTarget={dailyTarget}
          isTodayComplete={isTodayComplete}
          percentage={todayProgressPercentage}
          loading={loading}
        />

        {/* 2. Key Stats & Streak Overview */}
        <GrindStats
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          todaySolvedCount={todaySolvedCount}
          dailyTarget={dailyTarget}
          solvedProblemsCount={solvedProblemsCount}
          totalProblemsCount={totalProblemsCount}
          loading={loading}
        />

        {/* 3. Today's 3 Recommended Problems */}
        <GrindProblemList
          problems={todayProblems}
          isTodayComplete={isTodayComplete}
          loading={loading}
        />

        {/* 4. Recent Grind Activity (Past 7 Days) */}
        <GrindHistory
          recentDays={recentDays}
          currentStreak={currentStreak}
          loading={loading}
        />
      </div>
    </AppLayout>
  );
}
