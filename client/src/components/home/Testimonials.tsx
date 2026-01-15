import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "La metodología ABP ha transformado la forma en que mis hijos aprenden. Ya no solo memorizan, entienden el porqué de las cosas.",
    author: "María Augusta P.",
    role: "Madre de Familia",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"
  },
  {
    quote: "Gracias a la formación dual, tuve mi primera experiencia laboral antes de graduarme. Entré a la universidad con una ventaja competitiva enorme.",
    author: "Sebastián M.",
    role: "Exalumno, Promoción 2023",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"
  },
  {
    quote: "El ambiente internacional y el aprendizaje del idioma alemán abrieron las puertas para que mi hija estudie en Europa.",
    author: "Roberto C.",
    role: "Padre de Familia",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Testimonios</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">
            Lo que dice nuestra comunidad
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow bg-white relative">
                <CardContent className="pt-10 px-8 pb-8">
                  <div className="absolute top-6 left-8 text-primary/10">
                    <Quote className="h-12 w-12" />
                  </div>
                  
                  <p className="text-slate-600 mb-6 relative z-10 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <img 
                      src={t.image} 
                      alt={t.author} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.author}</h4>
                      <span className="text-xs text-primary font-medium">{t.role}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
