"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "segmented";
}

export function ThemeToggle({
  className,
  variant = "icon",
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-9 w-9 rounded-lg bg-muted/40 animate-pulse", className)} />
    );
  }

  if (variant === "segmented") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-1 rounded-lg bg-muted/60 border border-border/40",
          className
        )}
      >
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center justify-center p-1.5 rounded-md text-xs font-medium transition-colors",
            theme === "light"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          title="Light theme"
          aria-label="Light theme"
        >
          <Sun className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center justify-center p-1.5 rounded-md text-xs font-medium transition-colors",
            theme === "dark"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          title="Dark theme"
          aria-label="Dark theme"
        >
          <Moon className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center justify-center p-1.5 rounded-md text-xs font-medium transition-colors",
            theme === "system"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          title="System theme"
          aria-label="System theme"
        >
          <Laptop className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  // Quick toggle (cycles light -> dark -> light)
  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("h-9 w-9 text-muted-foreground hover:text-foreground", className)}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
      title={`Current: ${theme} theme (${resolvedTheme} mode). Click to toggle.`}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
      )}
    </Button>
  );
}
