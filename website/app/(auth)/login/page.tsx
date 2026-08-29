"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { getAuthErrorMessage } from "@/lib/firebase/errors";
import { GoogleIcon } from "@/components/auth/google-icon";
import { PublicLayout } from "@/components/layout/public-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { signIn, signInWithGoogle, currentUser, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  // If already authenticated, redirect to destination
  useEffect(() => {
    if (!authLoading && currentUser) {
      router.replace(redirectUrl);
    }
  }, [currentUser, authLoading, router, redirectUrl]);

  const handleGoogleSignIn = async () => {
    if (submitting || googleSubmitting) return;
    setError(null);

    try {
      setGoogleSubmitting(true);
      await signInWithGoogle();
      router.push(redirectUrl);
    } catch (err: any) {
      if (err?.code === "auth/popup-closed-by-user") {
        // User closed popup; don't flash an intrusive error
        return;
      }
      setError(getAuthErrorMessage(err));
    } finally {
      setGoogleSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || googleSubmitting) return;
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setSubmitting(true);
      await signIn({ email: trimmedEmail, password });
      router.push(redirectUrl);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-card border-border/80">
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto mb-1">
          <Badge variant="subtle">Scholar Portal</Badge>
        </div>
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Sign in to access your 43-week DSA journey, problem catalog, and practice modules.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        {/* Google Authentication */}
        <Button
          type="button"
          variant="outline"
          className="w-full font-medium border-border/80 hover:bg-muted/50 transition-colors flex items-center justify-center gap-2.5 h-10"
          onClick={handleGoogleSignIn}
          disabled={submitting || googleSubmitting}
          isLoading={googleSubmitting}
        >
          {!googleSubmitting && <GoogleIcon className="h-4 w-4 shrink-0" />}
          <span>Continue with Google</span>
        </Button>

        {/* Divider */}
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/70" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase">
            <span className="bg-card px-2 text-muted-foreground font-medium">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            label="Email Address"
            type="email"
            placeholder="scholar@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
            startIcon={<Mail className="h-4 w-4" />}
          />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="loginPasswordInput"
                className="block text-xs font-medium text-foreground/90 uppercase tracking-wider"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="loginPasswordInput"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              required
              startIcon={<Lock className="h-4 w-4" />}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full font-semibold"
            isLoading={submitting}
            endIcon={<ArrowRight className="h-4 w-4" />}
          >
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center text-xs text-muted-foreground border-t border-border/40 pt-4">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="ml-1 text-primary hover:underline font-semibold">
          Create account
        </Link>
      </CardFooter>
    </Card>
  );
}

function LoginLoadingFallback() {
  return (
    <Card className="w-full max-w-md shadow-card border-border/80 p-8 text-center space-y-4">
      <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
      <p className="text-xs text-muted-foreground">Loading authentication portal...</p>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <PublicLayout>
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
        <Suspense fallback={<LoginLoadingFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </PublicLayout>
  );
}
