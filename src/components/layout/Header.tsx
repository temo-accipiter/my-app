"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Header - En-tête responsive de l'application
 *
 * Desktop (>768px): Navigation complète visible
 * Mobile (<768px): Bouton hamburger pour ouvrir le MobileMenu
 *
 * Props:
 * - onMobileMenuOpen: Callback pour ouvrir le menu mobile
 */
interface HeaderProps {
  onMobileMenuOpen?: () => void;
}

export function Header({ onMobileMenuOpen }: HeaderProps) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-6">
          {/* Bouton hamburger (mobile uniquement) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMobileMenuOpen}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">MyApp</span>
          </Link>

          {/* Navigation desktop (cachée sur mobile) */}
          <nav className="hidden md:flex md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Actions à droite */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" className="hidden sm:flex">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
