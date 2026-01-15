import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  // Extend nav links manually or modify data.ts. Modifying here for now to include Contacto
  const extendedLinks = [
    ...NAV_LINKS,
    { label: "Contacto", href: "/contacto" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-xl">
              CD
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg leading-tight text-foreground">
                Colegio Dual
              </span>
              <span className="text-xs text-muted-foreground tracking-wider uppercase">
                Duale Schule
              </span>
            </div>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {extendedLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden xl:flex gap-2">
            <User className="h-4 w-4" />
            Portal Padres
          </Button>
          <Link href="/admisiones">
            <Button className="font-semibold shadow-md">
              Admisiones
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t bg-background p-4 absolute w-full shadow-lg">
          <div className="flex flex-col space-y-4">
            {extendedLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="block text-base font-medium text-foreground hover:text-primary py-2 border-b border-border/50"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                Portal Padres
              </Button>
              <Link href="/admisiones" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Admisiones</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
