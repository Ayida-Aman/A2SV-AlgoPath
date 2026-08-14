import React from "react";
import Link from "next/link";
import { Terminal, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({
  className,
  showTagline = false,
  size = "md",
  href = "/",
}: LogoProps) {
  const iconSizes = {
    sm: "h-7 w-7 rounded-lg",
    md: "h-9 w-9 rounded-xl",
    lg: "h-11 w-11 rounded-2xl",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const content = (
    <div className={cn("flex items-center gap-2.5 group select-none", className)}>
      {/* Brand Icon */}
      <div
        className={cn(
          "relative flex items-center justify-center bg-gradient-to-br from-primary to-blue-700 text-white shadow-md shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow-electric",
          iconSizes[size]
        )}
      >
        <Terminal className="h-[55%] w-[55%] stroke-[2.5]" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-electric opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-electric"></span>
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={cn(
              "font-bold tracking-tight text-foreground",
              textSizes[size]
            )}
          >
            A2SV
          </span>
          <span
            className={cn(
              "font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent",
              textSizes[size]
            )}
          >
            Legacy
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-medium text-muted-foreground tracking-wide mt-0.5">
            Build the skills. Continue the legacy.
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
