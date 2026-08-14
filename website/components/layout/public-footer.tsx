import React from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/40 backdrop-blur-sm text-muted-foreground text-sm">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              An independent, community-driven educational platform preserving and structuring a 43-week Data Structures & Algorithms learning journey into an accessible, open curriculum.
            </p>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-600 dark:text-amber-400 max-w-md">
              <span className="font-semibold">Disclaimer:</span> A2SV Legacy is an independent project and is not affiliated with, endorsed by, or operated by A2SV.
            </div>
          </div>

          {/* Curriculum Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Curriculum
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn" className="hover:text-foreground transition-colors">
                  Foundation (Weeks 1–12)
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-foreground transition-colors">
                  Core DSA (Weeks 13–25)
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-foreground transition-colors">
                  Advanced DSA (Weeks 26–36)
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-foreground transition-colors">
                  Competitive Programming (Weeks 37–43)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-foreground transition-colors">
                  Problem Catalog
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-foreground transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/grind" className="hover:text-foreground transition-colors">
                  Grind Rooms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} A2SV Legacy. Built for engineers, by engineers.</p>
          <div className="flex items-center gap-4">
            <Link href="/learn" className="hover:text-foreground transition-colors">
              Roadmap
            </Link>
            <Link href="/settings" className="hover:text-foreground transition-colors">
              Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
