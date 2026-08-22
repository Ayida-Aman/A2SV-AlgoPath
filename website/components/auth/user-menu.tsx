"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  compact?: boolean;
}

export function UserMenu({ compact = false }: UserMenuProps) {
  const { currentUser, userProfile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    router.replace("/login");
  };

  if (!currentUser) {
    if (compact) {
      return (
        <Link href="/login" title="Sign In">
          <Avatar name="Guest" size="sm" status="offline" />
        </Link>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="text-xs font-semibold">
            Log in
          </Button>
        </Link>
        <Link href="/register">
          <Button variant="primary" size="sm" className="text-xs font-semibold">
            Register
          </Button>
        </Link>
      </div>
    );
  }

  const displayName = userProfile?.displayName || currentUser.displayName || currentUser.email?.split("@")[0] || "Scholar";
  const email = userProfile?.email || currentUser.email || "";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 p-1 rounded-xl hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          compact && "justify-center"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User profile menu"
      >
        <Avatar name={displayName} size="sm" status="online" />
        {!compact && (
          <>
            <div className="hidden lg:flex flex-col text-left min-w-0 max-w-[130px]">
              <span className="text-xs font-semibold text-foreground truncate">
                {displayName}
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                {email}
              </span>
            </div>
            <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-md z-50 animate-in fade-in-0 zoom-in-95 duration-150">
          {/* User Info Header */}
          <div className="px-3 py-2 border-b border-border/50 mb-1">
            <p className="text-xs font-bold text-foreground truncate">
              {displayName}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {email}
            </p>
            <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <ShieldCheck className="h-3 w-3" />
              <span>Verified Scholar</span>
            </div>
          </div>

          {/* Navigation Options */}
          <div className="space-y-0.5">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <Settings className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Sign Out Button */}
          <div className="border-t border-border/50 pt-1 mt-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
