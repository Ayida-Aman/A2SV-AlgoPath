import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PhaseId } from "@/types";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-border text-foreground bg-transparent",
        subtle:
          "bg-primary-muted text-primary border border-primary/20",
        success:
          "bg-success/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
        warning:
          "bg-warning/15 text-amber-600 dark:text-amber-400 border border-amber-500/20",
        destructive:
          "bg-destructive/15 text-red-600 dark:text-red-400 border border-red-500/20",
        electric:
          "bg-accent-electric/15 text-sky-600 dark:text-sky-400 border border-sky-500/25",
        // Phase specific variants
        foundation:
          "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30",
        core:
          "bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30",
        advanced:
          "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border border-indigo-500/30",
        cp:
          "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot = false, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "mr-1.5 h-1.5 w-1.5 rounded-full",
            variant === "success" && "bg-emerald-500",
            variant === "warning" && "bg-amber-500",
            variant === "destructive" && "bg-red-500",
            variant === "electric" && "bg-sky-400",
            variant === "foundation" && "bg-emerald-500",
            variant === "core" && "bg-blue-500",
            variant === "advanced" && "bg-indigo-500",
            variant === "cp" && "bg-amber-500",
            !variant && "bg-primary"
          )}
        />
      )}
      {children}
    </div>
  );
}

export function PhaseBadge({
  phase,
  className,
}: {
  phase: PhaseId | string;
  className?: string;
}) {
  const phaseNormalized = phase.toLowerCase();

  if (phaseNormalized === "foundation") {
    return (
      <Badge variant="foundation" dot className={className}>
        Foundation
      </Badge>
    );
  }
  if (phaseNormalized === "phase_1" || phaseNormalized === "core") {
    return (
      <Badge variant="core" dot className={className}>
        Phase 1 — Core
      </Badge>
    );
  }
  if (phaseNormalized === "phase_2" || phaseNormalized === "advanced") {
    return (
      <Badge variant="advanced" dot className={className}>
        Phase 2 — Advanced
      </Badge>
    );
  }
  if (phaseNormalized === "phase_3" || phaseNormalized === "cp") {
    return (
      <Badge variant="cp" dot className={className}>
        Phase 3 — CP
      </Badge>
    );
  }

  return <Badge variant="secondary" className={className}>{phase}</Badge>;
}

export function StatusBadge({
  status,
  className,
}: {
  status: "completed" | "in_progress" | "not_started" | "needs_review" | string;
  className?: string;
}) {
  switch (status) {
    case "completed":
      return (
        <Badge variant="success" dot className={className}>
          Completed
        </Badge>
      );
    case "in_progress":
      return (
        <Badge variant="electric" dot className={className}>
          In Progress
        </Badge>
      );
    case "needs_review":
      return (
        <Badge variant="warning" dot className={className}>
          Needs Review
        </Badge>
      );
    case "not_started":
    default:
      return (
        <Badge variant="outline" className={className}>
          Not Started
        </Badge>
      );
  }
}

export { Badge, badgeVariants };
