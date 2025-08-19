import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, BrainCircuit, Sparkles } from 'lucide-react';
import { FadeIn } from './fade-in';

const philosophyPoints = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Confianza Absoluta',
    description: 'Relaciones transparentes y comunicación constante.',
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'Autoridad por Conocimiento',
    description: 'Un equipo a la vanguardia para darte una ventaja competitiva decisiva.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: 'Innovación Constante',
    description: 'No seguimos tendencias, las creamos para tu negocio.',
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 sm:py-32 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-foreground">
            Excelencia, Confianza e Innovación en Nuestro ADN
          </h2>
        </FadeIn>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyPoints.map((point, index) => (
            <FadeIn key={point.title} delay={index * 0.1}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/20 text-center p-6 transition-all duration-300 hover:border-primary/50 hover:scale-105">
                <CardHeader>
                  <div className="flex justify-center mb-4">{point.icon}</div>
                  <CardTitle className="font-headline text-xl text-foreground">{point.title}</CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">{point.description}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
