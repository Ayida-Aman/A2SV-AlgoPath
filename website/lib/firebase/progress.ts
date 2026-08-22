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

export interface UserProgress {
  completedWeeks: number[];
  updatedAt?: unknown;
}

/**
 * Validates that the input is a valid curriculum week number (1–43).
 */
export function isValidWeekNumber(weekNumber: number): boolean {
  return Number.isInteger(weekNumber) && weekNumber >= 1 && weekNumber <= 43;
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
        completedWeeks: Array.isArray(data.completedWeeks) ? data.completedWeeks : [],
        updatedAt: data.updatedAt,
      };
    }
    return { completedWeeks: [] };
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
          completedWeeks: Array.isArray(data.completedWeeks) ? data.completedWeeks : [],
          updatedAt: data.updatedAt,
        });
      } else {
        onUpdate({ completedWeeks: [] });
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
    // While Firebase Auth is checking session, maintain loading state to prevent flickering
    if (authLoading) {
      setLoading(true);
      return;
    }

    // Unauthenticated user: no Firestore subscription, progress is uncompleted
    if (!currentUser) {
      setCompleted(false);
      setLoading(false);
      return;
    }

    // Authenticated user: establish real-time Firestore listener
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
