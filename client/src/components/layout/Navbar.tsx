import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOGO_URL = "https://static.wixstatic.com/media/e2a619_9b518fdc457d4856af0d8f7b13c6760a~mv2.png/v1/crop/x_0,y_825,w_3000,h_1350/fill/w_440,h_198,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Duale%20Schule%20sin%20hz_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201_edited.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const extendedLinks = [...NAV_LINKS];

  const loginOptions = [
    { label: "Sistema Académico", href: "http://academico.humboldt.edu.ec/?db=capacitacion" },
    { label: "Correo Institucional", href: "https://www.office.com/" },
    { label: "Campus Virtual", href: "https://www.campushumboldtzentrum.com/login/index.php" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img 
            src={LOGO_URL} 
            alt="Colegio Dual Logo" 
            className="h-12 w-auto object-contain cursor-pointer"
          />
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-white transition-colors">
                <User className="h-4 w-4" />
                Login
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border shadow-md">
              {loginOptions.map((option) => (
                <DropdownMenuItem key={option.href} asChild className="focus:bg-slate-50">
                  <a href={option.href} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    {option.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
              <div className="px-2 py-1 text-xs font-semibold uppercase text-muted-foreground">Login</div>
              {loginOptions.map((option) => (
                <a 
                  key={option.href} 
                  href={option.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 text-sm font-medium hover:text-primary"
                >
                  <User className="h-4 w-4" />
                  {option.label}
                </a>
              ))}
              <Link href="/admisiones" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-2">Admisiones</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
