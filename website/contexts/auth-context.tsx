"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import {
  registerUser,
  loginUser,
  signInWithGoogle as firebaseSignInWithGoogle,
  linkGoogleAccount as firebaseLinkGoogleAccount,
  logoutUser,
  getUserProfile,
  UserProfile,
  SignUpData,
  SignInData,
} from "@/lib/firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<User>;
  signIn: (data: SignInData) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  linkGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async (user: User | null) => {
    if (!user) {
      setUserProfile(null);
      return;
    }
    const profile = await getUserProfile(user.uid);
    if (profile) {
      setUserProfile(profile);
    } else {
      // Fallback to Auth properties if Firestore document is still writing or offline
      setUserProfile({
        uid: user.uid,
        displayName: user.displayName || user.email?.split("@")[0] || "Scholar",
        email: user.email || "",
        createdAt: user.metadata.creationTime || new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    // Persistent listener across page navigation and refreshes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (data: SignUpData): Promise<User> => {
    const user = await registerUser(data);
    setCurrentUser(user);
    await fetchProfile(user);
    return user;
  };

  const signIn = async (data: SignInData): Promise<User> => {
    const user = await loginUser(data);
    setCurrentUser(user);
    await fetchProfile(user);
    return user;
  };

  const signInWithGoogle = async (): Promise<User> => {
    const user = await firebaseSignInWithGoogle();
    setCurrentUser(user);
    await fetchProfile(user);
    return user;
  };

  const linkGoogle = async (): Promise<User> => {
    const user = await firebaseLinkGoogleAccount();
    setCurrentUser(user);
    await fetchProfile(user);
    return user;
  };

  const signOut = async (): Promise<void> => {
    await logoutUser();
    setCurrentUser(null);
    setUserProfile(null);
  };

  const refreshProfile = async (): Promise<void> => {
    if (currentUser) {
      await fetchProfile(currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        linkGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
