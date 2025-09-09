
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { FadeIn } from './fade-in';
import { Button } from './ui/button';
import Link from 'next/link';
import { getWebContent, type ServicesContent } from '@/app/actions/web-content-actions';
import { Zap, ArrowRight } from 'lucide-react';
import { InteractiveCard } from './interactive-card';

// Helper component to safely render SVG
function SvgRenderer({ svgString, className }: { svgString: string, className: string }) {
    // Add className to the SVG string
    const modifiedSvgString = svgString.replace('<svg', `<svg class="${className}"`);
    return <div dangerouslySetInnerHTML={{ __html: modifiedSvgString }} />;
}

const defaultIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2z"></polygon></svg>`;


export default async function Services() {

  const content = await getWebContent<ServicesContent>('services');

  const defaultContent: ServicesContent = {
    title: 'Un Universo de Soluciones a tu Medida',
    items: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2"/><path d="M12 13h2"/></svg>`,
        title: 'Inteligencia Artificial y Automatizaciones',
        description: 'Transformamos tu negocio con tecnología de vanguardia. Utilizamos la Inteligencia Artificial a través de chatbots, asistentes de voz y análisis de datos para optimizar procesos y tomar decisiones más inteligentes. Complementamos esto con la automatización de tareas repetitivas como reservas, facturación e inventario, lo que te permite ser más ágiles y centrarte en lo que realmente importa.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
        title: 'Marketing Digital',
        description: 'Convierte tu presencia digital en un activo estratégico. Diseñamos y ejecutamos campañas que atraen a tu audiencia y convierten visitas en clientes leales, llevando tu marca a la cima de su sector. Dominamos el mercado digital con estrategias de contenido, Desarrollo web profesional Branding, Diseño gráfico y copywriting SEO y SEM, Campañas de ads Gestión y creación de contenido en redes.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-view"><path d="M5 12s2.545-5 7-5 7 5 7 5-2.545 5-7 5-7-5-7-5z"/><path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>`,
        title: 'Realidad Virtual y Experiencias Inmersivas',
        description: 'Crea mundos que cautivan. Desarrollamos desde tours virtuales hasta simulaciones de producto que marcan la diferencia.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2z"></polygon></svg>`,
        title: 'Webs, apps, CRMs y mucho más',
        description: 'Desarrollamos software a medida y ofrecemos ciberseguridad de élite. Creamos CRM, apps y webs de gestión para optimizar tus procesos y potenciar tu negocio. Además, protegemos tus datos con análisis de vulnerabilidades, pruebas de penetración y monitoreo 24/7 para que te centres en lo que de verdad importa: el crecimiento de tu empresa.',
      },
    ]
  };

  const { title, items } = content || defaultContent;

  const getServiceLink = (serviceTitle: string) => {
    const lowerCaseTitle = serviceTitle.toLowerCase();
    if (lowerCaseTitle.includes('inteligencia artificial')) {
      return "/view-service/ia";
    }
    if (lowerCaseTitle.includes('webs, apps, crms')) {
      return "/view-service/software";
    }
     if (lowerCaseTitle.includes('marketing digital')) {
      return "/view-service/marketing";
    }
    return "/services";
  };


  return (
    <section id="services" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
            {title}
          </h2>
        </FadeIn>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((service, index) => {
            return (
                <FadeIn key={index} delay={index * 0.1}>
                <InteractiveCard className="h-full card-gradient-hover flex flex-col">
                    <CardHeader className="flex flex-row items-start gap-6 p-6">
                      <div className="p-3 bg-primary/10 rounded-full shrink-0">
                          <SvgRenderer svgString={service.icon || defaultIconSVG} className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-bold text-lg text-foreground">{service.title}</CardTitle>
                        <CardDescription className="mt-1 text-muted-foreground">{service.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter className="mt-auto p-6 pt-0">
                      <Button asChild variant="link" className="p-0 h-auto text-primary">
                          <Link href={getServiceLink(service.title)}>Saber más... <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </CardFooter>
                </InteractiveCard>
                </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  );
}
