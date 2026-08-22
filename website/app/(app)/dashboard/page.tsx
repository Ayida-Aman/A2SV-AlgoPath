"use client";

import React from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { useAuth } from "@/contexts/auth-context";
import { useUserProgress } from "@/lib/firebase/progress";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { ProgressOverviewCard } from "@/components/dashboard/progress-overview-card";
import { ContinueLearningCard } from "@/components/dashboard/continue-learning-card";
import { PhaseProgressCards } from "@/components/dashboard/phase-progress-cards";
import { CompletedModulesList } from "@/components/dashboard/completed-modules-list";
import { CurriculumSnapshotCard } from "@/components/dashboard/curriculum-snapshot-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { currentUser, userProfile } = useAuth();
  const {
    completedWeeks,
    completedCount,
    totalWeeks,
    percentage,
    nextIncompleteWeek,
    currentPhase,
    phaseProgress,
    loading: progressLoading,
    error: progressError,
  } = useUserProgress();

  const displayName =
    userProfile?.displayName ||
    currentUser?.displayName ||
    currentUser?.email?.split("@")[0] ||
    "Scholar";

  return (
    <AppLayout requireAuth>
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Error Notification if Firestore Progress fails */}
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

        {/* Dashboard Hero Banner */}
        <DashboardHero
          displayName={displayName}
          currentPhase={currentPhase}
          nextIncompleteWeek={nextIncompleteWeek}
          totalCompleted={completedCount}
        />

        {/* Main 2-Column Responsive Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Primary Column (Left 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning Primary Card */}
            <ContinueLearningCard
              nextIncompleteWeek={nextIncompleteWeek}
              totalCompleted={completedCount}
              loading={progressLoading}
            />

            {/* Quick Actions Navigator */}
            <QuickActions nextIncompleteWeek={nextIncompleteWeek} />

            {/* Completed Modules List */}
            <CompletedModulesList
              completedWeeks={completedWeeks}
              loading={progressLoading}
            />
          </div>

          {/* Secondary Column (Right 1/3 Sidebar) */}
          <div className="space-y-6">
            {/* Progress Overview Metric Card */}
            <ProgressOverviewCard
              completedCount={completedCount}
              totalWeeks={totalWeeks}
              percentage={percentage}
              loading={progressLoading}
            />

            {/* 4 Phases Progression Breakdown */}
            <PhaseProgressCards
              phaseProgress={phaseProgress}
              loading={progressLoading}
            />

            {/* Static Curriculum Scope Summary */}
            <CurriculumSnapshotCard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
