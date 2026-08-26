"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log non-sensitive diagnostic info in development
    if (process.env.NODE_ENV !== "production") {
      console.error("Global Application Error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 text-center space-y-5 shadow-xl border-border/80">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <Badge variant="subtle" className="text-destructive font-semibold">
            Application Error
          </Badge>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Something Went Wrong
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            An unexpected error occurred while loading this page. You can try refreshing the view or returning to the dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => reset()}
            startIcon={<RotateCcw className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>

          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              startIcon={<Home className="h-4 w-4" />}
              className="w-full sm:w-auto"
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
