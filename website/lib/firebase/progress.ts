"use client";

import { useState, useEffect, useCallback } from "react";
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
import { getAllPhases, getPhaseForWeek, getTotalProblemCount } from "@/lib/curriculum";
import { PhaseInfo } from "@/types";

export interface UserProgress {
  completedWeeks: number[];
  completedProblems: string[];
  updatedAt?: unknown;
}

export interface PhaseProgressSummary {
  phase: PhaseInfo;
  completedCount: number;
  totalWeeks: number;
  percentage: number;
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
  loading: boolean;
  error: string | null;
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
 * Sanitizes and deduplicates an array of problem IDs, keeping only non-empty strings.
 */
export function sanitizeCompletedProblems(rawProblems: unknown): string[] {
  if (!Array.isArray(rawProblems)) return [];
  const valid = rawProblems
    .filter((id): id is string => typeof id === "string" && id.trim().length > 0)
    .map((id) => id.trim());
  return Array.from(new Set(valid)).sort();
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
        updatedAt: data.updatedAt,
      };
    }
    return { completedWeeks: [], completedProblems: [] };
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
 * Atomically adds a problem ID to the user's completedProblems array in Firestore.
 */
export async function markProblemSolved(uid: string, problemId: string): Promise<void> {
  if (!uid) throw new Error("User must be authenticated to save problem progress.");
  if (!problemId || typeof problemId !== "string" || !problemId.trim()) {
    throw new Error("Invalid problem ID.");
  }

  const docRef = getProgressDocRef(uid);
  await setDoc(
    docRef,
    {
      completedProblems: arrayUnion(problemId.trim()),
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
  if (!problemId || typeof problemId !== "string" || !problemId.trim()) {
    throw new Error("Invalid problem ID.");
  }

  const docRef = getProgressDocRef(uid);
  await setDoc(
    docRef,
    {
      completedProblems: arrayRemove(problemId.trim()),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Subscribes to real-time updates on a user's progress document using onSnapshot.
 * Returns an unsubscribe function to clean up the listener.
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
          updatedAt: data.updatedAt,
        });
      } else {
        onUpdate({ completedWeeks: [], completedProblems: [] });
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
    if (!currentUser) {
      throw new Error("UNAUTHENTICATED");
    }

    if (!isValidWeekNumber(weekNumber)) {
      throw new Error("INVALID_WEEK");
    }

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
    if (!currentUser) {
      throw new Error("UNAUTHENTICATED");
    }

    if (!problemId) {
      throw new Error("INVALID_PROBLEM_ID");
    }

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
        } else {
          setCompletedWeeks([]);
          setCompletedProblems([]);
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

  // Determine next incomplete week (first missing integer from 1 to 43)
  let nextIncompleteWeek: number | null = null;
  for (let i = 1; i <= totalWeeks; i++) {
    if (!completedWeeks.includes(i)) {
      nextIncompleteWeek = i;
      break;
    }
  }

  // Determine current phase based on next incomplete week or final phase if completed
  const currentPhase = nextIncompleteWeek
    ? getPhaseForWeek(nextIncompleteWeek)
    : getAllPhases()[getAllPhases().length - 1];

  // Calculate progress for each of the 4 curriculum phases
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

  // Highest completed week numbers first for recently completed list
  const recentlyCompletedWeeks = [...completedWeeks].reverse().slice(0, 5);

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
    loading,
    error,
  };
}
