import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({
  className,
  showTagline = false,
  showText = true,
  size = "md",
  href = "/",
}: LogoProps) {
  const iconSizes = {
    sm: "h-7 w-7 rounded-lg p-1",
    md: "h-9 w-9 rounded-xl p-1.5",
    lg: "h-11 w-11 rounded-2xl p-2",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const content = (
    <div className={cn("flex items-center gap-2.5 group select-none", className)}>
      {/* Brand Icon: Architectural Algorithmic Emblem */}
      <div
        className={cn(
          "relative flex items-center justify-center bg-gradient-to-br from-primary via-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow-electric shrink-0 border border-white/20",
          iconSizes[size]
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Geometric Delta / Ascending Node Network */}
          <path
            d="M12 3L20.5 19H16.5L12 10.5L7.5 19H3.5L12 3Z"
            fill="white"
            fillOpacity="0.95"
          />
          <path
            d="M12 14.5L15.5 20.5H8.5L12 14.5Z"
            fill="currentColor"
            className="text-sky-200"
          />
          <circle cx="12" cy="5.5" r="1.3" fill="white" />
          <circle cx="6" cy="18" r="1.1" fill="white" />
          <circle cx="18" cy="18" r="1.1" fill="white" />
        </svg>

        {/* Pulsing activity indicator */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-electric opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-electric"></span>
        </span>
      </div>

      {/* Brand Typography */}
      {showText && (
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
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}
