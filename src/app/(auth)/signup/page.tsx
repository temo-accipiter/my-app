/**
 * Signup Page
 * ===========
 *
 * Page d'inscription avec :
 * - Validation de formulaire avec Zod
 * - Confirmation de mot de passe
 * - Gestion d'erreurs avec toast
 * - États de chargement
 *
 * FLOW :
 * 1. Utilisateur remplit le formulaire
 * 2. Validation côté client avec Zod (email, password match)
 * 3. Appel à supabase.auth.signUp()
 * 4. Si confirmation email requise → toast info
 * 5. Si succès → redirect vers /dashboard
 * 6. Si erreur → affichage du toast
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

/**
 * Schéma de validation Zod pour le formulaire d'inscription
 */
const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "L'email est requis")
      .email("Email invalide"),
    password: z
      .string()
      .min(1, "Le mot de passe est requis")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
      ),
    confirmPassword: z
      .string()
      .min(1, "Veuillez confirmer votre mot de passe"),
    fullName: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Initialiser le formulaire avec React Hook Form + Zod
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  /**
   * Gestionnaire de soumission du formulaire
   */
  const onSubmit = async (values: SignupFormValues) => {
    try {
      setIsLoading(true);
      await signUp(values.email, values.password, {
        full_name: values.fullName,
      });
      // La redirection est gérée dans AuthContext.signUp()
    } catch (error) {
      // Les erreurs sont déjà gérées dans AuthContext avec toast
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Créer un compte
        </h1>
        <p className="text-sm text-muted-foreground">
          Remplissez le formulaire pour créer votre compte
        </p>
      </div>

      {/* Formulaire */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Champ Nom complet (optionnel) */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet (optionnel)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jean Dupont"
                    type="text"
                    autoComplete="name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Au moins 8 caractères avec majuscule, minuscule et chiffre
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
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
            Créer mon compte
          </Button>
        </form>
      </Form>

      {/* Lien vers Login */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Déjà un compte ? </span>
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
}
