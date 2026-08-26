"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Moon,
  Sun,
  Laptop,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Save,
  Shield,
  Calendar,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useTheme } from "@/lib/theme-provider";
import { useAuth } from "@/contexts/auth-context";
import { updateUserDisplayName } from "@/lib/firebase/auth";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { currentUser, userProfile, signOut, refreshProfile } = useAuth();

  // Profile Form State
  const [displayName, setDisplayName] = useState<string>("");
  const [initialDisplayName, setInitialDisplayName] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Sign out State
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  // Initialize display name from current user / profile
  useEffect(() => {
    const currentName =
      userProfile?.displayName ||
      currentUser?.displayName ||
      currentUser?.email?.split("@")[0] ||
      "";
    setDisplayName(currentName);
    setInitialDisplayName(currentName);
  }, [currentUser, userProfile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = displayName.trim();

    if (!trimmed) {
      setSaveError("Display name cannot be empty.");
      return;
    }
    if (trimmed.length > 50) {
      setSaveError("Display name must be 50 characters or fewer.");
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await updateUserDisplayName(trimmed);
      await refreshProfile();
      setInitialDisplayName(trimmed);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setSaveError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.replace("/login");
    } catch (err) {
      console.error("Error signing out:", err);
      setIsSigningOut(false);
    }
  };

  const isNameChanged = displayName.trim() !== initialDisplayName.trim();
  const isNameValid = displayName.trim().length > 0 && displayName.trim().length <= 50;

  // Format account creation date
  const memberSinceFormatted = userProfile?.createdAt
    ? new Date(userProfile.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently Joined";

  return (
    <AppLayout requireAuth>
      <div className="space-y-8 max-w-4xl pb-16">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="subtle">Scholar Preferences</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Manage your scholar profile, interface appearance, and account preferences.
          </p>
        </div>

        {/* Section 1: Account / Profile */}
        <Card className="p-6 space-y-6 bg-card border-border/80">
          <div className="space-y-1 border-b border-border/40 pb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <h2 className="text-base font-bold text-foreground">
                Scholar Profile
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Update your public handle and view your account credentials.
            </p>
          </div>

          {/* Feedback Alerts */}
          {saveSuccess && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {saveError && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{saveError}</span>
            </div>
          )}

          {/* Avatar & Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/40">
            <Avatar
              name={displayName || "Scholar"}
              size="lg"
              className="ring-2 ring-primary/30 shrink-0"
            />
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-foreground truncate">
                  {displayName || "Scholar"}
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  Verified Scholar
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-mono">
                  <Mail className="h-3 w-3" />
                  {currentUser?.email || "No email"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Member since {memberSinceFormatted}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Display Name Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="displayNameInput"
                  className="text-xs font-semibold text-foreground flex items-center justify-between"
                >
                  <span>Display Name</span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {displayName.length}/50
                  </span>
                </label>
                <Input
                  id="displayNameInput"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. baka_codes"
                  maxLength={50}
                  disabled={isSaving}
                  className="bg-card"
                />
                <p className="text-[11px] text-muted-foreground">
                  Your public name shown on the dashboard and platform.
                </p>
              </div>

              {/* Email Address Input (Read-only) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="emailInput"
                  className="text-xs font-semibold text-foreground flex items-center justify-between"
                >
                  <span>Email Address</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Lock className="h-2.5 w-2.5" /> Read-only
                  </span>
                </label>
                <Input
                  id="emailInput"
                  value={currentUser?.email || ""}
                  disabled
                  className="bg-muted/40 text-muted-foreground cursor-not-allowed"
                />
                <p className="text-[11px] text-muted-foreground">
                  Managed via Firebase Authentication credentials.
                </p>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSaving}
                disabled={isSaving || !isNameChanged || !isNameValid}
                startIcon={<Save className="h-4 w-4" />}
                className="font-semibold text-xs px-5"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>

        {/* Section 2: Appearance */}
        <Card className="p-6 space-y-5 bg-card border-border/80">
          <div className="space-y-1 border-b border-border/40 pb-4">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-amber-500" />
              <h2 className="text-base font-bold text-foreground">
                Interface Appearance
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Select your preferred color theme across all curriculum pages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Light Mode Option */}
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`p-4 rounded-xl border text-left transition-all space-y-2 ${
                theme === "light"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "border-border/70 hover:border-border hover:bg-muted/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <Sun className={`h-5 w-5 ${theme === "light" ? "text-primary" : "text-muted-foreground"}`} />
                {theme === "light" && (
                  <Badge variant="electric" className="text-[10px]">
                    Active
                  </Badge>
                )}
              </div>
              <div>
                <p className="font-bold text-xs text-foreground">Light Mode</p>
                <p className="text-[11px] text-muted-foreground">
                  Crisp, clean high-contrast daytime interface.
                </p>
              </div>
            </button>

            {/* Dark Mode Option */}
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-xl border text-left transition-all space-y-2 ${
                theme === "dark"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "border-border/70 hover:border-border hover:bg-muted/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <Moon className={`h-5 w-5 ${theme === "dark" ? "text-primary" : "text-muted-foreground"}`} />
                {theme === "dark" && (
                  <Badge variant="electric" className="text-[10px]">
                    Active
                  </Badge>
                )}
              </div>
              <div>
                <p className="font-bold text-xs text-foreground">Dark Mode</p>
                <p className="text-[11px] text-muted-foreground">
                  Deep navy low-strain nighttime interface.
                </p>
              </div>
            </button>

            {/* System Mode Option */}
            <button
              type="button"
              onClick={() => setTheme("system")}
              className={`p-4 rounded-xl border text-left transition-all space-y-2 ${
                theme === "system"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "border-border/70 hover:border-border hover:bg-muted/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <Laptop className={`h-5 w-5 ${theme === "system" ? "text-primary" : "text-muted-foreground"}`} />
                {theme === "system" && (
                  <Badge variant="electric" className="text-[10px]">
                    Active
                  </Badge>
                )}
              </div>
              <div>
                <p className="font-bold text-xs text-foreground">System Sync</p>
                <p className="text-[11px] text-muted-foreground">
                  Matches your operating system theme automatically ({resolvedTheme}).
                </p>
              </div>
            </button>
          </div>
        </Card>

        {/* Section 3: Account & Session */}
        <Card className="p-6 space-y-4 bg-card border-border/80">
          <div className="space-y-1 border-b border-border/40 pb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              <h2 className="text-base font-bold text-foreground">
                Account & Session
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Manage your active learning session and sign-out controls.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-muted/20 border border-border/40">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">
                Signed in as {currentUser?.email || "Scholar"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Authenticated session via Firebase Authentication.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              isLoading={isSigningOut}
              disabled={isSigningOut}
              startIcon={<LogOut className="h-4 w-4 text-destructive" />}
              className="text-xs font-semibold text-destructive hover:bg-destructive/10 border-destructive/30 shrink-0"
            >
              Sign Out
            </Button>
          </div>
        </Card>

        {/* Section 4: Danger Zone */}
        <Card className="p-6 space-y-4 border-destructive/30 bg-destructive/5">
          <div className="space-y-1 border-b border-destructive/20 pb-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <h2 className="text-base font-bold">
                Danger Zone
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Irreversible actions related to your account.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-lg">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">Delete Scholar Account</span>
                <Badge variant="secondary" className="text-[10px]">
                  Coming Soon
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automated account deletion and full cryptographic data scrubbing will be available in an upcoming server-verified release. To request manual account removal, please contact platform administrators.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled
              className="text-xs text-muted-foreground border-border cursor-not-allowed opacity-60 shrink-0"
            >
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
