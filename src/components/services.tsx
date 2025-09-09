
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

const defaultIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;


export default async function Services() {

  const content = await getWebContent<ServicesContent>('services');

  const defaultContent: ServicesContent = {
    title: 'Un Universo de Soluciones a tu Medida',
    items: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2"/><path d="M12 13h2"/></svg>`,
        title: 'IA y Automatización',
        description: 'Eleva tu eficiencia con chatbots inteligentes, asistentes de voz y automatización integral de procesos.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
        title: 'Marketing y Gestión de Redes',
        description: 'Conquista tu mercado digital con estrategias de contenido, SEO y campañas de ads que convierten.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-view"><path d="M5 12s2.545-5 7-5 7 5 7 5-2.545 5-7 5-7-5-7-5z"/><path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>`,
        title: 'Realidad Virtual y Experiencias Inmersivas',
        description: 'Crea mundos que cautivan. Desarrollamos desde tours virtuales hasta simulaciones de producto que marcan la diferencia.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-check"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>`,
        title: 'Gestión de Eventos con Soporte Tecnológico',
        description: 'Potenciamos tus eventos con tecnología de punta: apps personalizadas, streaming interactivo y logística automatizada.',
      },
    ]
  };

  const { title, items } = content || defaultContent;


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
            const isAIService = service.title === 'IA y Automatización';
            return (
                <FadeIn key={index} delay={index * 0.1}>
                <InteractiveCard className="h-full card-gradient-hover flex flex-col">
                    <CardHeader className="flex flex-row items-start gap-6 p-6">
                      <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                          <SvgRenderer svgString={service.icon || defaultIconSVG} className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-bold text-lg text-foreground">{service.title}</CardTitle>
                        <CardDescription className="mt-1 text-muted-foreground">{service.description}</CardDescription>
                      </div>
                    </CardHeader>
                    {isAIService && (
                      <CardFooter className="mt-auto p-6 pt-0">
                        <Button asChild variant="link" className="p-0 h-auto text-primary">
                          <Link href="/view-service/ia">Saber más... <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </CardFooter>
                    )}
                </InteractiveCard>
                </FadeIn>
            )
          })}
        </div>
        <FadeIn>
            <div className="mt-16 text-center">
                <Button asChild size="lg" variant="secondary">
                    <Link href="/services">Ver todos los Servicios</Link>
                </Button>
            </div>
        </FadeIn>
      </div>
    </section>
  );
}
