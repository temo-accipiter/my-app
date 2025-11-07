/**
 * Login Page
 * ==========
 *
 * Page de connexion avec :
 * - Validation de formulaire avec Zod
 * - Gestion d'erreurs avec toast
 * - États de chargement
 * - Liens vers signup et reset-password
 *
 * FLOW :
 * 1. Utilisateur remplit le formulaire
 * 2. Validation côté client avec Zod
 * 3. Appel à supabase.auth.signInWithPassword()
 * 4. Si succès → redirect vers /dashboard
 * 5. Si erreur → affichage du toast
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

/**
 * Schéma de validation Zod pour le formulaire de login
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Email invalide"),
  password: z
    .string()
    .min(1, "Le mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Initialiser le formulaire avec React Hook Form + Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Gestionnaire de soumission du formulaire
   */
  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      await signIn(values.email, values.password);
      // La redirection est gérée dans AuthContext.signIn()
    } catch (error) {
      // Les erreurs sont déjà gérées dans AuthContext avec toast
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Connexion
        </h1>
        <p className="text-sm text-muted-foreground">
          Entrez vos identifiants pour accéder à votre compte
        </p>
      </div>

      {/* Formulaire */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Champ Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nom@exemple.com"
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Mot de passe</FormLabel>
                  <Link
                    href="/reset-password"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bouton Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
          </Button>
        </form>
      </Form>

      {/* Lien vers Signup */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Pas encore de compte ? </span>
        <Link
          href="/signup"
          className="font-medium text-primary hover:underline"
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
}
