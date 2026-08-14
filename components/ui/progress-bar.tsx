import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  sublabel?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "electric"
    | "success"
    | "warning"
    | "foundation"
    | "core"
    | "advanced"
    | "cp";
  animated?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      label,
      sublabel,
      showPercentage = false,
      size = "md",
      variant = "primary",
      animated = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const heightClasses = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    };

    const variantFillClasses = {
      primary: "bg-primary",
      electric: "bg-accent-electric shadow-glow-electric",
      success: "bg-success",
      warning: "bg-warning",
      foundation: "bg-emerald-500",
      core: "bg-blue-600 dark:bg-blue-500",
      advanced: "bg-indigo-600 dark:bg-indigo-400",
      cp: "bg-amber-600 dark:bg-amber-500",
    };

    return (
      <div ref={ref} className={cn("w-full space-y-1.5", className)} {...props}>
        {(label || showPercentage || sublabel) && (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {label && (
                <span className="font-medium text-foreground/90">{label}</span>
              )}
              {sublabel && (
                <span className="text-muted-foreground">{sublabel}</span>
              )}
            </div>
            {showPercentage && (
              <span className="font-semibold text-foreground">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        <div
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || "Progress"}
          className={cn(
            "w-full overflow-hidden rounded-full bg-secondary/80 dark:bg-secondary/60",
            heightClasses[size]
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              variantFillClasses[variant],
              animated && "will-change-transform"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
