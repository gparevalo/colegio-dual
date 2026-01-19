import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, FileText, Calendar, Users, ClipboardCheck } from "lucide-react";
const HERO_BG = "https://static.wixstatic.com/media/720b25_70b4342db8374620ab3b435f99d4fd64~mv2.jpg/v1/fill/w_2914,h_1520,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/720b25_70b4342db8374620ab3b435f99d4fd64~mv2.jpg";

export function Admisiones() {
  const steps = [
    {
      icon: FileText,
      title: "1. Solicitud y Documentación",
      description: "Llena el formulario en línea y sube los documentos básicos (partida de nacimiento, últimas libretas de calificaciones).",
      duration: "1-2 días"
    },
    {
      icon: Users,
      title: "2. Entrevista Familiar",
      description: "Una conversación con el departamento de consejería estudiantil (DECE) para conocer a la familia y al estudiante.",
      duration: "Presencial / Zoom"
    },
    {
      icon: ClipboardCheck,
      title: "3. Evaluaciones",
      description: "Pruebas académicas y psicopedagógicas adaptadas al nivel de ingreso del aspirante.",
      duration: "1 mañana"
    },
    {
      icon: CheckCircle2,
      title: "4. Matriculación",
      description: "Una vez admitido, recibirás la carta de aceptación y los pasos para el pago de matrícula.",
      duration: "Inmediato"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <img 
          src={HERO_BG} 
          alt="Admisiones" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
        
        <div className="container-custom relative z-10 text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Admisiones 2026-2027</h1>
          <p className="text-xl text-slate-300">
            Únete a nuestra comunidad educativa. Buscamos familias comprometidas con una educación innovadora y humana.
          </p>
        </div>
      </div>

      <main className="flex-grow">
        {/* Proceso */}
        <Section>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold mb-4 text-primary">Proceso de Admisión</h2>
            <p className="text-muted-foreground">Sigue estos 4 pasos sencillos para ser parte de Colegio Dual.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10" />
            
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="h-24 w-24 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-primary mb-6 shadow-sm group-hover:border-primary/20 group-hover:scale-110 transition-all duration-300 relative z-10">
                  <step.icon className="h-10 w-10" />
                </div>
                <div className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {step.duration}
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="h-14 px-10 text-lg shadow-xl hover:scale-105 transition-transform">
              <a href="https://wa.me/593995121024?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20el%20proceso%20de%20admisi%C3%B3n" target="_blank" rel="noopener noreferrer">
                Llenar Formulario de Solicitud
              </a>
            </Button>
          </div>
        </Section>

        {/* Requisitos y Costos */}
        <Section background="muted">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">Requisitos Básicos</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {[
                      "Copia de cédula del estudiante y representantes",
                      "Libreta de calificaciones del año anterior",
                      "Certificado de no adeudar en la institución anterior",
                      "Formulario de datos personales completo",
                      "Entrevista con el DECE aprobada"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-700">
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">Preguntas Frecuentes</h2>
              <Accordion type="single" collapsible className="w-full bg-white rounded-lg shadow-sm">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6">¿Cuándo inician las inscripciones?</AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-slate-600">
                    Las inscripciones ordinarias inician en Octubre para el periodo lectivo siguiente. Sin embargo, recibimos solicitudes durante todo el año sujetas a disponibilidad de cupos.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6">¿Tienen servicio de transporte?</AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-slate-600">
                    Sí, contamos con servicio de transporte puerta a puerta que cubre los valles de Tumbaco, Cumbayá y norte de Quito.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-6">¿Cuál es el costo de la matrícula?</AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-slate-600">
                    Para información detallada sobre costos de matrícula y pensiones, por favor descarga nuestro tarifario actualizado o contacta a admisiones.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
