import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { Briefcase, Lightbulb, Cog } from "lucide-react";

export function Propuesta() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-slate-900 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Nuestra Propuesta Educativa</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Innovamos con metodologías que conectan el conocimiento académico con la realidad práctica.
          </p>
        </div>
      </div>

      <main className="flex-grow">
        {/* ABP Section */}
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground font-medium text-sm mb-4">
                <Lightbulb className="h-4 w-4" />
                Metodología Activa
              </div>
              <h2 className="font-heading text-3xl font-bold mb-6">Aprendizaje Basado en Proyectos (ABP)</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                El ABP es el corazón de nuestra propuesta pedagógica. Los estudiantes no solo memorizan conceptos, sino que los aplican para resolver problemas del mundo real.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">1</div>
                  <div>
                    <h4 className="font-bold">Investigación</h4>
                    <p className="text-sm text-slate-500">Los alumnos indagan sobre un tema relevante o problemática.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">2</div>
                  <div>
                    <h4 className="font-bold">Creación</h4>
                    <p className="text-sm text-slate-500">Diseñan y construyen una solución tangible (producto, campaña, modelo).</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">3</div>
                  <div>
                    <h4 className="font-bold">Presentación</h4>
                    <p className="text-sm text-slate-500">Exponen sus resultados ante la comunidad, desarrollando oratoria y confianza.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8 flex items-center justify-center aspect-square">
               {/* Visual Diagram Placeholder */}
               <div className="text-center text-slate-400">
                 <Cog className="h-24 w-24 mx-auto mb-4 opacity-20" />
                 <span className="text-lg font-medium">Diagrama Ciclo ABP</span>
               </div>
            </div>
          </div>
        </Section>

        {/* Dual Section */}
        <Section background="muted" id="dual">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-white rounded-2xl p-8 flex items-center justify-center aspect-square shadow-sm">
               {/* Visual Diagram Placeholder */}
               <div className="text-center text-slate-400">
                 <Briefcase className="h-24 w-24 mx-auto mb-4 opacity-20" />
                 <span className="text-lg font-medium">Diagrama Colegio + Empresa</span>
               </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                <Briefcase className="h-4 w-4" />
                Modelo Alemán
              </div>
              <h2 className="font-heading text-3xl font-bold mb-6">Formación Dual</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Únicos en la región con el verdadero sistema dual alemán. Los estudiantes de bachillerato dividen su tiempo entre el colegio y empresas formadoras.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-heading font-bold text-primary text-xl mb-1">60%</h4>
                  <span className="text-sm text-slate-500">Teoría en el Colegio</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-heading font-bold text-primary text-xl mb-1">40%</h4>
                  <span className="text-sm text-slate-500">Práctica en Empresa</span>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-2">Beneficios:</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>Primera experiencia laboral real antes de graduarse.</li>
                <li>Desarrollo de responsabilidad y ética profesional.</li>
                <li>Certificación reconocida por cámaras de comercio.</li>
                <li>Mayor facilidad para elegir carrera universitaria.</li>
              </ul>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
