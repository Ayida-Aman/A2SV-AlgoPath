"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Search, Flame } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { Badge } from "@/components/ui/badge";

export function AppNavbar() {
  const pathname = usePathname();

  // Compute readable breadcrumb / title
  const getPageTitle = (path: string) => {
    if (path.startsWith("/dashboard")) return "Dashboard";
    if (path.startsWith("/roadmap/week/")) {
      const match = path.match(/\/roadmap\/week\/(\d+)/);
      return match ? `Week ${match[1]} Module` : "Week Detail";
    }
    if (path.startsWith("/roadmap") || path.startsWith("/learn")) return "Curriculum Roadmap";
    if (path.startsWith("/practice")) return "Problem Catalog";
    if (path.startsWith("/leaderboard")) return "Leaderboard";
    if (path.startsWith("/grind")) return "Grind Rooms";
    if (path.startsWith("/settings")) return "Settings";
    return "A2SV Legacy";
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/70 bg-background/80 px-4 md:px-6 backdrop-blur-md transition-colors">
      {/* Left: Page Title / Breadcrumbs */}
      <div className="flex items-center gap-3">
        <h1 className="text-base md:text-lg font-semibold text-foreground tracking-tight">
          {getPageTitle(pathname)}
        </h1>
        <Badge variant="subtle" className="hidden sm:inline-flex text-[11px]">
          43-Week Curriculum
        </Badge>
      </div>

      {/* Right: Search, Streak, Theme, User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Search placeholder */}
        <div className="relative hidden lg:block w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Quick search topics & problems..."
            readOnly
            className="h-9 w-full rounded-lg border border-input bg-card/60 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 shadow-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer hover:bg-card"
          />
        </div>

        {/* Streak placeholder */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
          <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span>Day 1</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Auth-Aware User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}
