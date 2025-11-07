/**
 * Next.js Middleware
 * ==================
 *
 * Ce middleware s'exécute AVANT chaque requête vers votre application.
 * Il est responsable de :
 * 1. Rafraîchir la session Supabase automatiquement
 * 2. Protéger les routes qui nécessitent une authentification
 * 3. Rediriger les utilisateurs non authentifiés vers /login
 * 4. Rediriger les utilisateurs authentifiés hors des pages d'auth
 *
 * FLOW D'EXÉCUTION :
 * Requête → Middleware (ici) → Page/API Route → Réponse
 *
 * PERFORMANCE :
 * Le middleware est très rapide car il s'exécute sur Edge Runtime.
 * Il ne bloque pas le rendu de la page.
 */

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Déléguer la logique au helper Supabase
  return await updateSession(request);
}

/**
 * Configuration du matcher
 * ========================
 *
 * Définit sur quelles routes le middleware doit s'exécuter.
 *
 * ATTENTION :
 * - N'exécutez PAS le middleware sur les ressources statiques (_next/static)
 * - N'exécutez PAS sur les images (_next/image)
 * - N'exécutez PAS sur les favicons
 *
 * Le pattern ci-dessous EXCLUT ces fichiers et exécute le middleware
 * sur toutes les autres routes.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
