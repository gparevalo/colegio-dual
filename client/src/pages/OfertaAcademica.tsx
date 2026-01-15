import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, BookOpen, GraduationCap, Microscope, Palette, Globe, Users } from "lucide-react";
import { Link } from "wouter";
import inicialImg from "@assets/stock_images/kindergarten_student_bb6106e3.jpg";
import egbImg from "@assets/stock_images/elementary_school_st_e02208ee.jpg";
import bachiImg from "@assets/stock_images/high_school_students_78f1f22b.jpg";

const LEVELS = [
  {
    id: "inicial",
    title: "Inicial y Preparatoria",
    age: "3 a 5 años",
    description: "Un entorno seguro y estimulante donde el juego es el motor del aprendizaje. Fomentamos la autonomía, la motricidad y las primeras habilidades sociales.",
    features: ["Inmersión temprana al inglés", "Estimulación sensorial", "Desarrollo socio-emocional", "Espacios de aprendizaje lúdico"],
    icon: Palette,
    image: inicialImg
  },
  {
    id: "egb",
    title: "Educación General Básica",
    age: "6 a 14 años",
    description: "Consolidamos las bases académicas con metodología ABP. Los estudiantes aprenden investigando y creando, desarrollando pensamiento crítico.",
    features: ["Aprendizaje Basado en Proyectos", "Inglés intensivo (certificación Cambridge)", "Robótica y programación básica", "Deportes y arte"],
    icon: BookOpen,
    image: egbImg
  },
  {
    id: "bachillerato",
    title: "Bachillerato",
    age: "15 a 18 años",
    description: "Preparación pre-universitaria de alto nivel. Ofrecemos Bachillerato Técnico y en Ciencias, con opción a certificación de suficiencia en Alemán.",
    features: ["Formación Dual (Prácticas empresariales)", "Bachillerato Técnico en Administración", "Orientación vocacional", "Convenios universitarios"],
    icon: GraduationCap,
    image: bachiImg
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
          <Tabs defaultValue="inicial" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-3 h-auto p-1 bg-slate-100">
                <TabsTrigger value="inicial" className="py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Inicial</TabsTrigger>
                <TabsTrigger value="egb" className="py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">EGB</TabsTrigger>
                <TabsTrigger value="bachillerato" className="py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Bachillerato</TabsTrigger>
              </TabsList>
            </div>

            {LEVELS.map((level) => (
              <TabsContent key={level.id} value={level.id} className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                      <level.icon className="h-4 w-4" />
                      {level.age}
                    </div>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-slate-900">{level.title}</h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                      {level.description}
                    </p>
                    
                    <h3 className="font-bold text-lg mb-4">Lo que nos diferencia:</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {level.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-slate-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10">
                      <Link href="/admisiones">
                        <Button size="lg" className="mr-4">Solicitar Cupo</Button>
                      </Link>
                      <Button variant="outline" size="lg">Descargar Malla Curricular</Button>
                    </div>
                  </div>
                  
                  <div className="order-1 md:order-2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square md:aspect-[4/5] bg-slate-200">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-multiply z-10" />
                      <img 
                        src={level.image} 
                        alt={level.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Section>
        
        {/* Complementary Offer */}
        <Section background="muted">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">Más allá del aula</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complementamos la formación académica con actividades que desarrollan el carácter y los talentos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Globe className="h-5 w-5 text-primary" />
                   Idiomas
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 Inglés intensivo desde inicial y Alemán desde 8vo de básica. Preparación para certificaciones internacionales.
               </CardContent>
             </Card>
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Microscope className="h-5 w-5 text-primary" />
                   Clubes
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 Robótica, Ajedrez, Artes Plásticas, Fútbol, Baloncesto, Música y Periodismo Escolar.
               </CardContent>
             </Card>
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Users className="h-5 w-5 text-primary" />
                   Pastoral
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 Formación en valores, retiros espirituales y proyectos de ayuda social comunitaria.
               </CardContent>
             </Card>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
