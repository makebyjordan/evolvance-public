
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FadeIn } from './fade-in';
import { getWebContent, type PhilosophyContent } from '@/app/actions/web-content-actions';
import { Zap } from 'lucide-react';

// Helper component to safely render SVG
function SvgRenderer({ svgString, className }: { svgString: string, className: string }) {
    // Add className to the SVG string
    const modifiedSvgString = svgString.replace('<svg', `<svg class="${className}"`);
    return <div dangerouslySetInnerHTML={{ __html: modifiedSvgString }} />;
}

const defaultIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;

export default async function Philosophy() {

  const content = await getWebContent<PhilosophyContent>('philosophy');
  
  const defaultContent: PhilosophyContent = {
    title: 'Excelencia, Confianza e Innovación en Nuestro ADN',
    points: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
        title: 'Confianza Absoluta',
        description: 'Relaciones transparentes y comunicación constante.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-circuit"><path d="M12 2a5.3 5.3 0 0 1 3.5 9.1c.4.5.8 1.1 1.2 1.9a5.5 5.5 0 0 1-2.6 7.4c-1.7.8-3.6.8-5.3 0a5.5 5.5 0 0 1-2.6-7.4c.4-.8.8-1.4 1.2-1.9A5.3 5.3 0 0 1 12 2Z"/><path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z"/><path d="M12 2v2"/><path d="m6.4 4.5-.9 1.3"/><path d="m17.6 4.5.9 1.3"/><path d="M21.1 10.5h-2.2"/><path d="M4.9 10.5H2.8"/><path d="m19.6 17.5-.9-1.3"/><path d="m4.4 17.5.9-1.3"/><path d="M12 20v2"/><path d="M8 14.5a2.5 2.5 0 0 0-2.5-2.5h-1a2.5 2.5 0 0 1 0-5h1A2.5 2.5 0 0 0 8 9.5"/><path d="M16 14.5a2.5 2.5 0 0 1 2.5-2.5h1a2.5 2.5 0 0 0 0-5h-1a2.5 2.5 0 0 1-2.5-2.5"/></svg>`,
        title: 'Autoridad por Conocimiento',
        description: 'Un equipo a la vanguardia para darte una ventaja competitiva decisiva.',
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.9 4.2-4.3.9 3.1 3-1 4.2 3.8-2.3 3.8 2.3-1-4.2 3.1-3-4.3-.9L12 3z"/><path d="M5 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M19 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>`,
        title: 'Innovación Constante',
        description: 'No seguimos tendencias, las creamos para tu negocio.',
      },
    ]
  };

  const { title, points } = content || defaultContent;

  return (
    <section id="philosophy" className="py-20 sm:py-32 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-foreground">
            {title}
          </h2>
        </FadeIn>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((point, index) => {
            return (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/20 text-center p-6 transition-all duration-300 hover:border-primary/50 hover:scale-105">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <SvgRenderer svgString={point.icon || defaultIconSVG} className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl text-foreground">{point.title}</CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">{point.description}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          )})}
        </div>
      </div>
    </section>
  );
}
