
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from '@/components/fade-in';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Search, Palette, Rocket, Users, BarChart, ShieldCheck, Eye, Shield, LifeBuoy } from 'lucide-react';
import heroImage from '@/images/hero-evolvance-software.jpg';

const FAQS = [
    {
        question: "¿Por qué elegir una solución a medida en lugar de un software existente?",
        answer: "Un software a medida se diseña exclusivamente para tus procesos, eliminando funciones innecesarias y optimizando tu flujo de trabajo. A largo plazo, se convierte en un activo que te da una ventaja competitiva, se adapta a tu crecimiento y no dependes de las actualizaciones, licencias o limitaciones de terceros."
    },
    {
        question: "¿Cuál es el coste de un proyecto y cómo se estructura el pago?",
        answer: "Cada proyecto es único y su coste depende de la complejidad, funcionalidades y horas de desarrollo. Tras nuestra reunión inicial, te entregamos un presupuesto detallado y transparente, sin costes ocultos. Generalmente, trabajamos con un pago inicial y facturaciones por hitos o mensuales, ofreciendo flexibilidad."
    },
    {
        question: "¿Cuánto tiempo se tarda en desarrollar un software a medida?",
        answer: "El tiempo de desarrollo varía según la complejidad. Un CRM sencillo puede tardar entre 2 y 4 meses, mientras que una aplicación móvil compleja puede requerir 6 meses o más. Siempre proporcionamos una estimación detallada y un cronograma de proyecto después de nuestra consultoría inicial."
    },
    {
        question: "¿Mi empresa es pequeña, ¿realmente necesito ciberseguridad avanzada?",
        answer: "Absolutamente. Los ciberdelincuentes a menudo ven a las pymes como objetivos más fáciles porque suelen tener menos defensas que las grandes corporaciones. Un ataque puede tener consecuencias devastadoras. Invertir en seguridad no es un lujo, es una necesidad para garantizar la continuidad y reputación de tu negocio, sin importar su tamaño."
    },
     {
        question: "¿Qué tipo de soporte ofrecen después de lanzar el proyecto?",
        answer: "Ofrecemos varios planes de soporte y mantenimiento post-lanzamiento. Estos incluyen actualizaciones de seguridad, corrección de errores, y soporte técnico para asegurar que tu software funcione siempre de manera óptima. Podemos adaptar un plan a tus necesidades específicas."
    },
    {
        question: "¿Cómo garantizan la seguridad de los datos en sus soluciones?",
        answer: "La seguridad es nuestra máxima prioridad. Seguimos las mejores prácticas de desarrollo seguro ('Security by Design'), realizamos pruebas de penetración, análisis de vulnerabilidades y aplicamos encriptación de datos. Cumplimos con normativas como GDPR para garantizar la máxima protección de tu información."
    }
];

export default function SoftwarePage() {

  return (
    <>
      <section className="relative text-primary-foreground h-screen flex items-center justify-center">
        <Image
          src={heroImage}
          alt="Desarrollo de Software y Ciberseguridad"
          fill
          className="object-cover"
          placeholder="blur"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Especialistas en Programación y Ciberseguridad</h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/80">Desarrollamos software a medida para potenciar tu negocio y lo protegemos con las mejores soluciones de ciberseguridad.</p>
             <ContactModal>
                <Button size="lg" variant="secondary" className="font-bold">
                    Descubre Nuestras Soluciones
                </Button>
            </ContactModal>
          </FadeIn>
        </div>
      </section>

      <main id="services" className="container mx-auto px-6 py-16">
        <Tabs defaultValue="programacion" className="w-full">
            <FadeIn>
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Nuestros Servicios Especializados</h2>
                    <p className="max-w-3xl mx-auto text-muted-foreground mb-8">Ofrecemos soluciones integrales en desarrollo de software y ciberseguridad, diseñadas para impulsar y proteger tu negocio en el entorno digital.</p>
                     <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                        <TabsTrigger value="programacion">Programación a Medida</TabsTrigger>
                        <TabsTrigger value="ciberseguridad">Ciberseguridad</TabsTrigger>
                    </TabsList>
                </div>
            </FadeIn>
            
            <TabsContent value="programacion" className="space-y-16">
                <FadeIn>
                    <section className="text-center">
                        <h3 className="text-3xl font-bold text-foreground mb-4">Soluciones de Software que Impulsan tu Crecimiento</h3>
                        <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
                            En un mercado donde la eficiencia y la personalización son clave, el software genérico ya no es suficiente. Creamos soluciones de programación a medida que se alinean perfectamente con tus procesos de negocio, eliminando lo innecesario y potenciando lo que te hace único. Nuestro objetivo es transformar tus desafíos operativos en ventajas competitivas a través de la tecnología.
                        </p>
                    </section>
                </FadeIn>
                <FadeIn delay={0.2}>
                     <section>
                        <h3 className="text-3xl font-bold text-center text-foreground mb-10">Nuestro Proceso de Desarrollo Colaborativo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="text-center p-6"><div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8" /></div><CardTitle className="font-bold text-xl mb-2">1. Descubrimiento y Estrategia</CardTitle><p className="text-muted-foreground">Analizamos a fondo tus objetivos y desafíos para definir una hoja de ruta clara que aporte valor real a tu negocio.</p></Card>
                            <Card className="text-center p-6"><div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><Palette className="w-8 h-8" /></div><CardTitle className="font-bold text-xl mb-2">2. Diseño UX/UI y Prototipado</CardTitle><p className="text-muted-foreground">Diseñamos interfaces intuitivas y creamos prototipos interactivos para que valides la experiencia antes de programar.</p></Card>
                            <Card className="text-center p-6"><div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><Code className="w-8 h-8" /></div><CardTitle className="font-bold text-xl mb-2">3. Desarrollo y Pruebas</CardTitle><p className="text-muted-foreground">Construimos la aplicación con metodologías ágiles y realizamos pruebas continuas para asegurar un software robusto y seguro.</p></Card>
                            <Card className="text-center p-6"><div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><Rocket className="w-8 h-8" /></div><CardTitle className="font-bold text-xl mb-2">4. Despliegue y Puesta en Marcha</CardTitle><p className="text-muted-foreground">Gestionamos un lanzamiento fluido en servidores o tiendas de aplicaciones, sin interrupciones para tu equipo.</p></Card>
                            <Card className="text-center p-6"><div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8" /></div><CardTitle className="font-bold text-xl mb-2">5. Formación y Soporte</CardTitle><p className="text-muted-foreground">Capacitamos a tu equipo y ofrecemos planes de soporte para garantizar el rendimiento y la evolución del software.</p></Card>
                            <Card className="text-center p-6"><div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><BarChart className="w-8 h-8" /></div><CardTitle className="font-bold text-xl mb-2">6. Evolución y Crecimiento</CardTitle><p className="text-muted-foreground">Analizamos el rendimiento y el feedback para proponer mejoras que permitan que tu software evolucione contigo.</p></Card>
                        </div>
                    </section>
                </FadeIn>
                <FadeIn delay={0.4}>
                     <section>
                        <h3 className="text-3xl font-bold text-center text-foreground mb-10">Catálogo de Soluciones de Desarrollo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="card-animated-border"><Card className="p-8 h-full"><CardTitle className="text-2xl font-bold mb-2 text-primary">CRM a Medida</CardTitle><p className="text-muted-foreground mb-4">Organiza la información de tus clientes y automatiza ventas, marketing y servicio con un CRM hecho solo para ti.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Qué problema resuelve?</h4><p className="text-muted-foreground">Aumenta tu rentabilidad y fideliza a tus clientes. Tu equipo podrá cerrar más ventas y ofrecer un servicio excepcional.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Cómo lo hacemos?</h4><p className="text-muted-foreground">Analizamos tu negocio, diseñamos y programamos un CRM a medida, sin funciones innecesarias, que se adapte a tu forma de trabajar.</p></Card></div>
                            <div className="card-animated-border"><Card className="p-8 h-full"><CardTitle className="text-2xl font-bold mb-2 text-primary">Aplicación Móvil</CardTitle><p className="text-muted-foreground mb-4">Desarrollamos una app para tus clientes o empleados que te ayuda a estar en el bolsillo de tu público.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Qué problema resuelve?</h4><p className="text-muted-foreground">Mejora la experiencia de marca para clientes o aumenta la productividad y reduce errores para tu equipo.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Cómo lo hacemos?</h4><p className="text-muted-foreground">Definimos el objetivo, la diseñamos para que sea fácil de usar, la publicamos en Google Play y App Store, y te ayudamos a promocionarla.</p></Card></div>
                            <div className="card-animated-border"><Card className="p-8 h-full"><CardTitle className="text-2xl font-bold mb-2 text-primary">Web de Gestión de Proyectos</CardTitle><p className="text-muted-foreground mb-4">Centraliza todos tus proyectos, documentos y tareas en una web privada para que tu equipo trabaje de forma organizada.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Qué problema resuelve?</h4><p className="text-muted-foreground">Mejora la comunicación y elimina la pérdida de tiempo. Tu equipo sabrá siempre el estado de cada proyecto y la siguiente tarea.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Cómo lo hacemos?</h4><p className="text-muted-foreground">Estudiamos tu forma de trabajar, diseñamos una plataforma intuitiva y programamos las funcionalidades que necesitas.</p></Card></div>
                            <div className="card-animated-border"><Card className="p-8 h-full"><CardTitle className="text-2xl font-bold mb-2 text-primary">Web + CRM Integrado</CardTitle><p className="text-muted-foreground mb-4">Cada cliente que llegue a tu web quedará registrado automáticamente en tu base de datos para un seguimiento perfecto.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Qué problema resuelve?</h4><p className="text-muted-foreground">Aumenta la eficiencia al automatizar la captación de información, permitiéndote dar un seguimiento inmediato y aumentar conversiones.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Cómo lo hacemos?</h4><p className="text-muted-foreground">Unimos una web atractiva con un CRM a medida para que la web alimente al CRM, creando un ecosistema digital completo.</p></Card></div>
                        </div>
                    </section>
                </FadeIn>
            </TabsContent>
            
            <TabsContent value="ciberseguridad" className="space-y-16">
                 <FadeIn>
                    <section className="text-center">
                        <h3 className="text-3xl font-bold text-foreground mb-4">Protección Integral para tu Ecosistema Digital</h3>
                        <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
                           En la era digital, las amenazas evolucionan constantemente. Un solo ciberataque puede comprometer tus datos, dañar tu reputación y paralizar tus operaciones. Nuestro enfoque de ciberseguridad va más allá de la simple defensa; creamos una estrategia proactiva y en capas para proteger tus activos más valiosos, permitiéndote innovar y crecer con total tranquilidad.
                        </p>
                    </section>
                 </FadeIn>
                 <FadeIn delay={0.2}>
                    <section>
                        <h3 className="text-3xl font-bold text-center text-foreground mb-10">Nuestra Filosofía de Seguridad 360°</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                           <Card className="p-6"><div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8"/></div><CardTitle className="font-bold text-xl mb-2">Prevención Proactiva</CardTitle><p className="text-muted-foreground">Identificamos y neutralizamos amenazas antes de que impacten, implementando controles robustos y auditorías constantes.</p></Card>
                           <Card className="p-6"><div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><Eye className="w-8 h-8"/></div><CardTitle className="font-bold text-xl mb-2">Detección y Monitoreo</CardTitle><p className="text-muted-foreground">Vigilamos tu infraestructura 24/7 con herramientas avanzadas para detectar cualquier actividad anómala en tiempo real.</p></Card>
                           <Card className="p-6"><div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><LifeBuoy className="w-8 h-8"/></div><CardTitle className="font-bold text-xl mb-2">Respuesta y Recuperación</CardTitle><p className="text-muted-foreground">En caso de incidente, actuamos rápidamente para contener la amenaza, minimizar el daño y restaurar la normalidad.</p></Card>
                        </div>
                    </section>
                </FadeIn>
                 <FadeIn delay={0.4}>
                     <section>
                        <h3 className="text-3xl font-bold text-center text-foreground mb-10">Nuestros Servicios de Ciberseguridad</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="card-animated-border"><Card className="p-8 h-full"><CardTitle className="text-xl font-bold mb-2 text-primary">Pruebas de Penetración y Análisis de Vulnerabilidades</CardTitle><p className="text-muted-foreground mb-4">Actuamos como un hacker ético para encontrar y reportar las debilidades en tus sistemas antes de que lo haga un atacante.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Qué problema resuelve?</h4><p className="text-muted-foreground">Te da una visión clara de tu postura de seguridad, permitiéndote solucionar vulnerabilidades críticas antes de un ataque.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Cómo lo hacemos?</h4><p className="text-muted-foreground">Simulamos un ataque controlado y te entregamos un informe detallado con las vulnerabilidades y recomendaciones para solucionarlas.</p></Card></div>
                            <div className="card-animated-border"><Card className="p-8 h-full"><CardTitle className="text-xl font-bold mb-2 text-primary">Servicios de Seguridad Gestionada (MSS)</CardTitle><p className="text-muted-foreground mb-4">Monitoreamos tus sistemas 24/7 para detectar actividades sospechosas en tiempo real y responder a las amenazas de inmediato.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Qué problema resuelve?</h4><p className="text-muted-foreground">Minimiza el riesgo de un ciberataque al detectarlo en sus primeras etapas, reduciendo el tiempo de respuesta y el impacto.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Cómo lo hacemos?</h4><p className="text-muted-foreground">Implementamos una plataforma de monitoreo avanzada y nuestro equipo de expertos actúa ante cualquier alerta para mitigar la amenaza.</p></Card></div>
                            <div className="card-animated-border"><Card className="p-8 h-full"><CardTitle className="text-xl font-bold mb-2 text-primary">Formación en Concienciación de Seguridad</CardTitle><p className="text-muted-foreground mb-4">Capacitamos a tu equipo para que reconozca y evite tácticas como el phishing, convirtiéndolos en tu primera línea de defensa.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Qué problema resuelve?</h4><p className="text-muted-foreground">Reduce drásticamente el riesgo de incidentes causados por errores humanos, que son la causa de la mayoría de brechas de seguridad.</p><h4 className="font-semibold text-foreground mt-6 mb-2">¿Cómo lo hacemos?</h4><p className="text-muted-foreground">Realizamos formaciones prácticas y simulaciones de ataques controlados, y medimos la evolución de la concienciación.</p></Card></div>
                        </div>
                    </section>
                </FadeIn>
            </TabsContent>
        </Tabs>
      </main>

      <section id="faq" className="bg-background/50">
        <div className="container mx-auto px-6 py-20">
            <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Preguntas Frecuentes</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
                <div className="max-w-3xl mx-auto space-y-4">
                     <Accordion type="single" collapsible className="w-full">
                        {FAQS.map((faq, index) => (
                             <div key={index} className="card-animated-border">
                                <AccordionItem value={`item-${index}`} className="border-b-0">
                                    <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md mt-4">
                                        <AccordionTrigger className="w-full text-left p-6 flex justify-between items-center hover:no-underline text-lg font-semibold text-foreground">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-6 text-muted-foreground">
                                            {faq.answer}
                                        </AccordionContent>
                                    </div>
                                </AccordionItem>
                            </div>
                        ))}
                    </Accordion>
                </div>
            </FadeIn>
        </div>
    </section>

    <section className="bg-card">
         <div className="container mx-auto px-6 py-20 text-center">
             <FadeIn>
                <h3 className="text-3xl font-bold mb-4 text-foreground">¿Listo para empezar?</h3>
                <p className="max-w-xl mx-auto mb-6 text-muted-foreground">Contáctanos para una evaluación inicial y descubre cómo nuestras soluciones pueden transformar tu negocio.</p>
                <ContactModal>
                    <Button size="lg" className="font-bold">
                        Hablemos
                    </Button>
                </ContactModal>
             </FadeIn>
        </div>
    </section>
    </>
  );
}
