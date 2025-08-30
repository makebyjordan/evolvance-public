
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Megaphone, View, CalendarCheck, Zap, Lightbulb } from 'lucide-react';
import { FadeIn } from './fade-in';
import { Button } from './ui/button';
import Link from 'next/link';
import { getWebContent, type ServicesContent } from '@/app/actions/web-content-actions';

const iconMap: { [key: string]: React.ElementType } = {
  Bot: Bot,
  Megaphone: Megaphone,
  View: View,
  CalendarCheck: CalendarCheck,
  Zap: Zap,
  Lightbulb: Lightbulb
};

export default async function Services() {

  const content = await getWebContent<ServicesContent>('services');

  const defaultContent: ServicesContent = {
    title: 'Un Universo de Soluciones a tu Medida',
    items: [
      {
        icon: 'Bot',
        title: 'IA y Automatización',
        description: 'Eleva tu eficiencia con chatbots inteligentes, asistentes de voz y automatización integral de procesos.',
      },
      {
        icon: 'Megaphone',
        title: 'Marketing y Gestión de Redes',
        description: 'Conquista tu mercado digital con estrategias de contenido, SEO y campañas de ads que convierten.',
      },
      {
        icon: 'View',
        title: 'Realidad Virtual y Experiencias Inmersivas',
        description: 'Crea mundos que cautivan. Desarrollamos desde tours virtuales hasta simulaciones de producto que marcan la diferencia.',
      },
      {
        icon: 'CalendarCheck',
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
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-foreground">
            {title}
          </h2>
        </FadeIn>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Zap;
            return (
                <FadeIn key={index} delay={index * 0.1}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                    <CardHeader className="flex flex-col items-center text-center p-8">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                        <IconComponent className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl text-foreground">{service.title}</CardTitle>
                    <CardDescription className="mt-2 text-muted-foreground">{service.description}</CardDescription>
                    </CardHeader>
                </Card>
                </FadeIn>
            )
          })}
        </div>
        <FadeIn>
            <div className="mt-16 text-center">
                <Button asChild size="lg">
                    <Link href="/services">Nuestros Servicios</Link>
                </Button>
            </div>
        </FadeIn>
      </div>
    </section>
  );
}
