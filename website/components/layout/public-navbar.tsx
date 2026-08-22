"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Home, BookOpen, Code2, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const publicNavLinks = [
  { title: "Home", href: "/", icon: Home },
  { title: "Roadmap", href: "/roadmap", icon: BookOpen },
  { title: "Practice", href: "/practice", icon: Code2 },
];

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, signOut } = useAuth();

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMobileSignOut = async () => {
    setMobileMenuOpen(false);
    await signOut();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Mark */}
        <Logo showTagline={false} size="md" />

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {publicNavLinks.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & Auth State Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <ThemeToggle />

          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  startIcon={<LayoutDashboard className="h-3.5 w-3.5 text-primary" />}
                  className="text-xs font-semibold"
                >
                  Dashboard
                </Button>
              </Link>
              <UserMenu />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground font-medium text-xs"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/roadmap">
                <Button
                  variant="primary"
                  size="sm"
                  className="font-semibold shadow-sm text-xs"
                  endIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Start Learning
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="text-foreground transition-transform active:scale-95"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 transition-transform rotate-90" />
            ) : (
              <Menu className="h-5 w-5 transition-transform" />
            )}
          </Button>
        </div>
      </div>

      {/* Smooth Mobile Menu Drawer */}
      <div
        className={cn(
          "sm:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border/80 bg-background/95 backdrop-blur-xl",
          mobileMenuOpen
            ? "max-h-96 opacity-100 py-4 px-4 shadow-xl border-t border-border/40"
            : "max-h-0 opacity-0 py-0 px-4 pointer-events-none border-t-0"
        )}
      >
        <div className="flex flex-col space-y-1">
          {publicNavLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-3 mt-3 border-t border-border flex flex-col gap-2">
          {currentUser ? (
            <>
              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full justify-center text-xs">
                  <LayoutDashboard className="h-3.5 w-3.5 mr-2 text-primary" />
                  Go to Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleMobileSignOut}
                className="w-full justify-center text-xs text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-3.5 w-3.5 mr-2" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full justify-center text-xs">
                  Log in
                </Button>
              </Link>
              <Link href="/roadmap" className="w-full">
                <Button variant="primary" className="w-full justify-center text-xs">
                  Start Learning
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
