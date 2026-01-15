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

export const ACADEMIC_OFFER = [
  {
    id: "primaria",
    title: "Educación General Básica",
    description: "Formación integral desde los primeros años, fomentando la curiosidad y el aprendizaje activo.",
    icon: BookOpen,
    image: egbImg,
    link: "/oferta-academica#egb"
  },
  {
    id: "bachillerato",
    title: "Bachillerato",
    description: "Preparación académica rigurosa con enfoque en ciencias y humanidades para el ingreso universitario.",
    icon: GraduationCap,
    image: bachiImg,
    link: "/oferta-academica#bachillerato"
  },
  {
    id: "dual",
    title: "Formación Dual",
    description: "Aprende haciendo. Combina teoría en el aula con práctica real en empresas asociadas.",
    icon: Briefcase,
    image: dualImg,
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
