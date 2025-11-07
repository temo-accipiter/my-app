/**
 * Auth Context & Provider
 * ========================
 *
 * Ce Context fournit l'état d'authentification à toute l'application.
 *
 * RESPONSABILITÉS :
 * - Gérer l'état de l'utilisateur connecté
 * - Écouter les changements de session Supabase
 * - Fournir des fonctions d'authentification (login, signup, logout)
 * - Gérer les états de chargement
 *
 * UTILISATION :
 * 1. Envelopper votre app avec <AuthProvider> dans le layout
 * 2. Utiliser le hook useAuth() dans vos composants
 *
 * EXEMPLE :
 * ```tsx
 * import { useAuth } from "@/hooks/useAuth"
 *
 * function MyComponent() {
 *   const { user, signOut } = useAuth()
 *   return <button onClick={signOut}>Logout {user?.email}</button>
 * }
 * ```
 */

"use client";

import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type {
  AuthContextType,
  AuthUser,
  AuthSession,
  UserMetadata,
} from "@/types/supabase";

// Créer le contexte avec une valeur par défaut
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider Component
 * ======================
 *
 * Ce composant enveloppe votre application et fournit le contexte d'auth.
 *
 * FLOW :
 * 1. Au montage, récupère la session Supabase actuelle
 * 2. S'abonne aux changements d'authentification (login/logout)
 * 3. Met à jour l'état user/session automatiquement
 * 4. Fournit les fonctions d'authentification aux enfants
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  /**
   * Initialise la session au montage du composant
   */
  useEffect(() => {
    // Récupérer la session actuelle
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      // Rafraîchir la page pour mettre à jour les Server Components
      router.refresh();
    });

    // Nettoyer l'abonnement au démontage
    return () => subscription.unsubscribe();
  }, [supabase, router]);

  /**
   * Connexion avec email/password
   */
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Connexion réussie !");
      router.push("/dashboard");
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erreur de connexion";
      toast.error(message);
      throw error;
    }
  };

  /**
   * Inscription avec email/password
   */
  const signUp = async (
    email: string,
    password: string,
    metadata?: UserMetadata
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          // Redirection après confirmation d'email (si activé)
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;

      // Si la confirmation d'email est requise
      if (data.user && !data.session) {
        toast.info(
          "Vérifiez votre email pour confirmer votre inscription",
          {
            duration: 5000,
          }
        );
      } else {
        toast.success("Inscription réussie !");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erreur d'inscription";
      toast.error(message);
      throw error;
    }
  };

  /**
   * Déconnexion
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      toast.success("Déconnexion réussie");
      router.push("/login");
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erreur de déconnexion";
      toast.error(message);
      throw error;
    }
  };

  /**
   * Réinitialisation du mot de passe
   */
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success(
        "Email de réinitialisation envoyé ! Vérifiez votre boîte mail.",
        {
          duration: 5000,
        }
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Erreur lors de la réinitialisation";
      toast.error(message);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
