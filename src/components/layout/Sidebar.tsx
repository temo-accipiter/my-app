"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Home, Star, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * Sidebar - Barre latérale collapsible (desktop uniquement)
 *
 * Visible uniquement sur desktop (>768px)
 * Peut être réduite/étendue pour gagner de l'espace
 *
 * Props:
 * - isCollapsed: État collapsed/expanded
 * - onToggle: Callback pour toggle l'état
 */
interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Star, label: "Features", href: "#features" },
    { icon: User, label: "Profile", href: "#profile" },
    { icon: Settings, label: "Settings", href: "#settings" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300 md:block",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Toggle button */}
        <div className="flex items-center justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        <Separator />

        {/* Navigation items */}
        <nav className="flex-1 space-y-2 p-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer info */}
        {!isCollapsed && (
          <div className="border-t p-4">
            <p className="text-xs text-muted-foreground">
              Version 1.0.0
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
