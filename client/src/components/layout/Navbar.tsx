import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const LOGO_URL =
  "https://tecnologia.pdagencia.eu/cms/wp-content/uploads/2026/03/logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    console.log("[Navbar] Mounted with links:", NAV_LINKS);
  }, []);

  const loginOptions = [
    {
      label: "Sistema Académico",
      href: "http://academico.humboldt.edu.ec/?db=capacitacion",
    },
    { label: "Correo Institucional", href: "https://www.office.com/" },
    {
      label: "Campus Virtual",
      href: "https://www.campushumboldtzentrum.com/login/index.php",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
             <img
              src={LOGO_URL}
              alt="Colegio Dual Logo"
              className="h-16 w-auto object-contain"
            />
            <span className="font-bold text-slate-900 lg:hidden">Colegio Dual</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === link.href
                  ? "text-primary font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/admisiones">
            <Button className="font-semibold bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-medium text-foreground hover:text-primary py-2 border-b border-border/50"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
