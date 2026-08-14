import React from "react";

export type PhaseId = "foundation" | "phase_1" | "phase_2" | "phase_3";

export interface PhaseInfo {
  id: PhaseId;
  name: string;
  description: string;
  weeks: number[];
  totalWeeks: number;
}

export interface ProblemOccurrence {
  sourceDay: number | string;
  weekNumber: number;
  sourceMsgId?: string;
  rawTitle?: string;
}

export interface ProblemItem {
  title: string;
  platform: "LeetCode" | "Codeforces" | "HackerRank" | "Eolymp" | "GeeksforGeeks" | "Kattis" | string;
  url: string;
  sourceDay: number | string;
  weekNumber: number;
  difficulty: "Easy" | "Medium" | "Hard" | null;
  topics: string[];
  occurrences?: ProblemOccurrence[];
}

export interface MaterialItem {
  fileName: string;
  relativePath: string;
  type: string;
  sizeBytes: number;
  onDisk: boolean;
  topic: string;
  confidence: "high" | "medium" | "low";
}

export interface ConceptItem {
  name: string;
  description: string;
  complexity: string | null;
}

export interface QuoteItem {
  quote: string;
  author: string;
}

export interface SourceMeta {
  author: string;
  telegramUrls: string[];
  dates: string[];
}

export interface WeekCurriculum {
  weekNumber: number;
  phase: PhaseId;
  phaseName: string;
  title: string;
  description: string;
  sourceDays: (number | string)[];
  learningObjectives: string[];
  concepts: ConceptItem[];
  algorithms: string[];
  dataStructures: string[];
  complexities: Record<string, any> | null;
  problems: ProblemItem[];
  materials: MaterialItem[];
  quote: QuoteItem | null;
  source: SourceMeta;
  status: "verified" | "needs_review";
  confidence: "high" | "medium" | "low";
}

export interface NavItem {
  title: string;
  href: string;
  iconName?: string;
  badge?: string;
  disabled?: boolean;
  external?: boolean;
}
