
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SectionSeparator } from '@/components/section-separator';

const serviceAreas = [
    { id: 'cliente', name: 'Atención al Cliente' },
    { id: 'marketing', name: 'Marketing y Ventas' },
    { id: 'operaciones', name: 'Operaciones y Finanzas' },
    { id: 'rrhh', name: 'Recursos Humanos' },
    { id: 'procesos', name: 'Soporte y Procesos' },
];

const solutions = {
    cliente: [
        {
            title: "Chatbot",
            description: "¿Te imaginas que tu negocio atienda a los clientes las 24 horas del día? Implementamos chatbots que resuelven dudas, dan información y guían a tus clientes de forma automática.",
            whatIs: "Un programa de conversación que interactúa con tus clientes en tu web, WhatsApp o Messenger, funcionando como un miembro más de tu equipo, siempre disponible.",
            problemSolved: "Mejora la experiencia del cliente con respuestas instantáneas, libera a tu equipo de tareas repetitivas y puede generar más ventas al guiar a los usuarios."
        },
        {
            title: "Asistente de Voz para tu Negocio",
            description: "Lleva la atención al cliente al siguiente nivel. Tus clientes podrán interactuar con tu marca usando su voz, de forma sencilla y sin complicaciones, por teléfono o dispositivos inteligentes.",
            whatIs: "Un sistema inteligente que procesa el lenguaje hablado para entender las peticiones de tus clientes y darles una respuesta o realizar una acción, como si hablaran con una persona.",
            problemSolved: "Mejora la accesibilidad, atiende 24/7, reduce la carga de trabajo de tu equipo y agiliza la resolución de dudas, mejorando la eficiencia general."
        }
    ],
    marketing: [
        { title: "Análisis Predictivo de Ventas", description: "Usamos IA para analizar tus datos y predecir el comportamiento de tus clientes, mostrándote dónde están las mejores oportunidades.", whatIs: "", problemSolved: "Ayuda a cerrar más ventas al identificar a los clientes con más probabilidades de comprar y a optimizar tus campañas de marketing." },
        { title: "Personalización de Experiencia", description: "Creamos un trato individualizado para cada persona que visita tu web o recibe un correo, adaptando el contenido en tiempo real.", whatIs: "", problemSolved: "Aumenta la conexión con tu marca, lo que se traduce en más ventas y más clientes fieles. Ya no se sentirán uno más, sino la prioridad." },
        { title: "Generación de Contenido con IA", description: "La IA se convierte en tu aliada para crear borradores de textos de calidad para redes sociales, emails o descripciones de productos.", whatIs: "", problemSolved: "Te permite aumentar la cantidad de contenido que produces sin sacrificar la calidad, ahorrando tiempo y manteniendo tus canales activos." },
        { title: "Optimización de Campañas", description: "Optimizamos tus campañas en Google y Meta para que tus anuncios lleguen a las personas que realmente quieren comprar.", whatIs: "", problemSolved: "La IA se encarga de que tu presupuesto se gaste de la forma más efectiva posible, consiguiendo más por el mismo dinero." }
    ],
    operaciones: [
        { title: "Optimización de Rutas", description: "Un sistema de IA calcula las rutas de reparto más rápidas y eficientes, considerando el tráfico en tiempo real.", whatIs: "", problemSolved: "Reduce costos de combustible y mejora la satisfacción del cliente con entregas más rápidas y puntuales." },
        { title: "Mantenimiento Predictivo", description: "Un sistema inteligente te avisa cuándo una pieza de maquinaria necesita ser revisada, antes de que cause una avería.", whatIs: "", problemSolved: "Reduce los costos de reparación y el tiempo de inactividad de tu maquinaria, evitando interrupciones." },
        { title: "OCR Inteligente", description: "Escanea documentos como facturas o albaranes y extrae la información clave de forma automática.", whatIs: "", problemSolved: "Ahorra una gran cantidad de tiempo y dinero al eliminar la tarea manual de introducir datos y reduce los errores." },
        { title: "Detección de Fraude con IA", description: "Un guardián financiero que analiza cada operación en tiempo real para encontrar y bloquear actividad sospechosa.", whatIs: "", problemSolved: "Evita pérdidas económicas al prevenir el fraude y protege la reputación de tu empresa y la confianza de tus clientes." },
        { title: "Análisis de Riesgo Crediticio", description: "Evalúa la solvencia de tus clientes o socios de manera rápida y precisa para tomar decisiones más seguras.", whatIs: "", problemSolved: "Reduce el riesgo de pérdidas por impagos y agiliza el proceso de aprobación de créditos con una base de datos sólida." },
        { title: "Conciliación Bancaria Inteligente", description: "Automatiza la comparación de extractos bancarios con tus registros contables, eliminando un proceso tedioso.", whatIs: "", problemSolved: "Ahorra tiempo, reduce errores y asegura que tus cuentas estén siempre al día para una visión clara de tu salud financiera." }
    ],
    rrhh: [
        { title: "Automatización de Contratación", description: "Gestiona todo el ciclo de contratación, desde la publicación de la oferta hasta la programación de entrevistas.", whatIs: "", problemSolved: "Acelera tus contrataciones y mejora la calidad de los candidatos al filtrar y seleccionar a los más adecuados." },
        { title: "Onboarding y Offboarding", description: "Automatiza las tareas al inicio y al final de la relación laboral, asegurando una bienvenida perfecta y una salida organizada.", whatIs: "", problemSolved: "Garantiza un proceso fluido y profesional, mejorando la experiencia del empleado y protegiendo la seguridad de la empresa." },
        { title: "Gestión de Nóminas y Ausencias", description: "Simplifica la gestión de nóminas, vacaciones y permisos, encargándose de los cálculos y registros automáticamente.", whatIs: "", problemSolved: "Reduce errores humanos en cálculos, ahorra tiempo a RR.HH. y garantiza registros precisos." }
    ],
    procesos: [
        { title: "Sistemas de Ticketing Inteligentes", description: "Automatizamos la gestión de peticiones para que cada mensaje de soporte llegue al agente adecuado al instante.", whatIs: "", problemSolved: "Ayuda a responder más rápido, mejorando la satisfacción del cliente y aumentando la eficiencia de tu equipo." },
        { title: "Análisis de Sentimiento", description: "Analizamos miles de interacciones para medir la satisfacción de tus clientes e identificar problemas antes de que sean graves.", whatIs: "", problemSolved: "Te da una visión clara de lo que funciona y lo que no, permitiendo identificar a clientes insatisfechos de forma proactiva." },
        { title: "Respuestas Automáticas a FAQ", description: "Configuramos un bot que se encarga de dar respuestas instantáneas a las preguntas más comunes de tus clientes, 24/7.", whatIs: "", problemSolved: "Ahorra tiempo a tus agentes, permitiéndoles enfocarse en problemas más complejos y específicos." },
        { title: "Automatización de Informes", description: "Olvídate de las hojas de cálculo. Automatizamos la creación de informes para que la información llegue a tu email sin esfuerzo.", whatIs: "", problemSolved: "Ahorra tiempo y te da una visión clara y en tiempo real del rendimiento para tomar mejores decisiones." },
        { title: "Gestión de Infraestructura de TI", description: "Automatizamos tareas críticas como copias de seguridad o despliegue de software para mantener tu infraestructura segura.", whatIs: "", problemSolved: "Reduce errores humanos, protege tus datos y garantiza que tus sistemas estén siempre disponibles." }
    ]
};


export default function IaPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative isolate bg-card/40 pt-32 pb-20 md:pt-40 md:pb-24">
                <SectionSeparator position="top" align="left" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-foreground">Transforma tu Negocio con Inteligencia Artificial</h1>
                    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">Implementamos soluciones de IA y automatización a medida para optimizar procesos, mejorar la experiencia del cliente e impulsar tus ventas.</p>
                    <Button asChild size="lg">
                        <Link href="#solutions">Descubre Nuestras Soluciones</Link>
                    </Button>
                </div>
            </section>

            {/* Solutions Section */}
            <section id="solutions" className="py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Nuestras Áreas de Especialización</h2>
                    
                    <Tabs defaultValue="cliente" className="w-full">
                        <div className="flex justify-center">
                            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 h-auto">
                                {serviceAreas.map(area => (
                                    <TabsTrigger key={area.id} value={area.id} className="text-sm md:text-base px-4 py-2">{area.name}</TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                        
                        {Object.entries(solutions).map(([key, solutionList]) => (
                            <TabsContent key={key} value={key} className="mt-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {solutionList.map(sol => (
                                        <div key={sol.title} className="card-animated-border h-full">
                                            <Card className="flex flex-col h-full">
                                                <CardHeader>
                                                    <CardTitle>{sol.title}</CardTitle>
                                                </CardHeader>
                                                <CardContent className="flex-grow space-y-4">
                                                    <p className="text-muted-foreground">{sol.description}</p>
                                                    {sol.whatIs && (
                                                        <div>
                                                            <h4 className="font-semibold text-foreground mb-1">¿Qué es?</h4>
                                                            <p className="text-muted-foreground text-sm">{sol.whatIs}</p>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h4 className="font-semibold text-foreground mb-1">¿Qué problema resuelve?</h4>
                                                        <p className="text-muted-foreground text-sm">{sol.problemSolved}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>
        </>
    );
}
