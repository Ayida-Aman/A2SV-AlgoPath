"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  KeyRound,
} from "lucide-react";
import { verifyResetCode, confirmUserPasswordReset } from "@/lib/firebase/auth";
import { getAuthErrorMessage } from "@/lib/firebase/errors";
import { PublicLayout } from "@/components/layout/public-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode") || "";

  // Page Lifecycle States
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [isCodeValid, setIsCodeValid] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  // Password Input States
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Submission States
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // 1. Verify the oobCode action code on mount
  useEffect(() => {
    let isMounted = true;

    async function checkActionCode() {
      if (!oobCode) {
        if (isMounted) {
          setIsCodeValid(false);
          setVerifyError("No password reset code was provided in the link.");
          setIsVerifying(false);
        }
        return;
      }

      try {
        const email = await verifyResetCode(oobCode);
        if (isMounted) {
          setVerifiedEmail(email);
          setIsCodeValid(true);
          setIsVerifying(false);
        }
      } catch (err: any) {
        console.error("Action code verification error:", err);
        if (isMounted) {
          setIsCodeValid(false);
          setVerifyError(getAuthErrorMessage(err));
          setIsVerifying(false);
        }
      }
    }

    checkActionCode();

    return () => {
      isMounted = false;
    };
  }, [oobCode]);

  // 2. Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!newPassword) {
      setFormError("Please enter a new password.");
      return;
    }
    if (newPassword.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError("Passwords do not match. Please verify and try again.");
      return;
    }

    try {
      setSubmitting(true);
      await confirmUserPasswordReset(oobCode, newPassword);
      setResetSuccess(true);
    } catch (err: any) {
      console.error("Password confirmation error:", err);
      setFormError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  // State A: Verifying the reset link
  if (isVerifying) {
    return (
      <Card className="w-full max-w-md shadow-card border-border/80 p-8 text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        <div className="space-y-1">
          <p className="text-sm font-bold text-foreground">
            Verifying reset link...
          </p>
          <p className="text-xs text-muted-foreground">
            Connecting to Firebase Authentication to validate your request.
          </p>
        </div>
      </Card>
    );
  }

  // State B: Invalid or expired action code
  if (!isCodeValid) {
    return (
      <Card className="w-full max-w-md shadow-card border-border/80">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-1">
            <Badge variant="destructive">Link Expired or Invalid</Badge>
          </div>
          <CardTitle className="text-2xl font-bold">Invalid Reset Link</CardTitle>
          <CardDescription className="leading-relaxed">
            {verifyError || "This password reset link is invalid or has already expired."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs space-y-1 text-center">
            <p className="font-semibold">Security Notice</p>
            <p className="text-[11px] opacity-90">
              Password reset links are time-sensitive and can only be used once.
            </p>
          </div>

          <Link href="/forgot-password" className="w-full block">
            <Button variant="primary" className="w-full font-semibold">
              Request a New Reset Link
            </Button>
          </Link>
        </CardContent>

        <CardFooter className="justify-center text-xs text-muted-foreground border-t border-border/40 pt-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Login</span>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  // State C: Password reset completed successfully
  if (resetSuccess) {
    return (
      <Card className="w-full max-w-md shadow-card border-border/80">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-1">
            <Badge variant="electric">Password Updated</Badge>
          </div>
          <CardTitle className="text-2xl font-bold">
            Password reset complete!
          </CardTitle>
          <CardDescription className="leading-relaxed">
            Your scholar password has been updated securely. You can now sign in with your new credentials.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            <p className="text-xs font-semibold text-foreground">
              Ready to log in
            </p>
          </div>

          <Link href="/login" className="w-full block">
            <Button variant="primary" className="w-full font-semibold">
              Sign In to Your Account
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // State D: Active form to enter new password
  return (
    <Card className="w-full max-w-md shadow-card border-border/80">
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto mb-1">
          <Badge variant="subtle">Set New Password</Badge>
        </div>
        <CardTitle className="text-2xl font-bold">Create new password</CardTitle>
        <CardDescription className="leading-relaxed">
          {verifiedEmail
            ? `Choose a new secure password for ${verifiedEmail}.`
            : "Enter a new secure password for your scholar account."}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Error Alert */}
          {formError && (
            <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{formError}</span>
            </div>
          )}

          {/* New Password Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="newPasswordInput"
              className="block text-xs font-medium text-foreground/90 uppercase tracking-wider"
            >
              New Password
            </label>
            <div className="relative">
              <Input
                id="newPasswordInput"
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={submitting}
                required
                startIcon={<Lock className="h-4 w-4" />}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirmPasswordInput"
              className="block text-xs font-medium text-foreground/90 uppercase tracking-wider"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                id="confirmPasswordInput"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={submitting}
                required
                startIcon={<KeyRound className="h-4 w-4" />}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full font-semibold"
            isLoading={submitting}
            endIcon={<ArrowRight className="h-4 w-4" />}
          >
            {submitting ? "Updating Password..." : "Reset Password"}
          </Button>
        </CardContent>
      </form>

      <CardFooter className="justify-center text-xs text-muted-foreground border-t border-border/40 pt-4">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Login</span>
        </Link>
      </CardFooter>
    </Card>
  );
}

function ResetPasswordLoadingFallback() {
  return (
    <Card className="w-full max-w-md shadow-card border-border/80 p-8 text-center space-y-4">
      <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
      <p className="text-xs text-muted-foreground">Loading password recovery portal...</p>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <PublicLayout>
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
        <Suspense fallback={<ResetPasswordLoadingFallback />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </PublicLayout>
  );
}
