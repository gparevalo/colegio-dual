import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { NEWS_HIGHLIGHTS } from "@/lib/data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Noticias() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-slate-50 border-b py-12">
        <div className="container-custom">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Noticias y Eventos</h1>
          <div className="flex max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input className="pl-10 bg-white" placeholder="Buscar noticias..." />
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <Section>
          <div className="grid md:grid-cols-3 gap-8">
            {NEWS_HIGHLIGHTS.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none group cursor-pointer">
                <div className="aspect-video relative bg-slate-200 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                    {news.category}
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-3">{news.date}</div>
                  <h3 className="font-heading font-bold text-xl leading-tight mb-3 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                  </p>
                  <span className="text-primary text-sm font-medium mt-4 inline-block hover:underline">Leer más →</span>
                </CardContent>
              </Card>
            ))}
             {/* Duplicate for grid filler */}
             {NEWS_HIGHLIGHTS.map((news) => (
              <Card key={`${news.id}-dup`} className="overflow-hidden hover:shadow-lg transition-shadow border-none group cursor-pointer">
                <div className="aspect-video relative bg-slate-200 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                    {news.category}
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-3">{news.date}</div>
                  <h3 className="font-heading font-bold text-xl leading-tight mb-3 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                  </p>
                  <span className="text-primary text-sm font-medium mt-4 inline-block hover:underline">Leer más →</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
