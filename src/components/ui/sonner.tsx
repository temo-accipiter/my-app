"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

/**
 * Toaster - Composant pour afficher les notifications toast
 *
 * Utilise Sonner (la bibliothèque de toast recommandée par shadcn/ui)
 * S'adapte automatiquement au thème (clair/sombre)
 *
 * À placer dans le layout principal de l'application
 *
 * @example
 * // Dans votre layout:
 * <Toaster />
 *
 * // Dans vos composants:
 * import { toast } from "sonner"
 * toast.success("Opération réussie!")
 * toast.error("Une erreur est survenue")
 */
type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
