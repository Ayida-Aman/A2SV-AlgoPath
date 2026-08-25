"use client";

import React from "react";
import { Settings, Moon, Sun, Laptop, Bell, Shield, User, Trophy, Eye, EyeOff } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useTheme } from "@/lib/theme-provider";
import { useAuth } from "@/contexts/auth-context";
import { useLeaderboard } from "@/lib/firebase/leaderboard";

export default function SettingsPage() {
  const { theme, resolvedTheme } = useTheme();
  const { currentUser, userProfile } = useAuth();
  const { isOptedIn, toggleOptIn } = useLeaderboard();

  return (
    <AppLayout requireAuth>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="subtle">Preferences & System</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Customize your learning experience, interface theme, and privacy preferences.
          </p>
        </div>

        {/* Theme Settings Card */}
        <Card className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground">Interface Appearance</h3>
              <p className="text-xs text-muted-foreground">
                Choose between clean light mode, deep navy dark mode, or follow your operating system.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground capitalize">
                {theme} Mode ({resolvedTheme})
              </span>
              <ThemeToggle variant="segmented" />
            </div>
          </div>
        </Card>

        {/* Leaderboard & Privacy Card */}
        <Card className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-lg">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                <h3 className="text-base font-bold text-foreground">Leaderboard Participation</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Publish your progress points, solved problem counts, and daily streaks on the public scholar leaderboard. You can opt out at any time to remove your public entry.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={isOptedIn ? "outline" : "primary"}
                size="sm"
                onClick={toggleOptIn}
                startIcon={isOptedIn ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                className="text-xs font-semibold"
              >
                {isOptedIn ? "Hide from Leaderboard" : "Show on Leaderboard"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Profile Settings Card */}
        <Card className="p-6 space-y-4">
          <div className="space-y-1 border-b border-border/40 pb-3">
            <h3 className="text-base font-bold text-foreground">Scholar Profile</h3>
            <p className="text-xs text-muted-foreground">
              Personalize your display handle and linked competitive coding handles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Display Handle"
              defaultValue={userProfile?.displayName || currentUser?.displayName || "Scholar"}
              placeholder="e.g. baka_codes"
              disabled
            />
            <Input
              label="Email Address"
              defaultValue={currentUser?.email || ""}
              disabled
            />
            <Input
              label="LeetCode Username"
              placeholder="e.g. leetcode_user"
            />
            <Input
              label="Codeforces Handle"
              placeholder="e.g. tourist"
            />
          </div>
        </Card>

        {/* Independence Notice */}
        <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-xs text-muted-foreground space-y-1.5">
          <p className="font-semibold text-foreground">A2SV Legacy Independent Project</p>
          <p>
            All extracted materials remain attributed to their respective authors (baka Codes, Muluken Zewge, and the A2SV Education Team).
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
