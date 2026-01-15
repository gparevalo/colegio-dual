import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admisiones" component={Admisiones} />
      <Route path="/oferta-academica" component={OfertaAcademica} />
      <Route path="/propuesta" component={Propuesta} />
      <Route path="/noticias" component={Noticias} />
      <Route path="/sobre-nosotros" component={SobreNosotros} />
      <Route path="/contacto" component={Contacto} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
