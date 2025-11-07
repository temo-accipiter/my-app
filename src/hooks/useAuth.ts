/**
 * useAuth Hook
 * ============
 *
 * Hook personnalisé pour accéder au contexte d'authentification.
 *
 * UTILISATION :
 * ```tsx
 * import { useAuth } from "@/hooks/useAuth"
 *
 * function MyComponent() {
 *   const { user, isLoading, signOut } = useAuth()
 *
 *   if (isLoading) return <div>Loading...</div>
 *   if (!user) return <div>Not logged in</div>
 *
 *   return (
 *     <div>
 *       <p>Welcome {user.email}</p>
 *       <button onClick={signOut}>Logout</button>
 *     </div>
 *   )
 * }
 * ```
 *
 * ERREUR COURANTE :
 * Si vous obtenez "useAuth must be used within AuthProvider",
 * assurez-vous que votre composant est enveloppé dans <AuthProvider>
 */

"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider. " +
        "Make sure your component is wrapped with <AuthProvider>."
    );
  }

  return context;
}
