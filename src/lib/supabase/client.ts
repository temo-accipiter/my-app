/**
 * Supabase Client-Side Browser Client
 * ====================================
 *
 * QUAND L'UTILISER :
 * - Dans les Client Components (marqués avec "use client")
 * - Pour les opérations côté navigateur
 * - Pour l'authentification interactive (login, signup)
 * - Pour les real-time subscriptions
 *
 * POURQUOI C'EST DIFFÉRENT :
 * - Utilise localStorage pour la session
 * - Pas de cookies (seulement dans le browser)
 * - La session persiste dans le navigateur
 *
 * EXEMPLE D'UTILISATION :
 * ```tsx
 * "use client"
 *
 * import { createClient } from "@/lib/supabase/client"
 *
 * export function LoginButton() {
 *   const supabase = createClient()
 *   const handleLogin = async () => {
 *     await supabase.auth.signInWithPassword({ email, password })
 *   }
 * }
 * ```
 */

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/config/env";

export function createClient() {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
