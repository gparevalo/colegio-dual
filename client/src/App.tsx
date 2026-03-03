import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Home } from "@/pages/Home";
import { Admisiones } from "@/pages/Admisiones";
import { OfertaAcademica } from "@/pages/OfertaAcademica";
import { Propuesta } from "@/pages/Propuesta";
import { Noticias } from "@/pages/Noticias";
import { SobreNosotros } from "@/pages/SobreNosotros";
import { Contacto } from "@/pages/Contacto";
import { Gallery } from "@/pages/Gallery";
import { Navbar } from "@/components/layout/Navbar";

function Router() {
  // Use the base path from WordPress if available
  const base = window.wpData?.sitePath || "";
  const [location] = useLocation();

  console.log(`[Router] Initializing with base: "${base}", current location: "${location}"`);
  
  return (
    <WouterRouter base={base}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/admisiones" component={Admisiones} />
            <Route path="/oferta-academica" component={OfertaAcademica} />
            <Route path="/propuesta" component={Propuesta} />
            <Route path="/noticias" component={Noticias} />
            <Route path="/sobre-nosotros" component={SobreNosotros} />
            <Route path="/contacto" component={Contacto} />
            <Route path="/galeria" component={Gallery} />
            
            {/* Fallback to 404 */}
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </WouterRouter>
  );
}

function App() {
  console.log("[App] Component execution started.");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
