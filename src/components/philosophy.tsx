
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, BrainCircuit, Sparkles, Zap, Lightbulb } from 'lucide-react';
import { FadeIn } from './fade-in';
import { getWebContent, type PhilosophyContent } from '@/app/actions/web-content-actions';

const iconMap: { [key: string]: React.ElementType } = {
  ShieldCheck: ShieldCheck,
  BrainCircuit: BrainCircuit,
  Sparkles: Sparkles,
  Zap: Zap,
  Lightbulb: Lightbulb,
};


export default async function Philosophy() {

  const content = await getWebContent<PhilosophyContent>('philosophy');
  
  const defaultContent: PhilosophyContent = {
    title: 'Excelencia, Confianza e Innovación en Nuestro ADN',
    points: [
      {
        icon: 'ShieldCheck',
        title: 'Confianza Absoluta',
        description: 'Relaciones transparentes y comunicación constante.',
      },
      {
        icon: 'BrainCircuit',
        title: 'Autoridad por Conocimiento',
        description: 'Un equipo a la vanguardia para darte una ventaja competitiva decisiva.',
      },
      {
        icon: 'Sparkles',
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
            const IconComponent = iconMap[point.icon] || Zap;
            return (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/20 text-center p-6 transition-all duration-300 hover:border-primary/50 hover:scale-105">
                <CardHeader>
                  <div className="flex justify-center mb-4"><IconComponent className="w-8 h-8 text-primary" /></div>
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
