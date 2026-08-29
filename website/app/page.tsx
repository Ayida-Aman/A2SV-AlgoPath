import React from "react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { WhatIsAlgoPath } from "@/components/landing/what-is-legacy";
import { RoadmapPreview } from "@/components/landing/roadmap-preview";
import { PracticePreview } from "@/components/landing/practice-preview";
import { ProgressPreview } from "@/components/landing/progress-preview";
import { CommunityPreview } from "@/components/landing/community-preview";
import { FinalCTA } from "@/components/landing/final-cta";

export const metadata = {
  title: "A2SV AlgoPath",
  description:
    "An independent educational platform structuring an intensive 43-week Data Structures, Algorithms, and Competitive Programming journey with 180+ problems and 41 lecture slide decks.",
};

export default function HomePage() {
  return (
    <PublicLayout>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Social & Credibility Statistics */}
      <Stats />

      {/* 3. What is A2SV AlgoPath? (3 Pillars) */}
      <WhatIsAlgoPath />

      {/* 4. 43-Week Journey (4 Phases Progression) */}
      <RoadmapPreview />

      {/* 5. Practice Section (Real Problems & Platforms) */}
      <PracticePreview />

      {/* 6. Progress & Streak Preview */}
      <ProgressPreview />

      {/* 7. Community & Leaderboard Preview */}
      <CommunityPreview />

      {/* 8. Final CTA Section */}
      <FinalCTA />
    </PublicLayout>
  );
}
