"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Logo } from "@/components/layout/logo";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !currentUser) {
      const redirectUrl = pathname ? `/login?redirect=${encodeURIComponent(pathname)}` : "/login";
      router.replace(redirectUrl);
    }
  }, [currentUser, loading, router, pathname]);

  // Prevent redirect flickering by showing a clean branded loading state while resolving auth
  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center space-y-4 animate-in fade-in duration-300">
          <Logo size="lg" showTagline={false} />
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground pt-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>Verifying scholar session...</span>
          </div>
        </div>
      </div>
    );
  }

  // If unauthenticated and finished loading, hold view until redirect executes
  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
}
