import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, BookOpen, GraduationCap, Briefcase, Globe, School } from "lucide-react";
import { Link } from "wouter";

const PRIMARIA_IMG = "https://static.wixstatic.com/media/e2a619_97c87a2dd0aa409d934b77b54a53dee3~mv2.jpg/v1/fill/w_1904,h_606,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e2a619_97c87a2dd0aa409d934b77b54a53dee3~mv2.jpg";
const EGB_IMG = "https://static.wixstatic.com/media/720b25_c97aad89c0204683935218d6f5194161~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_9258edit.png";
const BACHILLERATO_IMG = "https://static.wixstatic.com/media/720b25_b3d85a88628d44528d40a8d467f1767d~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90,enc_avif,quality_auto/720b25_b3d85a88628d44528d40a8d467f1767d~mv2.png";
const PRODUCTIVO_IMG = "https://static.wixstatic.com/media/e2a619_419d60265bfb4b258520a630022541dc~mv2.jpg/v1/fit/w_1804,h_1197,q_90,enc_avif,quality_auto/e2a619_419d60265bfb4b258520a630022541dc~mv2.jpg";
const IDIOMAS_IMG = "https://static.wixstatic.com/media/e2a619_36bddf278146410383fb33178447f9cd~mv2.jpg/v1/crop/x_0,y_23,w_328,h_492/fill/w_390,h_519,al_c,lg_1,q_80,enc_avif,quality_auto/cesped-ceibos_edited.jpg";

const COMITE_CEIBOS_LOGO = "https://static.wixstatic.com/media/e2a619_984fb39776d74156a61ed7cce5c34d59~mv2.png/v1/crop/x_0,y_31,w_3858,h_1457/fill/w_224,h_85,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo-comite-ceibos%20blanco.png";
const TEATRO_LOGO = "https://static.wixstatic.com/media/720b25_581607db5a6c403188b7b6a7edc5db7d~mv2.png/v1/fill/w_149,h_85,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo-Teatro-Centro-de-Arte.png";

const LEVELS = [
  {
    id: "primaria",
    title: "Primaria C. Ceibos",
    subtitle: "Inicial a 7mo EGB",
    age: "3 a 12 años",
    description: "Somos un grupo conformado por familias, aprendices y un equipo pedagógico que acompañan a los niños en su desarrollo integral, a través de una confluencia entre las metodologías activas Waldorf y Aprendizaje Basado en Proyectos para alcanzar aprendizajes significativos para la vida.",
    methodology: "Utilizamos un enfoque de metodologías activas en las que confluyen la pedagogía Waldorf con el método de Aprendizaje Basado en Proyectos (A.B.P); las cuales se conectan para desarrollar habilidades académicas y sociales.",
    features: [
      "Metodología Waldorf y ABP",
      "4 días en el Comité Los Ceibos",
      "1 día en el Teatro Centro de Arte",
      "Desarrollo integral desde inicial"
    ],
    locations: [
      { name: "Comité Los Ceibos", address: "Av. Carlos Arroyo del Rio 803", days: "4 días", logo: COMITE_CEIBOS_LOGO },
      { name: "Teatro Centro de Arte", address: "Km 4.5, Av. Pdte. Carlos Julio Arosemena", days: "1 día", logo: TEATRO_LOGO }
    ],
    icon: School,
    image: PRIMARIA_IMG
  },
  {
    id: "egb",
    title: "EGB Superior",
    subtitle: "8vo a 10mo EGB",
    age: "12 a 14 años",
    description: "Implementamos el ABP (Aprendizaje basado en Proyectos) durante los 3 primeros años de colegio. Consiste en aprender en contextos reales para solucionar retos y desafíos mediante proyectos interdisciplinarios que integran diversas destrezas académicas.",
    methodology: "El aprendizaje se centra en proyectos reales que conectan las materias académicas con situaciones del mundo real, preparando a los estudiantes para los desafíos del bachillerato técnico.",
    features: [
      "Aprendizaje Basado en Proyectos (ABP)",
      "Proyectos interdisciplinarios",
      "Matemáticas y Ciencias Naturales integradas",
      "Ciencias Sociales y Lenguaje integrados"
    ],
    icon: BookOpen,
    image: EGB_IMG
  },
  {
    id: "bachillerato",
    title: "Bachillerato Técnico",
    subtitle: "1ro y 2do de Bachillerato",
    age: "15 a 17 años",
    description: "Formación técnica profesional que combina educación teórica con preparación práctica. Los estudiantes desarrollan competencias en comercialización y ventas mientras continúan su formación académica integral.",
    methodology: "Educación técnica con enfoque en desarrollo de competencias profesionales, preparando a los estudiantes para la Formación Dual en su último año de bachillerato.",
    features: [
      "Formación técnica en Comercialización y Ventas",
      "Base teórica sólida",
      "Desarrollo de competencias profesionales",
      "Preparación para Formación Dual"
    ],
    icon: GraduationCap,
    image: BACHILLERATO_IMG
  },
  {
    id: "productivo",
    title: "Bachillerato Técnico Productivo",
    subtitle: "3ro de Bachillerato - Formación Dual",
    age: "17 a 18 años",
    description: "Implementamos la Formación Dual Alemana: 2 días de formación teórica en el colegio y 3 días de formación práctica en empresas formadoras, graduándose como Bachilleres Técnicos en Comercialización y Ventas.",
    methodology: "El modelo de Formación Dual alemán permite a los estudiantes aprender directamente en el entorno laboral mientras completan su formación académica, asegurando experiencia real y empleabilidad inmediata.",
    features: [
      "Formación Dual Alemana",
      "3 días de práctica en empresas reales",
      "2 días de formación teórica",
      "Título de Bachiller Técnico en Ventas"
    ],
    icon: Briefcase,
    image: PRODUCTIVO_IMG
  },
  {
    id: "idiomas",
    title: "Idiomas y Convenios",
    subtitle: "Programas Complementarios",
    age: "Todos los niveles",
    description: "Ofrecemos formación en idiomas con certificaciones internacionales y convenios con instituciones educativas de prestigio que amplían las oportunidades de nuestros estudiantes.",
    methodology: "La educación bilingüe y trilingüe forma parte integral de nuestra propuesta, con inmersión progresiva en inglés y alemán, respaldada por certificaciones oficiales.",
    features: [
      "Inglés intensivo desde inicial",
      "Alemán desde 8vo de básica",
      "Certificaciones internacionales",
      "Convenios con universidades"
    ],
    icon: Globe,
    image: IDIOMAS_IMG
  }
];

export function OfertaAcademica() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="font-heading text-4xl font-bold mb-4">Oferta Académica</h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Desde los primeros pasos hasta la graduación, acompañamos a tus hijos con una educación de calidad internacional.
          </p>
        </div>
      </div>

      <main className="flex-grow">
        <Section>
          <Tabs defaultValue="primaria" className="w-full">
            <div className="flex justify-center mb-12 overflow-x-auto pb-2">
              <TabsList className="flex flex-wrap justify-center gap-1 h-auto p-2 bg-slate-100 rounded-xl">
                {LEVELS.map((level) => (
                  <TabsTrigger 
                    key={level.id}
                    value={level.id} 
                    className="py-3 px-4 text-sm whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg"
                  >
                    {level.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {LEVELS.map((level) => (
              <TabsContent key={level.id} value={level.id} className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Hero Banner */}
                <div className="relative rounded-2xl overflow-hidden mb-12 h-64 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
                  <img 
                    src={level.image} 
                    alt={level.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 z-20 flex items-center">
                    <div className="container-custom text-white">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm mb-4">
                        <level.icon className="h-4 w-4" />
                        {level.age}
                      </div>
                      <h2 className="font-heading text-3xl md:text-5xl font-bold mb-2">{level.title}</h2>
                      <p className="text-lg md:text-xl text-white/90">{level.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div>
                    <h3 className="font-heading text-2xl font-bold mb-4 text-slate-900">¿Quiénes somos?</h3>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                      {level.description}
                    </p>
                    
                    <h3 className="font-heading text-xl font-bold mb-4 text-slate-900">Metodología</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      {level.methodology}
                    </p>

                    {level.locations && (
                      <div className="space-y-4 mb-8">
                        <h3 className="font-heading text-xl font-bold text-slate-900">Nuestras Sedes</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {level.locations.map((loc, i) => (
                            <div key={i} className="bg-slate-800 text-white p-5 rounded-xl">
                              <img src={loc.logo} alt={loc.name} className="h-12 mb-4 object-contain" />
                              <p className="font-bold text-2xl mb-1">{loc.days}</p>
                              <p className="font-medium">{loc.name}</p>
                              <p className="text-sm text-slate-300">{loc.address}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl mb-6 text-slate-900">Lo que nos diferencia</h3>
                    <div className="space-y-4">
                      {level.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <Check className="h-5 w-5 text-green-600" />
                          </div>
                          <span className="text-slate-700 font-medium text-lg">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                      <Link href="/admisiones">
                        <Button size="lg" className="w-full sm:w-auto">Solicitar Cupo</Button>
                      </Link>
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">Descargar Malla Curricular</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
