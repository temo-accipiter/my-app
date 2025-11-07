/**
 * Dashboard Page (Protected)
 * ===========================
 *
 * Page protégée accessible uniquement aux utilisateurs authentifiés.
 *
 * PROTECTION :
 * - Le middleware Next.js (middleware.ts) redirige vers /login si non authentifié
 * - Cette page utilise un Server Component pour récupérer l'utilisateur
 *
 * DIFFÉRENCE CLIENT VS SERVER :
 * - Cette page est un SERVER COMPONENT (par défaut dans App Router)
 * - On utilise createClient() de @/lib/supabase/server
 * - Pas besoin de useAuth() hook ici car on est côté serveur
 * - Les données sont récupérées à chaque requête (pas de state côté client)
 *
 * AVANTAGES SERVER COMPONENT :
 * - Plus sécurisé (pas de code JS côté client)
 * - Meilleure performance (rendu serveur)
 * - SEO-friendly
 * - Pas de loading state nécessaire
 */

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, Shield } from "lucide-react";

export default async function DashboardPage() {
  // Créer le client Supabase côté serveur
  const supabase = await createClient();

  // Récupérer l'utilisateur authentifié
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Si pas d'utilisateur (ne devrait jamais arriver grâce au middleware)
  if (error || !user) {
    redirect("/login");
  }

  // Formater la date de création du compte
  const createdAt = new Date(user.created_at).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre espace personnel
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Carte Informations Utilisateur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations du compte
            </CardTitle>
            <CardDescription>
              Détails de votre compte Supabase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
              <p className="font-medium">{user.email}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>ID Utilisateur</span>
              </div>
              <p className="font-mono text-xs">{user.id}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Membre depuis</span>
              </div>
              <p className="font-medium">{createdAt}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Email vérifié</span>
              </div>
              <div>
                {user.email_confirmed_at ? (
                  <Badge variant="default">Vérifié</Badge>
                ) : (
                  <Badge variant="secondary">Non vérifié</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carte Métadonnées */}
        <Card>
          <CardHeader>
            <CardTitle>Métadonnées utilisateur</CardTitle>
            <CardDescription>
              Informations supplémentaires de votre profil
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.user_metadata && Object.keys(user.user_metadata).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(user.user_metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{key}:</span>
                    <span className="text-sm font-medium">
                      {String(value) || "—"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Aucune métadonnée disponible
              </p>
            )}
          </CardContent>
        </Card>

        {/* Carte Authentification */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informations de session</CardTitle>
            <CardDescription>
              Détails de votre session Supabase actuelle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Cette page est un <strong>Server Component</strong>.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                <li>Les données sont récupérées côté serveur via Supabase SSR</li>
                <li>Protection automatique via middleware.ts</li>
                <li>Pas de JavaScript client nécessaire pour l'authentification</li>
                <li>Meilleure sécurité et performance</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
