import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import historicPhoto from "@assets/stock_images/white_students_walki_20b5d332.jpg";

const SOBRE_NOSOTROS_IMAGE = "https://static.wixstatic.com/media/e2a619_cac267b654fc4eee9ffaba234e405ffb~mv2.jpg/v1/fill/w_1616,h_1994,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/e2a619_cac267b654fc4eee9ffaba234e405ffb~mv2.jpg";

export function SobreNosotros() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-slate-100 py-20">
        <div className="container-custom text-center">
          <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Nuestra Institución</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-slate-900">Sobre Colegio Dual</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Más de 30 años formando ciudadanos del mundo con excelencia académica y valores humanos.
          </p>
        </div>
      </div>

      <main className="flex-grow">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6">Nuestra Historia</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Fundado en 1995, el Colegio Dual nació de la visión de un grupo de educadores ecuatorianos y alemanes que soñaban con una institución que uniera lo mejor de ambas culturas.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Desde entonces, hemos crecido manteniendo nuestra esencia: la excelencia académica combinada con la calidez humana y la innovación pedagógica constante.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-slate-200 shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
               <img 
                 src={SOBRE_NOSOTROS_IMAGE} 
                 alt="Estudiantes en el campus" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-red-50/50 border-red-100">
              <CardContent className="pt-8 px-8 pb-8">
                <h3 className="font-heading text-2xl font-bold mb-4 text-primary">Misión</h3>
                <p className="text-slate-700 leading-relaxed">
                  Formar seres humanos íntegros, críticos y creativos, capaces de transformar su entorno a través del conocimiento y los valores, mediante una educación de excelencia con estándares internacionales.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-neutral-50/50 border-neutral-200">
              <CardContent className="pt-8 px-8 pb-8">
                <h3 className="font-heading text-2xl font-bold mb-4 text-slate-800">Visión</h3>
                <p className="text-slate-700 leading-relaxed">
                  Ser reconocidos como una institución líder en innovación educativa y formación dual en Latinoamérica, referente por la calidad humana y académica de sus graduados.
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section background="muted">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">Nuestros Valores</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["Excelencia", "Integridad", "Responsabilidad", "Respeto", "Solidaridad", "Innovación"].map((val) => (
              <div key={val} className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-heading font-bold text-lg">{val}</span>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
