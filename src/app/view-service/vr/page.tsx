'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from '@/components/fade-in';
import { Megaphone, Globe, Smile, Utensils, GraduationCap, Home, HeartPulse, Cog } from 'lucide-react';
import Image from 'next/image';
import heroImage from '@/images/hero-evolvance-realidad-virtual.jpg';


const serviceCards = [
    {
        icon: <Megaphone className="h-8 w-8" />,
        title: "Publicidad y Marketing",
        subtitle: "Conecta con tu audiencia de forma inmersiva.",
        points: [
            "Experiencias de marca: Invita a tus clientes a un viaje virtual a la historia de tu marca, el origen de tu producto o el proceso de fabricación para crear un vínculo emocional.",
            "Lanzamientos de productos en RV: Permite que los clientes exploren tu nuevo producto en 3D, lo personalicen y vean su funcionamiento de una forma innovadora y memorable.",
            "Publicidad interactiva ('Advergaming'): Crea anuncios que no solo se ven, sino que se viven, transformando la publicidad en una aventura personal que el usuario no querrá saltarse."
        ],
        benefit: "Genera un impacto emocional hasta 10 veces mayor que la publicidad tradicional, mejora el recuerdo de la marca y atrae a un público más joven."
    },
    {
        icon: <Globe className="h-8 w-8" />,
        title: "Turismo y Cultura",
        subtitle: "Viaja sin límites, explora el pasado.",
        points: [
            "Tours virtuales 360º: Permite a los clientes recorrer hoteles, resorts, museos o monumentos con un realismo asombroso antes de reservar.",
            "Recreaciones históricas: Da vida al patrimonio permitiendo 'caminar' por ciudades antiguas, presenciar eventos del pasado o interactuar con personajes históricos.",
            "Experiencias de destino: Promociona lugares turísticos con experiencias interactivas, como un safari virtual o un paseo en góndola por Venecia, para inspirar a futuros viajeros."
        ],
        benefit: "Aumenta la visibilidad y el alcance, generando un interés genuino que se traduce en más reservas y visitas."
    },
    {
        icon: <Smile className="h-8 w-8" />,
        title: "Eventos y Fiestas",
        subtitle: "La experiencia que lo cambia todo.",
        points: [
            "Stands interactivos: Atrae multitudes en ferias con juegos, demostraciones de productos en 3D o simuladores que te diferencian de la competencia.",
            "Activaciones de marca: Involucra a tus clientes con experiencias lúdicas e inolvidables que transmitan los valores de tu marca.",
            "Eventos híbridos: Permite que los asistentes virtuales participen en conferencias, conciertos o celebraciones como si estuvieran allí, interactuando en tiempo real."
        ],
        benefit: "Crea un factor sorpresa único, genera contenido viralizable y fortalece la conexión emocional con tu marca."
    },
    {
        icon: <Utensils className="h-8 w-8" />,
        title: "Gastronomía",
        subtitle: "Degusta el futuro de la cocina.",
        points: [
            "Storytelling inmersivo: Cuenta la historia detrás de tus platos, desde el origen de los ingredientes hasta el proceso de elaboración, creando una conexión más profunda con el comensal.",
            "Tours virtuales: Muestra la calidad y el cuidado detrás de tu producto con visitas a tus viñedos, tu granja o las cocinas de tu restaurante.",
            "Formación de personal: Utiliza simulaciones de cocina para mejorar la eficiencia, la seguridad y la consistencia en la preparación de alimentos."
        ],
        benefit: "Diferénciate de la competencia y crea una narrativa poderosa y multisensorial alrededor de tu marca gastronómica."
    },
    {
        icon: <GraduationCap className="h-8 w-8" />,
        title: "Formación y Educación",
        subtitle: "Aprende haciendo, sin riesgos.",
        points: [
            "Simuladores de seguridad: Entrena a tu personal en protocolos de emergencia, evacuación o manejo de crisis en un entorno 100% seguro.",
            "Formación técnica compleja: Permite practicar la manipulación de equipos costosos o peligrosos sin riesgo de accidentes o daños materiales.",
            "Educación inmersiva: Lleva a los alumnos a explorar el cuerpo humano, viajar a Marte o diseccionar una rana virtualmente, haciendo el aprendizaje más dinámico y efectivo."
        ],
        benefit: "Mejora la retención de conocimientos hasta en un 80%, reduce costes de formación y aumenta la seguridad."
    },
    {
        icon: <Home className="h-8 w-8" />,
        title: "Inmobiliaria y Arquitectura",
        subtitle: "Diseña y vende el futuro.",
        points: [
            "Tours virtuales de propiedades: Ofrece visitas 24/7 desde cualquier lugar del mundo, filtrando clientes realmente interesados y ahorrando tiempo.",
            "Maquetas virtuales interactivas: Transforma planos 2D en experiencias 3D inmersivas, permitiendo a los clientes pasear por su futuro hogar y sentir las dimensiones del espacio.",
            "Personalización en tiempo real: Muestra diferentes acabados, tipos de iluminación o mobiliario con un simple clic, facilitando la toma de decisiones y acelerando el cierre de ventas."
        ],
        benefit: "Acelera el proceso de venta, reduce costes de construcción de pisos piloto y ofrece una herramienta de marketing innovadora."
    },
    {
        icon: <HeartPulse className="h-8 w-8" />,
        title: "Salud y Terapia",
        subtitle: "Sanar y entrenar con tecnología.",
        points: [
            "Simulaciones quirúrgicas: Permite a los cirujanos practicar procedimientos complejos en un entorno seguro, mejorando su precisión y reduciendo riesgos.",
            "Terapia de exposición: Ayuda a pacientes a superar fobias, ansiedad o TEPT al exponerlos a sus miedos en un entorno virtual controlado y seguro.",
            "Rehabilitación física y cognitiva: Transforma ejercicios monótonos en juegos interactivos, aumentando la motivación y la efectividad de la recuperación."
        ],
        benefit: "Mejora la seguridad en la formación médica, aumenta la eficacia de las terapias y ofrece tratamientos más accesibles y motivadores."
    },
    {
        icon: <Cog className="h-8 w-8" />,
        title: "Industria y Manufactura",
        subtitle: "Optimiza procesos y reduce riesgos.",
        points: [
            "Simulaciones de procesos ('Digital Twins'): Crea réplicas virtuales de tus instalaciones para visualizar y optimizar cadenas de producción o flujos de trabajo antes de implementarlos.",
            "Entrenamiento en maquinaria pesada: Forma a operarios en el uso de maquinaria compleja sin riesgo de accidentes, reduciendo costes y paradas de producción.",
            "Asistencia remota y mantenimiento: Permite a los técnicos practicar reparaciones en réplicas virtuales, guiados por expertos a distancia para mejorar la precisión."
        ],
        benefit: "Aumenta la seguridad laboral, reduce los errores humanos, minimiza el tiempo de inactividad y optimiza la eficiencia operativa."
    }
];

export default function VrPage() {
  return (
    <>
      <section className="relative text-primary-foreground h-screen flex items-center justify-center">
        <Image 
          src={heroImage}
          alt="Realidad Virtual"
          fill
          className="object-cover"
          placeholder="blur"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                El Poder de la Realidad Virtual
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                En un mundo saturado de información, la clave es no solo mostrar, sino hacer sentir. No solo creamos contenido de realidad virtual, sino que diseñamos experiencias inmersivas que conectan a tu público de una manera única. La realidad virtual es más que una tecnología; es una herramienta estratégica para emocionar, educar e impulsar tu negocio.
            </p>
            <div className="mt-8">
                <ContactModal>
                  <Button size="lg" className="font-bold">
                    Descubre Nuestras Soluciones
                  </Button>
                </ContactModal>
              </div>
          </FadeIn>
        </div>
      </section>

      <main className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
            <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Nuestros Servicios por Ámbito</h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {serviceCards.map((card, index) => (
                    <FadeIn key={card.title} delay={index * 0.1}>
                        <div className="card-animated-border h-full">
                            <Card className="service-card bg-card rounded-xl p-8 shadow-md flex flex-col h-full">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                                        {card.icon}
                                    </div>
                                    <CardTitle className="text-xl font-bold mb-2 text-foreground">{card.title}</CardTitle>
                                    <p className="text-muted-foreground mb-4 text-sm font-medium">{card.subtitle}</p>
                                </div>
                                <div className="flex-grow">
                                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2 mb-4">
                                        {card.points.map(point => (
                                            <li key={point}>
                                                <span dangerouslySetInnerHTML={{ __html: point.replace(/<b>(.*?)<\/b>/g, '<strong class="text-foreground/90">$1</strong>') }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-sm font-semibold text-primary mt-auto">{card.benefit}</p>
                            </Card>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    </main>

    <section className="bg-card">
         <div className="container mx-auto px-6 py-20 text-center">
             <FadeIn>
                <h3 className="text-3xl font-bold mb-4 text-foreground">¿Listo para transformar tu negocio?</h3>
                <p className="max-w-xl mx-auto mb-6 text-muted-foreground">Contáctanos y descubre cómo la realidad virtual puede llevar tu marca al siguiente nivel.</p>
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
