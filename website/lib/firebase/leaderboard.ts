"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";
import { db } from "./client";
import { useAuth } from "@/contexts/auth-context";
import { useUserProgress } from "./progress";
import { updateUserProfile } from "./auth";
import { LeaderboardEntry } from "@/types";

/**
 * Deterministically calculates a scholar's leaderboard points based on canonical progress metrics.
 *
 * Authoritative Scoring:
 * - Completed Week (1–43): +100 points
 * - Solved Problem (1–180): +10 points
 * - Completed Daily Grind Day: +25 points
 * - Current Active Streak: +5 points per day
 */
export function calculateLeaderboardPoints(stats: {
  completedWeeks: number;
  solvedProblems: number;
  dailyGrindDays: number;
  currentStreak: number;
}): number {
  const safeWeeks = Math.max(0, Math.min(43, Math.floor(stats.completedWeeks || 0)));
  const safeProblems = Math.max(0, Math.min(180, Math.floor(stats.solvedProblems || 0)));
  const safeGrindDays = Math.max(0, Math.floor(stats.dailyGrindDays || 0));
  const safeStreak = Math.max(0, Math.floor(stats.currentStreak || 0));

  return (
    safeWeeks * 100 +
    safeProblems * 10 +
    safeGrindDays * 25 +
    safeStreak * 5
  );
}

/**
 * Deterministically sorts and assigns ranks to a list of leaderboard entries.
 *
 * Sorting Order:
 * 1. totalPoints DESC
 * 2. solvedProblems DESC
 * 3. completedWeeks DESC
 * 4. uid ASC (deterministic tie-breaker)
 */
export function sortAndRankLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  const sorted = [...entries].sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.solvedProblems !== a.solvedProblems) {
      return b.solvedProblems - a.solvedProblems;
    }
    if (b.completedWeeks !== a.completedWeeks) {
      return b.completedWeeks - a.completedWeeks;
    }
    return a.uid.localeCompare(b.uid);
  });

  return sorted.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
}

/**
 * Returns the Firestore document reference for a scholar's public leaderboard profile.
 * Path: leaderboard/{uid}
 */
export function getLeaderboardDocRef(uid: string): DocumentReference {
  return doc(db, "leaderboard", uid);
}

/**
 * Synchronizes the scholar's public leaderboard entry in Firestore with clamped bounds and verified points.
 */
export async function syncLeaderboardProfile(
  uid: string,
  profile: {
    displayName?: string | null;
    photoURL?: string | null;
  },
  stats: {
    completedWeeks: number;
    solvedProblems: number;
    dailyGrindDays: number;
    currentStreak: number;
    bestStreak: number;
  },
  optedIn: boolean
): Promise<void> {
  if (!uid) return;

  const docRef = getLeaderboardDocRef(uid);

  if (!optedIn) {
    try {
      await deleteDoc(docRef);
    } catch (err) {
      console.warn("Could not remove leaderboard doc on opt-out:", err);
    }
    return;
  }

  const safeWeeks = Math.max(0, Math.min(43, Math.floor(stats.completedWeeks || 0)));
  const safeProblems = Math.max(0, Math.min(180, Math.floor(stats.solvedProblems || 0)));
  const safeGrindDays = Math.max(0, Math.floor(stats.dailyGrindDays || 0));
  const safeStreak = Math.max(0, Math.floor(stats.currentStreak || 0));
  const safeBestStreak = Math.max(0, Math.floor(stats.bestStreak || 0));

  const totalPoints = calculateLeaderboardPoints({
    completedWeeks: safeWeeks,
    solvedProblems: safeProblems,
    dailyGrindDays: safeGrindDays,
    currentStreak: safeStreak,
  });

  const displayName = (profile.displayName || "Scholar").trim().slice(0, 100);

  await setDoc(
    docRef,
    {
      uid,
      displayName,
      photoURL: profile.photoURL || null,
      completedWeeks: safeWeeks,
      solvedProblems: safeProblems,
      dailyGrindDays: safeGrindDays,
      currentStreak: safeStreak,
      bestStreak: safeBestStreak,
      totalPoints,
      optedIn: true,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Subscribes to real-time updates from the public leaderboard collection,
 * defensively recalculating points and applying bounds to ignore any spoofed values.
 */
export function subscribeToLeaderboard(
  onUpdate: (entries: LeaderboardEntry[]) => void,
  onError?: (error: Error) => void
): () => void {
  const colRef = collection(db, "leaderboard");

  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      const entries: LeaderboardEntry[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data && data.uid && data.optedIn !== false) {
          // Authoritative sanitization of all received fields
          const completedWeeks = Math.max(0, Math.min(43, Number(data.completedWeeks) || 0));
          const solvedProblems = Math.max(0, Math.min(180, Number(data.solvedProblems) || 0));
          const dailyGrindDays = Math.max(0, Number(data.dailyGrindDays) || 0);
          const currentStreak = Math.max(0, Number(data.currentStreak) || 0);
          const bestStreak = Math.max(0, Number(data.bestStreak) || 0);

          // Always recalculate points from metrics rather than trusting stored totalPoints blindly
          const totalPoints = calculateLeaderboardPoints({
            completedWeeks,
            solvedProblems,
            dailyGrindDays,
            currentStreak,
          });

          entries.push({
            uid: String(data.uid),
            displayName: String(data.displayName || "Scholar").slice(0, 100),
            photoURL: data.photoURL || null,
            completedWeeks,
            solvedProblems,
            dailyGrindDays,
            currentStreak,
            bestStreak,
            totalPoints,
            optedIn: true,
            updatedAt: data.updatedAt,
          });
        }
      });

      // Deterministically rank entries purely from authoritative points
      const ranked = sortAndRankLeaderboard(entries);
      onUpdate(ranked);
    },
    (err) => {
      console.error("Leaderboard subscription error:", err);
      if (onError) onError(err);
    }
  );

  return unsubscribe;
}

export interface UseLeaderboardReturn {
  entries: LeaderboardEntry[];
  podiumEntries: LeaderboardEntry[];
  currentUserEntry: LeaderboardEntry | null;
  currentUserRank: number | null;
  totalScholars: number;
  isOptedIn: boolean;
  toggleOptIn: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * React hook to manage real-time leaderboard data, rankings, and automated scholar synchronization.
 */
export function useLeaderboard(): UseLeaderboardReturn {
  const { currentUser, userProfile, refreshProfile } = useAuth();
  const {
    completedCount,
    solvedProblemsCount,
    grindCompletedDates,
    currentStreak,
    longestStreak,
    loading: progressLoading,
  } = useUserProgress();

  const [rawEntries, setRawEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize opted-in state from profile (defaults to true if undefined)
  const isOptedIn = useMemo(() => {
    if (!currentUser) return false;
    return userProfile?.leaderboardOptIn !== false;
  }, [currentUser, userProfile]);

  // 1. Subscribe to real-time public leaderboard changes
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToLeaderboard(
      (rankedEntries) => {
        setRawEntries(rankedEntries);
        setLoading(false);
      },
      (err) => {
        setError("Unable to load the leaderboard.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Automated real-time synchronization of current user's profile to public leaderboard (ONLY if opted-in)
  useEffect(() => {
    if (!currentUser || progressLoading || !isOptedIn) return;

    const displayName =
      userProfile?.displayName ||
      currentUser.displayName ||
      currentUser.email?.split("@")[0] ||
      "Scholar";

    const photoURL = userProfile?.photoURL || currentUser.photoURL || null;

    const stats = {
      completedWeeks: completedCount,
      solvedProblems: solvedProblemsCount,
      dailyGrindDays: grindCompletedDates.length,
      currentStreak,
      bestStreak: longestStreak,
    };

    syncLeaderboardProfile(
      currentUser.uid,
      { displayName, photoURL },
      stats,
      true
    ).catch((err) => console.error("Error auto-syncing leaderboard profile:", err));
  }, [
    currentUser,
    userProfile,
    completedCount,
    solvedProblemsCount,
    grindCompletedDates,
    currentStreak,
    longestStreak,
    isOptedIn,
    progressLoading,
  ]);

  const entries = useMemo(() => {
    return rawEntries;
  }, [rawEntries]);

  const podiumEntries = useMemo(() => {
    return entries.slice(0, 3);
  }, [entries]);

  const currentUserEntry = useMemo(() => {
    if (!currentUser) return null;
    return entries.find((e) => e.uid === currentUser.uid) || null;
  }, [entries, currentUser]);

  const currentUserRank = currentUserEntry?.rank || null;

  const toggleOptIn = useCallback(async () => {
    if (!currentUser) return;
    const nextState = !isOptedIn;

    try {
      // 1. Update user's profile in Firestore
      await updateUserProfile(currentUser.uid, {
        leaderboardOptIn: nextState,
      });

      if (!nextState) {
        // 2. If hiding, delete the leaderboard doc
        await deleteDoc(getLeaderboardDocRef(currentUser.uid));
      } else {
        // 3. If showing, publish the leaderboard doc
        const displayName =
          userProfile?.displayName ||
          currentUser.displayName ||
          currentUser.email?.split("@")[0] ||
          "Scholar";

        const photoURL = userProfile?.photoURL || currentUser.photoURL || null;

        const stats = {
          completedWeeks: completedCount,
          solvedProblems: solvedProblemsCount,
          dailyGrindDays: grindCompletedDates.length,
          currentStreak,
          bestStreak: longestStreak,
        };

        await syncLeaderboardProfile(
          currentUser.uid,
          { displayName, photoURL },
          stats,
          true
        );
      }

      // 4. Refresh local profile
      await refreshProfile();
    } catch (err) {
      console.error("Error toggling leaderboard visibility:", err);
    }
  }, [
    currentUser,
    userProfile,
    isOptedIn,
    completedCount,
    solvedProblemsCount,
    grindCompletedDates,
    currentStreak,
    longestStreak,
    refreshProfile,
  ]);

  return {
    entries,
    podiumEntries,
    currentUserEntry,
    currentUserRank,
    totalScholars: entries.length,
    isOptedIn,
    toggleOptIn,
    loading,
    error,
  };
}
