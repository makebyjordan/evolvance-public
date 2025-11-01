import { FadeIn } from './fade-in';
import { Button } from './ui/button';
import { ContactModal } from './contact-modal';
import { InteractiveCard } from './interactive-card';
import { Card, CardHeader, CardTitle } from './ui/card';
import { getWebContent, type OfferContent } from '@/app/actions/web-content-actions';
import { Target, BrainCircuit, Bot, Megaphone } from 'lucide-react';

// Helper component to safely render SVG from a string
function SvgRenderer({ svgString, className }: { svgString: string, className: string }) {
    if (!svgString || typeof svgString !== 'string') return null;
    const modifiedSvgString = svgString.replace('<svg', `<svg class="${className}"`);
    return <div dangerouslySetInnerHTML={{ __html: modifiedSvgString }} />;
}

const defaultIcons = {
    'Segmentación Avanzada': <Target className="w-8 h-8" />,
    'Análisis Predictivo': <BrainCircuit className="w-8 h-8" />,
    'Automatización de Anuncios': <Bot className="w-8 h-8" />,
    'Optimización de Campañas': <Megaphone className="w-8 h-8" />,
};

type IconKeys = keyof typeof defaultIcons;

export default async function MarketingAI() {
  const content = await getWebContent<OfferContent>('offer');

  const defaultContent: OfferContent = {
    title: 'IA y Campañas de Marketing (Ads)',
    description: 'En Evolvance integramos IA y publicidad digital para crear campañas más inteligentes y rentables. Utilizamos análisis predictivo, segmentación avanzada y automatización de anuncios en Google, Meta, LinkedIn y otras plataformas.',
    valueProposition: 'Nuestro enfoque combina creatividad + algoritmos para optimizar presupuestos, aumentar conversiones y garantizar un ROI superior.',
    ctaButtonText: 'Agenda reunión para estudiar tu caso',
    featureCards: [
      { title: 'Segmentación Avanzada', icon: '' },
      { title: 'Análisis Predictivo', icon: '' },
      { title: 'Automatización de Anuncios', icon: '' },
      { title: 'Optimización de Campañas', icon: '' },
    ]
  };

  const { title, description, valueProposition, ctaButtonText, featureCards } = content || defaultContent;

  return (
    // 👇 AQUÍ ESTÁ EL CAMBIO. Se ha añadido la máscara de CSS.
    <section 
      id="marketing-ai" 
      className="py-20 sm:py-32 [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_5%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                    <span className="text-primary">IA</span> y Campañas de Marketing (Ads)
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    {description}
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                    {valueProposition}
                </p>
                 <div className="mt-8 text-center lg:text-left">
                    <ContactModal>
                        <Button size="lg">{ctaButtonText}</Button>
                    </ContactModal>
                </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {featureCards.map((card, index) => (
                <div className="card-animated-border" key={index}>
                  <InteractiveCard className="h-full text-center p-4 card-gradient-hover">
                      <CardHeader className="p-2">
                           <div className="flex justify-center mb-3">
                              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                  {card.icon ? <SvgRenderer svgString={card.icon} className="w-8 h-8 text-primary" /> : defaultIcons[card.title as IconKeys]}
                              </div>
                          </div>
                          <CardTitle className="text-base font-bold">{card.title}</CardTitle>
                      </CardHeader>
                  </InteractiveCard>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
