import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { GALLERY_IMAGES } from "@/lib/data";
import { LayoutGrid, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useWordPress } from "@/hooks/use-wordpress";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Gallery() {
  const { data: wpPage, isLoading } = useWordPress("home");

  const images = wpPage?.images && wpPage.images.length > 0 ? wpPage.images : GALLERY_IMAGES;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="flex-grow pt-24 pb-20">
        <Section>
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <div>
                <Link href="/">
                  <a className="inline-flex items-center text-primary font-medium hover:underline mb-4 group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Volver al Inicio
                  </a>
                </Link>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900">
                  Galería de Momentos
                </h1>
                <p className="text-slate-600 mt-4 max-w-2xl">
                  Explora nuestra comunidad a través de imágenes que capturan la esencia del aprendizaje dual y la vida escolar en Colegio Dual.
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ delay: (i % 8) * 0.1 }}
                    className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
                  >
                    <img
                      src={img}
                      alt={`Gallery item ${i}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <LayoutGrid className="text-white w-10 h-10 scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
