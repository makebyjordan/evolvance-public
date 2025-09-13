'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from '@/components/fade-in';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
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
                                        <Card className="h-full p-8 transform hover:-translate-y-2 transition-transform duration-300 glow-effect">
                                            <CardHeader className="p-0">
                                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><BrainCircuit className="text-primary h-8 w-8"/></div>
                                                <CardTitle className="text-2xl font-bold text-white mb-3">Inteligencia Artificial y Automatizaciones</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <p className="text-muted-foreground mb-6">Optimizamos procesos con chatbots, asistentes de voz y análisis de datos. Automatizamos tareas repetitivas como reservas, facturación e inventario para que te centres en lo que realmente importa.</p>
                                            </CardContent>
                                            <CardFooter className="p-0">
                                                <Button asChild variant="link" className="p-0 font-semibold text-primary hover:text-sky-300 transition-colors flex items-center gap-2">
                                                    <a href="https://evol-vance.com/view-service/ia" target="_blank" rel="noopener noreferrer">Saber más <ArrowRight className="h-4 w-4"/></a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border">
                                        <Card className="h-full p-8 transform hover:-translate-y-2 transition-transform duration-300 glow-effect">
                                            <CardHeader className="p-0">
                                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><Megaphone className="text-primary h-8 w-8"/></div>
                                                <CardTitle className="text-2xl font-bold text-white mb-3">Marketing Digital</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <p className="text-muted-foreground mb-6">Diseñamos y ejecutamos campañas que atraen a tu audiencia ideal. Conquista tu mercado con desarrollo web, branding, SEO/SEM, campañas de ads y gestión de contenido de alto impacto.</p>
                                            </CardContent>
                                            <CardFooter className="p-0">
                                                <Button asChild variant="link" className="p-0 font-semibold text-primary hover:text-sky-300 transition-colors flex items-center gap-2">
                                                    <a href="https://evol-vance.com/view-service/marketing" target="_blank" rel="noopener noreferrer">Saber más <ArrowRight className="h-4 w-4"/></a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border">
                                        <Card className="h-full p-8 transform hover:-translate-y-2 transition-transform duration-300 glow-effect">
                                             <CardHeader className="p-0">
                                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><Codesandbox className="text-primary h-8 w-8"/></div>
                                                <CardTitle className="text-2xl font-bold text-white mb-3">Webs, Apps, CRMs y mucho más</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <p className="text-muted-foreground mb-6">Creamos CRMs, apps móviles y webs de gestión a medida. Herramientas que automatizan tareas, resuelven problemas y te dan una ventaja competitiva para centrarte en crecer.</p>
                                            </CardContent>
                                            <CardFooter className="p-0">
                                                <Button asChild variant="link" className="p-0 font-semibold text-primary hover:text-sky-300 transition-colors flex items-center gap-2">
                                                    <a href="https://evol-vance.com/view-service/software" target="_blank" rel="noopener noreferrer">Saber más <ArrowRight className="h-4 w-4"/></a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                    <div className="card-animated-border" id="vr">
                                        <Card className="h-full p-8 transform hover:-translate-y-2 transition-transform duration-300 glow-effect">
                                            <CardHeader className="p-0">
                                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6"><Headset className="text-primary h-8 w-8"/></div>
                                                <CardTitle className="text-2xl font-bold text-white mb-3">Ayúdate de la Realidad Virtual</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <p className="text-muted-foreground mb-6">Creamos experiencias inmersivas para marketing y turismo, simuladores para formación industrial y sanitaria, y tours virtuales para el sector inmobiliario. Usamos la RV para generar impacto y mejorar la eficiencia.</p>
                                            </CardContent>
                                            <CardFooter className="p-0">
                                                <Button asChild variant="link" className="p-0 font-semibold text-primary hover:text-sky-300 transition-colors flex items-center gap-2">
                                                    <a href="https://evol-vance.com/view-service/vr" target="_blank" rel="noopener noreferrer">Saber más <ArrowRight className="h-4 w-4"/></a>
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
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><Search className="text-primary h-8 w-8"/></div>
                                                <h4 className="text-xl font-bold text-foreground">1. Descubrimiento</h4>
                                                <p className="text-muted-foreground mt-2">Analizamos tus objetivos, audiencia y desafíos para definir una estrategia clara.</p>
                                            </Card>
                                        </div>
                                        <div className="card-animated-border">
                                            <Card className="text-center relative p-6">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><PencilRuler className="text-primary h-8 w-8"/></div>
                                                <h4 className="text-xl font-bold text-foreground">2. Diseño y Prototipo</h4>
                                                <p className="text-muted-foreground mt-2">Creamos la arquitectura de la información y diseñamos interfaces intuitivas y atractivas.</p>
                                            </Card>
                                        </div>
                                        <div className="card-animated-border">
                                            <Card className="text-center relative p-6">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><Code2 className="text-primary h-8 w-8"/></div>
                                                <h4 className="text-xl font-bold text-foreground">3. Desarrollo Ágil</h4>
                                                <p className="text-muted-foreground mt-2">Construimos la solución con código limpio y escalable, manteniéndote informado en cada sprint.</p>
                                            </Card>
                                        </div>
                                        <div className="card-animated-border">
                                            <Card className="text-center relative p-6">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary"><Rocket className="text-primary h-8 w-8"/></div>
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
                                         <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-full h-auto text-primary"
                                        >
                                            <path
                                            d="M19.781 2.00021C19.234 1.98621 18.795 2.30621 18.623 2.79321L11.289 23.0182C11.109 23.5352 11.396 24.0882 11.913 24.2682C12.43 24.4472 12.984 24.1602 13.163 23.6442L20.497 3.41921C20.677 2.90221 20.39 2.34921 19.873 2.16921C19.842 2.15821 19.812 2.15121 19.781 2.14421V2.00021Z"
                                            fill="currentColor"
                                            />
                                            <path
                                            d="M26.4819 12.5295C26.4819 11.2335 25.9619 10.0155 25.0419 9.0965C24.1219 8.1765 22.9039 7.6565 21.6079 7.6565C20.3119 7.6565 19.0939 8.1765 18.1739 9.0965C17.2539 10.0155 16.7339 11.2335 16.7339 12.5295C16.7339 13.6115 17.0869 14.6345 17.7129 15.4245L19.2229 17.2915C19.5399 17.6745 20.0439 17.9045 20.5759 17.9045H20.6079C21.0119 17.9045 21.3949 17.7695 21.6989 17.5255C22.4889 16.9005 23.4089 15.6525 24.1309 14.1845C24.2259 13.9995 24.2729 13.7855 24.2729 13.5655C24.2729 12.9865 24.0389 12.4465 23.6439 12.0515C23.2489 11.6565 22.7089 11.4225 22.1299 11.4225C21.5509 11.4225 21.0109 11.6565 20.6159 12.0515C20.2209 12.4465 19.9869 12.9865 19.9869 13.5655C19.9869 13.6215 19.9919 13.6765 19.9989 13.7325C20.0009 13.7545 20.0079 13.7745 20.0119 13.7955C20.0129 13.8015 20.0149 13.8065 20.0159 13.8125C20.0159 13.8145 20.0159 13.8165 20.0169 13.8185C20.4569 14.6195 20.9769 15.2615 21.4329 15.6325C21.5549 15.7275 21.7249 15.6705 21.8199 15.5485L25.0499 11.1835C25.4019 10.7065 25.2979 10.0215 24.8209 9.6705C24.3439 9.3185 23.6599 9.4235 23.3079 9.8995L20.8939 13.1115C20.7679 13.2755 20.5409 13.3325 20.3549 13.2435C20.1689 13.1555 20.0719 12.9465 20.1229 12.7505L21.0369 9.5445C21.2229 8.8955 21.8489 8.4485 22.5279 8.5635C23.2059 8.6785 23.7299 9.2565 23.7299 9.9485V10.0055C25.3219 10.3705 26.4819 11.3535 26.4819 12.5295Z"
                                            fill="currentColor"
                                            />
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
