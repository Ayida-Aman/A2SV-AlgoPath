"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";
import { db } from "./client";
import { useAuth } from "@/contexts/auth-context";
import {
  getAllPhases,
  getPhaseForWeek,
  getTotalProblemCount,
  getAllEnrichedProblems,
  isValidProblemId,
  EnrichedProblem,
} from "@/lib/curriculum";
import { PhaseInfo } from "@/types";

export const DAILY_GRIND_TARGET = 3;

export interface GrindData {
  completedDates: string[];
  lastCompletedDate?: string | null;
  dailyTarget?: number;
}

export interface UserProgress {
  completedWeeks: number[];
  completedProblems: string[];
  grind?: GrindData;
  updatedAt?: unknown;
}

export interface PhaseProgressSummary {
  phase: PhaseInfo;
  completedCount: number;
  totalWeeks: number;
  percentage: number;
}

export interface RecentGrindDay {
  dateKey: string;
  dayLabel: string;
  isToday: boolean;
  isCompleted: boolean;
}

export interface UserProgressSummary {
  completedWeeks: number[];
  completedCount: number;
  totalWeeks: number;
  percentage: number;
  nextIncompleteWeek: number | null;
  currentPhase: PhaseInfo | null;
  phaseProgress: PhaseProgressSummary[];
  recentlyCompletedWeeks: number[];
  completedProblems: string[];
  solvedProblemsCount: number;
  totalProblemsCount: number;
  problemsPercentage: number;
  isProblemSolved: (problemId: string) => boolean;
  toggleProblem: (problemId: string) => Promise<boolean>;
  grindCompletedDates: string[];
  currentStreak: number;
  longestStreak: number;
  loading: boolean;
  error: string | null;
}

export interface GrindProgressSummary {
  todayProblems: EnrichedProblem[];
  todaySolvedCount: number;
  dailyTarget: number;
  isTodayComplete: boolean;
  todayProgressPercentage: number;
  currentStreak: number;
  longestStreak: number;
  completedDates: string[];
  recentDays: RecentGrindDay[];
  solvedProblemsCount: number;
  totalProblemsCount: number;
  loading: boolean;
  error: string | null;
  toggleProblem: (problemId: string) => Promise<boolean>;
}

/**
 * Returns a stable YYYY-MM-DD date key in local time.
 */
export function getDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates current and longest streaks based on completed date strings (YYYY-MM-DD).
 */
export function calculateStreaks(
  completedDates: string[],
  referenceDate: Date = new Date()
): { currentStreak: number; longestStreak: number } {
  if (!completedDates || completedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const sortedDates = Array.from(new Set(completedDates)).sort();
  if (sortedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dateSet = new Set(sortedDates);

  // 1. Calculate Longest Streak
  let longestStreak = 0;
  let runningStreak = 0;
  let prevDate: Date | null = null;

  for (const dateStr of sortedDates) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const currentDate = new Date(y, m - 1, d);

    if (!prevDate) {
      runningStreak = 1;
    } else {
      const diffMs = currentDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        runningStreak += 1;
      } else if (diffDays > 1) {
        runningStreak = 1;
      }
    }
    if (runningStreak > longestStreak) {
      longestStreak = runningStreak;
    }
    prevDate = currentDate;
  }

  // 2. Calculate Current Streak
  const todayKey = getDateKey(referenceDate);
  const yesterday = new Date(referenceDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday);

  let currentStreak = 0;
  let checkDate: Date;

  if (dateSet.has(todayKey)) {
    checkDate = new Date(referenceDate);
  } else if (dateSet.has(yesterdayKey)) {
    checkDate = yesterday;
  } else {
    return { currentStreak: 0, longestStreak };
  }

  while (true) {
    const key = getDateKey(checkDate);
    if (dateSet.has(key)) {
      currentStreak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak };
}

/**
 * Returns the recent 7 days (including today) with completion status.
 */
export function getRecentGrindDays(
  completedDates: string[],
  referenceDate: Date = new Date()
): RecentGrindDay[] {
  const dateSet = new Set(completedDates || []);
  const todayKey = getDateKey(referenceDate);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days: RecentGrindDay[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(referenceDate);
    d.setDate(d.getDate() - i);
    const key = getDateKey(d);
    const isToday = key === todayKey;
    const dayLabel = isToday ? "Today" : dayNames[d.getDay()];
    const isCompleted = dateSet.has(key);

    days.push({
      dateKey: key,
      dayLabel,
      isToday,
      isCompleted,
    });
  }

  return days;
}

/**
 * Generates an integer seed from a date key for deterministic daily selection.
 */
function getDailySeed(dateKey: string): number {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Deterministically selects the 3 fixed daily grind problems based on the date and curriculum position.
 */
export function getDailyGrindProblems(
  dateKey: string,
  allProbs: EnrichedProblem[],
  userWeek: number | null = 1,
  target: number = DAILY_GRIND_TARGET
): EnrichedProblem[] {
  if (!allProbs || allProbs.length === 0) return [];
  const centerWeek = Math.max(1, Math.min(43, userWeek || 1));

  // Order weeks by proximity from the user's current week position
  const weekDistanceOrder: number[] = [];
  for (let d = 0; d <= 43; d++) {
    if (centerWeek + d <= 43) weekDistanceOrder.push(centerWeek + d);
    if (d > 0 && centerWeek - d >= 1) weekDistanceOrder.push(centerWeek - d);
  }

  const proximityPool: EnrichedProblem[] = [];
  for (const w of weekDistanceOrder) {
    const probsInWeek = allProbs.filter((p) => p.weekNumber === w);
    proximityPool.push(...probsInWeek);
  }

  // Take a stable cluster around current position
  const clusterSize = Math.min(proximityPool.length, Math.max(target * 3, 9));
  const cluster = proximityPool.slice(0, clusterSize);

  const seed = getDailySeed(dateKey);
  const selected: EnrichedProblem[] = [];
  const chosenIds = new Set<string>();

  for (let i = 0; i < cluster.length && selected.length < target; i++) {
    const index = (seed + i) % cluster.length;
    const candidate = cluster[index];
    if (!chosenIds.has(candidate.id)) {
      chosenIds.add(candidate.id);
      selected.push(candidate);
    }
  }

  // Fallback to fill target if needed
  if (selected.length < target) {
    for (const p of proximityPool) {
      if (!chosenIds.has(p.id)) {
        chosenIds.add(p.id);
        selected.push(p);
        if (selected.length === target) break;
      }
    }
  }

  return selected;
}

/**
 * Validates that the input is a valid curriculum week number (1–43).
 */
export function isValidWeekNumber(weekNumber: number): boolean {
  return Number.isInteger(weekNumber) && weekNumber >= 1 && weekNumber <= 43;
}

/**
 * Sanitizes and deduplicates an array of week numbers, keeping only valid 1–43 integers.
 */
export function sanitizeCompletedWeeks(rawWeeks: unknown): number[] {
  if (!Array.isArray(rawWeeks)) return [];
  const valid = rawWeeks.filter(
    (w): w is number => typeof w === "number" && isValidWeekNumber(w)
  );
  return Array.from(new Set(valid)).sort((a, b) => a - b);
}

/**
 * Sanitizes and deduplicates an array of problem IDs, strictly enforcing that they belong to the canonical 180-problem curriculum.
 */
export function sanitizeCompletedProblems(rawProblems: unknown): string[] {
  if (!Array.isArray(rawProblems)) return [];
  const valid = rawProblems
    .filter((id): id is string => typeof id === "string" && isValidProblemId(id.trim()))
    .map((id) => id.trim());
  return Array.from(new Set(valid)).sort();
}

/**
 * Sanitizes and deduplicates an array of grind date keys (YYYY-MM-DD).
 */
export function sanitizeCompletedDates(rawDates: unknown): string[] {
  if (!Array.isArray(rawDates)) return [];
  const valid = rawDates.filter(
    (d): d is string =>
      typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d.trim())
  );
  return Array.from(new Set(valid.map((d) => d.trim()))).sort();
}

/**
 * Returns the Firestore document reference for a user's progress overview.
 * Path: users/{uid}/progress/overview
 */
export function getProgressDocRef(uid: string): DocumentReference {
  return doc(db, "users", uid, "progress", "overview");
}

/**
 * Retrieves the user's progress document once from Firestore.
 */
export async function getUserProgress(uid: string): Promise<UserProgress | null> {
  if (!uid) return null;
  try {
    const docRef = getProgressDocRef(uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        completedWeeks: sanitizeCompletedWeeks(data.completedWeeks),
        completedProblems: sanitizeCompletedProblems(data.completedProblems),
        grind: {
          completedDates: sanitizeCompletedDates(data.grind?.completedDates),
          lastCompletedDate: data.grind?.lastCompletedDate || null,
          dailyTarget: data.grind?.dailyTarget || DAILY_GRIND_TARGET,
        },
        updatedAt: data.updatedAt,
      };
    }
    return {
      completedWeeks: [],
      completedProblems: [],
      grind: { completedDates: [], lastCompletedDate: null, dailyTarget: DAILY_GRIND_TARGET },
    };
  } catch (error) {
    console.error("Error fetching user progress:", error);
    throw error;
  }
}

/**
 * Atomically adds a week number to the user's completedWeeks array in Firestore.
 */
export async function markWeekComplete(uid: string, weekNumber: number): Promise<void> {
  if (!uid) throw new Error("User must be authenticated to save progress.");
  if (!isValidWeekNumber(weekNumber)) {
    throw new Error(`Invalid week number: ${weekNumber}. Must be between 1 and 43.`);
  }

  const docRef = getProgressDocRef(uid);
  await setDoc(
    docRef,
    {
      completedWeeks: arrayUnion(weekNumber),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Atomically removes a week number from the user's completedWeeks array in Firestore.
 */
export async function markWeekIncomplete(uid: string, weekNumber: number): Promise<void> {
  if (!uid) throw new Error("User must be authenticated to update progress.");
  if (!isValidWeekNumber(weekNumber)) {
    throw new Error(`Invalid week number: ${weekNumber}. Must be between 1 and 43.`);
  }

  const docRef = getProgressDocRef(uid);
  await setDoc(
    docRef,
    {
      completedWeeks: arrayRemove(weekNumber),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Atomically adds a validated problem ID to the user's completedProblems array in Firestore.
 */
export async function markProblemSolved(uid: string, problemId: string): Promise<void> {
  if (!uid) throw new Error("User must be authenticated to save problem progress.");
  const cleanId = problemId ? problemId.trim() : "";
  if (!isValidProblemId(cleanId)) {
    throw new Error("Invalid problem ID: problem does not exist in the curriculum.");
  }

  const docRef = getProgressDocRef(uid);
  await setDoc(
    docRef,
    {
      completedProblems: arrayUnion(cleanId),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Atomically removes a problem ID from the user's completedProblems array in Firestore.
 */
export async function markProblemUnsolved(uid: string, problemId: string): Promise<void> {
  if (!uid) throw new Error("User must be authenticated to update problem progress.");
  const cleanId = problemId ? problemId.trim() : "";
  if (!isValidProblemId(cleanId)) {
    throw new Error("Invalid problem ID.");
  }

  const docRef = getProgressDocRef(uid);
  await setDoc(
    docRef,
    {
      completedProblems: arrayRemove(cleanId),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Records a completed daily grind date in Firestore.
 */
export async function recordGrindCompletion(
  uid: string,
  dateKey: string = getDateKey()
): Promise<void> {
  if (!uid) throw new Error("User must be authenticated.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    throw new Error("Invalid date key format.");
  }

  const docRef = getProgressDocRef(uid);
  await setDoc(
    docRef,
    {
      grind: {
        completedDates: arrayUnion(dateKey),
        lastCompletedDate: dateKey,
        dailyTarget: DAILY_GRIND_TARGET,
      },
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Removes a grind date completion from Firestore (e.g. if a problem is un-marked).
 */
export async function removeGrindCompletion(
  uid: string,
  dateKey: string = getDateKey()
): Promise<void> {
  if (!uid) throw new Error("User must be authenticated.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    throw new Error("Invalid date key format.");
  }

  const docRef = getProgressDocRef(uid);
  await setDoc(
    docRef,
    {
      grind: {
        completedDates: arrayRemove(dateKey),
        dailyTarget: DAILY_GRIND_TARGET,
      },
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Subscribes to real-time updates on a user's progress document using onSnapshot.
 */
export function subscribeToUserProgress(
  uid: string,
  onUpdate: (progress: UserProgress | null) => void,
  onError?: (error: Error) => void
): () => void {
  if (!uid) {
    onUpdate(null);
    return () => {};
  }

  const docRef = getProgressDocRef(uid);
  const unsubscribe = onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        onUpdate({
          completedWeeks: sanitizeCompletedWeeks(data.completedWeeks),
          completedProblems: sanitizeCompletedProblems(data.completedProblems),
          grind: {
            completedDates: sanitizeCompletedDates(data.grind?.completedDates),
            lastCompletedDate: data.grind?.lastCompletedDate || null,
            dailyTarget: data.grind?.dailyTarget || DAILY_GRIND_TARGET,
          },
          updatedAt: data.updatedAt,
        });
      } else {
        onUpdate({
          completedWeeks: [],
          completedProblems: [],
          grind: { completedDates: [], lastCompletedDate: null, dailyTarget: DAILY_GRIND_TARGET },
        });
      }
    },
    (err) => {
      console.warn("Firestore progress snapshot error:", err);
      if (onError) onError(err);
    }
  );

  return unsubscribe;
}

/**
 * React hook to manage real-time week completion state for a given week number.
 */
export function useWeekProgress(weekNumber: number) {
  const { currentUser, loading: authLoading } = useAuth();
  const [completed, setCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!currentUser) {
      setCompleted(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToUserProgress(
      currentUser.uid,
      (progress) => {
        if (progress && Array.isArray(progress.completedWeeks)) {
          setCompleted(progress.completedWeeks.includes(weekNumber));
        } else {
          setCompleted(false);
        }
        setLoading(false);
      },
      (err) => {
        setError("Unable to sync progress with cloud.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, authLoading, weekNumber]);

  const toggle = useCallback(async (): Promise<boolean> => {
    if (!currentUser) throw new Error("UNAUTHENTICATED");
    if (!isValidWeekNumber(weekNumber)) throw new Error("INVALID_WEEK");

    setIsSaving(true);
    setError(null);

    const nextState = !completed;
    try {
      if (nextState) {
        await markWeekComplete(currentUser.uid, weekNumber);
      } else {
        await markWeekIncomplete(currentUser.uid, weekNumber);
      }
      return nextState;
    } catch (err) {
      console.error("Error updating week completion in Firestore:", err);
      setError("Unable to save your progress. Please try again.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [currentUser, completed, weekNumber]);

  return {
    completed,
    loading,
    isSaving,
    error,
    isAuthenticated: Boolean(currentUser),
    toggle,
  };
}

/**
 * React hook to manage real-time solved state for a specific problem ID.
 */
export function useProblemProgress(problemId: string) {
  const { currentUser, loading: authLoading } = useAuth();
  const [solved, setSolved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!currentUser) {
      setSolved(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToUserProgress(
      currentUser.uid,
      (progress) => {
        if (progress && Array.isArray(progress.completedProblems)) {
          setSolved(progress.completedProblems.includes(problemId));
        } else {
          setSolved(false);
        }
        setLoading(false);
      },
      (err) => {
        setError("Unable to sync problem progress with cloud.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, authLoading, problemId]);

  const toggle = useCallback(async (): Promise<boolean> => {
    if (!currentUser) throw new Error("UNAUTHENTICATED");
    if (!isValidProblemId(problemId)) throw new Error("INVALID_PROBLEM_ID");

    setIsSaving(true);
    setError(null);

    const nextState = !solved;
    try {
      if (nextState) {
        await markProblemSolved(currentUser.uid, problemId);
      } else {
        await markProblemUnsolved(currentUser.uid, problemId);
      }
      return nextState;
    } catch (err) {
      console.error("Error updating problem solved state in Firestore:", err);
      setError("Unable to save your problem progress. Please try again.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [currentUser, solved, problemId]);

  return {
    solved,
    loading,
    isSaving,
    error,
    isAuthenticated: Boolean(currentUser),
    toggle,
  };
}

/**
 * React hook to retrieve full aggregate progress for the authenticated scholar across all 43 weeks and 180 problems.
 */
export function useUserProgress(): UserProgressSummary {
  const { currentUser, loading: authLoading } = useAuth();
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  const [grindCompletedDates, setGrindCompletedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!currentUser) {
      setCompletedWeeks([]);
      setCompletedProblems([]);
      setGrindCompletedDates([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToUserProgress(
      currentUser.uid,
      (progress) => {
        if (progress) {
          setCompletedWeeks(sanitizeCompletedWeeks(progress.completedWeeks));
          setCompletedProblems(sanitizeCompletedProblems(progress.completedProblems));
          setGrindCompletedDates(sanitizeCompletedDates(progress.grind?.completedDates));
        } else {
          setCompletedWeeks([]);
          setCompletedProblems([]);
          setGrindCompletedDates([]);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error subscribing to user progress:", err);
        setError("Unable to load your progress right now.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, authLoading]);

  const totalWeeks = 43;
  const completedCount = completedWeeks.length;
  const percentage = Math.round((completedCount / totalWeeks) * 100);

  const totalProblemsCount = getTotalProblemCount();
  const solvedProblemsCount = completedProblems.length;
  const problemsPercentage =
    totalProblemsCount > 0
      ? Math.round((solvedProblemsCount / totalProblemsCount) * 100)
      : 0;

  // Next incomplete week
  let nextIncompleteWeek: number | null = null;
  for (let i = 1; i <= totalWeeks; i++) {
    if (!completedWeeks.includes(i)) {
      nextIncompleteWeek = i;
      break;
    }
  }

  // Current phase
  const currentPhase = nextIncompleteWeek
    ? getPhaseForWeek(nextIncompleteWeek)
    : getAllPhases()[getAllPhases().length - 1];

  // Phase progress
  const phases = getAllPhases();
  const phaseProgress: PhaseProgressSummary[] = phases.map((phase) => {
    const completedInPhase = phase.weeks.filter((w) =>
      completedWeeks.includes(w)
    ).length;
    const totalInPhase = phase.totalWeeks;
    const phasePct = Math.round((completedInPhase / totalInPhase) * 100);
    return {
      phase,
      completedCount: completedInPhase,
      totalWeeks: totalInPhase,
      percentage: phasePct,
    };
  });

  const recentlyCompletedWeeks = [...completedWeeks].reverse().slice(0, 5);

  const { currentStreak, longestStreak } = useMemo(() => {
    return calculateStreaks(grindCompletedDates);
  }, [grindCompletedDates]);

  const isProblemSolved = useCallback(
    (problemId: string): boolean => {
      return completedProblems.includes(problemId);
    },
    [completedProblems]
  );

  const toggleProblem = useCallback(
    async (problemId: string): Promise<boolean> => {
      if (!currentUser) throw new Error("UNAUTHENTICATED");
      const isCurrentlySolved = completedProblems.includes(problemId);
      if (isCurrentlySolved) {
        await markProblemUnsolved(currentUser.uid, problemId);
        return false;
      } else {
        await markProblemSolved(currentUser.uid, problemId);
        return true;
      }
    },
    [currentUser, completedProblems]
  );

  return {
    completedWeeks,
    completedCount,
    totalWeeks,
    percentage,
    nextIncompleteWeek,
    currentPhase,
    phaseProgress,
    recentlyCompletedWeeks,
    completedProblems,
    solvedProblemsCount,
    totalProblemsCount,
    problemsPercentage,
    isProblemSolved,
    toggleProblem,
    grindCompletedDates,
    currentStreak,
    longestStreak,
    loading,
    error,
  };
}

/**
 * Dedicated React hook for the Daily Grind workspace.
 */
export function useGrindProgress(): GrindProgressSummary {
  const { currentUser, loading: authLoading } = useAuth();
  const {
    completedProblems,
    nextIncompleteWeek,
    grindCompletedDates,
    currentStreak,
    longestStreak,
    solvedProblemsCount,
    totalProblemsCount,
    loading: progressLoading,
    error: progressError,
    toggleProblem,
  } = useUserProgress();

  const allProblems = useMemo<EnrichedProblem[]>(() => {
    return getAllEnrichedProblems();
  }, []);

  const todayKey = useMemo(() => getDateKey(), []);

  // Compute deterministic daily recommended problems (fixed 3 for today)
  const todayProblems = useMemo(() => {
    return getDailyGrindProblems(
      todayKey,
      allProblems,
      nextIncompleteWeek || 1,
      DAILY_GRIND_TARGET
    );
  }, [todayKey, allProblems, nextIncompleteWeek]);

  // Compute how many of today's recommended problems are solved
  const todaySolvedCount = useMemo(() => {
    return todayProblems.filter((p) => completedProblems.includes(p.id)).length;
  }, [todayProblems, completedProblems]);

  const isTodayComplete = todaySolvedCount >= DAILY_GRIND_TARGET;
  const todayProgressPercentage = Math.round(
    (todaySolvedCount / DAILY_GRIND_TARGET) * 100
  );

  // Auto-sync grind completion date to Firestore when target is reached
  useEffect(() => {
    if (!currentUser || progressLoading) return;

    const isDateRecorded = grindCompletedDates.includes(todayKey);

    if (isTodayComplete && !isDateRecorded) {
      recordGrindCompletion(currentUser.uid, todayKey).catch((err) =>
        console.error("Failed to auto-record grind completion:", err)
      );
    } else if (!isTodayComplete && isDateRecorded) {
      removeGrindCompletion(currentUser.uid, todayKey).catch((err) =>
        console.error("Failed to auto-remove grind completion:", err)
      );
    }
  }, [currentUser, isTodayComplete, grindCompletedDates, todayKey, progressLoading]);

  const recentDays = useMemo(() => {
    return getRecentGrindDays(grindCompletedDates);
  }, [grindCompletedDates]);

  return {
    todayProblems,
    todaySolvedCount,
    dailyTarget: DAILY_GRIND_TARGET,
    isTodayComplete,
    todayProgressPercentage,
    currentStreak,
    longestStreak,
    completedDates: grindCompletedDates,
    recentDays,
    solvedProblemsCount,
    totalProblemsCount,
    loading: authLoading || progressLoading,
    error: progressError,
    toggleProblem,
  };
}
