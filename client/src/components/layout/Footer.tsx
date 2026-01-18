import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="https://static.wixstatic.com/media/e2a619_9b518fdc457d4856af0d8f7b13c6760a~mv2.png/v1/crop/x_0,y_825,w_3000,h_1350/fill/w_440,h_198,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Duale%20Schule%20sin%20hz_Mesa%20de%20trabajo%201_Mesa%20de%20trabajo%201_edited.png" 
                alt="Colegio Dual Logo" 
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Formando líderes con visión global a través de la metodología "Aprender Haciendo". Excelencia académica ecuatoriano-alemana.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/admisiones">
                  <a className="hover:text-primary-foreground transition-colors">Proceso de Admisión</a>
                </Link>
              </li>
              <li>
                <Link href="/oferta-academica">
                  <a className="hover:text-primary-foreground transition-colors">Oferta Académica</a>
                </Link>
              </li>
              <li>
                <Link href="/propuesta">
                  <a className="hover:text-primary-foreground transition-colors">Metodología Dual</a>
                </Link>
              </li>
              <li>
                <Link href="/noticias">
                  <a className="hover:text-primary-foreground transition-colors">Noticias y Eventos</a>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">Trabaja con nosotros</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Contacto - Admisiones</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>
                  Campus ESPOL Km 30.5<br />
                  Vía Perimetral
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+593 99 512 1024</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>admisiones@humboldt.edu.ec</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>cobranzas@humboldt.edu.ec</span>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Horario de Atención</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p>
                <span className="block text-white font-medium">Secretaría General:</span>
                Lunes a Viernes: 7:30 - 15:30
              </p>
              <p>
                <span className="block text-white font-medium">Admisiones:</span>
                Lunes a Viernes: 8:00 - 16:30
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Colegio Dual. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
