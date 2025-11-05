import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LayoutWrapper } from "@/components/layout-wrapper";

/**
 * Configuration des fonts Geist (Sans et Mono)
 *
 * Geist est une font moderne et optimisée créée par Vercel
 * Chargée via next/font pour une performance optimale
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyApp - Modern Next.js Application",
  description: "A modern web application built with Next.js 16, TypeScript, and shadcn/ui",
};

/**
 * RootLayout - Layout principal de l'application
 *
 * Intègre :
 * - Les fonts Geist (Sans et Mono)
 * - ThemeProvider pour le dark mode
 * - LayoutWrapper avec Header, Sidebar, Footer
 * - Toaster pour les notifications
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
