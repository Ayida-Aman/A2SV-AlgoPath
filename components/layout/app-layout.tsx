import React from "react";
import { AppSidebar } from "./app-sidebar";
import { AppNavbar } from "./app-navbar";
import { MobileNav } from "./mobile-nav";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Left Sidebar on desktop */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 pb-16 md:pb-0">
        <AppNavbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
