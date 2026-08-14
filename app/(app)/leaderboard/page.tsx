import React from "react";
import { Trophy, Medal, Flame, Star, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

export const metadata = {
  title: "Leaderboard — A2SV Legacy",
};

export default function LeaderboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="subtle">Community Rankings</Badge>
            <span className="text-xs text-muted-foreground">Cohort Streak & Solve Rankings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Scholar Leaderboard
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Track community progress, active problem-solving streaks, and weekly challenge rankings.
          </p>
        </div>

        {/* Podium Preview Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <Card variant="subtle" className="p-6 text-center space-y-3 order-2 md:order-1">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-400/15 text-slate-500 font-bold">
              2
            </div>
            <Avatar name="Kidus Mengistu" size="lg" className="mx-auto" />
            <div>
              <h3 className="font-bold text-foreground">Kidus M.</h3>
              <p className="text-xs text-muted-foreground">42 Weeks · 174 Solved</p>
            </div>
            <Badge variant="secondary">Rank #2</Badge>
          </Card>

          <Card glow className="p-6 text-center space-y-3 order-1 md:order-2 border-primary/40 bg-gradient-to-b from-primary/10 to-card">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 font-bold">
              <Trophy className="h-6 w-6" />
            </div>
            <Avatar name="Baka Codes" size="xl" status="online" className="mx-auto ring-2 ring-primary" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Baka Codes</h3>
              <p className="text-xs text-muted-foreground">43 Weeks · 180 Solved</p>
            </div>
            <Badge variant="electric" dot>
              Cohort Pioneer #1
            </Badge>
          </Card>

          <Card variant="subtle" className="p-6 text-center space-y-3 order-3">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-700/15 text-amber-700 font-bold">
              3
            </div>
            <Avatar name="Selamawit T." size="lg" className="mx-auto" />
            <div>
              <h3 className="font-bold text-foreground">Selamawit T.</h3>
              <p className="text-xs text-muted-foreground">40 Weeks · 165 Solved</p>
            </div>
            <Badge variant="secondary">Rank #3</Badge>
          </Card>
        </div>

        {/* Informational Card */}
        <Card className="p-6 text-center space-y-2 border-dashed">
          <Sparkles className="h-5 w-5 text-primary mx-auto" />
          <h3 className="text-base font-bold text-foreground">Live Leaderboard Shell Ready</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Real-time score calculation, weekly contest submissions, and user profiles will be connected in subsequent phases when database persistence is added.
          </p>
        </Card>
      </div>
    </AppLayout>
  );
}
