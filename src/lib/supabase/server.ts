/**
 * Supabase Server-Side Client
 * ============================
 *
 * QUAND L'UTILISER :
 * - Dans les Server Components (par défaut dans App Router)
 * - Dans les Server Actions (async function avec "use server")
 * - Dans les Route Handlers (app/api/[route]/route.ts)
 * - Pour les opérations sécurisées côté serveur
 *
 * POURQUOI C'EST DIFFÉRENT :
 * - Utilise les cookies Next.js pour la session
 * - Respecte le cycle de vie des requêtes Next.js
 * - Plus sécurisé car exécuté côté serveur
 * - Peut accéder aux secrets serveur
 *
 * EXEMPLE D'UTILISATION :
 * ```tsx
 * // Server Component
 * import { createClient } from "@/lib/supabase/server"
 *
 * export default async function DashboardPage() {
 *   const supabase = await createClient()
 *   const { data } = await supabase.auth.getUser()
 *   return <div>Hello {data.user?.email}</div>
 * }
 * ```
 *
 * ```tsx
 * // Server Action
 * "use server"
 *
 * import { createClient } from "@/lib/supabase/server"
 *
 * export async function logoutAction() {
 *   const supabase = await createClient()
 *   await supabase.auth.signOut()
 * }
 * ```
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/config/env";

export async function createClient() {
  // Récupère les cookies de la requête
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // Fonction pour lire un cookie
        getAll() {
          return cookieStore.getAll();
        },
        // Fonction pour définir un cookie
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // La méthode `setAll` a été appelée depuis un Server Component.
            // Cela peut être ignoré si vous avez du middleware qui rafraîchit
            // les sessions des utilisateurs.
          }
        },
      },
    }
  );
}
