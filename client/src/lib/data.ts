import { GraduationCap, BookOpen, Users, Briefcase, Award, Globe, Lightbulb, UserCheck } from "lucide-react";

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  { label: "Oferta Académica", href: "/oferta-academica" },
  { label: "Propuesta de Formación", href: "/propuesta" },
  { label: "Noticias", href: "/noticias" },
];

export const ACADEMIC_OFFER = [
  {
    id: "primaria",
    title: "Educación General Básica",
    description: "Formación integral desde los primeros años, fomentando la curiosidad y el aprendizaje activo.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80",
    link: "/oferta-academica#egb"
  },
  {
    id: "bachillerato",
    title: "Bachillerato",
    description: "Preparación académica rigurosa con enfoque en ciencias y humanidades para el ingreso universitario.",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
    link: "/oferta-academica#bachillerato"
  },
  {
    id: "dual",
    title: "Formación Dual",
    description: "Aprende haciendo. Combina teoría en el aula con práctica real en empresas asociadas.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    link: "/propuesta#dual"
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
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Estudiantes de bachillerato presentan proyectos finales",
    date: "10 Dic, 2025",
    category: "Académico",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Abiertas las inscripciones para el periodo 2026-2027",
    date: "01 Nov, 2025",
    category: "Admisiones",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
  }
];
