"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | null;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = "md", status = null, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const sizeClasses = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-lg",
    };

    const statusSizeClasses = {
      sm: "h-2 w-2 ring-1",
      md: "h-2.5 w-2.5 ring-2",
      lg: "h-3 w-3 ring-2",
      xl: "h-4 w-4 ring-2",
    };

    const getInitials = (n?: string) => {
      if (!n) return "A2";
      const parts = n.trim().split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return n.slice(0, 2).toUpperCase();
    };

    return (
      <div className="relative inline-block shrink-0" ref={ref} {...props}>
        <div
          className={cn(
            "relative flex items-center justify-center overflow-hidden rounded-full border border-border/60 bg-muted/80 font-medium text-foreground transition-colors",
            sizeClasses[size],
            className
          )}
        >
          {src && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt || name || "User Avatar"}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="font-semibold select-none tracking-tight">
              {getInitials(name || alt)}
            </span>
          )}
        </div>

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full ring-background",
              statusSizeClasses[size],
              status === "online" && "bg-emerald-500",
              status === "offline" && "bg-slate-400",
              status === "busy" && "bg-amber-500"
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
