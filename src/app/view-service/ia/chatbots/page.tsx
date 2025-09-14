'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactModal } from '@/components/contact-modal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FadeIn } from '@/components/fade-in';
import Image from 'next/image';
import { MessageSquare, DollarSign, ThumbsUp, Check } from 'lucide-react';

const faqItems = [
    {
        question: "¿Cuánto tiempo tarda la implementación?",
        answer: "Un chatbot básico puede estar operativo en 1-2 semanas. Los asistentes avanzados con integraciones complejas suelen tardar entre 4 y 6 semanas."
    },
    {
        question: "¿Necesito conocimientos técnicos para gestionarlo?",
        answer: "No. Te entregamos el chatbot funcionando. Además, si eliges la opción de autogestión, te proporcionamos la formación necesaria para que tu equipo pueda manejarlo fácilmente."
    },
    {
        question: "¿Se puede conectar con mi software actual (CRM, etc.)?",
        answer: "Sí. Nuestros asistentes avanzados están diseñados para integrarse con una amplia variedad de sistemas, incluyendo los principales CRMs, sistemas de reservas y otras herramientas de negocio."
    }
];

export default function ChatbotsPage() {
    return (
        <div className="w-full text-foreground">
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background -z-10" />
                <div className="max-w-4xl mx-auto text-center pt-24">
                     <FadeIn>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
                            Chatbots con IA para tus Canales de Comunicación
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Responden a tus clientes en WhatsApp, Instagram, correo electrónico y más, de forma inteligente y automática.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-foreground tracking-tight sm:text-4xl">Transforma la Comunicación con tus Clientes</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Automatiza, personaliza y mejora cada interacción.</p>
                        </div>
                    </FadeIn>
                     <FadeIn delay={0.2}>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-6 bg-card rounded-xl shadow-lg border border-border/20">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mx-auto">
                                    <MessageSquare />
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-foreground">Disponibilidad 24/7</h3>
                                <p className="mt-2 text-muted-foreground">Atiende a tus clientes al instante, a cualquier hora del día, sin esperas.</p>
                            </div>
                            <div className="p-6 bg-card rounded-xl shadow-lg border border-border/20">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mx-auto">
                                    <DollarSign />
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-foreground">Reducción de Costes</h3>
                                <p className="mt-2 text-muted-foreground">Libera a tu equipo de tareas repetitivas para que se centren en lo que de verdad importa.</p>
                            </div>
                             <div className="p-6 bg-card rounded-xl shadow-lg border border-border/20">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mx-auto">
                                    <ThumbsUp />
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-foreground">Mejora la Experiencia</h3>
                                <p className="mt-2 text-muted-foreground">Ofrece respuestas rápidas, precisas y personalizadas que deleitan a tus usuarios.</p>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <div className="mt-12">
                            <Image src="https://picsum.photos/seed/graph/1200/600" alt="Gráfico de Satisfacción del Cliente" width={1200} height={600} className="rounded-xl shadow-lg mx-auto" data-ai-hint="customer satisfaction graph"/>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section id="planes" className="bg-card/50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-foreground tracking-tight">Nuestros Planes</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Elige la solución que tu negocio necesita.</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                             <div className="card-animated-border"><Card className="p-8 flex flex-col h-full"><h3 className="text-2xl font-semibold text-foreground">Chatbot Básico</h3><p className="text-muted-foreground mt-2">Respuestas automáticas a preguntas frecuentes.</p><p className="text-4xl font-bold text-foreground mt-6">Desde 700€</p><p className="text-muted-foreground text-sm">Pago único de configuración</p><ul className="space-y-4 mt-8 text-muted-foreground flex-grow"><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Comunica precios y servicios básicos</li><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Responde preguntas frecuentes 24/7</li><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Integración multicanal (WhatsApp, Web, etc.)</li><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Reduce la carga de tu equipo</li></ul><div className="mt-8"><ContactModal><Button className="w-full">Más Información</Button></ContactModal></div></Card></div>
                             <div className="card-animated-border"><Card className="border-2 border-primary p-8 flex flex-col relative h-full"><span className="absolute top-0 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">RECOMENDADO</span><h3 className="text-2xl font-semibold text-foreground">Asistente IA Avanzado</h3><p className="text-muted-foreground mt-2">Conversaciones inteligentes para gestionar tu negocio.</p><p className="text-4xl font-bold text-foreground mt-6">Desde 3000€</p><p className="text-muted-foreground text-sm">Pago único de configuración</p><ul className="space-y-4 mt-8 text-muted-foreground flex-grow"><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Reserva de citas y mesas de restaurante</li><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Respuesta de correos de forma natural</li><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Conexión con bases de datos y sistemas</li><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Conversaciones naturales con IA y voz</li></ul><div className="mt-8"><ContactModal><Button className="w-full">Solicitar Demo</Button></ContactModal></div></Card></div>
                             <div className="card-animated-border"><Card className="p-8 flex flex-col h-full"><h3 className="text-2xl font-semibold text-foreground">Solución a Medida</h3><p className="text-muted-foreground mt-2">Para flujos de automatización complejos.</p><p className="text-4xl font-bold text-foreground mt-6">Contactar</p><p className="text-muted-foreground text-sm">Presupuesto según proyecto</p><ul className="space-y-4 mt-8 text-muted-foreground flex-grow"><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Asistentes IA altamente elaborados</li><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Diseño de diferentes flujos de automatización</li><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />Integraciones y desarrollo a medida</li><li className="flex items-start gap-3"><Check className="text-primary mt-1 flex-shrink-0" />La solución definitiva para tu empresa</li></ul><div className="mt-8"><ContactModal><Button variant="secondary" className="w-full">Contactar</Button></ContactModal></div></Card></div>
                        </div>
                    </FadeIn>
                </div>
            </section>
            
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-foreground tracking-tight sm:text-4xl">Nuestro Proceso Simplificado</h2>
                            <p className="mt-4 text-lg text-muted-foreground">En 4 pasos, tu asistente de IA estará listo para trabajar.</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="text-center"><div className="p-4 bg-card rounded-full shadow-lg border border-border inline-block"><span className="text-2xl font-bold text-primary">1</span></div><h3 className="mt-4 text-xl font-semibold">Análisis</h3><p className="mt-2 text-muted-foreground">Entendemos tus necesidades y objetivos.</p></div>
                            <div className="text-center"><div className="p-4 bg-card rounded-full shadow-lg border border-border inline-block"><span className="text-2xl font-bold text-primary">2</span></div><h3 className="mt-4 text-xl font-semibold">Desarrollo</h3><p className="mt-2 text-muted-foreground">Creamos y entrenamos a tu chatbot con IA.</p></div>
                            <div className="text-center"><div className="p-4 bg-card rounded-full shadow-lg border border-border inline-block"><span className="text-2xl font-bold text-primary">3</span></div><h3 className="mt-4 text-xl font-semibold">Integración</h3><p className="mt-2 text-muted-foreground">Lo conectamos con tus canales (WhatsApp, etc.).</p></div>
                            <div className="text-center"><div className="p-4 bg-card rounded-full shadow-lg border border-border inline-block"><span className="text-2xl font-bold text-primary">4</span></div><h3 className="mt-4 text-xl font-semibold">Lanzamiento</h3><p className="mt-2 text-muted-foreground">Activamos el bot y monitorizamos su rendimiento.</p></div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section className="bg-card/50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                 <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-foreground tracking-tight sm:text-4xl">Soluciones para Cada Industria</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Descubre cómo nuestros chatbots pueden ayudar a tu sector.</p>
                        </div>
                    </FadeIn>
                     <FadeIn delay={0.2}>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Card className="p-6"><CardTitle className="font-semibold text-foreground">Restaurantes</CardTitle><p className="mt-2 text-muted-foreground text-sm">Gestiona reservas de mesas y pedidos a domicilio automáticamente.</p></Card>
                                <Card className="p-6"><CardTitle className="font-semibold text-foreground">Clínicas y Consultorios</CardTitle><p className="mt-2 text-muted-foreground text-sm">Agenda citas, envía recordatorios y responde preguntas sobre servicios.</p></Card>
                                <Card className="p-6"><CardTitle className="font-semibold text-foreground">E-commerce</CardTitle><p className="mt-2 text-muted-foreground text-sm">Asiste en la compra, rastrea pedidos y gestiona devoluciones 24/7.</p></Card>
                                <Card className="p-6"><CardTitle className="font-semibold text-foreground">Inmobiliarias</CardTitle><p className="mt-2 text-muted-foreground text-sm">Cualifica leads, agenda visitas y ofrece información de propiedades.</p></Card>
                            </div>
                            <div>
                                <Image src="https://picsum.photos/seed/interaction/600/450" alt="Interacción Multicanal" width={600} height={450} className="rounded-xl shadow-lg" data-ai-hint="multichannel interaction"/>
                            </div>
                        </div>
                     </FadeIn>
                </div>
            </section>

            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                 <div className="max-w-3xl mx-auto">
                    <FadeIn>
                        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Preguntas Frecuentes</h2>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="mt-12">
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {faqItems.map((item, index) => (
                                    <div key={index} className="card-animated-border">
                                        <AccordionItem value={`item-${index}`} className="border-b-0">
                                            <div className="bg-card rounded-lg shadow-md">
                                                <AccordionTrigger className="w-full text-left p-6 flex justify-between items-center hover:no-underline text-lg font-semibold">
                                                    {item.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6 pb-6 text-muted-foreground">
                                                    {item.answer}
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

            <section className="bg-card/50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-foreground tracking-tight">Mantenimiento y Flexibilidad</h2>
                        <div className="mt-6 text-muted-foreground space-y-4 max-w-3xl mx-auto">
                            <p>Todos nuestros servicios recomiendan un mantenimiento mensual para que siempre funcionen perfectamente, aunque no es obligatorio.</p>
                            <p>También desarrollamos los productos y los dejamos funcionando para que los integrantes de tu equipo puedan continuar con la revisión y gestión mensual de los mismos.</p>
                        </div>
                    </FadeIn>
                     <FadeIn delay={0.2}>
                        <div className="mt-10">
                            <h3 className="text-2xl font-semibold text-foreground/90">¿Hablamos de tus necesidades?</h3>
                            <p className="mt-2 text-muted-foreground">Siempre te recomendaremos la mejor opción para tu negocio.</p>
                            <ContactModal>
                                <Button size="lg" className="mt-6">Agendar una llamada</Button>
                            </ContactModal>
                        </div>
                     </FadeIn>
                </div>
            </section>

        </div>
    );
}
