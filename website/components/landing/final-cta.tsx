import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Code2, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-t from-primary/15 via-sky-500/10 to-transparent blur-3xl rounded-full" />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Card
          glow
          className="relative overflow-hidden p-8 sm:p-14 text-center border-primary/40 bg-gradient-to-b from-card via-card to-card-subtle shadow-2xl space-y-6"
        >
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary-muted text-primary text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-accent-electric" />
            <span>Structured 43-Week Curriculum</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] max-w-3xl mx-auto">
            Your 43-week journey starts here.
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            <span className="font-semibold text-foreground">Learn. Practice. Grind. Build.</span>
            <br />
            Transform your problem solving from brute force to elegant asymptotic complexity with 43 curated weekly modules.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <Link href="/roadmap" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35"
                endIcon={<ArrowRight className="h-4 w-4" />}
              >
                Start Your Journey
              </Button>
            </Link>
            <Link href="/roadmap" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore the Roadmap
              </Button>
            </Link>
          </div>

          {/* Trust badge note */}
          <p className="text-xs text-muted-foreground pt-4">
            An independent community project shared publicly by A2SV students.
          </p>
        </Card>
      </div>
    </section>
  );
}
