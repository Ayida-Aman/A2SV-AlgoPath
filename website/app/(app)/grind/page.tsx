import React from "react";
import { Flame, Users, Clock, Sparkles, Plus, Play } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Grind Rooms — A2SV Legacy",
};

export default function GrindPage() {
  return (
    <AppLayout requireAuth>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="subtle">Co-working & Focus</Badge>
              <span className="text-xs text-muted-foreground">Peer Study Sessions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Grind Rooms
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Virtual co-working spaces to solve daily DSA problems with timed Pomodoro sessions and accountability partners.
            </p>
          </div>
          <Button variant="primary" startIcon={<Plus className="h-4 w-4" />}>
            Create Room (Placeholder)
          </Button>
        </div>

        {/* Grind Rooms Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Room 1 */}
          <Card variant="interactive" className="p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="success" dot>Live Now</Badge>
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> 8 Scholars
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground">Two Pointers Deep Focus</h3>
              <p className="text-xs text-muted-foreground">
                Tackling Week 17 problem set: 3Sum, Container With Most Water, and Two Sum II.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>Pomodoro: 45 min focus / 10 min rest</span>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-border/40">
              <Button variant="secondary" size="sm" className="w-full justify-center" startIcon={<Play className="h-3.5 w-3.5" />}>
                Join Room (Preview)
              </Button>
            </div>
          </Card>

          {/* Room 2 */}
          <Card variant="interactive" className="p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="success" dot>Live Now</Badge>
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> 14 Scholars
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground">Graph Traversal (DFS & BFS)</h3>
              <p className="text-xs text-muted-foreground">
                Weeks 30 & 31: Number of Islands, Rotting Oranges, and Word Ladder.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>Pomodoro: 50 min focus / 10 min rest</span>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-border/40">
              <Button variant="secondary" size="sm" className="w-full justify-center" startIcon={<Play className="h-3.5 w-3.5" />}>
                Join Room (Preview)
              </Button>
            </div>
          </Card>

          {/* Room 3 */}
          <Card variant="interactive" className="p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="electric" dot>Silent Study</Badge>
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> 21 Scholars
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground">Dynamic Programming Marathon</h3>
              <p className="text-xs text-muted-foreground">
                Weeks 35 & 36: Top-Down Memoization vs Bottom-Up Tabulation drill.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>Silent study mode · Screen share optional</span>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-border/40">
              <Button variant="secondary" size="sm" className="w-full justify-center" startIcon={<Play className="h-3.5 w-3.5" />}>
                Join Room (Preview)
              </Button>
            </div>
          </Card>
        </div>

        {/* Informational Placeholder */}
        <Card className="p-6 text-center space-y-2 border-dashed">
          <Sparkles className="h-5 w-5 text-primary mx-auto" />
          <h3 className="text-base font-bold text-foreground">Grind Rooms Shell Ready</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Live WebRTC audio/video sync, shared code timers, and attendance streaks will be implemented in future phases.
          </p>
        </Card>
      </div>
    </AppLayout>
  );
}
