import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  linkWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./client";

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

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
 * Signs in or registers a user via Google Authentication popup.
 * - For new users: creates users/{uid} document with profile metadata.
 * - For existing users: preserves existing displayName, progress, and preferences.
 */
export async function signInWithGoogle(): Promise<User> {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;

  try {
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      // New Google User: Create Firestore profile document
      const newProfile: UserProfile = {
        uid: user.uid,
        displayName: user.displayName?.trim() || user.email?.split("@")[0] || "Scholar",
        email: user.email || "",
        photoURL: user.photoURL || null,
        leaderboardOptIn: true,
        createdAt: new Date().toISOString(),
      };
      await setDoc(userDocRef, newProfile);
    } else {
      // Existing User: sync photoURL if missing in Firestore while keeping custom displayName & all progress intact
      const existingData = docSnap.data() as UserProfile;
      if (!existingData.photoURL && user.photoURL) {
        await updateDoc(userDocRef, {
          photoURL: user.photoURL,
        });
      }
    }
  } catch (firestoreError) {
    console.warn("Firestore Google profile sync note:", firestoreError);
  }

  return user;
}

/**
 * Securely links the Google authentication provider to the currently signed-in user.
 * Preserves the original Firebase UID and Firestore progress.
 */
export async function linkGoogleAccount(): Promise<User> {
  if (!auth.currentUser) {
    throw new Error("You must be signed in to link a Google account.");
  }

  const result = await linkWithPopup(auth.currentUser, googleProvider);
  const user = result.user;

  try {
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const existingData = docSnap.data() as UserProfile;
      if (!existingData.photoURL && user.photoURL) {
        await updateDoc(userDocRef, { photoURL: user.photoURL });
      }
    }
  } catch (firestoreError) {
    console.warn("Could not sync photoURL after linking Google account:", firestoreError);
  }

  return user;
}

/**
 * Signs out the currently authenticated user.
 */
export async function logoutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Sends a password reset email via Firebase Authentication.
 * Prevents email enumeration by suppressing user-not-found errors.
 */
export async function sendUserPasswordResetEmail(email: string): Promise<void> {
  const trimmedEmail = email.trim().toLowerCase();
  try {
    await sendPasswordResetEmail(auth, trimmedEmail);
  } catch (err: any) {
    // If the error is user-not-found, gracefully suppress it to prevent email enumeration
    if (err?.code === "auth/user-not-found") {
      return;
    }
    throw err;
  }
}

/**
 * Verifies a password reset action code (oobCode) and returns the associated email address.
 */
export async function verifyResetCode(actionCode: string): Promise<string> {
  if (!actionCode || typeof actionCode !== "string") {
    throw new Error("Invalid password reset action code.");
  }
  return await verifyPasswordResetCode(auth, actionCode);
}

/**
 * Completes the password reset process with a new password in Firebase Authentication.
 */
export async function confirmUserPasswordReset(
  actionCode: string,
  newPassword: string
): Promise<void> {
  if (!actionCode || typeof actionCode !== "string") {
    throw new Error("Invalid password reset action code.");
  }
  if (!newPassword || newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }
  await confirmPasswordReset(auth, actionCode, newPassword);
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
