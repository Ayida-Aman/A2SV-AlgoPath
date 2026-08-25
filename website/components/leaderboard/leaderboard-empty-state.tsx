import React from "react";
import { Trophy, Sparkles, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LeaderboardEmptyStateProps {
  isOptedIn: boolean;
  onJoinLeaderboard: () => void;
}

export function LeaderboardEmptyState({
  isOptedIn,
  onJoinLeaderboard,
}: LeaderboardEmptyStateProps) {
  return (
    <Card variant="subtle" className="p-12 text-center space-y-4 border-dashed border-border/80 max-w-lg mx-auto">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
        <Trophy className="h-6 w-6" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-foreground">
          Be the First Scholar on the Leaderboard!
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          No scholars have published their progress yet. Join the leaderboard now to claim the #1 spot and compete with fellow peers.
        </p>
      </div>

      {!isOptedIn && (
        <div className="pt-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onJoinLeaderboard}
            startIcon={<UserPlus className="h-4 w-4" />}
            className="font-semibold"
          >
            Join Leaderboard
          </Button>
        </div>
      )}
    </Card>
  );
}
