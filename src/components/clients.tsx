
import { Button } from '@/components/ui/button';
import { FadeIn } from './fade-in';
import Link from 'next/link';
import Image from 'next/image';

export default function Clients() {
  return (
    <section id="clients" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Portal de Clientes
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground">
                        Accede a tu área privada para ver el estado de tus proyectos, propuestas y comunicarte directamente con nuestro equipo. Tu éxito es nuestra prioridad.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" className="font-bold">
                            <Link href="/clients-login">Acceder al Portal</Link>
                        </Button>
                    </div>
                </div>
            </FadeIn>
             <FadeIn delay={0.2}>
                <div className="flex justify-center">
                    <Image 
                        src="https://placehold.co/500x500.png"
                        alt="Portal de Clientes"
                        width={500}
                        height={500}
                        className="rounded-lg shadow-2xl object-cover"
                        data-ai-hint="portal access security"
                    />
                </div>
            </FadeIn>
        </div>
      </div>
    </section>
  );
}
