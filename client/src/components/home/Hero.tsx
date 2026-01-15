import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CalendarDays } from "lucide-react";
import heroBg from "@assets/stock_images/group_of_students_si_2f7a6c01.jpg";

export function Hero() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Estudiantes en areas verdes" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            <span className="mr-2 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground uppercase tracking-wide">
              Nuevo
            </span>
            Admisiones Abiertas 2026
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight">
            Formando líderes que <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-white">
              aprenden haciendo.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed">
            Somos un colegio binacional con metodología de Formación Dual y Aprendizaje Basado en Proyectos. Preparamos a tus hijos para los desafíos reales del mundo global.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/admisiones">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 border-none">
                Iniciar Admisión
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-medium bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
              <CalendarDays className="mr-2 h-5 w-5" />
              Agendar Visita
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hidden md:block">
        <span className="text-sm">Descubre más</span>
      </div>
    </div>
  );
}
