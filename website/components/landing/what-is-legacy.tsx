import React from "react";
import { BookOpen, Code2, Flame, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function WhatIsAlgoPath() {
  const pillars = [
    {
      title: "LEARN",
      subtitle: "Master the Fundamentals & Paradigms",
      description:
        "Deep-dive into clean code standards, Big-O complexity analysis, trees, graph theory, dynamic programming, and competitive string algorithms with structured weekly slide lectures.",
      icon: BookOpen,
      badge: "Step 01",
      borderAccent: "group-hover:border-blue-500/40",
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "PRACTICE",
      subtitle: "Solve Curated Real-World Problems",
      description:
        "Tackle 180+ handpicked coding challenges from LeetCode, Codeforces, HackerRank, and Eolymp specifically mapped to each weekly concept to build intuition and speed.",
      icon: Code2,
      badge: "Step 02",
      borderAccent: "group-hover:border-sky-500/40",
      iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
      title: "GRIND",
      subtitle: "Build Unshakable Daily Consistency",
      description:
        "Turn learning into a disciplined habit. Follow a 43-week chronological roadmap designed for developers committed to landing top-tier engineering roles.",
      icon: Flame,
      badge: "Step 03",
      borderAccent: "group-hover:border-amber-500/40",
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="subtle" className="font-semibold">
            The Philosophy
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Not just a roadmap. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
              A comprehensive journey.
            </span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Most roadmaps give you an endless list of unorganized links. A2SV AlgoPath structures the DSA experience into a cohesive, week-by-week learning system.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={idx}
                variant="interactive"
                className="group relative p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${pillar.iconBg}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/60">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {pillar.title}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-1 leading-snug">
                      {pillar.subtitle}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/40 flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  <span>Explore {pillar.title.toLowerCase()} pipeline</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
