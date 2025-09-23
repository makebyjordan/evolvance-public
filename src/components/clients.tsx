
import { Button } from '@/components/ui/button';
import { FadeIn } from './fade-in';
import Link from 'next/link';
import Image from 'next/image';

export default function Clients() {
  return (
    <section id="clients" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 items-center">
            <FadeIn>
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                        Portal de Clientes
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
                        Accede a tu área privada para ver el estado de tus proyectos, propuestas y comunicarte directamente con nuestro equipo. Tu éxito es nuestra prioridad.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" className="font-bold">
                            <Link href="/client-portal">Acceder al Portal</Link>
                        </Button>
                    </div>
                </div>
            </FadeIn>
        </div>
      </div>
    </section>
  );
}
