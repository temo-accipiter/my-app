import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fonction utilitaire pour fusionner les classes Tailwind de manière intelligente
 *
 * Combine clsx (pour les classes conditionnelles) et tailwind-merge (pour éviter les conflits)
 *
 * Exemple:
 * cn("px-2 py-1", condition && "bg-blue-500", "px-4")
 * // Résultat: "py-1 bg-blue-500 px-4" (px-4 override px-2)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
