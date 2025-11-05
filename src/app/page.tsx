"use client";

import * as React from "react";
import {
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Heart,
  Star,
  Code,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Page d'accueil - Showcase des composants shadcn/ui
 *
 * Démontre l'utilisation de tous les composants installés :
 * - Buttons avec différentes variantes
 * - Cards responsive
 * - Inputs et Labels
 * - Dialogs
 * - Dropdown menus
 * - Avatars
 * - Badges
 * - Toasts (via sonner)
 * - Icônes Lucide React
 */
export default function Home() {
  const features = [
    {
      icon: Sparkles,
      title: "Modern Design",
      description: "Beautiful UI components built with Tailwind CSS",
      badge: "New",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for performance with Next.js 16",
      badge: "Fast",
    },
    {
      icon: Shield,
      title: "Type Safe",
      description: "Full TypeScript support with strict mode",
      badge: "Safe",
    },
    {
      icon: Rocket,
      title: "Ready to Deploy",
      description: "Production-ready architecture and best practices",
      badge: "Ready",
    },
  ];

  const handleToastDemo = (type: "success" | "error" | "info") => {
    switch (type) {
      case "success":
        toast.success("Success!", {
          description: "Your action was completed successfully.",
        });
        break;
      case "error":
        toast.error("Error!", {
          description: "Something went wrong. Please try again.",
        });
        break;
      case "info":
        toast.info("Info", {
          description: "This is an informational message.",
        });
        break;
    }
  };

  return (
    <div className="container px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            Next.js 16 + shadcn/ui
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Modern UI Architecture
          </h1>

          <p className="text-lg text-muted-foreground sm:text-xl">
            A professional, type-safe, and responsive UI built with Next.js 16,
            TypeScript, Tailwind CSS, and shadcn/ui components.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => handleToastDemo("success")}>
              <Rocket className="mr-2 h-4 w-4" />
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              <Code className="mr-2 h-4 w-4" />
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Features Grid */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Features</h2>
          <p className="text-muted-foreground">
            Everything you need to build modern applications
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden">
              <CardHeader>
                <div className="mb-2 flex items-start justify-between">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Components Showcase */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Components Showcase</h2>
          <p className="text-muted-foreground">
            Interactive examples of shadcn/ui components
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Card 1: Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                Different button variants and sizes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status indicators and tags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="secondary">
                  <Star className="mr-1 h-3 w-3" />
                  With Icon
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Form Elements */}
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>
                Inputs and labels for forms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit</Button>
            </CardFooter>
          </Card>

          {/* Card 4: Interactive Components */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Components</CardTitle>
              <CardDescription>Dialogs, dropdowns, and more</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                {/* Dialog Demo */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Open Dialog
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Example</DialogTitle>
                      <DialogDescription>
                        This is a demo of the dialog component. It's accessible
                        and fully customizable.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">
                        Dialogs are great for confirmations, forms, and modal
                        content.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Dropdown Menu Demo */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Open Dropdown
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Toast Demos */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleToastDemo("success")}
                  >
                    Toast Success
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleToastDemo("error")}
                  >
                    Toast Error
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 5: Avatars */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Avatars</CardTitle>
              <CardDescription>
                User avatars with fallback support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>
                    <Palette className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">XL</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-lg border bg-card p-8 text-center shadow">
        <h2 className="mb-2 text-2xl font-bold">Ready to Get Started?</h2>
        <p className="mb-6 text-muted-foreground">
          Start building your next project with this modern UI architecture
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() =>
              toast.success("Let's go!", {
                description: "You're all set to start building!",
              })
            }
          >
            <Rocket className="mr-2 h-4 w-4" />
            Start Building
          </Button>
          <Button size="lg" variant="outline">
            <Star className="mr-2 h-4 w-4" />
            Star on GitHub
          </Button>
        </div>
      </section>
    </div>
  );
}
