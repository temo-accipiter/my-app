/**
 * Auth Layout
 * ===========
 *
 * Layout spécial pour les pages d'authentification (login, signup, reset-password)
 *
 * CARACTÉRISTIQUES :
 * - Design centré et minimaliste
 * - Pas de header/sidebar/footer
 * - Fond dégradé moderne
 * - Responsive et accessible
 *
 * ROUTE GROUPS :
 * Le dossier (auth) est un "route group" Next.js.
 * Les parenthèses () signifient que le nom "auth" n'apparaît PAS dans l'URL.
 * Donc /login fonctionne, pas /auth/login
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - MyApp",
  description: "Sign in or create an account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        {/* Logo ou branding */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">MyApp</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Modern authentication with Supabase
          </p>
        </div>

        {/* Contenu de la page (login/signup/reset) */}
        <div className="rounded-lg border bg-card p-8 shadow-lg">
          {children}
        </div>

        {/* Footer minimal */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
