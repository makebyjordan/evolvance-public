
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { FadeIn } from './fade-in';
import { Button } from './ui/button';
import Link from 'next/link';
import { getWebContent, type ServicesContent } from '@/app/actions/web-content-actions';
import { ArrowRight } from 'lucide-react';
import { InteractiveCard } from './interactive-card';

// Helper component to safely render SVG
function SvgRenderer({ svgString, className }: { svgString: string, className: string }) {
    if (!svgString || typeof svgString !== 'string') return null;
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
        description: 'Potenciamos tu negocio con IA a medida. Desde chatbots que mejoran la atención al cliente hasta análisis predictivos que optimizan tus ventas, creamos soluciones que automatizan tareas, reducen costes y te dan una ventaja competitiva única.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
        title: 'Marketing Digital',
        description: 'Conquista tu mercado digital con estrategias de contenido, SEO y campañas de ads que convierten. Creamos una presencia online que no solo atrae, sino que enamora y fideliza.',
      },
       {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
        title: 'Webs, Apps, CRMs y mucho más.',
        description: 'Desarrollamos aplicaciones a medida que se adaptan a tus procesos y las blindamos con las últimas tecnologías en ciberseguridad para garantizar la continuidad y la confianza en tu negocio.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-vr"><path d="M2 12a10 10 0 0 1 20 0Z"/><path d="M6 12h2m6 0h2"/><path d="M12 12a3 3 0 0 1-3-3V7a3 3 0 0 1 6 0v2a3 3 0 0 1-3 3Z"/></svg>`,
        title: 'Ayúdate de la realidad virtual',
        description: 'Diseñamos experiencias inmersivas que conectan a tu público. La realidad virtual es una herramienta estratégica para emocionar, educar e impulsar tu negocio.',
      },
    ]
  };

  const { title, items } = content || defaultContent;

  const getServiceLink = (serviceTitle: string) => {
    const lowerCaseTitle = serviceTitle.toLowerCase();
    if (lowerCaseTitle.includes('inteligencia artificial')) {
      return "/view-service/ia";
    }
    if (lowerCaseTitle.includes('marketing')) {
      return "/view-service/marketing";
    }
     if (lowerCaseTitle.includes('apps')) {
      return "/view-service/software";
    }
    if (lowerCaseTitle.includes('realidad virtual')) {
      return "/view-service/vr";
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {items.map((service, index) => {
            return (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="card-animated-border h-full">
                    <InteractiveCard className="h-full card-gradient-hover flex flex-col bg-card text-card-foreground shadow-sm">
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
                  </div>
                </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  );
}
