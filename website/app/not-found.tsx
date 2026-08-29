import React from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/public-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Compass, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-16">
        <Card className="w-full max-w-lg p-8 sm:p-10 text-center space-y-6 shadow-card">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Compass className="h-7 w-7 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <Badge variant="subtle">404 — Not Found</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Module or Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              The week or page you requested does not exist in the 43-week A2SV AlgoPath curriculum. Valid weeks are between Week 1 and Week 43.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/roadmap" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full sm:w-auto" startIcon={<Layers className="h-4 w-4" />}>
                Back to Roadmap (43 Weeks)
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full sm:w-auto" startIcon={<ArrowLeft className="h-4 w-4" />}>
                Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </PublicLayout>
  );
}
