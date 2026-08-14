import curriculumData from "@/data/curriculum.json";
import problemsData from "@/data/problems.json";
import phasesData from "@/data/phases.json";
import fileInventoryData from "@/data/file_inventory.json";
import { WeekCurriculum, ProblemItem, PhaseInfo, MaterialItem } from "@/types";

export const curriculum: WeekCurriculum[] = curriculumData as WeekCurriculum[];
export const problems: ProblemItem[] = problemsData as ProblemItem[];
export const phases: PhaseInfo[] = phasesData as PhaseInfo[];
export const fileInventory: MaterialItem[] = fileInventoryData as MaterialItem[];

export const stats = {
  totalWeeks: curriculum.length,
  totalProblems: problems.length,
  totalPhases: phases.length,
  totalSlides: fileInventory.filter((f) => f.type === "pdf").length,
  totalPlatforms: Array.from(new Set(problems.map((p) => p.platform))).length,
  platformsList: Array.from(new Set(problems.map((p) => p.platform))),
};

export function getPhaseByWeek(weekNumber: number): PhaseInfo | undefined {
  return phases.find((p) => p.weeks.includes(weekNumber));
}

export function getWeekByNumber(weekNumber: number): WeekCurriculum | undefined {
  return curriculum.find((w) => w.weekNumber === weekNumber);
}

export function getProblemsByWeek(weekNumber: number): ProblemItem[] {
  return problems.filter((p) => p.weekNumber === weekNumber);
}
