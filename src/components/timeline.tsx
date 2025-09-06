
import { getWebContent, type TimelineContent } from '@/app/actions/web-content-actions';
import { FadeIn } from './fade-in';

export default async function Timeline() {

  const content = await getWebContent<TimelineContent>('timeline');

  const defaultContent: TimelineContent = {
    title: 'Nuestra Trayectoria: Innovación Paso a Paso',
    events: [
        {
            year: '2022',
            title: 'Puesta en Marcha',
            description: 'Nace Evol-vance con la misión de integrar tecnologías emergentes para potenciar el crecimiento empresarial.',
        },
        {
            year: '2023',
            title: 'Cierre de Colaboraciones',
            description: 'Establecemos alianzas estratégicas con líderes tecnológicos, ampliando nuestro arsenal de soluciones.',
        },
        {
            year: '2024',
            title: 'Trabajos Empezados',
            description: 'Lanzamos con éxito nuestros primeros proyectos integrales de IA y Marketing para clientes clave del sector.',
        },
        {
            year: 'Hoy',
            title: 'Momento Actual',
            description: 'Consolidados como referentes, expandimos nuestros servicios a Realidad Virtual y eventos tecnológicos, mirando siempre al futuro.',
        },
    ]
  };

  const { title, events } = content || defaultContent;

  return (
    <section id="timeline" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
            {title}
          </h2>
        </FadeIn>
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border" aria-hidden="true"></div>
            
            <div className="space-y-12">
              {events.map((event, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="relative pl-12 md:pl-0">
                    <div className="absolute left-4 md:left-1/2 top-1 -translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full"></div>
                    <div className="md:flex md:items-center">
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}>
                        <div className="p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors duration-300">
                          <p className="text-2xl font-bold text-primary">{event.year}</p>
                          <h3 className="text-xl font-bold mt-2 text-foreground">{event.title}</h3>
                          <p className="mt-2 text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                      <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? '' : 'order-1'}`}></div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
