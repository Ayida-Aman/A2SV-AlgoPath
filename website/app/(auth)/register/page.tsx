"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { getAuthErrorMessage } from "@/lib/firebase/errors";
import { PublicLayout } from "@/components/layout/public-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, currentUser, loading: authLoading } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!authLoading && currentUser) {
      router.replace("/dashboard");
    }
  }, [currentUser, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = displayName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter your password.");
      return;
    }

    try {
      setSubmitting(true);
      await signUp({
        displayName: trimmedName,
        email: trimmedEmail,
        password,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-card border-border/80">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto mb-1">
              <Badge variant="subtle">Account Registration</Badge>
            </div>
            <CardTitle className="text-2xl font-bold">Start your journey</CardTitle>
            <CardDescription>
              Join the 43-week DSA roadmap and track your problem-solving progress.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Error Alert */}
              {error && (
                <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{error}</span>
                </div>
              )}

              <Input
                label="Full Name"
                type="text"
                placeholder="Ada Lovelace"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={submitting}
                required
                startIcon={<User className="h-4 w-4" />}
              />

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

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                required
                startIcon={<Lock className="h-4 w-4" />}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={submitting}
                required
                startIcon={<Lock className="h-4 w-4" />}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full font-semibold"
                isLoading={submitting}
                endIcon={<ArrowRight className="h-4 w-4" />}
              >
                {submitting ? "Creating account..." : "Create Account"}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="justify-center text-xs text-muted-foreground border-t border-border/40 pt-4">
            Already have an account?{" "}
            <Link href="/login" className="ml-1 text-primary hover:underline font-semibold">
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </PublicLayout>
  );
}
