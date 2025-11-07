/**
 * Supabase Types
 * ===============
 *
 * Ce fichier contient les types TypeScript pour Supabase.
 *
 * NOTE IMPORTANTE :
 * Dans un projet réel avec une database Supabase, vous généreriez ces types
 * automatiquement avec la commande :
 * `npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts`
 *
 * Pour l'instant, nous utilisons seulement l'authentification Supabase,
 * donc nous définissons les types manuellement.
 */

import { User, Session } from "@supabase/supabase-js";

/**
 * Type pour un utilisateur Supabase authentifié
 */
export type AuthUser = User;

/**
 * Type pour une session Supabase
 */
export type AuthSession = Session;

/**
 * Type pour les métadonnées utilisateur personnalisées
 * Vous pouvez étendre ce type selon vos besoins
 */
export interface UserMetadata {
  avatar_url?: string;
  full_name?: string;
  username?: string;
}

/**
 * Type pour le contexte d'authentification
 */
export interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

/**
 * Type pour les erreurs d'authentification
 */
export interface AuthError {
  message: string;
  status?: number;
}

/**
 * Database types (à étendre quand vous ajouterez des tables)
 */
export interface Database {
  public: {
    Tables: {
      // Ajoutez vos tables ici plus tard
      // Example:
      // profiles: {
      //   Row: {
      //     id: string;
      //     username: string;
      //     avatar_url: string;
      //   };
      //   Insert: {
      //     id: string;
      //     username: string;
      //     avatar_url?: string;
      //   };
      //   Update: {
      //     username?: string;
      //     avatar_url?: string;
      //   };
      // };
    };
    Views: {
      // Vos vues ici
    };
    Functions: {
      // Vos fonctions PostgreSQL ici
    };
    Enums: {
      // Vos enums ici
    };
  };
}
