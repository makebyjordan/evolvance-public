
import { FadeIn } from './fade-in';
import { BrainCircuit, Megaphone, Target, Bot } from 'lucide-react';
import { InteractiveCard } from './interactive-card';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ContactModal } from './contact-modal';

export default function MarketingAI() {
  return (
    <section id="marketing-ai" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                    <span className="text-primary">IA</span> y Campañas de Marketing (Ads)
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    En Evol-vance integramos IA y publicidad digital para crear campañas más inteligentes y rentables. Utilizamos análisis predictivo, segmentación avanzada y automatización de anuncios en Google, Meta, LinkedIn y otras plataformas.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                    Nuestro enfoque combina <span className="font-bold text-foreground">creatividad + algoritmos</span> para optimizar presupuestos, aumentar conversiones y garantizar un ROI superior.
                </p>
                 <div className="mt-8 text-center lg:text-left">
                    <ContactModal>
                        <Button size="lg">Agenda reunión para estudiar tu caso</Button>
                    </ContactModal>
                </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
                <div className="card-animated-border">
                    <Card className="h-full text-center p-4">
                        <CardHeader className="p-2">
                             <div className="flex justify-center mb-3">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <Target className="w-8 h-8" />
                                </div>
                            </div>
                            <CardTitle className="text-base font-bold">Segmentación Avanzada</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
                 <div className="card-animated-border">
                    <Card className="h-full text-center p-4">
                        <CardHeader className="p-2">
                            <div className="flex justify-center mb-3">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <BrainCircuit className="w-8 h-8" />
                                </div>
                            </div>
                            <CardTitle className="text-base font-bold">Análisis Predictivo</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
                 <div className="card-animated-border">
                    <Card className="h-full text-center p-4">
                         <CardHeader className="p-2">
                           <div className="flex justify-center mb-3">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <Bot className="w-8 h-8" />
                                </div>
                            </div>
                            <CardTitle className="text-base font-bold">Automatización de Anuncios</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
                 <div className="card-animated-border">
                    <Card className="h-full text-center p-4">
                         <CardHeader className="p-2">
                             <div className="flex justify-center mb-3">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <Megaphone className="w-8 h-8" />
                                </div>
                            </div>
                            <CardTitle className="text-base font-bold">Optimización de Campañas</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
