
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from './fade-in';
import Image from 'next/image';
import heroBackground from '@/images/hero-evolvance-software.jpg';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center">
      <Image
        src={heroBackground}
        alt="Fondo futurista con cubos de datos y luces de neón"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10"
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent -z-10"></div>
      
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
