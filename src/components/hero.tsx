import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from './fade-in';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
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
              <Button size="lg" className="font-bold">
                Inicia tu Transformación
              </Button>
            </ContactModal>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
