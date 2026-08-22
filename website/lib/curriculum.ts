import curriculumData from "@/data/curriculum.json";
import problemsData from "@/data/problems.json";
import phasesData from "@/data/phases.json";
import fileInventoryData from "@/data/file_inventory.json";
import { WeekCurriculum, ProblemItem, PhaseInfo, MaterialItem } from "@/types";

export interface EnrichedProblem extends ProblemItem {
  id: string;
  weekTitle: string;
  phaseId: string;
  phaseName: string;
  topicSummary: string;
}

export const allWeeks: WeekCurriculum[] = curriculumData as WeekCurriculum[];
export const allProblems: ProblemItem[] = problemsData as ProblemItem[];
export const allPhases: PhaseInfo[] = phasesData as PhaseInfo[];
export const allMaterials: MaterialItem[] = fileInventoryData as MaterialItem[];

/**
 * Deterministically generates a stable, unique, URL-safe problem ID from platform and title.
 * e.g. "LeetCode" + "Smallest even multiple" -> "leetcode-smallest-even-multiple"
 */
export function getProblemId(problem: { platform: string; title: string }): string {
  const platformSlug = (problem.platform || "general")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const titleSlug = (problem.title || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${platformSlug}-${titleSlug}`;
}

export function getAllWeeks(): WeekCurriculum[] {
  return allWeeks;
}

export function getWeekByNumber(weekNumber: number): WeekCurriculum | null {
  if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 43) {
    return null;
  }
  const week = allWeeks.find((w) => w.weekNumber === weekNumber);
  return week || null;
}

export function getAllPhases(): PhaseInfo[] {
  return allPhases;
}

export function getPhaseById(id: string): PhaseInfo | null {
  const phase = allPhases.find((p) => p.id === id);
  return phase || null;
}

export function getPhaseForWeek(weekNumber: number): PhaseInfo | null {
  const phase = allPhases.find((p) => p.weeks.includes(weekNumber));
  return phase || null;
}

export function getProblemsForWeek(weekNumber: number): ProblemItem[] {
  const week = getWeekByNumber(weekNumber);
  if (!week) return [];
  if (week.problems && week.problems.length > 0) {
    return week.problems;
  }
  return allProblems.filter((p) => p.weekNumber === weekNumber);
}

export function getWeekProblemCount(weekNumber: number): number {
  const probs = getProblemsForWeek(weekNumber);
  return probs.length;
}

export function getTotalProblemCount(): number {
  return allProblems.length;
}

export function getAdjacentWeeks(weekNumber: number): {
  prevWeek: WeekCurriculum | null;
  nextWeek: WeekCurriculum | null;
} {
  const prevWeek = weekNumber > 1 ? getWeekByNumber(weekNumber - 1) : null;
  const nextWeek = weekNumber < 43 ? getWeekByNumber(weekNumber + 1) : null;
  return { prevWeek, nextWeek };
}

export function getPhaseStats(phaseId: string) {
  const phase = getPhaseById(phaseId);
  if (!phase) return { totalWeeks: 0, totalProblems: 0, totalSlides: 0 };
  const phaseWeeks = allWeeks.filter((w) => phase.weeks.includes(w.weekNumber));
  const totalProblems = phaseWeeks.reduce((acc, w) => acc + (w.problems?.length || 0), 0);
  const totalSlides = phaseWeeks.reduce((acc, w) => acc + (w.materials?.length || 0), 0);
  return {
    totalWeeks: phase.totalWeeks,
    totalProblems,
    totalSlides,
  };
}

/**
 * Returns all 180 canonical problems enriched with stable IDs, curriculum week titles, phase, and topic summaries.
 */
export function getAllEnrichedProblems(): EnrichedProblem[] {
  return allProblems.map((problem) => {
    const week = getWeekByNumber(problem.weekNumber);
    const id = getProblemId(problem);
    const weekTitle = week?.title || `Week ${problem.weekNumber}`;
    const phaseId = week?.phase || "foundation";
    const phaseName = week?.phaseName || "Foundation";
    const topicSummary =
      problem.topics && problem.topics.length > 0
        ? problem.topics[0]
        : week?.algorithms?.[0] || week?.dataStructures?.[0] || weekTitle;

    return {
      ...problem,
      id,
      weekTitle,
      phaseId,
      phaseName,
      topicSummary,
    };
  });
}
