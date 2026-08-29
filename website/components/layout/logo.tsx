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
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const content = (
    <div className={cn("flex items-center gap-2.5 group select-none", className)}>
      {/* Brand Icon: Official A2SV AlgoPath Graph Traversal Emblem */}
      <div
        className={cn(
          "relative flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 shadow-md shadow-blue-500/20 rounded-[22%]",
          iconSizes[size]
        )}
      >
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="logo-algo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c3ae8" />
              <stop offset="50%" stopColor="#2962ff" />
              <stop offset="100%" stopColor="#00b0ff" />
            </linearGradient>
          </defs>

          {/* Background Squircle */}
          <rect width="512" height="512" rx="112" fill="url(#logo-algo-bg)" />

          {/* Connecting Path Segments */}
          <path
            d="M120 388L206 244L302 328L404 134"
            stroke="white"
            strokeWidth="52"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Node 1 (Bottom Left - Cyan Center) */}
          <circle cx="120" cy="388" r="62" fill="white" />
          <circle cx="120" cy="388" r="38" fill="#00b0ff" />

          {/* Node 2 (Middle Upper - Solid White) */}
          <circle cx="206" cy="244" r="44" fill="white" />

          {/* Node 3 (Valley Node - Pastel Sky Center) */}
          <circle cx="302" cy="328" r="56" fill="white" />
          <circle cx="302" cy="328" r="34" fill="#90caf9" />

          {/* Node 4 (Apex Goal Node - Gold Center) */}
          <circle cx="404" cy="134" r="70" fill="white" />
          <circle cx="404" cy="134" r="46" fill="#fbc02d" />
        </svg>
      </div>

      {/* Brand Typography: A2SV AlgoPath */}
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
                "font-extrabold tracking-tight text-primary",
                textSizes[size]
              )}
            >
              AlgoPath
            </span>
          </div>
          {showTagline && (
            <span className="text-[10px] font-medium text-muted-foreground tracking-wide mt-0.5">
              Master the algorithms. Chart your path.
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
