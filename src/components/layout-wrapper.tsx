"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

/**
 * LayoutWrapper - Wrapper client pour gérer l'état du layout
 *
 * Gère l'état de la sidebar (collapsed/expanded)
 * Gère l'état du mobile menu (open/closed)
 * Ajuste automatiquement le padding du contenu selon l'état de la sidebar
 */
interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <Header onMobileMenuOpen={() => setMobileMenuOpen(true)} />

      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <MobileMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />

      {/* Contenu principal avec padding adaptatif */}
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] pt-16 transition-all duration-300",
          // Sur desktop, ajoute un margin-left selon l'état de la sidebar
          "md:ml-16",
          !sidebarCollapsed && "md:ml-64"
        )}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
