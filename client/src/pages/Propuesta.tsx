import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { Briefcase, Lightbulb } from "lucide-react";

const PROPUESTA_IMG1 =
  "https://static.wixstatic.com/media/e2a619_4a082129c8fa45b4b7dc89855511b7c6~mv2.jpg/v1/fit/w_2872,h_1906,q_90,enc_avif,quality_auto/e2a619_4a082129c8fa45b4b7dc89855511b7c6~mv2.jpg";
const PROPUESTA_IMG2 =
  "https://static.wixstatic.com/media/e2a619_f16f3516457d481f850f99751ef4f28c~mv2.jpg/v1/fill/w_1056,h_694,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/AFPH200(1).jpg";

import { useWordPress } from "@/hooks/use-wordpress";

export function Propuesta() {
  const { data: wpPage } = useWordPress("propuesta");

  // Fallbacks
  const hero = {
    titulo: wpPage?.acf?.propuesta_hero?.titulo || "Nuestra propuesta de formación",
    descripcion: wpPage?.acf?.propuesta_hero?.descripcion || "Somos parte de la Red de Colegios CRISFE, una comunidad educativa que forma estudiantes competentes, solidarios, incluyentes e íntegros, con una visión humanista, crítica e inclusiva, donde el aprendizaje es activo, significativo y conectado con la vida real."
  };

  const abp = {
    titulo: wpPage?.acf?.propuesta_abp?.titulo || "Aprendizaje Basado en Proyectos (ABP)",
    descripcion: wpPage?.acf?.propuesta_abp?.descripcion || "El ABP es el corazón de nuestra propuesta pedagógica. Los estudiantes no solo memorizan conceptos, sino que los aplican para resolver problemas del mundo real.",
    imagen: wpPage?.acf?.propuesta_abp?.imagen || PROPUESTA_IMG1,
    pasos: wpPage?.acf?.propuesta_abp?.pasos || [
      { titulo: "Investigación", descripcion: "Los alumnos indagan sobre un tema relevante o problemática." },
      { titulo: "Creación", descripcion: "Diseñan y construyen una solución tangible (producto, campaña, modelo)." },
      { titulo: "Presentación", descripcion: "Exponen sus resultados ante la comunidad, desarrollando oratoria y confianza." }
    ]
  };

  const dual = {
    titulo: wpPage?.acf?.propuesta_dual?.titulo || "Formación Dual",
    descripcion: wpPage?.acf?.propuesta_dual?.descripcion || "Únicos en la región con el verdadero sistema dual alemán. Los estudiantes de bachillerato dividen su tiempo entre el colegio y empresas formadoras.",
    imagen: wpPage?.acf?.propuesta_dual?.imagen || PROPUESTA_IMG2,
    beneficios: wpPage?.acf?.propuesta_dual?.beneficios?.map((b: any) => b.texto) || [
      "Primera experiencia laboral real antes de graduarse.",
      "Desarrollo de responsabilidad y ética profesional.",
      "Certificación reconocida por cámaras de comercio.",
      "Mayor facilidad para elegir carrera universitaria."
    ]
  };

  const pilares = wpPage?.acf?.propuesta_pilares ? {
    pilar1: {
      titulo: "1. EducARTE",
      descripcion: wpPage.acf.propuesta_pilares.pilar1.descripcion,
      items_como: wpPage.acf.propuesta_pilares.pilar1.items_como?.map((i: any) => i.texto) || [],
      diferenciadores: wpPage.acf.propuesta_pilares.pilar1.diferenciadores?.map((i: any) => i.texto) || []
    },
    pilar2: {
      titulo: "2. CuidARte",
      descripcion: wpPage.acf.propuesta_pilares.pilar2.descripcion,
      enfoques: wpPage.acf.propuesta_pilares.pilar2.enfoques?.map((i: any) => i.texto) || [],
      procesos: wpPage.acf.propuesta_pilares.pilar2.procesos?.map((i: any) => i.texto) || []
    }
  } : null;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-slate-900 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            {hero.titulo}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {hero.descripcion}
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
              <h2 className="font-heading text-3xl font-bold mb-6">
                {abp.titulo}
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {abp.descripcion}
              </p>
              <ul className="space-y-4">
                {abp.pasos.map((paso: any, i: number) => (
                  <li key={i} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold">{paso.titulo}</h4>
                      <p className="text-sm text-slate-500">
                        {paso.descripcion}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-lg aspect-square">
              <img
                src={abp.imagen}
                alt={abp.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Section>

        {/* Dual Section */}
        <Section background="muted" id="dual">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-white rounded-2xl overflow-hidden shadow-lg aspect-square">
              <img
                src={dual.imagen}
                alt={dual.titulo}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                <Briefcase className="h-4 w-4" />
                Modelo Alemán
              </div>
              <h2 className="font-heading text-3xl font-bold mb-6">
                {dual.titulo}
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {dual.descripcion}
              </p>

              <div className="space-y-3">
                <h3 className="font-bold text-lg mb-2">Beneficios:</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  {dual.beneficios.map((beneficio: string, i: number) => (
                    <li key={i}>{beneficio}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Pilares Section */}
        <Section>
          <div className="container-custom">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
              Nuestra propuesta integra dos pilares complementarios
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Pilar 1 */}
              <div className="bg-white rounded-2xl shadow-sm p-8 border">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  {pilares?.pilar1.titulo || "1. EducARTE"}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {pilares?.pilar1.descripcion || "Estrategias pedagógicas basadas en evidencia. Modelo socio-constructivista, con enfoque humanista e inclusivo, implementado mediante metodologías activas."}
                </p>

                <h4 className="font-semibold mb-2">¿Cómo lo hacemos?</h4>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {(pilares?.pilar1.items_como || [
                    "Aprendizaje interdisciplinario y contextualizado (ABP).",
                    "Metodologías activas y pensamiento crítico.",
                    "Autonomía, colaboración y protagonismo del estudiante."
                  ]).map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>

                <h4 className="font-semibold mt-6 mb-2">Diferenciadores</h4>
                <ul className="grid grid-cols-2 gap-2 text-slate-600 text-sm">
                  {(pilares?.pilar1.diferenciadores || [
                    "Educación personalizada",
                    "Valores en el currículo",
                    "Currículo trilingüe",
                    "Certificaciones internacionales",
                    "Science of Reading & Math",
                    "Ludobiblioteca activa"
                  ]).map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Pilar 2 */}
              <div className="bg-slate-50 rounded-2xl shadow-sm p-8 border">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  {pilares?.pilar2.titulo || "2. CuidARte"}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {pilares?.pilar2.descripcion || "El bienestar es un prerrequisito del aprendizaje. Se fundamenta en el autocuidado, el cuidado de otros y el cuidado del entorno."}
                </p>

                <h4 className="font-semibold mb-2">Enfoques</h4>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {(pilares?.pilar2.enfoques || [
                    "Biopsicosocial: dimensión biológica, psicológica y social.",
                    "Ecológico: bienestar en todos los entornos del estudiante."
                  ]).map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>

                <h4 className="font-semibold mt-6 mb-2">Procesos</h4>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {(pilares?.pilar2.procesos || [
                    "Aprendizaje socioemocional continuo.",
                    "Salud integral y hábitos de vida saludables."
                  ]).map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
