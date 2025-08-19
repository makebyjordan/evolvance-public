import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from './fade-in';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground tracking-tight">
            Diseñamos el Futuro de tu Crecimiento.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Fusionamos Inteligencia Artificial, Experiencias Inmersivas y Marketing Estratégico para llevar tu empresa a la siguiente dimensión.
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="mt-10">
            <ContactModal>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                Inicia tu Transformación
              </Button>
            </ContactModal>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
