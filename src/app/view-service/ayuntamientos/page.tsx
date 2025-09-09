
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from '@/components/fade-in';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function SectionCard({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`card-animated-border h-full ${className}`}>
             <Card className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md h-full p-6">
                <CardContent className="p-0">
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}

export default function AyuntamientosPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState('');

    const openModal = (src: string) => {
        setModalImageSrc(src);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImageSrc('');
    };
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              closeModal();
           }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
           window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 flex items-center justify-center text-center overflow-hidden">
                <div className="relative z-20 container mx-auto px-6">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground">
                            Transformando la visión ciudadana con <span className="text-primary">Tecnología Inmersiva</span>
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                            Soluciones de vanguardia para potenciar el turismo, urbanismo, salud y defensa en su municipio.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <main className="container mx-auto px-6 py-16">

                {/* Área Turismo, Cultura y Ocio */}
                <section id="turismo" className="mb-24">
                    <FadeIn>
                        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Área Turismo, Cultura y Ocio</h2>
                    </FadeIn>
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                       <FadeIn delay={0.1}>
                         <SectionCard>
                                <h3 className="text-2xl font-semibold text-foreground mb-3">Recreación Histórica de Monumentos</h3>
                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Reconstrucciones digitales y físicas de monumentos y escenas históricas. Utilizamos escáneres 3D de alta precisión para mapear entornos, generando modelos detallados que permiten estudiar y mostrar monumentos de forma inmersiva y revivir momentos históricos clave.</p>
                         </SectionCard>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                         <SectionCard>
                                <h3 className="text-2xl font-semibold text-foreground mb-3">Digitalización Patrimonial con Escáneres 3D</h3>
                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Preservamos el pasado escaneando objetos, fachadas o museos con fotogrametría y láser para crear réplicas digitales exactas sin contacto físico, ideales para el estudio, restauración y divulgación del patrimonio delicado.</p>
                                <Image 
                                    src="https://picsum.photos/600/400" 
                                    alt="Pórtico San Miguel Astudillo" 
                                    width={600} 
                                    height={400} 
                                    className="rounded-lg mb-4 cursor-pointer" 
                                    onClick={() => openModal('https://picsum.photos/1200/800')}
                                    data-ai-hint="ancient architecture"
                                />
                                <Button asChild variant="outline" className="w-full">
                                    <a href="https://tours2.evoinmersion.com/aChzWHahPfEs1oEt5e1JambdjMYzdvlx/" target="_blank" rel="noopener noreferrer">Tour Virtual: Pórtico San Miguel</a>
                                </Button>
                         </SectionCard>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <SectionCard>
                                <h3 className="text-2xl font-semibold text-foreground mb-3">Tours Virtuales 3D & 360º</h3>
                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Permita que cualquier visitante recorra espacios culturales o naturales desde su casa. Creamos paseos interactivos con imágenes esféricas y puntos de interés, compatibles con todos los dispositivos.</p>
                                <ul className="text-sm text-muted-foreground list-disc list-inside mb-4 space-y-1">
                                    <li>Promoción turística de municipios.</li>
                                    <li>Visitas educativas para centros escolares.</li>
                                    <li>Accesibilidad para personas con movilidad reducida.</li>
                                </ul>
                                <Button asChild variant="outline" className="w-full">
                                    <a href="https://my.mpskin.com/es/tour/z2fhxdm29p?fbclid=IwY2xjawL26ndleHRuA2FlbQIxMQABHtLgmQZd4iJzFf7A-Zv2F27ZmRZgvQHxB1tZIo_8J3cRNvVVXvLA8g87f6z1_aem_oFPOdfZdeNUQXEOvmmCdnA" target="_blank" rel="noopener noreferrer">Ver Tour de Ejemplo</a>
                                </Button>
                            </SectionCard>
                        </FadeIn>
                       <FadeIn delay={0.4}>
                         <SectionCard>
                                <h3 className="text-2xl font-semibold text-foreground mb-3">Actividades de Inmersión con Realidad Virtual</h3>
                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Organizamos experiencias de RV colectivas para eventos. Instalamos estaciones con equipos de última generación para que los asistentes disfruten de entornos virtuales personalizados.</p>
                                <div>
                                    <Image src="https://picsum.photos/300/200" alt="Evento VR" width={300} height={200} className="rounded-lg w-full" data-ai-hint="virtual reality event" />
                                </div>
                         </SectionCard>
                       </FadeIn>
                        <FadeIn delay={0.5}>
                            <SectionCard className="md:col-span-2">
                                <h3 className="text-2xl font-semibold text-foreground mb-3">Desarrollo de Aplicaciones y Mapeo Turístico</h3>
                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Mejoramos la experiencia del viajero con herramientas digitales a medida. Desarrollamos apps móviles con geolocalización y creamos mapas personalizados para planificar rutas y analizar el potencial turístico.</p>
                            </SectionCard>
                        </FadeIn>
                    </div>
                </section>

                {/* Otras Áreas */}
                <div className="grid md:grid-cols-3 gap-12">
                    <FadeIn>
                        <section id="urbanismo">
                            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Urbanismo</h2>
                             <SectionCard>
                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Digitalizamos estructuras urbanas con escáneres 3D y drones para crear gemelos digitales. Estas réplicas permiten simulaciones precisas, visualización de propuestas con realidad aumentada y una mayor participación ciudadana.</p>
                            </SectionCard>
                        </section>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <section id="salud">
                            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Salud y Sanidad</h2>
                            <SectionCard>
                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Desarrollamos simulaciones inmersivas para el sector sanitario:</p>
                                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-2">
                                    <li>Formación médica avanzada.</li>
                                    <li>Terapias para fobias, traumas y control del dolor.</li>
                                    <li>Terapia pediátrica para evasión hospitalaria.</li>
                                    <li>Reducción de ansiedad del paciente.</li>
                                </ul>
                            </SectionCard>
                        </section>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <section id="defensa">
                            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Defensa</h2>
                            <SectionCard>
                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">Ofrecemos simuladores avanzados para defensa y gestión pública:</p>
                                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-2">
                                    <li>Entrenamiento militar y policial seguro en entornos virtuales.</li>
                                    <li>Simulación de operaciones en entornos críticos.</li>
                                    <li>Formación de bomberos y otros cuerpos de seguridad.</li>
                                    <li>Optimización y mantenimiento de infraestructuras.</li>
                                </ul>
                            </SectionCard>
                        </section>
                    </FadeIn>
                </div>

                {/* Referencias Proyectos */}
                <section id="proyectos" className="mt-24">
                     <FadeIn>
                        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Proyectos Realizados</h2>
                        <SectionCard>
                             <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 text-center">
                                <span className="block mb-2 text-sm text-muted-foreground">Lucena</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Hornillos de Cerrato</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Baltanás</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Zueros</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Villamedina</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Monturque</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Torquemada</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Valdecañas de Cerrato</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Herrera de Valdecañas</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Yanes (Asturias)</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Torre de Arcas</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Lledó</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Arens de Lledó</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Cretas</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Calaceite</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Fuentespalda</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Fornoles</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Belite</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Mataleón</span>
                                <span className="block mb-2 text-sm text-muted-foreground">La Fresneda</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Valjunquera</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Peñarroya de Tastavins</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Rafels</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Monroyo</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Torre del Compte</span>
                                <span className="block mb-2 text-sm text-muted-foreground">La Portellada</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Caravaca de la Cruz</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Museo MAN (Madrid)</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Gormaz</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Benetússer</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Tomelloso</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Estepa</span>
                                <span className="block mb-2 text-sm text-muted-foreground">La Zubia</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Córdoba Capital</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Valderrobres</span>
                                <span className="block mb-2 text-sm text-muted-foreground">Astudillo</span>
                            </div>
                        </SectionCard>
                    </FadeIn>
                </section>

                {/* Preguntas Frecuentes (FAQ) */}
                <section id="faq" className="mt-24">
                     <FadeIn>
                        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Preguntas Frecuentes</h2>
                        <div className="max-w-3xl mx-auto space-y-4">
                             <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1" className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md border mb-4">
                                    <AccordionTrigger className="w-full text-left p-6 flex justify-between items-center text-lg font-semibold hover:no-underline">
                                        ¿Qué beneficios ofrecemos a los ayuntamientos en el área turística?
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 text-muted-foreground">
                                        Ofrecemos una transformación digital completa de su oferta turística. Con nuestras soluciones, puede atraer a más visitantes mediante tours virtuales, enriquecer la experiencia cultural con recreaciones históricas, y preservar su patrimonio. Esto posiciona a su municipio como un destino innovador.
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="item-2" className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md border mb-4">
                                    <AccordionTrigger className="w-full text-left p-6 flex justify-between items-center text-lg font-semibold hover:no-underline">
                                        ¿Cómo se inician los proyectos de digitalización o tours virtuales?
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 text-muted-foreground">
                                       El proceso comienza con una consulta para entender las necesidades. Luego, nuestro equipo realiza una visita técnica para la captura de datos (escaneo 3D, fotografía 360º) y finalmente desarrollamos el producto digital a medida.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md border">
                                    <AccordionTrigger className="w-full text-left p-6 flex justify-between items-center text-lg font-semibold hover:no-underline">
                                        ¿Es necesario que el ayuntamiento disponga de equipo técnico especializado?
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 text-muted-foreground">
                                        No. Nosotros proporcionamos toda la tecnología y el equipo necesarios. Las soluciones finales, como los tours virtuales, son accesibles a través de un simple enlace web.
                                    </AccordionContent>
                                </AccordionItem>
                             </Accordion>
                        </div>
                    </FadeIn>
                </section>
            </main>

            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div 
                        className="relative w-full max-w-4xl max-h-[90vh] p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={closeModal} 
                            className="absolute -top-2 -right-2 md:top-0 md:right-0 m-4 text-white text-4xl font-bold z-50"
                        >&times;</button>
                        <Image src={modalImageSrc} alt="Vista ampliada" layout="fill" objectFit="contain" className="rounded-lg"/>
                    </div>
                </div>
            )}
        </>
    );
}
