
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactModal } from "@/components/contact-modal";
import { FadeIn } from "@/components/fade-in";
import { SectionSeparator } from "@/components/section-separator";
import Link from 'next/link';

export default function BrandingPage() {

    const brandingServices = [
        {
            value: "item-1",
            title: "Identidad Visual Básica",
            includes: [
                "Creación del logotipo principal: Diseñamos el símbolo de tu marca, con sus variantes para que se vea bien en cualquier lugar.",
                "Paleta de colores: Definimos los colores que representarán la personalidad de tu negocio.",
                "Selección de tipografía: Elegimos las fuentes que usarás en tu comunicación."
            ],
            benefits: [
                "Para que tu negocio se vea profesional desde el primer día.",
                "Para que tus clientes te reconozcan y recuerden fácilmente.",
                "Para unificar la apariencia de tu marca en todos los canales."
            ]
        },
        {
            value: "item-2",
            title: "Branding Completo",
            includes: [
                "Todo lo de la Identidad Visual Básica.",
                "Manual de marca: Documento guía para mantener la coherencia visual.",
                "Assets visuales: Iconos, patrones y otros gráficos para tu marca.",
                "Estrategia visual: Definimos cómo debe verse tu marca para conectar con tu público."
            ],
            benefits: [
                "Para diferenciarte de la competencia con una marca única.",
                "Para asegurar consistencia en todos los puntos de contacto.",
                "Para tener las herramientas para crecer de forma profesional."
            ]
        },
        {
            value: "item-3",
            title: "Branding + Estrategia de Comunicación",
            includes: [
                "Todo lo del Branding Completo.",
                "Naming (si aplica): Te ayudamos a crear un nombre memorable.",
                "Estrategia de comunicación: Definimos la voz, el tono y el mensaje de tu marca.",
                "Piezas de comunicación: Diseñamos plantillas y otros materiales de lanzamiento."
            ],
            benefits: [
                "Para construir una marca con propósito que conecte emocionalmente.",
                "Para tener una guía clara sobre qué y cómo comunicar.",
                "Para que cada acción de marketing fortalezca tu marca."
            ]
        }
    ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate bg-card/40 pt-32 pb-20 md:pt-40 md:pb-24">
          <SectionSeparator position="top" align="left" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <FadeIn>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">Branding y Diseño Gráfico</h1>
                    <p className="mt-4 text-muted-foreground">Nuestros servicios de branding y diseño gráfico van más allá de lo convencional. Comprendemos que la identidad visual es <strong>clave para el éxito de tu marca</strong>, por lo que colaboramos contigo para forjar una <strong>imagen distintiva e inolvidable.</strong></p>
                    <p className="mt-4 text-muted-foreground">Tu marca es más que un logo; es la primera experiencia de tu cliente. Nos ocupamos de todos los detalles, desde la paleta de colores hasta la <strong>comunicación visual unificada</strong>. El objetivo es que tu marca destaque visualmente en cada punto de contacto.</p>
                </FadeIn>
                <FadeIn delay={0.2}>
                     <div className="w-full h-80 bg-card rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Aquí va una imagen</p>
                    </div>
                </FadeIn>
            </div>
          </div>
      </section>

      {/* Quote Section */}
      <section className="text-center py-20 md:py-28">
          <FadeIn>
            <p className="text-4xl md:text-5xl font-medium text-foreground">«Convertimos conceptos en experiencias visuales que perduran»</p>
          </FadeIn>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-20 md:pb-32 space-y-20 md:space-y-28">
        
        <section>
          <FadeIn>
             <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-primary">Damos vida a tu marca</h3>
                <p className="mt-4 text-muted-foreground">En <strong>Evol-vance</strong>, trabajamos para ofrecerte una experiencia visual impactante. Colaboramos estrechamente con nuestros equipos de publicidad, diseño web y redes sociales para garantizar <strong>coherencia visual en todos tus canales.</strong></p>
                <p className="mt-4 text-muted-foreground">Nuestro equipo se asegura de que cada elemento represente la verdadera esencia de tu marca. <strong>Buscamos dar vida a tu proyecto</strong> a través de un diseño de alta calidad y una estrategia visual sólida que <strong>refleje tu identidad y valores</strong>.</p>
            </div>
           </FadeIn>
        </section>

        <section>
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center">
                  <h3 className="text-3xl font-bold mb-8 text-primary">Nuestros Servicios de Branding</h3>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="max-w-3xl mx-auto space-y-4">
                 <Accordion type="single" collapsible className="w-full">
                    {brandingServices.map((service) => (
                        <AccordionItem value={service.value} key={service.value} className="border-b-0">
                            <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md mt-4">
                                <AccordionTrigger className="w-full text-left p-6 flex justify-between items-center hover:no-underline">
                                    <span className="text-lg font-medium text-foreground">{service.title}</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <div className="space-y-6">
                                        <div>
                                            <h5 className="font-bold mb-2 text-foreground">Incluye:</h5>
                                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                                {service.includes.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/<strong>/g, '<strong class="text-foreground/80">') }} />)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-bold mb-2 text-foreground">Beneficios clave:</h5>
                                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                                 {service.benefits.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </div>
                        </AccordionItem>
                    ))}
                </Accordion>
              </div>
            </FadeIn>
        </section>

        <section>
            <FadeIn>
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-3xl font-bold text-primary">¿Hablamos de tu proyecto?</h3>
                     <div className="mt-8">
                        <ContactModal>
                            <Button size="lg" className="font-bold">
                                Contactar Ahora
                            </Button>
                        </ContactModal>
                    </div>
                </div>
            </FadeIn>
        </section>
      </main>
    </>
  );
}
