

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { FadeIn } from './fade-in';
import { Button } from './ui/button';
import Link from 'next/link';
import { getWebContent, type ServicesContent } from '@/app/actions/web-content-actions';
import { Zap, ArrowRight, Orbit } from 'lucide-react';
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
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
        title: 'Marketing Digital',
        description: 'Convierte tu presencia digital en un activo estratégico. Diseñamos y ejecutamos campañas que atraen a tu audiencia y convierten visitas en clientes leales, llevando tu marca a la cima de su sector. Dominamos el mercado digital con estrategias de contenido, SEO, SEM, y gestión de redes sociales.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brush"><path d="M21.7 10c.3-1 .3-2.1 0-3.1C21.4 6 21.1 5 20 4.2c-1.1-.9-2.5-1.2-4-1.2s-2.9.3-4 1.2c-1 .8-1.4 1.8-1.7 2.8C10 11 10 12.1 10.3 13c.3 1 .7 1.9 1.4 2.6.7.7 1.5 1.3 2.3 1.6.8.3 1.7.5 2.5.5s1.7-.2 2.5-.5c.8-.3 1.6-.9 2.3-1.6.7-.7 1.1-1.6 1.4-2.6z"/><path d="M12 13.5V22"/><path d="M9 12a3 3 0 0 0-3-3H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a3 3 0 0 0 3-3z"/></svg>`,
        title: 'Branding, Diseño Gráfico y Copywriting',
        description: 'La identidad visual es clave. Colaboramos contigo para forjar una imagen distintiva e inolvidable. Tu marca es más que un logo; es la primera experiencia de tu cliente. Nos ocupamos de todos los detalles, desde la paleta de colores hasta la comunicación visual unificada.',
      },
       {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
        title: 'Tecnología Inmersiva en Ayuntamientos',
        description: 'Transformamos la gestión y promoción de municipios con tecnología de vanguardia. Desde tours virtuales y reconstrucciones históricas hasta simuladores para urbanismo y seguridad, creamos experiencias que potencian el turismo, la cultura y la eficiencia de los servicios públicos.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2z"></polygon></svg>`,
        title: 'Webs, Apps, CRMs y mucho más',
        description: 'Desarrollamos software a medida y ofrecemos ciberseguridad de élite. Creamos CRM, apps y webs de gestión para optimizar tus procesos y potenciar tu negocio. Además, protegemos tus datos con análisis de vulnerabilidades, pruebas de penetración y monitoreo 24/7 para que te centres en lo que de verdad importa: el crecimiento de tu empresa.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-orbit"><circle cx="12" cy="12" r="2"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>`,
        title: 'Realidad Virtual',
        description: 'Ofrecemos experiencias inmersivas que cautivan y conectan. Desde eventos y publicidad hasta formación y turismo, la Realidad Virtual transforma la manera en que tu público interactúa con tu marca, creando un impacto memorable que va más allá de la pantalla.',
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
    if (lowerCaseTitle.includes('branding')) {
        return "/view-service/branding";
    }
     if (lowerCaseTitle.includes('ayuntamientos')) {
        return "/view-service/ayuntamientos";
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
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
