import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./client";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string | null;
  leaderboardOptIn?: boolean;
  createdAt: string;
}

export interface SignUpData {
  displayName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

/**
 * Creates a new user in Firebase Auth, sets their displayName,
 * and creates the corresponding users/{uid} document in Firestore.
 */
export async function registerUser({
  displayName,
  email,
  password,
}: SignUpData): Promise<User> {
  const trimmedName = displayName.trim();
  const trimmedEmail = email.trim().toLowerCase();

  // 1. Create Firebase Auth account
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    trimmedEmail,
    password
  );
  const user = userCredential.user;

  // 2. Update Auth display name
  await updateProfile(user, {
    displayName: trimmedName,
  });

  // 3. Create basic Firestore user document: users/{uid}
  try {
    const userDocRef = doc(db, "users", user.uid);
    const profileData: UserProfile = {
      uid: user.uid,
      displayName: trimmedName,
      email: trimmedEmail,
      leaderboardOptIn: true,
      createdAt: new Date().toISOString(),
    };
    await setDoc(userDocRef, profileData);
  } catch (firestoreError) {
    // Log Firestore write errors without blocking auth flow if offline
    console.warn("Firestore user document creation note:", firestoreError);
  }

  return user;
}

/**
 * Signs in an existing user with email and password.
 */
export async function loginUser({ email, password }: SignInData): Promise<User> {
  const trimmedEmail = email.trim().toLowerCase();
  const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
  return userCredential.user;
}

/**
 * Signs out the currently authenticated user.
 */
export async function logoutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Fetches the user profile document from Firestore for a given UID.
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.warn("Could not fetch Firestore user profile:", error);
    return null;
  }
}

/**
 * Updates properties on the user's Firestore profile document.
 */
export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, data, { merge: true });
  } catch (error) {
    console.error("Could not update user profile:", error);
    throw error;
  }
}

/**
 * Updates the user's display name across Firebase Auth and Firestore.
 */
export async function updateUserDisplayName(displayName: string): Promise<void> {
  const trimmed = displayName.trim();
  if (!trimmed) {
    throw new Error("Display name cannot be empty.");
  }
  if (trimmed.length > 50) {
    throw new Error("Display name must be 50 characters or fewer.");
  }
  if (!auth.currentUser) {
    throw new Error("User must be authenticated to update profile.");
  }

  // 1. Update Firebase Auth user
  await updateProfile(auth.currentUser, {
    displayName: trimmed,
  });

  // 2. Update Firestore users/{uid} document
  await updateUserProfile(auth.currentUser.uid, {
    displayName: trimmed,
  });
}
