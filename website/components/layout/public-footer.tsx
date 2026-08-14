import React from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { ExternalLink, Code2 } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/40 backdrop-blur-sm text-muted-foreground text-sm">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              An independent, community-driven educational platform preserving and structuring a 43-week Data Structures & Algorithms learning journey into an accessible, open curriculum.
            </p>
            <div className="rounded-lg border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground max-w-md">
              <span className="font-semibold text-foreground">Disclaimer:</span> A2SV Legacy is an independent community project and is not officially affiliated with, endorsed by, or operated by A2SV.
            </div>
          </div>

          {/* Curriculum Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Curriculum
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/roadmap#phase-foundation" className="hover:text-foreground transition-colors">
                  Foundation (Weeks 1–12)
                </Link>
              </li>
              <li>
                <Link href="/roadmap#phase-phase_1" className="hover:text-foreground transition-colors">
                  Phase 1 — Core DSA (Weeks 13–25)
                </Link>
              </li>
              <li>
                <Link href="/roadmap#phase-phase_2" className="hover:text-foreground transition-colors">
                  Phase 2 — Advanced DSA (Weeks 26–36)
                </Link>
              </li>
              <li>
                <Link href="/roadmap#phase-phase_3" className="hover:text-foreground transition-colors">
                  Phase 3 — CP (Weeks 37–43)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Resource Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/roadmap" className="hover:text-foreground transition-colors">
                  Full Roadmap (43 Weeks)
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-foreground transition-colors">
                  Practice Problems
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Scholar Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Ayida-Aman/A2SV-Legacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} A2SV Legacy. Build the skills. Continue the legacy.</p>
          <div className="flex items-center gap-4">
            <Link href="/roadmap" className="hover:text-foreground transition-colors">
              Roadmap
            </Link>
            <Link href="/practice" className="hover:text-foreground transition-colors">
              Practice
            </Link>
            <Link href="/settings" className="hover:text-foreground transition-colors">
              Theme
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
