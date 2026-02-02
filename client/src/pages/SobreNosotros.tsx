import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { BookOpen, Briefcase, FileText } from "lucide-react";

const SOBRE_NOSOTROS_IMAGE =
  "https://static.wixstatic.com/media/e2a619_cac267b654fc4eee9ffaba234e405ffb~mv2.jpg/v1/fill/w_1616,h_1994,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/e2a619_cac267b654fc4eee9ffaba234e405ffb~mv2.jpg";

const QUIENES_SOMOS =
  "https://static.wixstatic.com/media/8b6c1b_cac7441468a74807841b3e8a0e43a6a5~mv2.jpg/v1/fill/w_634,h_892,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8b6c1b_cac7441468a74807841b3e8a0e43a6a5~mv2.jpg";
export function SobreNosotros() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-slate-100 py-20">
        <div className="container-custom text-center">
          <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
            Nuestra Institución
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Sobre Colegio Dual
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Más de 30 años formando ciudadanos del mundo con excelencia
            académica y valores humanos.
          </p>
        </div>
      </div>

      <main className="flex-grow">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6">
                Nuestra Historia
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed text-justify">
                Fundado en 1995, el Colegio Dual nació de la visión de un grupo
                de educadores ecuatorianos y alemanes que soñaban con una
                institución que uniera lo mejor de ambas culturas.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed text-justify    ">
                Desde entonces, hemos crecido manteniendo nuestra esencia: la
                excelencia académica combinada con la calidez humana y la
                innovación pedagógica constante.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed text-justify ">
                Somos parte de la Red de Colegios CRISFE, lo que fortalece
                nuestra propuesta educativa al integrarnos a un ecosistema que
                eleva estándares, impulsa la mejora continua y respalda la
                enseñanza con estrategias basadas en evidencia. Esto se traduce
                en acompañamiento pedagógico, seguimiento permanente y
                herramientas para ajustar prácticas en aula según resultados
                reales, asegurando una educación personalizada, inclusiva y
                centrada en el bienestar integral. Además, la red promueve una
                formación donde los valores se viven e integran en el currículo,
                garantizando una experiencia educativa coherente, sólida y de
                calidad para cada estudiante.
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

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-slate-200 shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src={QUIENES_SOMOS}
                alt="Estudiantes en el campus"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6">
                ¿Quiénes somos?
              </h2>{" "}
              <p className="text-slate-600 mb-4 leading-relaxed text-justify ">
                Somos una comunidad educativa que acompaña a niños y familias en
                su desarrollo integral a través de un modelo pedagógico
                socio-constructivista, con enfoque humanista e inclusivo, y
                sustentado en estrategias pedagógicas basadas en evidencia.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed text-justify ">
                Formamos parte de una Red de Colegios, lo que nos permite sumar
                más respaldo institucional, mejores estándares académicos,
                acompañamiento pedagógico permanente y una visión compartida de
                calidad educativa. Ser parte de la Red significa que nuestros
                estudiantes y familias cuentan con un ecosistema que impulsa la
                mejora continua: formación docente, innovación metodológica,
                bienestar, y procesos que aseguran consistencia y excelencia.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed text-justify ">
                Nuestro propósito es lograr aprendizajes significativos para la
                vida, fortaleciendo habilidades académicas, socioemocionales y
                valores, con una educación personalizada que respeta el ritmo,
                las necesidades y el potencial de cada estudiante.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-red-50/50 border-red-100">
              <CardContent className="pt-8 px-8 pb-8">
                <h3 className="font-heading text-2xl font-bold mb-4 text-primary">
                  Misión
                </h3>
                <p className="text-slate-700 leading-relaxed  text-justify">
                  Formar seres humanos íntegros, críticos y creativos, capaces
                  de transformar su entorno a través del conocimiento y los
                  valores, mediante una educación de excelencia con estándares
                  internacionales.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-neutral-50/50 border-neutral-200">
              <CardContent className="pt-8 px-8 pb-8">
                <h3 className="font-heading text-2xl font-bold mb-4 text-slate-800">
                  Visión
                </h3>
                <p className="text-slate-700 leading-relaxed  text-justify">
                  Ser reconocidos como una institución líder en innovación
                  educativa y formación dual en Latinoamérica, referente por la
                  calidad humana y académica de sus graduados.
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section background="muted" className="overflow-hidden">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                Metodología
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Nuestra propuesta integra un enfoque pedagógico basado en
                evidencia, con prácticas concretas y medibles dentro del aula,
                potenciadas por el acompañamiento y los estándares de la Red de
                Colegios CRISFE:
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="flex gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Estrategias pedagógicas basadas en evidencia
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Aplicamos metodologías probadas que guían la planificación,
                    la evaluación y el seguimiento del progreso de cada
                    estudiante.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Science of Reading y Science of Math
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Para asegurar bases sólidas en lectura, escritura y
                    pensamiento matemático desde edades tempranas.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Modelo EducARTE</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Integra metodologías activas y experiencias creativas para
                    aprender haciendo, con sentido, propósito y motivación.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Programa de bienestar
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Promueve la convivencia, la autorregulación, la salud
                    emocional y el desarrollo de habilidades sociales.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Valores integrados al currículo
                  </h3>
                  <p className="text-slate-600  text-sm leading-relaxed">
                    Formación integral con valores como eje transversal de la
                    vida escolar.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Currículo trilingüe
                  </h3>
                  <p className="text-slate-600  text-sm leading-relaxed">
                    50% inglés, 30% alemán y 20% español, con proyección hacia
                    certificaciones internacionales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section background="muted">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Nuestros Valores
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Excelencia",
              "Integridad",
              "Responsabilidad",
              "Respeto",
              "Solidaridad",
              "Innovación",
            ].map((val) => (
              <div
                key={val}
                className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-3"
              >
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
