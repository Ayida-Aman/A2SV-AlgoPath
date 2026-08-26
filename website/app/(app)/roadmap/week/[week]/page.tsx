import React from "react";
import { notFound } from "next/navigation";
import { getWeekByNumber, getProblemsForWeek } from "@/lib/curriculum";
import { AppLayout } from "@/components/layout/app-layout";
import { WeekDetail } from "@/components/roadmap/week-detail";
import { WeekProblems } from "@/components/roadmap/week-problems";
import { WeekResources } from "@/components/roadmap/week-resources";
import { WeekNav } from "@/components/roadmap/week-nav";

interface WeekPageProps {
  params: Promise<{
    week: string;
  }>;
}

export async function generateStaticParams() {
  return Array.from({ length: 43 }, (_, i) => ({
    week: String(i + 1),
  }));
}

export async function generateMetadata({ params }: WeekPageProps) {
  const { week: weekParam } = await params;
  const weekNum = parseInt(weekParam, 10);
  const week = getWeekByNumber(weekNum);

  if (!week || isNaN(weekNum) || !/^\d+$/.test(weekParam)) {
    return {
      title: "Week Not Found — A2SV Legacy",
    };
  }

  return {
    title: `Week ${week.weekNumber}: ${week.title} — A2SV Legacy`,
    description: week.description,
  };
}

export default async function WeekDetailPage({ params }: WeekPageProps) {
  const { week: weekParam } = await params;

  // Strict URL Validation: Only integers from 1 to 43 are valid
  if (!/^\d+$/.test(weekParam)) {
    notFound();
  }

  const weekNum = parseInt(weekParam, 10);
  if (isNaN(weekNum) || weekNum < 1 || weekNum > 43) {
    notFound();
  }

  const week = getWeekByNumber(weekNum);
  if (!week) {
    notFound();
  }

  const problems = getProblemsForWeek(weekNum);
  const materials = week.materials || [];

  return (
    <AppLayout>
      <div className="space-y-10 max-w-4xl mx-auto pb-12">
        <WeekDetail week={week} />
        <WeekResources materials={materials} />
        <WeekProblems problems={problems} weekNumber={weekNum} />
        <WeekNav weekNumber={weekNum} />
      </div>
    </AppLayout>
  );
}
