
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from '@/components/fade-in';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BrainCircuit, Megaphone, Codesandbox, Headset, Search, PencilRuler, Code2, Rocket, Target, ShieldCheck, ArrowRight } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import teamImages from '@/lib/placeholder-images.json';
import Link from 'next/link';
import Image from 'next/image';
import heroImage from '@/images/hero-evolvance-software.jpg';


export default function ServicesPage() {
    return (
        <>
            <div className="bg-background text-foreground">
                <Header />
                <main>
                    <section className="relative text-primary-foreground h-screen flex items-center justify-center">
                        <Image
                            src={heroImage}
                            alt="Servicios Tecnológicos"
                            fill
                            className="object-cover"
                            placeholder="blur"
                            quality={100}
                        />
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="container mx-auto px-6 py-20 text-center relative z-10">
                            <FadeIn>
                                <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-4">
                                    Transformamos tu Negocio con <span className="text-primary">Tecnología de Vanguardia</span>
                                </h1>
                                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                                    Desde Inteligencia Artificial hasta Realidad Virtual, creamos soluciones digitales a medida que impulsan tu crecimiento y eficiencia.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Button asChild size="lg">
                                        <a href="#services">Nuestros Servicios</a>
                                    </Button>
                                    <ContactModal>
                                        <Button size="lg" variant="secondary">Contactar</Button>
                                    </ContactModal>
                                </div>
                            </FadeIn>
                        </div>
                    </section>

                    <FadeIn>
                        <section id="services" className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-12">
                                    <h2 className="text-sm font-bold uppercase text-primary tracking-widest">Servicios</h2>
                                    <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2">Soluciones que Impulsan tu Futuro</h3>
                                    <p className="text-muted-foreground max-w-2xl mx-auto mt-4">Ofrecemos un ecosistema de servicios tecnológicos diseñados para llevar tu negocio al siguiente nivel.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="card-animated-border">
                                        <Card className="h-full p-8 transform hover:-translate-y-2 transition-transform duration-300">
                                            <CardHeader className="p-0">
                                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><BrainCircuit className="text-primary h-8 w-8" /></div>
                                                <CardTitle className="text-2xl font-bold text-white mb-3">Inteligencia Artificial y Automatizaciones</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <p className="text-muted-foreground mb-6">Optimizamos procesos con chatbots, asistentes de voz y análisis de datos. Automatizamos tareas repetitivas como reservas, facturación e inventario para que te centres en lo que realmente importa.</p>
                                            </CardContent>
                                            <CardFooter className="p-0">
                                                <Button asChild variant="link" className="p-0 font-semibold text-primary hover:text-sky-300 transition-colors flex items-center gap-2">
                                                    <a href="https://evol-vance.com/view-service/ia" target="_blank" rel="noopener noreferrer">Saber más <ArrowRight className="h-4 w-4" /></a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border">
                                        <Card className="h-full p-8 transform hover:-translate-y-2 transition-transform duration-300">
                                            <CardHeader className="p-0">
                                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><Megaphone className="text-primary h-8 w-8" /></div>
                                                <CardTitle className="text-2xl font-bold text-white mb-3">Marketing Digital</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <p className="text-muted-foreground mb-6">Diseñamos y ejecutamos campañas que atraen a tu audiencia ideal. Conquista tu mercado con desarrollo web, branding, SEO/SEM, campañas de ads y gestión de contenido de alto impacto.</p>
                                            </CardContent>
                                            <CardFooter className="p-0">
                                                <Button asChild variant="link" className="p-0 font-semibold text-primary hover:text-sky-300 transition-colors flex items-center gap-2">
                                                    <a href="https://evol-vance.com/view-service/marketing" target="_blank" rel="noopener noreferrer">Saber más <ArrowRight className="h-4 w-4" /></a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border">
                                        <Card className="h-full p-8 transform hover:-translate-y-2 transition-transform duration-300">
                                            <CardHeader className="p-0">
                                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><Codesandbox className="text-primary h-8 w-8" /></div>
                                                <CardTitle className="text-2xl font-bold text-white mb-3">Webs, Apps, CRMs y mucho más</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <p className="text-muted-foreground mb-6">Creamos CRMs, apps móviles y webs de gestión a medida. Herramientas que automatizan tareas, resuelven problemas y te dan una ventaja competitiva para centrarte en crecer.</p>
                                            </CardContent>
                                            <CardFooter className="p-0">
                                                <Button asChild variant="link" className="p-0 font-semibold text-primary hover:text-sky-300 transition-colors flex items-center gap-2">
                                                    <a href="https://evol-vance.com/view-service/software" target="_blank" rel="noopener noreferrer">Saber más <ArrowRight className="h-4 w-4" /></a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border" id="vr">
                                        <Card className="h-full p-8 transform hover:-translate-y-2 transition-transform duration-300">
                                            <CardHeader className="p-0">
                                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><Headset className="text-primary h-8 w-8" /></div>
                                                <CardTitle className="text-2xl font-bold text-white mb-3">Ayúdate de la Realidad Virtual</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <p className="text-muted-foreground mb-6">Creamos experiencias inmersivas para marketing y turismo, simuladores para formación industrial y sanitaria, y tours virtuales para el sector inmobiliario. Usamos la RV para generar impacto y mejorar la eficiencia.</p>
                                            </CardContent>
                                            <CardFooter className="p-0">
                                                <Button asChild variant="link" className="p-0 font-semibold text-primary hover:text-sky-300 transition-colors flex items-center gap-2">
                                                    <a href="https://evol-vance.com/view-service/vr" target="_blank" rel="noopener noreferrer">Saber más <ArrowRight className="h-4 w-4" /></a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section id="process" className="py-20 bg-card/50">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-16">
                                    <h2 className="text-sm font-bold uppercase text-primary tracking-widest">Nuestro Proceso</h2>
                                    <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2">Un Camino Claro Hacia el Éxito</h3>
                                    <p className="text-muted-foreground max-w-2xl mx-auto mt-4">Seguimos un proceso estructurado y transparente para garantizar resultados excepcionales en cada proyecto.</p>
                                </div>
                                <div className="relative">
                                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                                        <div className="card-animated-border">
                                            <Card className="text-center relative p-6">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><Search className="text-primary h-8 w-8" /></div>
                                                <h4 className="text-xl font-bold text-foreground">1. Descubrimiento</h4>
                                                <p className="text-muted-foreground mt-2">Analizamos tus objetivos, audiencia y desafíos para definir una estrategia clara.</p>
                                            </Card>
                                        </div>
                                        <div className="card-animated-border">
                                            <Card className="text-center relative p-6">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><PencilRuler className="text-primary h-8 w-8" /></div>
                                                <h4 className="text-xl font-bold text-foreground">2. Diseño y Prototipo</h4>
                                                <p className="text-muted-foreground mt-2">Creamos la arquitectura de la información y diseñamos interfaces intuitivas y atractivas.</p>
                                            </Card>
                                        </div>
                                        <div className="card-animated-border">
                                            <Card className="text-center relative p-6">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><Code2 className="text-primary h-8 w-8" /></div>
                                                <h4 className="text-xl font-bold text-foreground">3. Desarrollo Ágil</h4>
                                                <p className="text-muted-foreground mt-2">Construimos la solución con código limpio y escalable, manteniéndote informado en cada sprint.</p>
                                            </Card>
                                        </div>
                                        <div className="card-animated-border">
                                            <Card className="text-center relative p-6">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><Rocket className="text-primary h-8 w-8" /></div>
                                                <h4 className="text-xl font-bold text-foreground">4. Despliegue y Soporte</h4>
                                                <p className="text-muted-foreground mt-2">Lanzamos el proyecto y ofrecemos soporte continuo para asegurar su óptimo rendimiento.</p>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section id="portfolio" className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-12">
                                    <h2 className="text-sm font-bold uppercase text-accent tracking-widest">Casos de Éxito</h2>
                                    <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2">Proyectos que Generan Impacto</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* --- Tarjeta 1 Corregida --- */}
                                    <div className="card-animated-border">
                                        <Card className="overflow-hidden group h-full">
                                            <div className="relative w-full h-64">
                                                {/* También he corregido la etiqueta Image a la sintaxis moderna de Next.js */}
                                                <Image
                                                    src={teamImages['case-study-1'].src}
                                                    alt="Proyecto CRM Construcción"
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    data-ai-hint={teamImages['case-study-1'].hint}
                                                />
                                            </div>
                                            <CardContent className="p-8">
                                                <span className="text-sm text-accent font-semibold">CRM SaaS de Construcción</span>
                                                <h4 className="text-2xl font-bold text-foreground mt-2 mb-3">Plataforma SaaS Construcción con IA</h4>
                                                <p className="text-muted-foreground mb-4">Desarrollamos un crm con IA para constructoras personalizado y automatizado para nuestro cliente, que aumenta el rendimiento un 40%.</p>

                                                {/* 👇 AQUÍ ESTÁ LA CORRECCIÓN DEL ENLACE 👇 */}
                                                <Button asChild variant="link" className="p-0 text-accent font-semibold flex items-center gap-2">
                                                    <a href="https://corecons.evol-vance.com/" target="_blank" rel="noopener noreferrer">
                                                        Ver caso de estudio <ArrowRight className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* --- Tarjeta 2 Corregida --- */}
                                    <div className="card-animated-border">
                                        <Card className="overflow-hidden group h-full">
                                            <div className="relative w-full h-64">
                                                {/* También he corregido la etiqueta Image a la sintaxis moderna de Next.js */}
                                                <Image
                                                    src={teamImages['case-study-2'].src}
                                                    alt="Proyecto VR"
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    data-ai-hint={teamImages['case-study-2'].hint}
                                                />
                                            </div>
                                            <CardContent className="p-8">
                                                <span className="text-sm text-accent font-semibold">Realidad Virtual</span>
                                                <h4 className="text-2xl font-bold text-foreground mt-2 mb-3">Simulador de Formación Industrial</h4>
                                                <p className="text-muted-foreground mb-4">Creamos un simulador de RV para capacitar a operarios en maquinaria compleja, reduciendo los accidentes laborales en un 75%.</p>

                                                {/* 👇 AQUÍ ESTÁ LA CORRECCIÓN DEL ENLACE (recuerda poner la URL correcta) 👇 */}
                                                <Button asChild variant="link" className="p-0 text-accent font-semibold flex items-center gap-2">
                                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                                        Ver caso de estudio <ArrowRight className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section id="about" className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="flex flex-col md:flex-row items-center gap-12">
                                    <div className="md:w-1/2">
                                        <Image src="https://iili.io/K78fXyb.png" alt="Evol-vance Logo" width={512} height={512} className="w-full h-auto text-primary" />
                                    </div>
                                    <div className="md:w-1/2">
                                        <h2 className="text-sm font-bold uppercase text-accent tracking-widest">¿Por Qué Elegirnos?</h2>
                                        <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2 mb-6">Tu Socio Estratégico en la Era Digital</h3>
                                        <p className="text-muted-foreground mb-8">
                                            No solo creamos tecnología; creamos oportunidades. Nuestro enfoque es entender tus desafíos de negocio y diseñar soluciones precisas que te den una ventaja competitiva real. Somos transparentes, ágiles y estamos comprometidos con tu éxito.
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4"><div className="bg-accent/10 p-2 rounded-md"><Rocket className="text-accent" /></div><div><h5 className="font-semibold text-foreground">Innovación Constante</h5><p className="text-muted-foreground text-sm">Utilizamos las últimas tecnologías para garantizar soluciones eficientes y escalables.</p></div></div>
                                            <div className="flex items-start gap-4"><div className="bg-accent/10 p-2 rounded-md"><Target className="text-accent" /></div><div><h5 className="font-semibold text-foreground">Enfoque Personalizado</h5><p className="text-muted-foreground text-sm">Cada proyecto es único. Creamos herramientas que se adaptan perfectamente a tus necesidades.</p></div></div>
                                            <div className="flex items-start gap-4"><div className="bg-accent/10 p-2 rounded-md"><ShieldCheck className="text-accent" /></div><div><h5 className="font-semibold text-foreground">Resultados Medibles</h5><p className="text-muted-foreground text-sm">Nos centramos en ofrecer un retorno de inversión claro y un impacto positivo en tu negocio.</p></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section id="tech" className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl font-bold text-foreground">Tecnologías que Potencian Nuestras Soluciones</h3>
                                </div>
                                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 opacity-60">
                                    <p className="font-bold text-2xl text-muted-foreground">Python</p>
                                    <p className="font-bold text-2xl text-muted-foreground">JavaScript</p>
                                    <p className="font-bold text-2xl text-muted-foreground">React</p>
                                    <p className="font-bold text-2xl text-muted-foreground">Node.js</p>
                                    <p className="font-bold text-2xl text-muted-foreground">Windsurf</p>
                                    <p className="font-bold text-2xl text-muted-foreground">Firebase Studio</p>
                                    <p className="font-bold text-2xl text-muted-foreground">Gemini&ChatGPT</p>
                                    <p className="font-bold text-2xl text-muted-foreground">Unity&Unreal Engine</p>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section id="testimonials" className="py-20 bg-card/50">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-12">
                                    <h2 className="text-sm font-bold uppercase text-primary tracking-widest">Testimonios</h2>
                                    <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2">Lo que Dicen Nuestros Clientes</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="card-animated-border">
                                        <Card className="p-8 h-full">
                                            <p className="text-muted-foreground mb-6">"El CRM que desarrollaron para nosotros ha ayudado a tener un futuro prometedor, les dimos nuestra idea y nos crearos un producto SaaS que ahora vamos a promocionar"</p>
                                            <div className="flex items-center gap-4">
                                                <Image src={teamImages['testimonial-1'].src} width={48} height={48} className="rounded-full" alt="Cliente 1" data-ai-hint={teamImages['testimonial-1'].hint} />
                                                <div>
                                                    <p className="font-bold text-foreground">Jordan Garcia</p>
                                                    <p className="text-sm text-muted-foreground">CEO de Corecons CRM</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border">
                                        <Card className="p-8 h-full">
                                            <p className="text-muted-foreground mb-6">"La campaña de marketing digital superó todas nuestras expectativas. Aumentamos nuestros leads cualificados en un 150% en solo tres meses."</p>
                                            <div className="flex items-center gap-4">
                                                <Image src={teamImages['testimonial-2'].src} width={48} height={48} className="rounded-full" alt="Cliente 2" data-ai-hint={teamImages['testimonial-2'].hint} />
                                                <div>
                                                    <p className="font-bold text-foreground">Marcos Sánchez</p>
                                                    <p className="text-sm text-muted-foreground">Director de Marketing en FinTech Global</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border">
                                        <Card className="p-8 h-full">
                                            <p className="text-muted-foreground mb-6">"La experiencia de Realidad Virtual para nuestro stand en la feria fue un éxito rotundo. Captamos la atención de todos los asistentes."</p>
                                            <div className="flex items-center gap-4">
                                                <Image src={teamImages['testimonial-3'].src} width={48} height={48} className="rounded-full" alt="Cliente 3" data-ai-hint={teamImages['testimonial-3'].hint} />
                                                <div>
                                                    <p className="font-bold text-foreground">Ana Pérez</p>
                                                    <p className="text-sm text-muted-foreground">Gerente de Eventos en Inmobiliaria Vista</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section id="faq" className="py-20">
                            <div className="container mx-auto px-6 max-w-3xl">
                                <div className="text-center mb-12">
                                    <h2 className="text-sm font-bold uppercase text-accent tracking-widest">FAQ</h2>
                                    <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2">Preguntas Frecuentes</h3>
                                </div>
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    <div className="card-animated-border">
                                        <AccordionItem value="item-1" className="bg-card rounded-lg border-none">
                                            <AccordionTrigger className="w-full p-6 text-left text-lg font-semibold text-foreground hover:no-underline">¿Cuánto tiempo se tarda en desarrollar un proyecto?</AccordionTrigger>
                                            <AccordionContent className="px-6 pb-6 text-muted-foreground">El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web puede tardar de 4 a 8 semanas, mientras que una aplicación a medida o una solución de IA puede llevar varios meses. Siempre proporcionamos una hoja de ruta detallada al inicio.</AccordionContent>
                                        </AccordionItem>
                                    </div>
                                    <div className="card-animated-border">
                                        <AccordionItem value="item-2" className="bg-card rounded-lg border-none">
                                            <AccordionTrigger className="w-full p-6 text-left text-lg font-semibold text-foreground hover:no-underline">¿Cómo es el modelo de precios?</AccordionTrigger>
                                            <AccordionContent className="px-6 pb-6 text-muted-foreground">Ofrecemos modelos flexibles. Para proyectos bien definidos, trabajamos con un precio cerrado. Para proyectos evolutivos o de consultoría, podemos trabajar por horas o con un contrato de retainer mensual. Somos transparentes con todos los costes desde el principio.</AccordionContent>
                                        </AccordionItem>
                                    </div>
                                    <div className="card-animated-border">
                                        <AccordionItem value="item-3" className="bg-card rounded-lg border-none">
                                            <AccordionTrigger className="w-full p-6 text-left text-lg font-semibold text-foreground hover:no-underline">¿Ofrecéis mantenimiento después del lanzamiento?</AccordionTrigger>
                                            <AccordionContent className="px-6 pb-6 text-muted-foreground">Sí, ofrecemos planes de soporte y mantenimiento post-lanzamiento para garantizar que tu solución digital esté siempre actualizada, segura y funcionando a pleno rendimiento. Nos adaptamos a tus necesidades, desde soporte básico hasta gestión proactiva.</AccordionContent>
                                        </AccordionItem>
                                    </div>
                                </Accordion>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section id="contact" className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="card-animated-border">
                                    <Card className="p-10 md:p-16 text-center relative overflow-hidden">
                                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl"></div>
                                        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-accent/20 blur-2xl"></div>
                                        <h3 className="text-3xl md:text-4xl font-extrabold text-foreground">¿Listo para llevar tu negocio al siguiente nivel?</h3>
                                        <p className="text-muted-foreground max-w-xl mx-auto mt-4 mb-8">Hablemos de tu proyecto. Te ofrecemos una consultoría gratuita para identificar cómo la tecnología puede ayudarte a alcanzar tus objetivos.</p>
                                        <ContactModal>
                                            <Button size="lg">
                                                Contactar Ahora
                                            </Button>
                                        </ContactModal>
                                    </Card>
                                </div>
                            </div>
                        </section>
                    </FadeIn>
                </main>
                <Footer />
            </div>
        </>
    );
}
