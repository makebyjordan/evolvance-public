import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from './fade-in';
import Image from 'next/image';
import heroBackground from '@/images/hero.principal-evol-vance.jpg';

export default function Hero() {
  return (
    // PASO 1: Añadido "bg-transparent" para hacer el fondo de la sección transparente.
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center text-center bg-transparent"
    >
      {/* PASO 2: La capa de degradado (div) se elimina. 
        La máscara se aplica directamente a la imagen.
      */}
      <Image
        src={heroBackground}
        alt="Fondo futurista con cubos de datos y luces de neón"
        layout="fill"
        objectFit="cover"
        quality={100}
        placeholder="blur"
        // 👇 Máscara aplicada para difuminar la imagen en la parte inferior
        className="z-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      />
      
      {/* CAPA 20: El contenido se mantiene igual, por encima de la imagen. */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-20">
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