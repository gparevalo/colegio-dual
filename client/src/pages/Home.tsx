import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { USP_POINTS, ACADEMIC_OFFER, STATS, NEWS_HIGHLIGHTS } from "@/lib/data";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Stats Section - Floating */}
        <div className="border-b bg-background relative z-20 -mt-0">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border border-x border-border">
              {STATS.map((stat, i) => (
                <div key={i} className="py-8 md:py-12 px-4 text-center group hover:bg-muted/30 transition-colors">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
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
        <Section className="bg-slate-50">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ¿Por qué elegir Colegio Dual?
            </h2>
            <p className="text-lg text-slate-600">
              Nuestra metodología rompe con el esquema tradicional. No solo enseñamos teoría, formamos competencias para la vida real.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {USP_POINTS.map((usp, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
            ))}
          </div>
        </Section>

        {/* Academic Offer */}
        <Section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Nuestra Oferta</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">
                Formación integral en cada etapa
              </h2>
            </div>
            <Link href="/oferta-academica">
              <Button variant="outline" className="hidden md:flex">
                Ver toda la oferta <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ACADEMIC_OFFER.map((offer) => (
              <div key={offer.id} className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4]">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 md:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                  <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4">
                    <offer.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">{offer.title}</h3>
                  <p className="text-slate-200 text-sm mb-6 line-clamp-3">
                    {offer.description}
                  </p>
                  <Link href={offer.link}>
                    <Button variant="secondary" className="w-full">
                      Más Información
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/oferta-academica">
              <Button variant="outline" className="w-full">
                Ver toda la oferta <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Section>

        {/* News Section */}
        <Section background="muted">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-heading text-3xl font-bold">Noticias Recientes</h2>
            <Link href="/noticias">
              <a className="text-primary font-medium hover:underline">Ver todas</a>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {NEWS_HIGHLIGHTS.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none">
                <div className="aspect-video relative bg-slate-200">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                    {news.category}
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-3">{news.date}</div>
                  <h3 className="font-heading font-bold text-lg leading-tight mb-2 hover:text-primary transition-colors cursor-pointer">
                    {news.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* CTA Final */}
        <Section className="bg-primary text-white text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-heading text-3xl md:text-5xl font-bold">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl">
              Agenda una visita guiada o inicia el proceso de admisión en línea hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/admisiones">
                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg shadow-xl">
                  Iniciar Admisión
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Contactar Asesor
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
