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
      { title: 'Segmentación Avanzada', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>` },
      { title: 'Análisis Predictivo', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-circuit"><path d="M12 2a5.3 5.3 0 0 1 3.5 9.1c.4.5.8 1.1 1.2 1.9a5.5 5.5 0 0 1-2.6 7.4c-1.7.8-3.6.8-5.3 0a5.5 5.5 0 0 1-2.6-7.4c.4-.8.8-1.4 1.2-1.9A5.3 5.3 0 0 1 12 2Z"/><path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z"/><path d="M12 2v2"/><path d="m6.4 4.5-.9 1.3"/><path d="m17.6 4.5.9 1.3"/><path d="M21.1 10.5h-2.2"/><path d="M4.9 10.5H2.8"/><path d="m19.6 17.5-.9-1.3"/><path d="m4.4 17.5.9-1.3"/><path d="M12 20v2"/><path d="M8 14.5a2.5 2.5 0 0 0-2.5-2.5h-1a2.5 2.5 0 0 1 0-5h1A2.5 2.5 0 0 0 8 9.5"/><path d="M16 14.5a2.5 2.5 0 0 1 2.5-2.5h1a2.5 2.5 0 0 0 0-5h-1a2.5 2.5 0 0 1-2.5-2.5"/></svg>` },
      { title: 'Automatización de Anuncios', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2"/><path d="M12 13h2"/></svg>` },
      { title: 'Optimización de Campañas', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>` },
    ]
  };

  const { title, description, valueProposition, ctaButtonText, featureCards } = content || defaultContent;

  return (
    <section 
      id="marketing-ai" 
      className="py-20 sm:py-32 [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_5%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                    {title.includes('y Campañas') ? (
                      <>
                        <span className="text-primary">{title.split(' y Campañas')[0]}</span>
                        {' y Campañas' + title.split(' y Campañas')[1]}
                      </>
                    ) : (
                      title
                    )}
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
