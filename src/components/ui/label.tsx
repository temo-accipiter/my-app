import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Label - Étiquette pour les champs de formulaire
 *
 * Composant label simple et accessible
 * À utiliser avec les composants Input, Textarea, etc.
 *
 * @example
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 */
const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
