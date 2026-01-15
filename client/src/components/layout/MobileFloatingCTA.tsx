import { Button } from "@/components/ui/button";
import { Phone, CalendarDays } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function MobileFloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50 md:hidden flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
        >
          <a href="https://wa.me/593991234567" target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" className="w-full gap-2 border-primary text-primary hover:bg-primary/5">
              <Phone className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
          <Link href="/admisiones" className="flex-1">
            <Button className="w-full gap-2 shadow-md">
              <CalendarDays className="h-4 w-4" />
              Agendar Visita
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
