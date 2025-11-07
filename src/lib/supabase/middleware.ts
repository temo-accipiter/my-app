/**
 * Supabase Middleware Client
 * ===========================
 *
 * QUAND L'UTILISER :
 * - Uniquement dans middleware.ts à la racine du projet
 * - Pour rafraîchir automatiquement les sessions
 * - Pour protéger les routes avant qu'elles ne soient rendues
 *
 * POURQUOI C'EST DIFFÉRENT :
 * - Intercepte TOUTES les requêtes avant qu'elles n'atteignent les pages
 * - Peut modifier les cookies de la requête/réponse
 * - Rafraîchit la session Supabase automatiquement
 * - Permet les redirections basées sur l'authentification
 *
 * FLOW DU MIDDLEWARE :
 * 1. Utilisateur fait une requête → Middleware intercepte
 * 2. Middleware vérifie/rafraîchit la session Supabase
 * 3. Middleware peut rediriger (ex: /dashboard → /login)
 * 4. Si OK, la requête continue vers la page
 *
 * EXEMPLE D'UTILISATION :
 * ```tsx
 * // middleware.ts (à la racine)
 * import { updateSession } from "@/lib/supabase/middleware"
 *
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request)
 * }
 * ```
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/config/env";

export async function updateSession(request: NextRequest) {
  // Créer une réponse Next.js initiale
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Créer le client Supabase pour le middleware
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // Lire tous les cookies de la requête
        getAll() {
          return request.cookies.getAll();
        },
        // Définir les cookies dans la réponse
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Évite d'écrire de la logique entre createServerClient et
  // supabase.auth.getUser(). Un simple erreur peut rendre tous vos utilisateurs
  // déconnectés de manière aléatoire.

  // Rafraîchit la session si expirée - requis pour les Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Routes publiques (accessibles sans authentification)
  const publicRoutes = ["/", "/login", "/signup", "/reset-password"];
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Si l'utilisateur n'est PAS connecté et tente d'accéder à une route protégée
  if (!user && !isPublicRoute) {
    // Rediriger vers la page de login
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    // Ajouter l'URL de retour pour rediriger après login
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur EST connecté et tente d'accéder aux pages d'auth
  if (user && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup")) {
    // Rediriger vers le dashboard
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Retourner la réponse avec les cookies mis à jour
  return supabaseResponse;
}
