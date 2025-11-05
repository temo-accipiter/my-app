"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider - Provider pour la gestion du thème (clair/sombre)
 *
 * Utilise next-themes pour gérer le thème de manière persistante
 * Synchronise avec les préférences système (prefers-color-scheme)
 *
 * À placer au niveau du layout principal
 *
 * @example
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   {children}
 * </ThemeProvider>
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
