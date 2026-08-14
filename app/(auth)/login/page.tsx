import React from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Sign In — A2SV Legacy",
};

export default function LoginPage() {
  return (
    <PublicLayout>
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-card">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto mb-1">
              <Badge variant="subtle">Authentication Shell</Badge>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to track your 43-week DSA progress and problem completions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="scholar@example.com"
              startIcon={<Mail className="h-4 w-4" />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              startIcon={<Lock className="h-4 w-4" />}
            />
            <Button variant="primary" className="w-full" endIcon={<ArrowRight className="h-4 w-4" />}>
              Sign In (Placeholder)
            </Button>
            <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground text-center">
              <span className="font-semibold">Note:</span> Firebase Authentication will be integrated in a later phase.
            </div>
          </CardContent>
          <CardFooter className="justify-center text-xs text-muted-foreground border-t border-border/40 pt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="ml-1 text-primary hover:underline font-semibold">
              Create account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </PublicLayout>
  );
}
