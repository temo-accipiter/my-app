import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Variantes du bouton avec class-variance-authority
 *
 * CVA permet de définir des variantes de styles de manière type-safe
 * Chaque variante peut être combinée (variant + size + etc.)
 */
const buttonVariants = cva(
  // Classes de base appliquées à tous les boutons
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      // Variantes de couleur/style
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Variantes de taille
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    // Valeurs par défaut
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Si true, le composant sera rendu comme un Slot Radix
   * Permet d'utiliser un autre composant (ex: <Link>) tout en gardant les styles du bouton
   */
  asChild?: boolean;
}

/**
 * Composant Button
 *
 * Bouton personnalisable avec plusieurs variantes de style et de taille
 * Support du polymorphisme via asChild (Radix Slot)
 *
 * @example
 * <Button variant="default">Cliquez-moi</Button>
 * <Button variant="outline" size="lg">Grand bouton</Button>
 * <Button asChild><Link href="/about">Lien stylé comme bouton</Link></Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
