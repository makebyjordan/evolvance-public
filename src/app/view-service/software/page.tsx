
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SectionSeparator } from '@/components/section-separator';

const programmingSolutions = [
    {
        title: "CRM a Medida",
        description: "Un CRM hecho solo para ti. Te ayuda a organizar la información de tus clientes y automatizar ventas, marketing y servicio.",
        problemSolved: "Aumenta tu rentabilidad y fideliza a tus clientes. Tu equipo podrá cerrar más ventas y ofrecer un servicio excepcional.",
        howWeDoIt: "Analizamos tu negocio, diseñamos y programamos un CRM a medida, sin funciones innecesarias, para que se adapte a ti."
    },
    {
        title: "Aplicación Móvil",
        description: "Desarrollamos una app para tus clientes o empleados, para que estés siempre en el bolsillo de tu público.",
        problemSolved: "Mejora la experiencia de tus clientes o aumenta la productividad de tu equipo, centralizando todo en una herramienta.",
        howWeDoIt: "Definimos el objetivo, la diseñamos para que sea fácil de usar, la programamos y la publicamos en las tiendas de Google y Apple."
    },
    {
        title: "Web de Gestión de Proyectos",
        description: "Crea una web privada para tu empresa. Centraliza proyectos, documentos y tareas en un solo lugar para un trabajo más organizado.",
        problemSolved: "Mejora la comunicación y elimina la pérdida de tiempo. Tu equipo siempre sabrá en qué punto está cada proyecto.",
        howWeDoIt: "Estudiamos tu forma de trabajar, diseñamos una plataforma intuitiva y programamos las funcionalidades que necesitas."
    },
    {
        title: "Web + CRM Integrado",
        description: "Combina una web profesional con un CRM adaptado. Cada cliente que llegue a tu web quedará registrado automáticamente.",
        problemSolved: "Aumenta la eficiencia al automatizar la captación de datos, permitiendo un seguimiento inmediato y más conversiones.",
        howWeDoIt: "Diseñamos una web atractiva y la unimos a un CRM a medida para que la web alimente al CRM de forma automática."
    }
];

const cybersecuritySolutions = [
    {
        title: "Pruebas de Penetración",
        description: "Actuamos como un hacker ético para encontrar y reportar las debilidades en tus sistemas antes de que lo haga alguien malintencionado.",
        problemSolved: "Te da una visión clara de tu seguridad, permitiéndote solucionar vulnerabilidades antes de que un ataque cause pérdidas o daños.",
        howWeDoIt: "Simulamos un ataque controlado y te entregamos un informe detallado con las vulnerabilidades y recomendaciones para solucionarlas."
    },
    {
        title: "Seguridad Gestionada (MSS)",
        description: "Monitoreamos tus sistemas 24/7 para detectar actividades sospechosas y responder a las amenazas de inmediato.",
        problemSolved: "Minimiza el riesgo de un ciberataque al detectarlo en sus primeras etapas, evitando que un incidente menor se convierta en una crisis.",
        howWeDoIt: "Implementamos una plataforma de monitoreo avanzada y nuestro equipo de expertos actúa en caso de una alerta para contener la amenaza."
    },
    {
        title: "Servicios de Ciberseguridad",
        description: "Te ayudamos a proteger tu negocio de ataques, virus y robos de información para que tus datos y los de tus clientes estén seguros.",
        problemSolved: "Evita pérdidas económicas, protege tu reputación y asegura que tus operaciones no se vean interrumpidas por un ataque.",
        howWeDoIt: "Hacemos una auditoría, implementamos soluciones de protección y capacitamos a tu equipo para mantener la seguridad a largo plazo."
    }
];


export default function SoftwarePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative isolate bg-card/40 pt-32 pb-20 md:pt-40 md:pb-24">
                <SectionSeparator position="top" align="left" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-foreground">Especialistas en Programación y Ciberseguridad</h1>
                    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">Desarrollamos software a medida para potenciar tu negocio y lo protegemos con las mejores soluciones de ciberseguridad.</p>
                    <Button asChild size="lg">
                        <Link href="#solutions">Descubre Nuestras Soluciones</Link>
                    </Button>
                </div>
            </section>

            {/* Solutions Section */}
            <section id="solutions" className="py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Nuestras Áreas de Especialización</h2>
                    
                    <Tabs defaultValue="programacion" className="w-full">
                        <div className="flex justify-center">
                            <TabsList className="grid grid-cols-2 gap-2 h-auto">
                                <TabsTrigger value="programacion" className="text-sm md:text-base px-4 py-2">Programación a Medida</TabsTrigger>
                                <TabsTrigger value="ciberseguridad" className="text-sm md:text-base px-4 py-2">Ciberseguridad</TabsTrigger>
                            </TabsList>
                        </div>
                        
                        <TabsContent value="programacion" className="mt-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {programmingSolutions.map(sol => (
                                    <Card key={sol.title} className="flex flex-col">
                                        <CardHeader>
                                            <CardTitle>{sol.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-grow space-y-4">
                                            <p className="text-muted-foreground">{sol.description}</p>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-1">¿Qué problema resuelve?</h4>
                                                <p className="text-muted-foreground text-sm">{sol.problemSolved}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-1">¿Cómo lo hacemos?</h4>
                                                <p className="text-muted-foreground text-sm">{sol.howWeDoIt}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="ciberseguridad" className="mt-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cybersecuritySolutions.map(sol => (
                                    <Card key={sol.title} className="flex flex-col">
                                        <CardHeader>
                                            <CardTitle>{sol.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-grow space-y-4">
                                            <p className="text-muted-foreground">{sol.description}</p>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-1">¿Qué problema resuelve?</h4>
                                                <p className="text-muted-foreground text-sm">{sol.problemSolved}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-1">¿Cómo lo hacemos?</h4>
                                                <p className="text-muted-foreground text-sm">{sol.howWeDoIt}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                    </Tabs>
                </div>
            </section>
        </>
    );
}
