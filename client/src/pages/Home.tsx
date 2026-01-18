import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Testimonials } from "@/components/home/Testimonials";
import { MobileFloatingCTA } from "@/components/layout/MobileFloatingCTA";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { USP_POINTS, ACADEMIC_OFFER, STATS, NEWS_HIGHLIGHTS } from "@/lib/data";
import { ArrowRight, PlayCircle, FileText, LayoutGrid, BookOpen, Briefcase } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Gallery images
const GALLERY_IMAGES = [
  "https://static.wixstatic.com/media/e2a619_536198d18d014e7ea62e6eb275dc398e~mv2.png",
  "https://static.wixstatic.com/media/e2a619_cac267b654fc4eee9ffaba234e405ffb~mv2.jpg",
  "https://static.wixstatic.com/media/e2a619_419d60265bfb4b258520a630022541dc~mv2.jpg",
  "https://static.wixstatic.com/media/e2a619_4a082129c8fa45b4b7dc89855511b7c6~mv2.jpg",
];

export function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Stats Section - Floating */}
        <div className="border-b bg-background relative z-20 -mt-0 shadow-sm">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border border-x border-border">
              {STATS.map((stat, i) => (
                <div key={i} className="py-8 md:py-12 px-4 text-center group hover:bg-muted/30 transition-colors cursor-default">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* USP / Methodology Section */}
        <Section className="bg-primary text-white">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Por qué elegir Colegio Dual?
            </h2>
            <p className="text-lg text-red-100">
              Nuestra metodología rompe con el esquema tradicional. No solo enseñamos teoría, formamos competencias para la vida real.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {USP_POINTS.map((usp, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <usp.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3">{usp.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {usp.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Academic Offer */}
        <Section>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Nuestra Oferta</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">
                Formación integral en cada etapa
              </h2>
            </div>
            <Link href="/oferta-academica">
              <Button variant="outline" asChild className="hidden md:flex group">
                <a className="flex items-center">
                  Ver toda la oferta <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {ACADEMIC_OFFER.map((offer, i) => (
              <motion.div key={offer.id} variants={fadeIn}>
                <Link href={offer.link}>
                  <div className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 md:opacity-90 transition-opacity" />
                    
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4">
                        <offer.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-white mb-2">{offer.title}</h3>
                      <p className="text-slate-200 text-sm mb-6 line-clamp-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {offer.description}
                      </p>
                      <Button variant="secondary" asChild className="w-full font-semibold">
                        <a className="flex items-center justify-center">Conoce más</a>
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* How and Where We Learn Section */}
        <Section background="muted" className="overflow-hidden">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">¿Cómo y dónde se aprende?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Nuestro programa formativo se extiende más allá del aula tradicional en diversas sedes aliadas.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://static.wixstatic.com/media/e2a619_536198d18d014e7ea62e6eb275dc398e~mv2.png" 
                  className="w-full h-full object-cover" 
                  alt="Video thumbnail"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                  <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">EGB Superior</h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">Aprendizaje basado en proyectos reales e interdisciplinarios.</p>
                    <Link href="/oferta-academica#egb">
                      <Button variant="link" className="p-0 text-primary font-bold h-auto">Conoce más <ArrowRight className="ml-1 w-4 h-4" /></Button>
                    </Link>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Bachillerato</h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">Formación Dual con 3 días de práctica empresarial semanal.</p>
                    <Link href="/oferta-academica#bachillerato">
                      <Button variant="link" className="p-0 text-primary font-bold h-auto">Conoce más <ArrowRight className="ml-1 w-4 h-4" /></Button>
                    </Link>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Código de Convivencia</h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">Normas que garantizan un ambiente de respeto y crecimiento.</p>
                    <Button variant="link" className="p-0 text-primary font-bold h-auto">Conoce más <ArrowRight className="ml-1 w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <span className="text-xl font-bold text-slate-400">ESPOL</span>
               <span className="text-xl font-bold text-slate-400">Comité Ceibos</span>
               <span className="text-xl font-bold text-slate-400">Teatro Centro de Arte</span>
            </div>
          </div>
        </Section>

        {/* Minimalist Gallery Section */}
        <Section className="bg-white">
          <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Vivir Colegio Dual</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Galería de Momentos</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
              >
                <img src={img} alt={`Gallery item ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <LayoutGrid className="text-white w-8 h-8 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="rounded-full px-8">Explorar Galería Completa</Button>
          </div>
        </Section>

        {/* WDA Section - Cerca de Alemania */}
        <Section background="muted">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Cerca de Alemania!</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Asociación Mundial de Escuelas Alemanas</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Formamos parte de la Asociación Mundial de Escuelas Alemanas en el Extranjero (WDA), que representa a las autoridades escolares libres y sin fines de lucro de las escuelas alemanas en el extranjero y combina sus voces individuales en una voz fuerte.
                </p>
                <Button asChild className="font-semibold">
                  <a 
                    href="https://www.auslandsschulnetz.de/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Más información <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <img 
                  src="https://static.wixstatic.com/media/720b25_50f74d3bc5c74c68a10b48c57e2e3e5e~mv2.png/v1/fill/w_440,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/wda-logo-print-transparent.png" 
                  alt="WDA Logo - Asociación Mundial de Escuelas Alemanas" 
                  className="max-w-[300px] w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Testimonials */}
        <Testimonials />

        {/* News Section */}
        <Section background="muted">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-heading text-3xl font-bold">Noticias Recientes</h2>
            <Link href="/noticias">
              <Button variant="link" asChild className="text-primary font-medium hover:underline flex items-center gap-1 group">
                <a className="flex items-center gap-1">
                  Ver todas <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {NEWS_HIGHLIGHTS.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none group cursor-pointer h-full flex flex-col">
                <div className="aspect-video relative bg-slate-200 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase shadow-sm">
                    {news.category}
                  </div>
                </div>
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="text-sm text-muted-foreground mb-3">{news.date}</div>
                  <h3 className="font-heading font-bold text-lg leading-tight mb-2 hover:text-primary transition-colors cursor-pointer flex-grow">
                    {news.title}
                  </h3>
                  <div className="pt-4 mt-auto">
                    <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Leer más <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* CTA Final */}
        <Section className="bg-primary text-white text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6 relative z-10"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-red-100 text-lg md:text-xl">
              Agenda una visita guiada o inicia el proceso de admisión en línea hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/admisiones">
                <Button size="lg" variant="secondary" asChild className="h-14 px-8 text-lg shadow-xl hover:scale-105 transition-transform">
                  <a className="flex items-center justify-center">Iniciar Admisión</a>
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Contactar Asesor
              </Button>
            </div>
          </motion.div>
        </Section>
      </main>

      <Footer />
      <MobileFloatingCTA />
    </div>
  );
}
