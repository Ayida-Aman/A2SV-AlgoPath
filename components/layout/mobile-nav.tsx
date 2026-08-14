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
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Learn",
    href: "/learn",
    icon: BookOpen,
  },
  {
    title: "Practice",
    href: "/practice",
    icon: Code2,
  },
  {
    title: "Rank",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Grind",
    href: "/grind",
    icon: Flame,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-background/95 backdrop-blur-lg px-2 py-1.5 transition-colors">
      <nav className="flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center p-1 rounded-lg transition-transform",
                  isActive && "bg-primary/15 text-primary scale-105"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className="mt-0.5">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
