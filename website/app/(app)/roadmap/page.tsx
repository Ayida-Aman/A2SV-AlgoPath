import React from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { RoadmapHero } from "@/components/roadmap/roadmap-hero";
import { PhaseOverview } from "@/components/roadmap/phase-overview";
import { PhaseNav } from "@/components/roadmap/phase-nav";
import { RoadmapTimeline } from "@/components/roadmap/roadmap-timeline";

export const metadata = {
  title: "43-Week Curriculum Roadmap — A2SV AlgoPath",
  description:
    "Explore the complete 43-week progressive Data Structures, Algorithms, and Competitive Programming roadmap across 4 structured phases.",
};

export default function RoadmapPage() {
  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Hero Section */}
        <RoadmapHero />

        {/* 4 Phases Overview Grid */}
        <PhaseOverview />

        {/* Sticky Phase Navigation */}
        <PhaseNav />

        {/* 43-Week Vertical Timeline Progression */}
        <RoadmapTimeline />
      </div>
    </AppLayout>
  );
}
