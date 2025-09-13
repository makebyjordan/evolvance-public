'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from '@/components/fade-in';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BrainCircuit, Megaphone, Codesandbox, Headset, Search, PencilRuler, Code2, Rocket, Target, ShieldCheck, ArrowRight } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import teamImages from '@/lib/placeholder-images.json';
import Link from 'next/link';


export default function ServicesPage() {
    return (
        <>
            <div className="bg-background text-foreground">
                <Header />
                <main>
                    <section className="min-h-screen flex items-center pt-24 pb-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-primary/10 blur-3xl"></div>

                        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 z-10">
                            <div className="md:w-1/2 text-center md:text-left">
                                <FadeIn>
                                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-4">
                                        Transformamos tu Negocio con <span className="text-primary">Tecnología de Vanguardia</span>
                                    </h1>
                                    <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
                                        Desde Inteligencia Artificial hasta Realidad Virtual, creamos soluciones digitales a medida que impulsan tu crecimiento y eficiencia.
                                    </p>
                                    <div className="flex gap-4 justify-center md:justify-start">
                                        <Button asChild size="lg">
                                            <a href="#services">Nuestros Servicios</a>
                                        </Button>
                                        <ContactModal>
                                            <Button size="lg" variant="secondary">Contactar</Button>
                                        </ContactModal>
                                    </div>
                                </FadeIn>
                            </div>
                            <div className="md:w-1/2">
                            <FadeIn>
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{stopColor: "hsl(var(--primary))"}} />
                                        <stop offset="100%" style={{stopColor: "hsl(var(--accent))"}} />
                                        </linearGradient>
                                    </defs>
                                    <path fill="url(#grad1)" d="M48.2,-64.5C62.1,-53.5,72.7,-38.7,78.2,-21.8C83.7,-4.8,84.1,14.2,76.5,29.3C68.9,44.3,53.3,55.4,37.3,64.2C21.3,73,-5.1,79.5,-27.9,74.7C-50.7,69.9,-70,53.8,-79.8,34.8C-89.6,15.8,-90,-6.1,-82.1,-24.1C-74.1,-42.2,-57.8,-56.3,-41.1,-66.1C-24.4,-75.9,-7.2,-81.4,8.5,-79.7C24.3,-78.1,48.2,-64.5,48.2,-64.5Z" transform="translate(100 100)" />
                                    <circle cx="100" cy="100" r="40" fill="hsla(var(--background) / 0.8)"/>
                                    <path d="M 85 90 L 115 90 L 100 120 Z" fill="hsl(var(--foreground))" transform="rotate(45 100 100)"/>
                                    <path d="M 90 85 L 110 115" stroke="hsl(var(--primary))" strokeWidth="2" />
                                    <path d="M 110 85 L 90 115" stroke="hsl(var(--accent))" strokeWidth="2" />
                                    </svg>
                            </FadeIn>
                            </div>
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
                                        <Card className="h-full p-8">
                                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><BrainCircuit className="text-primary h-8 w-8"/></div>
                                            <h4 className="text-2xl font-bold text-foreground mb-3">Inteligencia Artificial y Automatizaciones</h4>
                                            <p className="text-muted-foreground mb-6">Optimizamos procesos con chatbots, asistentes de voz y análisis de datos. Automatizamos tareas repetitivas como reservas, facturación e inventario para que te centres en lo que realmente importa.</p>
                                            <Button asChild variant="link" className="p-0 text-primary font-semibold">
                                                <Link href="https://evol-vance.com/view-service/ia">Saber más <ArrowRight className="ml-2 h-4 w-4"/></Link>
                                            </Button>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border">
                                        <Card className="h-full p-8">
                                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><Megaphone className="text-primary h-8 w-8"/></div>
                                            <h4 className="text-2xl font-bold text-foreground mb-3">Marketing Digital</h4>
                                            <p className="text-muted-foreground mb-6">Diseñamos y ejecutamos campañas que atraen a tu audiencia ideal. Conquista tu mercado con desarrollo web, branding, SEO/SEM, campañas de ads y gestión de contenido de alto impacto.</p>
                                            <Button asChild variant="link" className="p-0 text-primary font-semibold">
                                                <Link href="/view-service/marketing">Saber más <ArrowRight className="ml-2 h-4 w-4"/></Link>
                                            </Button>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border">
                                        <Card className="h-full p-8">
                                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><Codesandbox className="text-primary h-8 w-8"/></div>
                                            <h4 className="text-2xl font-bold text-foreground mb-3">Webs, Apps, CRMs y mucho más</h4>
                                            <p className="text-muted-foreground mb-6">Creamos CRMs, apps móviles y webs de gestión a medida. Herramientas que automatizan tareas, resuelven problemas y te dan una ventaja competitiva para centrarte en crecer.</p>
                                            <Button asChild variant="link" className="p-0 text-primary font-semibold">
                                                <Link href="/view-service/software">Saber más <ArrowRight className="ml-2 h-4 w-4"/></Link>
                                            </Button>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border" id="vr">
                                        <Card className="h-full p-8">
                                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><Headset className="text-primary h-8 w-8"/></div>
                                            <h4 className="text-2xl font-bold text-foreground mb-3">Ayúdate de la Realidad Virtual</h4>
                                            <p className="text-muted-foreground mb-6">Creamos experiencias inmersivas para marketing y turismo, simuladores para formación industrial y sanitaria, y tours virtuales para el sector inmobiliario. Usamos la RV para generar impacto y mejorar la eficiencia.</p>
                                            <Button asChild variant="link" className="p-0 text-primary font-semibold">
                                                <Link href="/view-service/vr">Saber más <ArrowRight className="ml-2 h-4 w-4"/></Link>
                                            </Button>
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
                                        <div className="text-center relative">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><Search className="text-primary h-8 w-8"/></div>
                                            <h4 className="text-xl font-bold text-foreground">1. Descubrimiento</h4>
                                            <p className="text-muted-foreground mt-2">Analizamos tus objetivos, audiencia y desafíos para definir una estrategia clara.</p>
                                        </div>
                                        <div className="text-center relative">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><PencilRuler className="text-primary h-8 w-8"/></div>
                                            <h4 className="text-xl font-bold text-foreground">2. Diseño y Prototipo</h4>
                                            <p className="text-muted-foreground mt-2">Creamos la arquitectura de la información y diseñamos interfaces intuitivas y atractivas.</p>
                                        </div>
                                        <div className="text-center relative">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><Code2 className="text-primary h-8 w-8"/></div>
                                            <h4 className="text-xl font-bold text-foreground">3. Desarrollo Ágil</h4>
                                            <p className="text-muted-foreground mt-2">Construimos la solución con código limpio y escalable, manteniéndote informado en cada sprint.</p>
                                        </div>
                                        <div className="text-center relative">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><Rocket className="text-primary h-8 w-8"/></div>
                                            <h4 className="text-xl font-bold text-foreground">4. Despliegue y Soporte</h4>
                                            <p className="text-muted-foreground mt-2">Lanzamos el proyecto y ofrecemos soporte continuo para asegurar su óptimo rendimiento.</p>
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
                                    <div className="card-animated-border">
                                        <Card className="overflow-hidden group h-full">
                                            <div className="relative w-full h-64">
                                                <Image src={teamImages['case-study-1'].src} alt="Proyecto E-commerce" layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint={teamImages['case-study-1'].hint}/>
                                            </div>
                                            <CardContent className="p-8">
                                                <span className="text-sm text-accent font-semibold">E-commerce y Automatización</span>
                                                <h4 className="text-2xl font-bold text-foreground mt-2 mb-3">Plataforma para Retail Tech</h4>
                                                <p className="text-muted-foreground mb-4">Desarrollamos un e-commerce con IA para recomendaciones personalizadas y automatización de inventario, aumentando las ventas un 40%.</p>
                                                <Button variant="link" className="p-0 text-accent">Ver caso de estudio</Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border">
                                        <Card className="overflow-hidden group h-full">
                                            <div className="relative w-full h-64">
                                                <Image src={teamImages['case-study-2'].src} alt="Proyecto VR" layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint={teamImages['case-study-2'].hint}/>
                                            </div>
                                            <CardContent className="p-8">
                                                <span className="text-sm text-accent font-semibold">Realidad Virtual</span>
                                                <h4 className="text-2xl font-bold text-foreground mt-2 mb-3">Simulador de Formación Industrial</h4>
                                                <p className="text-muted-foreground mb-4">Creamos un simulador de RV para capacitar a operarios en maquinaria compleja, reduciendo los accidentes laborales en un 75%.</p>
                                                <Button variant="link" className="p-0 text-accent">Ver caso de estudio</Button>
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
                                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" style={{stopColor: "hsl(var(--accent))"}} />
                                                <stop offset="100%" style={{stopColor: "hsl(var(--secondary))"}} />
                                                </linearGradient>
                                            </defs>
                                            <path fill="url(#grad2)" d="M49.9,-54.9C64.3,-41.8,75.3,-20.9,76.5,1.2C77.7,23.3,69.1,46.6,52.3,58.8C35.5,71,10.6,72.1,-12,67.8C-34.5,63.5,-54.8,53.8,-66,38C-77.1,22.2,-79.1,0.3,-72.6,-18.2C-66.1,-36.8,-51.1,-52,-35,-63.3C-18.9,-74.6,-1.7,-82.1,16,-79.6C33.7,-77.2,49.9,-54.9,49.9,-54.9Z" transform="translate(100 100)" />
                                            <g transform="translate(100 100) scale(0.6)">
                                                <path d="M-28,32.9c-2.1-3.2-3.8-6.9-5-10.7c-2.3-7.5,0.7-15.5,6.5-20.2c5.9-4.8,14-6.2,21.6-4.9 c7.6,1.4,14.6,5.3,19,11.3c4.4,6,6.3,13.6,5,20.9c-1.3,7.3-5.8,13.9-12.2,17.7c-6.4,3.8-14.5,4.8-21.9,2.8 C-19.4,52.3,-24.5,48.2,-28,32.9z" fill="hsl(var(--background))"></path>
                                                <path d="M38,41.9c-2.9-1.4-5.4-3.5-7.4-5.9c-4-4.8-5.3-11.2-3.4-17.1c1.9-5.9,7-10.4,13.1-12.1 c6.1-1.7,12.8,0.2,17.7,4.4c4.9,4.2,7.7,10.3,7.6,16.5c-0.1,6.2-3.1,12.1-7.9,15.9c-4.8,3.8-11.2,5.2-17.3,3.8 C41.1,47,39.4,45.8,38,41.9z" fill="hsl(var(--background))"></path>
                                                <path d="M-33.1-41c5.2-3.9,12.2-5.4,19-3.9c6.8,1.5,12.9,6.1,16.5,11.7c3.6,5.6,4.6,12.4,2.7,18.8 c-1.9,6.4-6.8,11.6-13,14.2c-6.2,2.6-13.4,2.6-19.7,0.2c-6.3-2.4-11.6-7.3-14.5-13.3C-45.1,-19.2,-43.3-33.1,-33.1-41z" fill="hsl(var(--background))"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="md:w-1/2">
                                        <h2 className="text-sm font-bold uppercase text-accent tracking-widest">¿Por Qué Elegirnos?</h2>
                                        <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2 mb-6">Tu Socio Estratégico en la Era Digital</h3>
                                        <p className="text-muted-foreground mb-8">
                                            No solo creamos tecnología; creamos oportunidades. Nuestro enfoque es entender tus desafíos de negocio y diseñar soluciones precisas que te den una ventaja competitiva real. Somos transparentes, ágiles y estamos comprometidos con tu éxito.
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4"><div className="bg-accent/10 p-2 rounded-md"><Rocket className="text-accent"/></div><div><h5 className="font-semibold text-foreground">Innovación Constante</h5><p className="text-muted-foreground text-sm">Utilizamos las últimas tecnologías para garantizar soluciones eficientes y escalables.</p></div></div>
                                            <div className="flex items-start gap-4"><div className="bg-accent/10 p-2 rounded-md"><Target className="text-accent"/></div><div><h5 className="font-semibold text-foreground">Enfoque Personalizado</h5><p className="text-muted-foreground text-sm">Cada proyecto es único. Creamos herramientas que se adaptan perfectamente a tus necesidades.</p></div></div>
                                            <div className="flex items-start gap-4"><div className="bg-accent/10 p-2 rounded-md"><ShieldCheck className="text-accent"/></div><div><h5 className="font-semibold text-foreground">Resultados Medibles</h5><p className="text-muted-foreground text-sm">Nos centramos en ofrecer un retorno de inversión claro y un impacto positivo en tu negocio.</p></div></div>
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
                                    <p className="font-bold text-2xl text-muted-foreground">AWS</p>
                                    <p className="font-bold text-2xl text-muted-foreground">Google Cloud</p>
                                    <p className="font-bold text-2xl text-muted-foreground">Unity</p>
                                    <p className="font-bold text-2xl text-muted-foreground">TensorFlow</p>
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
                                            <p className="text-muted-foreground mb-6">"El CRM que desarrollaron para nosotros ha transformado nuestra gestión de clientes. ¡Un equipo increíblemente profesional y eficiente!"</p>
                                            <div className="flex items-center gap-4">
                                                <Image src={teamImages['testimonial-1'].src} width={48} height={48} className="rounded-full" alt="Cliente 1" data-ai-hint={teamImages['testimonial-1'].hint}/>
                                                <div>
                                                    <p className="font-bold text-foreground">Carla Estrada</p>
                                                    <p className="text-sm text-muted-foreground">CEO de Soluciones Logísticas</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                     <div className="card-animated-border">
                                        <Card className="p-8 h-full">
                                            <p className="text-muted-foreground mb-6">"La campaña de marketing digital superó todas nuestras expectativas. Aumentamos nuestros leads cualificados en un 150% en solo tres meses."</p>
                                            <div className="flex items-center gap-4">
                                                <Image src={teamImages['testimonial-2'].src} width={48} height={48} className="rounded-full" alt="Cliente 2" data-ai-hint={teamImages['testimonial-2'].hint}/>
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
                                                <Image src={teamImages['testimonial-3'].src} width={48} height={48} className="rounded-full" alt="Cliente 3" data-ai-hint={teamImages['testimonial-3'].hint}/>
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
                                        <AccordionItem value="item-1" className="card-bg rounded-lg border-none">
                                            <AccordionTrigger className="w-full p-6 text-left text-lg font-semibold text-foreground hover:no-underline">¿Cuánto tiempo se tarda en desarrollar un proyecto?</AccordionTrigger>
                                            <AccordionContent className="px-6 pb-6 text-muted-foreground">El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web puede tardar de 4 a 8 semanas, mientras que una aplicación a medida o una solución de IA puede llevar varios meses. Siempre proporcionamos una hoja de ruta detallada al inicio.</AccordionContent>
                                        </AccordionItem>
                                    </div>
                                    <div className="card-animated-border">
                                        <AccordionItem value="item-2" className="card-bg rounded-lg border-none">
                                            <AccordionTrigger className="w-full p-6 text-left text-lg font-semibold text-foreground hover:no-underline">¿Cómo es el modelo de precios?</AccordionTrigger>
                                            <AccordionContent className="px-6 pb-6 text-muted-foreground">Ofrecemos modelos flexibles. Para proyectos bien definidos, trabajamos con un precio cerrado. Para proyectos evolutivos o de consultoría, podemos trabajar por horas o con un contrato de retainer mensual. Somos transparentes con todos los costes desde el principio.</AccordionContent>
                                        </AccordionItem>
                                    </div>
                                    <div className="card-animated-border">
                                        <AccordionItem value="item-3" className="card-bg rounded-lg border-none">
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
