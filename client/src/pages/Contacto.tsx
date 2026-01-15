import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor ingrese un correo válido."),
  phone: z.string().min(10, "Ingrese un número de teléfono válido."),
  subject: z.string().min(5, "El asunto es requerido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export function Contacto() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Nos pondremos en contacto pronto.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-slate-900 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl text-slate-300">
            Estamos aquí para resolver tus dudas.
          </p>
        </div>
      </div>

      <main className="flex-grow">
        <Section>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">Información de Contacto</h2>
                <div className="grid gap-6">
                  <Card className="border-none shadow-sm bg-slate-50">
                    <CardContent className="flex items-start gap-4 p-6">
                      <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">Ubicación</h3>
                        <p className="text-slate-600">Av. Interoceánica Km 14.5, Tumbaco, Quito - Ecuador</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-sm bg-slate-50">
                    <CardContent className="flex items-start gap-4 p-6">
                      <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">Teléfonos</h3>
                        <p className="text-slate-600">+593 2 123 4567 / +593 99 123 4567</p>
                        <p className="text-sm text-slate-500 mt-1">Atención Lunes a Viernes</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm bg-slate-50">
                    <CardContent className="flex items-start gap-4 p-6">
                      <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">Correo Electrónico</h3>
                        <p className="text-slate-600">info@colegiodual.com</p>
                        <p className="text-slate-600">admisiones@colegiodual.com</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-slate-200 rounded-xl overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium">
                   Mapa de Google Maps
                 </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">Envíanos un mensaje</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Juan Pérez" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="099..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="juan@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asunto</FormLabel>
                        <FormControl>
                          <Input placeholder="Información sobre..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Escribe tu mensaje aquí..." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full">
                    Enviar Mensaje
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
