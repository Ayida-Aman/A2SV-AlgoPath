"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Trophy,
  Flame,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Roadmap",
    href: "/roadmap",
    icon: BookOpen,
    badge: "43 W",
  },
  {
    title: "Practice",
    href: "/practice",
    icon: Code2,
    badge: "180",
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Grind",
    href: "/grind",
    icon: Flame,
  },
];

const secondaryNavItems = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-border/70 bg-card/80 backdrop-blur-md transition-all duration-300 z-30 sticky top-0 h-screen self-start shrink-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Floating Border Expand/Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-5 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-border/80 bg-background text-muted-foreground shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Header / Brand */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-border/60 transition-all shrink-0",
          collapsed ? "justify-center px-2" : "justify-start px-5"
        )}
      >
        <Logo
          size="sm"
          showTagline={false}
          showText={!collapsed}
          className={collapsed ? "justify-center" : undefined}
        />
      </div>

      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 no-scrollbar">
        <div>
          {!collapsed && (
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
              Curriculum
            </p>
          )}
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-blue-500/10 dark:shadow-blue-500/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform group-hover:scale-105",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.title}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground border-transparent"
                          : "bg-muted text-muted-foreground border-border/60"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          {!collapsed && (
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
              System
            </p>
          )}
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="flex-1 truncate">{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / User Profile & Theme Toggle */}
      <div
        className={cn(
          "p-3 border-t border-border/60 flex items-center transition-all shrink-0",
          collapsed ? "justify-center" : "justify-between gap-2"
        )}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <Avatar name="A2SV Scholar" size="sm" status="online" />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground truncate">
                Guest Scholar
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                Level 1 · Cohort Ready
              </span>
            </div>
          )}
        </div>
        {!collapsed && <ThemeToggle />}
      </div>
    </aside>
  );
}
