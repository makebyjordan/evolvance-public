
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
import Link from 'next/link';

export default function SoftwarePage() {
  const services = [
    { title: "CRM a Medida", description: "Deja de usar hojas de cálculo. Centraliza toda la información de tus clientes en un sistema hecho solo para ti.", problem: "la falta de organización.", benefit: "cierra más ventas y fideliza a tus clientes." },
    { title: "Aplicación Móvil", description: "Desarrollamos una app para tus clientes o empleados para mejorar su experiencia, optimizar procesos y reducir errores.", problem: "la desconexión con tu público.", benefit: "aumenta tu productividad y presencia." },
    { title: "Web de Gestión de Proyectos", description: "Organiza tu equipo y tus proyectos en una plataforma privada. Centraliza tareas, documentos y la comunicación.", problem: "la falta de comunicación y la pérdida de tiempo.", benefit: "un equipo más eficiente y proyectos que avanzan." },
    { title: "Web + CRM Integrado", description: "Combinamos una web profesional con un CRM a medida. Cada cliente que llegue a tu web quedará registrado automáticamente.", problem: "el seguimiento manual de clientes.", benefit: "automatiza la captación y aumenta tus ventas." }
  ];

  const whyUs = [
    { title: "Enfoque Personalizado", description: "No ofrecemos soluciones genéricas. Nos sentamos contigo y entendemos tu negocio para crear una herramienta a tu medida." },
    { title: "Resultados Comprobados", description: "Nos enfocamos en soluciones que ofrezcan un retorno de inversión real y medible para tu éxito." },
    { title: "Transparencia Total", description: "Te mantenemos informado en cada etapa del proyecto. Sin sorpresas, sin costes ocultos." },
    { title: "Soporte Dedicado", description: "Ofrecemos soporte post-lanzamiento para que tu nueva herramienta funcione perfectamente a largo plazo." }
  ];

  const faqs = [
    { question: "¿Cuánto cuesta un proyecto de programación a medida?", answer: "El precio depende de la complejidad y funcionalidades. Por eso, hacemos una consultoría inicial gratuita para entender tu proyecto y darte un presupuesto exacto y sin compromiso." },
    { question: "¿Qué tan largo es el proceso?", answer: "Cada proyecto es único. En la consultoría inicial te daremos una estimación clara del tiempo de desarrollo, con hitos definidos para que sepas en todo momento en qué fase estamos." },
    { question: "¿Cómo garantizan que la solución se adapte a mi negocio?", answer: "Nuestro proceso comienza con una inmersión completa en tu empresa. Trabajamos contigo codo a codo para entender tus retos y diseñar una solución que los resuelva de la manera más eficiente." }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary/90 text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Haz que la tecnología trabaje para ti, no al revés.</h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/80">Creamos soluciones digitales personalizadas que resuelven tus problemas de negocio, automatizan tareas y te dan una ventaja competitiva.</p>
            <ContactModal>
              <Button size="lg" variant="secondary" className="font-bold">
                Agenda una consultoría gratuita
              </Button>
            </ContactModal>
          </FadeIn>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section id="nosotros" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Tu socio tecnológico de confianza.</h2>
              <p className="text-muted-foreground leading-relaxed">Nos apasiona transformar ideas de negocio en herramientas digitales que funcionan. Nacimos de la necesidad de ofrecer soluciones que se adapten de verdad a cada empresa, sin los altos costes ni la rigidez de los productos genéricos. Creemos que la tecnología debe ser una herramienta para crecer, no un obstáculo. Nuestra misión es simple: crear software que impulse tu eficiencia, aumente tus ventas y te permita enfocarte en lo que mejor sabes hacer.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 bg-card/40">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">¿Cómo podemos ayudarte?</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <FadeIn key={service.title} delay={index * 0.1}>
                <div className="card-animated-border h-full">
                    <Card className="p-8 h-full bg-card text-card-foreground">
                        <CardContent className="p-0">
                            <h3 className="text-2xl font-bold mb-3 text-primary">{service.title}</h3>
                            <p className="text-muted-foreground mb-4">{service.description}</p>
                            <p className="text-sm"><strong className="text-foreground">Resuelve:</strong> <span className="text-muted-foreground">{service.problem}</span></p>
                            <p className="text-sm"><strong className="text-foreground">Beneficio:</strong> <span className="text-muted-foreground">{service.benefit}</span></p>
                        </CardContent>
                    </Card>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué Elegirnos Section */}
      <section id="proceso" className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">La diferencia está en nuestro proceso.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {whyUs.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-card/40">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Preguntas Frecuentes</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="card-animated-border">
                <Accordion type="single" collapsible className="w-full bg-card p-4 rounded-lg">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b-border/50">
                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline text-foreground">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
