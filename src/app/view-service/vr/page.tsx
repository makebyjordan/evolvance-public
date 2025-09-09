
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
    Radio, 
    MessageCircle, 
    Globe, 
    Smile, 
    Coffee, 
    GraduationCap, 
    Home, 
    Building2,
    HeartPulse
} from 'lucide-react';

const services = [
    {
        icon: <MessageCircle className="h-8 w-8 text-primary" />,
        title: "Publicidad y Marketing",
        subtitle: "Conecta con tu audiencia de forma inmersiva.",
        points: [
            "<b>Experiencias de marca:</b> Invita a tus clientes a un viaje virtual a la historia de tu marca, el origen de tu producto o el proceso de fabricación para crear un vínculo emocional.",
            "<b>Lanzamientos de productos en RV:</b> Permite que los clientes exploren tu nuevo producto en 3D, lo personalicen y vean su funcionamiento de una forma innovadora y memorable.",
            "<b>Publicidad interactiva (\"Advergaming\"):</b> Crea anuncios que no solo se ven, sino que se viven, transformando la publicidad en una aventura personal que el usuario no querrá saltarse."
        ],
        benefit: "Genera un impacto emocional hasta 10 veces mayor que la publicidad tradicional, mejora el recuerdo de la marca y atrae a un público más joven."
    },
    {
        icon: <Globe className="h-8 w-8 text-primary" />,
        title: "Turismo y Cultura",
        subtitle: "Viaja sin límites, explora el pasado.",
        points: [
            "<b>Tours virtuales 360º:</b> Permite a los clientes recorrer hoteles, resorts, museos o monumentos con un realismo asombroso antes de reservar.",
            "<b>Recreaciones históricas:</b> Da vida al patrimonio permitiendo \"caminar\" por ciudades antiguas, presenciar eventos del pasado o interactuar con personajes históricos.",
            "<b>Experiencias de destino:</b> Promociona lugares turísticos con experiencias interactivas, como un safari virtual o un paseo en góndola por Venecia, para inspirar a futuros viajeros."
        ],
        benefit: "Aumenta la visibilidad y el alcance, generando un interés genuino que se traduce en más reservas y visitas."
    },
    {
        icon: <Smile className="h-8 w-8 text-primary" />,
        title: "Eventos y Fiestas",
        subtitle: "La experiencia que lo cambia todo.",
        points: [
            "<b>Stands interactivos:</b> Atrae multitudes en ferias con juegos, demostraciones de productos en 3D o simuladores que te diferencian de la competencia.",
            "<b>Activaciones de marca:</b> Involucra a tus clientes con experiencias lúdicas e inolvidables que transmitan los valores de tu marca.",
            "<b>Eventos híbridos:</b> Permite que los asistentes virtuales participen en conferencias, conciertos o celebraciones como si estuvieran allí, interactuando en tiempo real."
        ],
        benefit: "Crea un factor sorpresa único, genera contenido viralizable y fortalece la conexión emocional con tu marca."
    },
    {
        icon: <Coffee className="h-8 w-8 text-primary" />,
        title: "Gastronomía",
        subtitle: "Degusta el futuro de la cocina.",
        points: [
            "<b>Storytelling inmersivo:</b> Cuenta la historia detrás de tus platos, desde el origen de los ingredientes hasta el proceso de elaboración, creando una conexión más profunda con el comensal.",
            "<b>Tours virtuales:</b> Muestra la calidad y el cuidado detrás de tu producto con visitas a tus viñedos, tu granja o las cocinas de tu restaurante.",
            "<b>Formación de personal:</b> Utiliza simulaciones de cocina para mejorar la eficiencia, la seguridad y la consistencia en la preparación de alimentos."
        ],
        benefit: "Diferénciate de la competencia y crea una narrativa poderosa y multisensorial alrededor de tu marca gastronómica."
    },
    {
        icon: <GraduationCap className="h-8 w-8 text-primary" />,
        title: "Formación y Educación",
        subtitle: "Aprende haciendo, sin riesgos.",
        points: [
            "<b>Simuladores de seguridad:</b> Entrena a tu personal en protocolos de emergencia, evacuación o manejo de crisis en un entorno 100% seguro.",
            "<b>Formación técnica compleja:</b> Permite practicar la manipulación de equipos costosos o peligrosos sin riesgo de accidentes o daños materiales.",
            "<b>Educación inmersiva:</b> Lleva a los alumnos a explorar el cuerpo humano, viajar a Marte o diseccionar una rana virtualmente, haciendo el aprendizaje más dinámico y efectivo."
        ],
        benefit: "Mejora la retención de conocimientos hasta en un 80%, reduce costes de formación y aumenta la seguridad."
    },
    {
        icon: <Home className="h-8 w-8 text-primary" />,
        title: "Inmobiliaria y Arquitectura",
        subtitle: "Diseña y vende el futuro.",
        points: [
            "<b>Tours virtuales de propiedades:</b> Ofrece visitas 24/7 desde cualquier lugar del mundo, filtrando clientes realmente interesados y ahorrando tiempo.",
            "<b>Maquetas virtuales interactivas:</b> Transforma planos 2D en experiencias 3D inmersivas, permitiendo a los clientes pasear por su futuro hogar y sentir las dimensiones del espacio.",
            "<b>Personalización en tiempo real:</b> Muestra diferentes acabados, tipos de iluminación o mobiliario con un simple clic, facilitando la toma de decisiones y acelerando el cierre de ventas."
        ],
        benefit: "Acelera el proceso de venta, reduce costes de construcción de pisos piloto y ofrece una herramienta de marketing innovadora."
    },
    {
        icon: <HeartPulse className="h-8 w-8 text-primary" />,
        title: "Salud y Terapia",
        subtitle: "Sanar y entrenar con tecnología.",
        points: [
            "<b>Simulaciones quirúrgicas:</b> Permite a los cirujanos practicar procedimientos complejos en un entorno seguro, mejorando su precisión y reduciendo riesgos.",
            "<b>Terapia de exposición:</b> Ayuda a pacientes a superar fobias, ansiedad o TEPT al exponerlos a sus miedos en un entorno virtual controlado y seguro.",
            "<b>Rehabilitación física y cognitiva:</b> Transforma ejercicios monótonos en juegos interactivos, aumentando la motivación y la efectividad de la recuperación."
        ],
        benefit: "Mejora la seguridad en la formación médica, aumenta la eficacia de las terapias y ofrece tratamientos más accesibles y motivadores."
    },
    {
        icon: <Building2 className="h-8 w-8 text-primary" />,
        title: "Industria y Manufactura",
        subtitle: "Optimiza procesos y reduce riesgos.",
        points: [
            "<b>Simulaciones de procesos (\"Digital Twins\"):</b> Crea réplicas virtuales de tus instalaciones para visualizar y optimizar cadenas de producción o flujos de trabajo antes de implementarlos.",
            "<b>Entrenamiento en maquinaria pesada:</b> Forma a operarios en el uso de maquinaria compleja sin riesgo de accidentes, reduciendo costes y paradas de producción.",
            "<b>Asistencia remota y mantenimiento:</b> Permite a los técnicos practicar reparaciones en réplicas virtuales, guiados por expertos a distancia para mejorar la precisión."
        ],
        benefit: "Aumenta la seguridad laboral, reduce los errores humanos, minimiza el tiempo de inactividad y optimiza la eficiencia operativa."
    }
];

export default function VrServicePage() {
    return (
        <main className="py-16 md:py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Nuestros Servicios de Realidad Virtual por Ámbito</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="card-animated-border h-full">
                            <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6 mx-auto">
                                        {service.icon}
                                    </div>
                                    <CardTitle className="text-xl font-bold mb-2 text-center">{service.title}</CardTitle>
                                    <CardDescription className="text-center text-sm font-medium">{service.subtitle}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="list-disc list-inside text-sm space-y-2 mb-4 text-muted-foreground">
                                        {service.points.map((point, pIndex) => (
                                            <li key={pIndex} dangerouslySetInnerHTML={{ __html: point }} />
                                        ))}
                                    </ul>
                                    <p className="text-sm font-semibold mt-auto text-foreground">{service.benefit}</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
