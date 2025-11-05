"use client";

import * as React from "react";
import Link from "next/link";
import { Home, Star, User, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * MobileMenu - Menu mobile en drawer/dialog
 *
 * Visible uniquement sur mobile (<768px)
 * S'ouvre via le bouton hamburger du Header
 *
 * Props:
 * - open: État ouvert/fermé
 * - onOpenChange: Callback pour changer l'état
 */
interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Star, label: "Features", href: "#features" },
    { icon: User, label: "About", href: "#about" },
    { icon: Settings, label: "Contact", href: "#contact" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left">Menu</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}

          <Separator />

          <div className="px-3">
            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Get Started
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
