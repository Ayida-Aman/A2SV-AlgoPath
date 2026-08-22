"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import { useWeekProgress } from "@/lib/firebase/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Loader2, LogIn, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeekCompletionButtonProps {
  weekNumber: number;
  className?: string;
}

export function WeekCompletionButton({
  weekNumber,
  className,
}: WeekCompletionButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { completed, loading, isSaving, error, isAuthenticated, toggle } =
    useWeekProgress(weekNumber);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleToggle = async () => {
    setSaveError(null);

    // If user is not authenticated, prompt to sign in instead of writing to Firestore
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      await toggle();
    } catch (err) {
      setSaveError("Unable to save your progress. Please try again.");
    }
  };

  // Section 6: Loading state while verifying auth & fetching cloud snapshot
  if (loading) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        startIcon={<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        className={cn("whitespace-nowrap font-semibold shrink-0 opacity-70 cursor-wait", className)}
      >
        Checking progress...
      </Button>
    );
  }

  return (
    <>
      <div className="relative inline-flex flex-col items-end">
        <Button
          onClick={handleToggle}
          variant={completed ? "secondary" : "outline"}
          size="sm"
          disabled={isSaving}
          startIcon={
            isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
            ) : completed ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
            )
          }
          className={cn(
            "whitespace-nowrap font-semibold shrink-0 transition-all duration-200 cursor-pointer shadow-sm",
            completed
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-500/40"
              : "hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground",
            className
          )}
          aria-label={
            completed
              ? `Week ${weekNumber} completed. Click to undo completion`
              : `Mark week ${weekNumber} as completed`
          }
        >
          {isSaving
            ? "Saving..."
            : completed
            ? "Week Completed"
            : "Mark Week Complete"}
        </Button>

        {/* Inline save error fallback if Firestore write fails */}
        {(saveError || error) && (
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-destructive animate-in fade-in">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>{saveError || error}</span>
          </div>
        )}
      </div>

      {/* Unauthenticated User Sign-In Prompt Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm rounded-2xl border border-border/80 bg-card p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1.5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <LogIn className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Sign in to save progress
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Create a free account or sign in to track your 43-week curriculum completions across devices with cloud sync.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="primary"
                className="w-full justify-center font-semibold"
                onClick={() => {
                  setShowAuthModal(false);
                  const redirectTarget = pathname || `/roadmap/week/${weekNumber}`;
                  router.push(`/login?redirect=${encodeURIComponent(redirectTarget)}`);
                }}
              >
                Sign In / Register
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-center text-xs"
                onClick={() => setShowAuthModal(false)}
              >
                Continue Exploring as Guest
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
