import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from './fade-in';

export default function Cta() {
  return (
    <section id="cta" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-card border border-primary/30 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              ¿Listo para dar el Salto Cuántico?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Agenda una Sesión Estratégica gratuita. Descubriremos juntos cómo la tecnología y la estrategia pueden catapultar tu negocio.
            </p>
            <div className="mt-8">
              <ContactModal>
                <Button size="lg" className="font-bold">
                  Agendar Sesión Estratégica Hoy
                </Button>
              </ContactModal>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
