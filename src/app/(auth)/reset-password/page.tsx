/**
 * Reset Password Page
 * ===================
 *
 * Page de réinitialisation du mot de passe avec :
 * - Envoi d'email de réinitialisation
 * - Validation de formulaire avec Zod
 * - Gestion d'erreurs avec toast
 *
 * FLOW :
 * 1. Utilisateur entre son email
 * 2. Validation côté client avec Zod
 * 3. Appel à supabase.auth.resetPasswordForEmail()
 * 4. Supabase envoie un email avec un lien de réinitialisation
 * 5. L'utilisateur clique sur le lien → redirigé vers cette page avec token
 * 6. Formulaire de nouveau mot de passe s'affiche
 *
 * NOTE : Pour simplifier, nous gérons seulement l'envoi d'email ici.
 * La mise à jour du mot de passe se fait via l'email Supabase.
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
import { Loader2, ArrowLeft, Mail } from "lucide-react";

/**
 * Schéma de validation Zod pour le formulaire de reset
 */
const resetSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Email invalide"),
});

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Initialiser le formulaire avec React Hook Form + Zod
  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  /**
   * Gestionnaire de soumission du formulaire
   */
  const onSubmit = async (values: ResetFormValues) => {
    try {
      setIsLoading(true);
      await resetPassword(values.email);
      setEmailSent(true);
    } catch (error) {
      // Les erreurs sont déjà gérées dans AuthContext avec toast
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Si l'email a été envoyé, afficher un message de confirmation
  if (emailSent) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <Mail className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Email envoyé !
          </h1>
          <p className="text-sm text-muted-foreground">
            Nous avons envoyé un lien de réinitialisation à{" "}
            <span className="font-medium text-foreground">
              {form.getValues("email")}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser
            votre mot de passe.
          </p>
        </div>

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setEmailSent(false)}
          >
            Renvoyer l'email
          </Button>

          <Link href="/login" className="block">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la connexion
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Mot de passe oublié ?
        </h1>
        <p className="text-sm text-muted-foreground">
          Entrez votre email pour recevoir un lien de réinitialisation
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
                <FormDescription>
                  Un email de réinitialisation sera envoyé à cette adresse
                </FormDescription>
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
            Envoyer le lien
          </Button>
        </form>
      </Form>

      {/* Lien vers Login */}
      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
