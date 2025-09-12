
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from '@/components/fade-in';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { BrainCircuit, Briefcase, Handshake, HeartHandshake, Users } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';


const TABS = [
  { id: 'cliente', label: 'Atención al Cliente', icon: <HeartHandshake /> },
  { id: 'marketing', label: 'Marketing y Ventas', icon: <Briefcase /> },
  { id: 'operaciones', label: 'Operaciones y Finanzas', icon: <Users /> },
  { id: 'rrhh', label: 'Recursos Humanos', icon: <Handshake /> },
  { id: 'procesos', label: 'Soporte y Procesos', icon: <BrainCircuit /> },
];

const SOLUTIONS = {
  cliente: {
    title: "Una Experiencia de Cliente que Marca la Diferencia",
    description: "En un mercado competitivo, la lealtad se construye en cada interacción. La IA no es solo una herramienta de soporte; es un motor estratégico para ofrecer un servicio proactivo, personalizado y disponible 24/7. Transforma tu atención al cliente de un centro de costes a un generador de ingresos y fidelidad.",
    process: [
      "Análisis y Estrategia: Mapeamos el 'customer journey' completo. Identificamos los puntos de fricción y las consultas más frecuentes para definir dónde la IA puede generar el mayor impacto.",
      "Diseño Conversacional: No creamos robots, creamos personalidades. Definimos la voz y el tono de tu asistente virtual para que se alinee con tu marca y diseñamos flujos de diálogo empáticos y eficientes.",
      "Desarrollo e Integración Omnicanal: Construimos la solución y la integramos de forma nativa con tus sistemas (CRM, ERP) para que la experiencia sea coherente en todos los canales: web, app, WhatsApp, etc.",
      "Entrenamiento y Optimización Continua: Entrenamos a la IA con tus datos históricos para asegurar respuestas precisas. Analizamos cada interacción para mejorar y ampliar sus capacidades constantemente.",
      "Lanzamiento y Acompañamiento: Te acompañamos en una puesta en marcha gradual y segura. Ofrecemos soporte técnico y estratégico continuo para asegurar que la solución evolucione.",
    ],
    services: [
      {
        title: "Chatbots Conversacionales",
        description: "Implementamos agentes virtuales que entienden la intención, el contexto y el sentimiento del usuario, resolviendo dudas complejas y guiando a tus clientes 24/7.",
        problem: "Elimina tiempos de espera, cualifica leads de forma automática y libera a tu equipo humano para que se enfoque en tareas estratégicas.",
        how: "Utilizamos plataformas de IA líderes y las integramos con tu CRM. Diseñamos flujos que pueden escalar a un agente humano de forma transparente."
      },
      {
        title: "Asistentes de Voz (IVR Inteligente)",
        description: "Moderniza tu centro de llamadas con sistemas que comprenden el lenguaje natural, permitiendo a los clientes realizar gestiones complejas por teléfono simplemente hablando.",
        problem: "Reduce la frustración y el abandono de llamadas, agiliza la resolución de problemas comunes (pagos, citas, etc.) y mejora drásticamente la percepción de tu marca.",
        how: "Diseñamos un árbol conversacional dinámico, integramos el sistema con tu telefonía y lo conectamos a tus bases de datos para ejecutar acciones reales."
      },
      {
        title: "Análisis de Sentimiento",
        description: "Analizamos miles de interacciones (chats, correos, reseñas) para medir el nivel de satisfacción de tus clientes en tiempo real e identificar problemas.",
        problem: "Te da una visión clara y sin filtros de la 'voz del cliente'. Permite identificar proactivamente a clientes en riesgo y encontrar oportunidades de mejora.",
        how: "Implementamos modelos de Procesamiento de Lenguaje Natural que clasifican cada interacción y te presentamos los resultados en un dashboard intuitivo."
      }
    ]
  },
  marketing: {
    title: "Marketing de Precisión para Acelerar el Crecimiento",
    description: "La era del marketing masivo ha terminado. La IA te permite pasar de la segmentación demográfica a la predicción del comportamiento individual. Convierte tus datos en tu mayor activo estratégico para atraer, convertir y fidelizar clientes.",
    process: [
        "Auditoría de Datos y Objetivos: Analizamos tus fuentes de datos (CRM, Analytics, etc.) y definimos contigo los KPIs clave a mejorar: CAC, LTV, tasa de conversión, etc.",
        "Diseño de la Estrategia de IA: Seleccionamos los modelos de Machine Learning más adecuados para tus objetivos: scoring de leads, predicción de churn, o motores de recomendación.",
        "Implementación y Entrenamiento de Modelos: Nuestro equipo de ciencia de datos desarrolla y entrena los modelos predictivos utilizando tus datos históricos.",
        "Activación y Orquestación de Campañas: Integramos las predicciones de la IA directamente en tus herramientas de marketing (HubSpot, Salesforce) para automatizar campañas hiperpersonalizadas.",
        "Medición del ROI y Optimización: Monitorizamos el rendimiento de los modelos en tiempo real y los reentrenamos periódicamente, proporcionando informes claros que demuestran el ROI.",
    ],
    services: [
      {
        title: "Análisis Predictivo de Ventas",
        description: "Utilizamos Machine Learning para analizar tus datos y predecir qué clientes tienen más probabilidades de comprar, de volver a comprar o de abandonar tu servicio (churn).",
        problem: "Permite a tu equipo de ventas enfocar sus esfuerzos en los leads de mayor calidad y al marketing lanzar campañas de retención proactivas.",
        how: "Nos integramos con tu CRM y tu base de datos de clientes, analizamos el historial de comportamiento y creamos un sistema de puntuación (scoring) dinámico."
      },
      {
        title: "Personalización Dinámica 1-a-1",
        description: "Adaptamos el contenido de tu web, las recomendaciones de productos y las campañas de email marketing en tiempo real según el comportamiento de cada usuario.",
        problem: "Aumenta drásticamente la relevancia de tus comunicaciones, mejorando la tasa de conversión, el valor medio del pedido (AOV) y la fidelidad del cliente.",
        how: "Implementamos un motor de recomendación en tu plataforma y lo conectamos con tus herramientas de marketing para crear experiencias coherentes."
      },
      {
        title: "Optimización de Campañas con IA",
        description: "Maximizamos el retorno de tu inversión publicitaria (ROAS). La IA analiza miles de variables para optimizar tus campañas en Google Ads y Meta Ads.",
        problem: "Elimina las conjeturas en la gestión de campañas. Asegura que cada euro invertido se destine a las audiencias y creatividades que generan un mayor retorno.",
        how: "Conectamos nuestros algoritmos a tus cuentas publicitarias para realizar análisis en tiempo real y aplicar ajustes automáticos basados en el rendimiento."
      }
    ]
  },
  operaciones: {
    title: "El Sistema Nervioso Inteligente de tu Empresa",
    description: "La eficiencia operativa ya no es una opción, es la clave para la escalabilidad. Aplicamos IA para transformar tus procesos centrales, dotándolos de una inteligencia que anticipa problemas, optimiza recursos y protege tu negocio.",
    process: [
        "Diagnóstico y Mapeo de Procesos: Identificamos los cuellos de botella, las tareas manuales y los puntos de riesgo que merman tu eficiencia.",
        "Diseño de la Solución a Medida: Proponemos la combinación de tecnologías de IA más adecuada: OCR para documentos, modelos predictivos para la demanda, etc.",
        "Desarrollo e Integración Robusta: Construimos la solución para que se adapte como un guante a tus operaciones y la integramos sin fisuras con tu software de gestión (ERP, SCM).",
        "Pruebas en Entorno Real: Antes del despliegue, realizamos pruebas piloto para validar la eficacia de la solución y realizar ajustes finos.",
        "Puesta en Marcha y Monitorización de KPIs: Desplegamos la solución y establecemos un cuadro de mandos para monitorizar los KPIs clave y demostrar el ROI del proyecto.",
    ],
    services: [
      {
        title: "Procesamiento Inteligente de Documentos",
        description: "Automatizamos la extracción y validación de datos de cualquier tipo de documento (facturas, albaranes, contratos), eliminando la entrada manual.",
        problem: "Ahorra miles de horas de trabajo administrativo, reduce la tasa de error a casi cero y acelera drásticamente los ciclos de facturación.",
        how: "Implementamos un software de OCR con IA que no solo lee, sino que entiende, clasifica y valida la información contra tu base de datos."
      },
      {
        title: "Detección de Fraude en Tiempo Real",
        description: "Nuestros modelos de IA analizan miles de transacciones por segundo para detectar patrones anómalos y posibles fraudes, bloqueando actividades sospechosas.",
        problem: "Protege tus ingresos, reduce los costosos chargebacks y mantiene la confianza de tus clientes al garantizar un entorno de transacciones seguro.",
        how: "Desarrollamos modelos de aprendizaje automático que se adaptan y aprenden de nuevos patrones de fraude, superando a los sistemas basados en reglas."
      }
    ]
  },
  rrhh: {
    title: "La Revolución de la Experiencia del Empleado",
    description: "El talento es tu activo más valioso. Utiliza la IA para crear un entorno de trabajo más eficiente, justo y atractivo. Automatiza las tareas administrativas para que tu equipo de RRHH se convierta en un socio estratégico.",
    process: [
        "Mapeo del 'Employee Journey': Analizamos cada etapa del ciclo de vida del empleado para identificar los procesos clave a optimizar.",
        "Diseño de Flujos de Trabajo Inteligentes: Creamos workflows automatizados para tareas críticas como el onboarding, gestión de ausencias, o evaluaciones de desempeño.",
        "Implementación de Herramientas de IA para RRHH: Integramos o desarrollamos chatbots internos, sistemas de cribado curricular o plataformas de análisis de sentimiento.",
        "Gestión del Cambio y Adopción: Capacitamos a tu equipo de RRHH y a los managers para que no solo usen las nuevas herramientas, sino que lideren la transformación.",
        "Análisis de People Analytics: Te ayudamos a medir el impacto de las iniciativas en métricas clave como la rotación, el tiempo de contratación, y el eNPS.",
    ],
    services: [
      {
        title: "Reclutamiento Inteligente",
        description: "Automatizamos el filtrado de currículums y la preselección de candidatos, identificando el mejor talento de forma más rápida y objetiva.",
        problem: "Reduce el tiempo de contratación hasta un 50%, mejora la calidad de los candidatos y promueve un entorno de trabajo más diverso.",
        how: "Utilizamos IA para analizar la semántica de los CVs, y configuramos chatbots para realizar las primeras entrevistas de cribado 24/7."
      },
      {
        title: "Onboarding y Offboarding Automatizado",
        description: "Creamos flujos de trabajo que automatizan todas las tareas de incorporación y desvinculación (creación de cuentas, envío de material, revocación de accesos).",
        problem: "Garantiza una experiencia de empleado impecable desde el primer día y asegura que ningún paso crítico de seguridad o legal se olvide.",
        how: "Diseñamos workflows personalizados en tu plataforma de RRHH que se conectan con todos tus sistemas (TI, Finanzas, etc.)."
      },
      {
        title: "Asistente Virtual para Empleados",
        description: "Implementamos un chatbot interno (en Teams, Slack) que resuelve al instante las dudas de los empleados sobre nóminas, vacaciones, o políticas internas.",
        problem: "Libera al departamento de RRHH y de TI de responder constantemente a las mismas preguntas, permitiendo que los empleados sean más autónomos.",
        how: "Creamos una base de conocimiento centralizada y entrenamos a un asistente virtual para que pueda responder preguntas en lenguaje natural."
      }
    ]
  },
  procesos: {
    title: "Construyendo una Organización Autónoma y Eficiente",
    description: "La verdadera transformación digital reside en la optimización de los procesos que sustentan tu día a día. Aplicamos la automatización inteligente para eliminar tareas repetitivas y agilizar flujos de trabajo.",
     process: [
        "Auditoría de Procesos: Colaboramos con tus equipos para identificar y priorizar los procesos internos con mayor potencial de automatización.",
        "Selección de Tecnología: Determinamos la mejor herramienta para cada tarea, ya sea RPA para tareas basadas en reglas, IA para decisiones complejas, o una combinación.",
        "Desarrollo de 'Digital Workers': Creamos y configuramos los 'robots de software' que ejecutarán las tareas diseñando flujos de trabajo resilientes.",
        "Implementación y Gobierno del Cambio: Desplegamos las automatizaciones de forma controlada y nos aseguramos de que tus empleados entiendan cómo trabajar junto a sus 'compañeros digitales'.",
        "Monitorización y Escalado: Medimos el rendimiento de cada automatización (horas ahorradas, precisión, etc.) y te ayudamos a escalar la automatización a toda la organización.",
    ],
    services: [
      {
        title: "Sistemas de Ticketing Inteligentes",
        description: "Automatizamos la gestión de peticiones para que cada mensaje de soporte llegue al agente o departamento adecuado al instante.",
        problem: "Ayuda a responder más rápido a los clientes, mejorando su satisfacción, y aumenta la eficiencia de tu equipo de soporte.",
        how: "Utilizamos IA para analizar el contenido de cada ticket y lo integramos con tu herramienta de gestión (Jira, Zendesk) para aplicar reglas de negocio."
      },
      {
        title: "Respuestas Automáticas a FAQ",
        description: "Configuramos un bot que se encarga de dar respuestas instantáneas a las preguntas más comunes de tus clientes, 24/7.",
        problem: "Ahorra una gran cantidad de tiempo a tus agentes de soporte, permitiéndoles enfocarse en problemas más complejos y específicos.",
        how: "Creamos una base de conocimiento y la integramos en un chatbot que puede escalar la conversación a un humano si no encuentra la respuesta."
      },
      {
        title: "Automatización de Informes (Reporting)",
        description: "Olvídate de las hojas de cálculo. Automatizamos la creación de tus informes para que la información que necesitas llegue a tu email sin esfuerzo.",
        problem: "Ahorra tiempo y te da una visión clara y en tiempo real del rendimiento de tu negocio para tomar mejores decisiones.",
        how: "Creamos flujos de trabajo que se conectan a tus sistemas y presentan la información en dashboards (Power BI, Google Data Studio) o la envían a tu email."
      }
    ]
  }
};


const FAQS = [
    {
        question: "¿Mi empresa es demasiado pequeña para la IA?",
        answer: "No en absoluto. La IA no es solo para grandes corporaciones. Existen soluciones escalables que pueden generar un gran impacto incluso en pymes. La clave está en identificar un problema de negocio concreto que la IA pueda resolver de manera eficiente."
    },
    {
        question: "¿Cuánto cuesta un proyecto de IA y cómo se determina el precio?",
        answer: "El coste varía mucho según la complejidad. Nuestro proceso siempre comienza con una evaluación inicial gratuita para entender tus necesidades. El precio se determina en función de las horas de desarrollo, la tecnología utilizada y el nivel de personalización."
    },
    {
        question: "¿Qué tipo de datos necesito para empezar a trabajar con IA?",
        answer: "La calidad y cantidad de los datos son importantes. Dependiendo del objetivo, podríamos necesitar datos de tu CRM, web, etc. En la fase de análisis, evaluamos la calidad de tus datos y te ayudamos a diseñar una estrategia para recopilar la información que falta."
    },
    {
        question: "¿Cuánto tiempo se tarda en ver resultados (ROI)?",
        answer: "El tiempo para ver un retorno de la inversión (ROI) depende del proyecto. Las automatizaciones de procesos (RPA) pueden mostrar un ahorro casi inmediato. Los proyectos más complejos, como los modelos predictivos, pueden tardar unos meses en optimizarse."
    },
     {
        question: "¿Cómo garantizan la seguridad y privacidad de mis datos?",
        answer: "La seguridad es nuestra máxima prioridad. Cumplimos estrictamente con el RGPD. Todos los datos se tratan de forma confidencial, se anonimizan siempre que es posible y se almacenan en infraestructuras seguras en la nube (Google Cloud, AWS, Azure)."
    },
    {
        question: "¿Qué soporte ofrecen una vez que el proyecto está en marcha?",
        answer: "El lanzamiento es solo el principio. Ofrecemos planes de soporte y mantenimiento flexibles para garantizar que la solución funcione de manera óptima y evolucione. Esto incluye monitorización, corrección de errores y actualizaciones."
    }
];

export default function IaPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const activeContent = SOLUTIONS[activeTab as keyof typeof SOLUTIONS];

  return (
    <>
      <section className="relative text-primary-foreground h-[70vh] flex items-center justify-center">
        <Image 
          src={placeholderImages['ia-hero']}
          alt="Inteligencia Artificial"
          fill
          className="object-cover"
          data-ai-hint="artificial intelligence"
        />
         <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Transforma tu Negocio con Inteligencia Artificial</h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/80">Implementamos soluciones de IA y automatización a medida para optimizar procesos, mejorar la experiencia del cliente e impulsar tus ventas.</p>
             <ContactModal>
                <Button size="lg" variant="secondary" className="font-bold">
                    Descubre Nuestras Soluciones
                </Button>
            </ContactModal>
          </FadeIn>
        </div>
      </section>

      <main id="services" className="container mx-auto px-6 py-16">
        <FadeIn>
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Soluciones Inteligentes para Cada Área de tu Negocio</h2>
                <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-8">Desde la interacción con el cliente hasta la optimización de procesos internos, la IA y la automatización pueden generar un impacto real en todos los departamentos. Explora cómo podemos ayudarte a innovar en cada área.</p>
                <div className="flex flex-wrap justify-center border-b border-border">
                    {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                        "py-3 px-6 text-lg transition duration-300",
                        activeTab === tab.id
                            ? "border-b-2 border-primary text-primary font-semibold"
                            : "text-muted-foreground hover:text-primary"
                        )}
                    >
                        {tab.label}
                    </button>
                    ))}
                </div>
            </div>
        </FadeIn>
        
        <FadeIn key={activeTab}>
             <div className="space-y-12">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-foreground">{activeContent.title}</h3>
                    <p className="text-muted-foreground max-w-3xl mx-auto mt-4 text-lg">{activeContent.description}</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Nuestro Proceso de Implementación</h3>
                    <ol className="process-list max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {activeContent.process.map((step, index) => (
                           <li key={index} data-step={index + 1} className="relative pl-10 pt-1 text-muted-foreground before:absolute before:left-0 before:top-0 before:flex before:items-center before:justify-center before:w-8 before:h-8 before:rounded-full before:bg-primary/10 before:text-primary before:font-bold">
                               <strong className="text-foreground">{step.split(':')[0]}:</strong>{step.split(':')[1]}
                           </li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Catálogo de Soluciones</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeContent.services.map((service) => (
                             <div key={service.title} className="card-animated-border h-full">
                                <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm p-6">
                                     <CardHeader className="p-0">
                                        <CardTitle className="text-xl font-bold mb-2 text-primary">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0 flex-grow flex flex-col">
                                        <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                                        <div className="mt-auto space-y-3">
                                            <div>
                                                <h4 className="font-semibold text-sm text-foreground">¿Qué problema resuelve?</h4>
                                                <p className="text-muted-foreground text-sm">{service.problem}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm text-foreground">¿Cómo lo hacemos?</h4>
                                                <p className="text-muted-foreground text-sm">{service.how}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </FadeIn>
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
