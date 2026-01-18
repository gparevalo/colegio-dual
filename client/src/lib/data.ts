import { GraduationCap, BookOpen, Users, Briefcase, Award, Globe, Lightbulb, UserCheck } from "lucide-react";

// Import images
import egbImg from "@assets/stock_images/white_children_playi_d8947c72.jpg";
import bachiImg from "@assets/stock_images/group_of_white_stude_65d22834.jpg";
import dualImg from "@assets/stock_images/white_student_intern_c789d72b.jpg";
import labImg from "@assets/stock_images/white_students_in_hi_5677747e.jpg";
import projectImg from "@assets/stock_images/white_students_prese_6afdb250.jpg";
import admissionImg from "@assets/stock_images/happy_white_students_451c11b5.jpg";

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  { label: "Oferta Académica", href: "/oferta-academica" },
  { label: "Propuesta de Formación", href: "/propuesta" },
  { label: "Noticias", href: "/noticias" },
  { label: "Contacto", href: "/contacto" },
];

const ABP_IMG = "https://static.wixstatic.com/media/720b25_c97aad897d8f4bebbc298fa427e7e726~mv2.png/v1/crop/x_1643,y_580,w_2720,h_3420/fill/w_538,h_678,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_9258edit.png";
const DUAL_BACH_IMG = "https://static.wixstatic.com/media/720b25_b3d85a88628d44528d40a8d467f1767d~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90,enc_avif,quality_auto/720b25_b3d85a88628d44528d40a8d467f1767d~mv2.png";

export const ACADEMIC_OFFER = [
  {
    id: "egb-superior",
    title: "Aprendizaje por proyectos",
    description: "Implementamos el ABP (Aprendizaje basado en Proyectos) durante los 3 primeros años de colegio. Los estudiantes aprenden en contextos reales para solucionar retos y desafíos mediante proyectos interdisciplinarios por bloque.",
    icon: BookOpen,
    image: ABP_IMG,
    link: "/oferta-academica#egb"
  },
  {
    id: "bachillerato",
    title: "Bachillerato - Formación Dual",
    description: "Implementamos la Formación técnica profesional. En 3ro de Bachillerato realizan formación práctica en empresas formadoras (3 días) y teórica en el colegio (2 días), graduándose como Bachilleres Técnicos.",
    icon: Briefcase,
    image: DUAL_BACH_IMG,
    link: "/oferta-academica#bachillerato"
  }
];

export const USP_POINTS = [
  {
    icon: Lightbulb,
    title: "Metodología ABP",
    description: "Aprendizaje Basado en Proyectos. Los estudiantes resuelven problemas reales, desarrollando pensamiento crítico."
  },
  {
    icon: Globe,
    title: "Visión Internacional",
    description: "Colegio binacional ecuatoriano-alemán que abre puertas al mundo y fomenta el intercambio cultural."
  },
  {
    icon: Briefcase,
    title: "Formación Dual",
    description: "Experiencia profesional temprana. Conectamos la educación con el sector productivo."
  },
  {
    icon: UserCheck,
    title: "Formación Integral",
    description: "No solo formamos académicos, sino ciudadanos con valores, ética y responsabilidad social."
  }
];

export const STATS = [
  { value: "30+", label: "Años de Experiencia" },
  { value: "500+", label: "Estudiantes" },
  { value: "100%", label: "Graduados Universitarios" },
  { value: "20+", label: "Empresas Aliadas" }
];

export const NEWS_HIGHLIGHTS = [
  {
    id: 1,
    title: "Inauguración del nuevo laboratorio de ciencias",
    date: "15 Ene, 2026",
    category: "Institucional",
    image: labImg
  },
  {
    id: 2,
    title: "Estudiantes de bachillerato presentan proyectos finales",
    date: "10 Dic, 2025",
    category: "Académico",
    image: projectImg
  },
  {
    id: 3,
    title: "Abiertas las inscripciones para el periodo 2026-2027",
    date: "01 Nov, 2025",
    category: "Admisiones",
    image: admissionImg
  }
];
