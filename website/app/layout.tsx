import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import "./globals.css";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A2SV Legacy — 43-Week DSA Curriculum",
  description:
    "An independent educational platform preserving and structuring an intensive 43-week Data Structures, Algorithms, and Competitive Programming journey.",
  keywords: [
    "A2SV",
    "DSA",
    "Data Structures",
    "Algorithms",
    "Competitive Programming",
    "LeetCode",
    "Codeforces",
    "Python",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sansFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider defaultTheme="dark">
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
