/**
 * UserMenu Component
 * ==================
 *
 * Dropdown menu pour l'utilisateur authentifié dans le header.
 *
 * CARACTÉRISTIQUES :
 * - Avatar avec initiales de l'email
 * - Menu dropdown avec actions
 * - Logout button avec confirmation
 * - Affichage des informations utilisateur
 *
 * UTILISATION :
 * - S'affiche dans le Header quand l'utilisateur est connecté
 * - Remplace le bouton "Get Started" quand authentifié
 */

"use client";

import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export function UserMenu() {
  const { user, signOut, isLoading } = useAuth();

  // Pendant le chargement, ne rien afficher
  if (isLoading) {
    return null;
  }

  // Si pas d'utilisateur, ne rien afficher
  if (!user) {
    return null;
  }

  /**
   * Obtient les initiales de l'email pour l'avatar
   * Exemple: john.doe@example.com → JD
   */
  const getInitials = (email: string) => {
    if (!email) return "??";
    const parts = email.split("@")[0]?.split(".") ?? [];
    if (parts.length >= 2 && parts[0]?.[0] && parts[1]?.[0]) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(user.email ?? "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/* En-tête avec infos utilisateur */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Mon compte</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Lien vers Dashboard */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {/* Lien vers Profile (à créer plus tard) */}
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>

        {/* Lien vers Settings (à créer plus tard) */}
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Bouton Logout */}
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
