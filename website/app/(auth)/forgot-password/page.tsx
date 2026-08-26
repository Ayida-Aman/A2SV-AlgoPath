"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendUserPasswordResetEmail } from "@/lib/firebase/auth";
import { getAuthErrorMessage } from "@/lib/firebase/errors";
import { PublicLayout } from "@/components/layout/public-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);
      await sendUserPasswordResetEmail(trimmedEmail);
      setSubmitted(true);
    } catch (err) {
      console.error("Password reset error:", err);
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
              <Badge variant="subtle">Account Recovery</Badge>
            </div>
            <CardTitle className="text-2xl font-bold">
              {submitted ? "Check your email" : "Reset your password"}
            </CardTitle>
            <CardDescription className="leading-relaxed">
              {submitted
                ? "If an account exists with this email, we've sent a password reset link."
                : "Enter the email associated with your A2SV Legacy account and we'll send you a password reset link."}
            </CardDescription>
          </CardHeader>

          {submitted ? (
            <CardContent className="space-y-5">
              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-foreground">
                    Reset link dispatched
                  </p>
                  <p className="text-[11px] text-muted-foreground max-w-xs">
                    Please check your inbox (and spam folder) for instructions to reset your password.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/login" className="w-full block">
                  <Button variant="primary" className="w-full font-semibold">
                    Return to Login
                  </Button>
                </Link>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full text-xs text-muted-foreground"
                >
                  Send to a different email
                </Button>
              </div>
            </CardContent>
          ) : (
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
                  label="Email Address"
                  type="email"
                  placeholder="scholar@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  required
                  startIcon={<Mail className="h-4 w-4" />}
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full font-semibold"
                  isLoading={submitting}
                  endIcon={<Send className="h-4 w-4" />}
                >
                  {submitting ? "Sending Reset Link..." : "Send Reset Link"}
                </Button>
              </CardContent>
            </form>
          )}

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
      </div>
    </PublicLayout>
  );
}
