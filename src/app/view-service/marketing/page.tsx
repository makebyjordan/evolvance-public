
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactModal } from '@/components/contact-modal';
import { FadeIn } from '@/components/fade-in';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import heroImage from '@/images/hero-evolvance-marketing-digital.jpg';

const TABS = [
  { id: 'redes', label: 'Redes Sociales' },
  { id: 'branding', label: 'Branding y Diseño Gráfico' },
  { id: 'web', label: 'Diseño Web' },
  { id: 'seo', label: 'SEO' },
  { id: 'sem', label: 'SEM' },
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <>
      <section className="relative text-primary-foreground h-screen flex items-center justify-center">
        <Image
          src={heroImage}
          alt="Marketing Digital"
          fill
          className="object-cover"
          placeholder="blur"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">¿Listo para dominar tu mercado digital?</h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/80">Te ayudamos a convertir tu presencia digital en un verdadero activo estratégico. Con nuestras soluciones a medida, no solo atraes a tu audiencia ideal, sino que también transformas cada visita en una oportunidad de crecimiento.</p>
            <ContactModal>
              <Button size="lg" variant="secondary" className="font-bold">
                Descubre Nuestras Soluciones
              </Button>
            </ContactModal>
          </FadeIn>
        </div>
      </section>

      <main id="services" className="container mx-auto px-6 py-16">
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Un Catálogo de Soluciones a tu Medida</h2>
            <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-8">Ponemos las mejores herramientas a tu disposición.</p>
            <div className="flex flex-wrap justify-center border-b border-border">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "py-3 px-6 text-lg transition duration-300",
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn key={activeTab}>
          {activeTab === 'redes' && (
            <div className="space-y-12">
              <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
                <h3 className="text-2xl font-bold">Manejo Profesional de Redes Sociales</h3>
                <p>El manejo de redes sociales constituye un pilar clave en cualquier estrategia de marketing digital. Para las empresas, es vital tener una presencia activa y coherente en las distintas plataformas.</p>
                <blockquote className="text-xl italic text-primary font-semibold py-4">«Haz que tu cliente sea el protagonista de tu marca»</blockquote>
                <h4 className="text-xl font-bold pt-4">El Valor de una Buena Presencia Online</h4>
                <p>La calidad y el cuidado en cada publicación determinan la percepción del público. Una estrategia efectiva requiere fotografías de alta calidad, diseños creativos y textos que conecten.</p>
                <h4 className="text-xl font-bold pt-4">Medición y Análisis de Resultados</h4>
                <p>Creemos en la toma de decisiones basada en datos. Analizamos el rendimiento de cada acción para medir el alcance real y obtener información valiosa sobre la audiencia.</p>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Nuestros Paquetes de Servicios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Paquetes de Redes Sociales */}
                <Card><CardHeader><CardTitle>PAQUETE ECONÓMICO</CardTitle></CardHeader><CardContent><ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm"><li>4 publicaciones al mes</li><li>1 reel al mes</li><li>Edición del reel</li><li>Diseño y copywriting básicos</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle>PAQUETE ECONÓMICO PLUS</CardTitle></CardHeader><CardContent><ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm"><li>6 publicaciones al mes</li><li>2 reels al mes</li><li>1 sesión de grabación trimestral</li><li>Edición y copywriting mejorado</li></ul></CardContent></Card>
                <Card className="border-2 border-primary relative"><span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">MÁS POPULAR</span><CardHeader><CardTitle>PAQUETE BÁSICO</CardTitle></CardHeader><CardContent><ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm"><li>Estrategia de contenido</li><li>8 publicaciones al mes</li><li>4 reels al mes</li><li>1 sesión de grabación mensual</li><li>Análisis mensual</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle>PAQUETE INTERMEDIO</CardTitle></CardHeader><CardContent><ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm"><li>Todo lo del Básico +</li><li>12 publicaciones al mes</li><li>6 reels al mes</li><li>2 sesiones de grabación</li><li>Gestión de comunidad</li><li>Publicidad básica</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle>PAQUETE COMPLETO</CardTitle></CardHeader><CardContent><ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm"><li>Todo lo del Intermedio +</li><li>16 publicaciones al mes</li><li>8 reels al mes</li><li>4 sesiones de grabación</li><li>Publicidad avanzada</li><li>Producción audiovisual elaborada</li></ul></CardContent></Card>
              </div>
            </div>
          )}
          {activeTab === 'branding' && (
            <div className="space-y-12">
               <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
                  <h3 className="text-2xl font-bold">Branding y Diseño Gráfico</h3>
                  <p>Tu marca es más que un logo; es la primera experiencia de tu cliente. Diseñamos marcas memorables y coherentes que destacan visualmente en cada punto de contacto.</p>
                  <blockquote className="text-xl italic text-primary font-semibold py-4">«Convertimos conceptos en experiencias visuales que perduran»</blockquote>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Nuestros Servicios de Branding</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card><CardHeader><CardTitle>Identidad Visual Básica</CardTitle></CardHeader><CardContent><p className="font-semibold mb-2">Incluye:</p><ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm"><li>Logotipo principal</li><li>Paleta de colores</li><li>Selección de tipografía</li></ul></CardContent></Card>
                  <Card><CardHeader><CardTitle>Branding Completo</CardTitle></CardHeader><CardContent><p className="font-semibold mb-2">Incluye:</p><ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm"><li>Todo lo de la Identidad Básica</li><li>Manual de marca</li><li>Assets visuales</li><li>Estrategia visual</li></ul></CardContent></Card>
                  <Card><CardHeader><CardTitle>Branding + Estrategia</CardTitle></CardHeader><CardContent><p className="font-semibold mb-2">Incluye:</p><ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm"><li>Todo lo de Branding Completo</li><li>Naming (si aplica)</li><li>Estrategia de comunicación</li><li>Plantillas de comunicación</li></ul></CardContent></Card>
              </div>
            </div>
          )}
          {activeTab === 'web' && (
             <div className="space-y-12">
                <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
                  <h3 className="text-2xl font-bold">Diseño Web a tu Medida</h3>
                  <p>En el entorno digital actual, una página web es el centro de operaciones de tu negocio. Creamos sitios web que no solo capturan la esencia de tu marca, sino que también están diseñados para alcanzar resultados.</p>
                   <blockquote className="text-xl italic text-primary font-semibold py-4">«El diseño es la inteligencia hecha visible»</blockquote>
                   <p>Un diseño web excepcional es solo el primer paso. Para que tu página funcione de manera óptima y se convierta en una verdadera herramienta de conversión, es fundamental un mantenimiento técnico constante.</p>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Nuestros Servicios de Diseño Web</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  <Card><CardHeader><CardTitle>Web Básica</CardTitle><CardDescription>Tu Primer Paso Online</CardDescription></CardHeader><CardContent><ul className="space-y-3 text-sm flex-grow"><li className="flex gap-2"><Check className="text-primary"/>Diseño a medida (hasta 3 secciones).</li><li className="flex gap-2"><Check className="text-primary"/>100% responsive.</li><li className="flex gap-2"><Check className="text-primary"/>Formulario de contacto.</li><li className="flex gap-2"><Check className="text-primary"/>SEO básico.</li></ul></CardContent></Card>
                  <Card className="border-2 border-primary relative"><span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">MÁS POPULAR</span><CardHeader><CardTitle>Web Estándar</CardTitle><CardDescription>Un Sitio Completo</CardDescription></CardHeader><CardContent><ul className="space-y-3 text-sm flex-grow"><li className="flex gap-2"><Check className="text-primary"/>Sitio con 5 a 7 secciones.</li><li className="flex gap-2"><Check className="text-primary"/>Integración de blog o noticias.</li><li className="flex gap-2"><Check className="text-primary"/>Galería de imágenes o portfolio.</li><li className="flex gap-2"><Check className="text-primary"/>SEO on-page y Google Analytics.</li></ul></CardContent></Card>
                  <Card><CardHeader><CardTitle>Web Avanzada</CardTitle><CardDescription>Funcionalidades a Medida</CardDescription></CardHeader><CardContent><ul className="space-y-3 text-sm flex-grow"><li className="flex gap-2"><Check className="text-primary"/>Desarrollo a medida.</li><li className="flex gap-2"><Check className="text-primary"/>Soporte multiidioma.</li><li className="flex gap-2"><Check className="text-primary"/>Integraciones estratégicas (CRM, pagos).</li><li className="flex gap-2"><Check className="text-primary"/>Soporte prioritario.</li></ul></CardContent></Card>
                  <Card><CardHeader><CardTitle>E-commerce</CardTitle><CardDescription>Personalizado</CardDescription></CardHeader><CardContent><ul className="space-y-3 text-sm flex-grow"><li className="flex gap-2"><Check className="text-primary"/>Tienda online única.</li><li className="flex gap-2"><Check className="text-primary"/>Pasarelas de pago seguras.</li><li className="flex gap-2"><Check className="text-primary"/>Gestión de productos y pedidos.</li><li className="flex gap-2"><Check className="text-primary"/>Soporte continuo.</li></ul></CardContent></Card>
                </div>
            </div>
          )}
          {activeTab === 'seo' && (
            <div className="space-y-12">
              <div className="max-w-4xl mx-auto text-left mb-12 space-y-4">
                  <h3 className="text-3xl font-bold text-center">Expertos en Estrategias de Visibilidad Online</h3>
                  <p>El SEO es un conjunto de técnicas diseñadas para mejorar la visibilidad de un sitio web en los resultados orgánicos de Google. El objetivo es claro: llevar cada proyecto a obtener mayor visibilidad, más tráfico cualificado y mejores oportunidades de negocio.</p>
                  <blockquote className="text-xl italic text-primary font-semibold py-4 text-center">«El contenido es el Rey, pero el SEO es el ejército que lo lleva a la victoria»</blockquote>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Servicios SEO</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <Card><CardHeader><CardTitle>SEO Esencial</CardTitle></CardHeader><CardContent><p className="text-sm mb-4">Para empresas que necesitan sentar una base sólida.</p><ul className="text-sm space-y-2"><li>Revisión SEO inicial</li><li>SEO On-Page básico</li><li>Análisis de palabras clave</li><li>Informes mensuales</li></ul></CardContent></Card>
                <Card className="border-2 border-primary relative"><span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">RECOMENDADO</span><CardHeader><CardTitle>SEO Avanzado</CardTitle></CardHeader><CardContent><p className="text-sm mb-4">Diseñado para un crecimiento estable y competitivo.</p><ul className="text-sm space-y-2"><li>Revisión SEO completa</li><li>SEO On-Page optimizado</li><li>Linkbuilding básico</li><li>Redacción de contenidos</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle>SEO Premium</CardTitle></CardHeader><CardContent><p className="text-sm mb-4">Para marcas que buscan liderazgo digital.</p><ul className="text-sm space-y-2"><li>Auditoría y revisión técnica completa</li><li>SEO Off-Page avanzado</li><li>Creación de contenido especializado</li><li>Plan de crecimiento</li></ul></CardContent></Card>
              </div>
            </div>
          )}
           {activeTab === 'sem' && (
            <div className="space-y-12">
              <div className="max-w-4xl mx-auto text-left mb-12 space-y-4">
                  <h3 className="text-3xl font-bold text-center">Conecta con tu Audiencia</h3>
                  <p>La publicidad digital en plataformas como Meta Ads, TikTok Ads o Google Ads es una de las formas más efectivas de conectar con clientes potenciales. Permite generar resultados visibles en poco tiempo, con presupuestos adaptados a cada negocio.</p>
                  <blockquote className="text-xl italic text-primary font-semibold py-4 text-center">«Hacer marketing es decirle al mundo que eres una estrella de rock»</blockquote>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Servicios de Campañas de ADS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <Card><CardHeader><CardTitle>Campaña Básica</CardTitle></CardHeader><CardContent><p className="text-sm mb-4">Para empezar a anunciarse de manera simple y efectiva.</p><ul className="text-sm space-y-2"><li>Hasta 2 objetivos</li><li>Campañas en Meta o Google</li><li>Diseño de piezas gráficas</li><li>Informe mensual</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle>Campaña Completa</CardTitle></CardHeader><CardContent><p className="text-sm mb-4">Para un enfoque más avanzado y sostenible.</p><ul className="text-sm space-y-2"><li>Estrategia con funnels</li><li>Campañas de remarketing</li><li>Landing pages básicas</li><li>Anuncios de catálogo dinámico</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle>Campaña Multicanal</CardTitle></CardHeader><CardContent><p className="text-sm mb-4">Para una estrategia integral en todas las plataformas clave.</p><ul className="text-sm space-y-2"><li>Publicidad en Meta, Google, TikTok</li><li>Gestión de varios objetivos</li><li>Campañas locales en Google Maps</li><li>Panel de control personalizado</li></ul></CardContent></Card>
              </div>
            </div>
          )}
        </FadeIn>
      </main>

      <section id="faq" className="bg-background/50">
        <div className="container mx-auto px-6 py-20">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Preguntas Frecuentes</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="bg-card border rounded-lg"><AccordionTrigger className="p-6 text-lg font-semibold">¿En cuánto tiempo veré resultados con el SEO?</AccordionTrigger><AccordionContent className="px-6 pb-6">El SEO es una estrategia a medio-largo plazo. Generalmente, los resultados significativos comienzan a verse entre los 3 y 6 meses.</AccordionContent></AccordionItem>
                <AccordionItem value="item-2" className="bg-card border rounded-lg"><AccordionTrigger className="p-6 text-lg font-semibold">¿Qué paquete de redes sociales es mejor para mi negocio?</AccordionTrigger><AccordionContent className="px-6 pb-6">El Paquete Básico es ideal para establecer una presencia sólida. Si buscas un crecimiento más agresivo, el Intermedio o Completo serían más adecuados.</AccordionContent></AccordionItem>
                <AccordionItem value="item-3" className="bg-card border rounded-lg"><AccordionTrigger className="p-6 text-lg font-semibold">¿El coste del diseño web incluye el hosting y el dominio?</AccordionTrigger><AccordionContent className="px-6 pb-6">Nuestros paquetes se centran en el diseño y desarrollo. El hosting y el dominio son servicios externos, pero te asesoramos en todo el proceso.</AccordionContent></AccordionItem>
                <AccordionItem value="item-4" className="bg-card border rounded-lg"><AccordionTrigger className="p-6 text-lg font-semibold">¿Qué diferencia hay entre SEO y SEM?</AccordionTrigger><AccordionContent className="px-6 pb-6">El SEO mejora tu visibilidad en resultados orgánicos (no pagados), mientras que el SEM utiliza publicidad de pago para aparecer de forma inmediata.</AccordionContent></AccordionItem>
                <AccordionItem value="item-5" className="bg-card border rounded-lg"><AccordionTrigger className="p-6 text-lg font-semibold">¿Cómo se mide el retorno de la inversión (ROI)?</AccordionTrigger><AccordionContent className="px-6 pb-6">Medimos el ROI a través de indicadores clave (KPIs) definidos al inicio, como el seguimiento de conversiones, el coste por adquisición (CPA) y el valor del cliente (LTV).</AccordionContent></AccordionItem>
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-card">
        <div className="container mx-auto px-6 py-20 text-center">
          <FadeIn>
            <h3 className="text-3xl font-bold mb-4 text-foreground">¿Listo para empezar?</h3>
            <p className="max-w-xl mx-auto mb-6 text-muted-foreground">Contáctanos para una evaluación inicial y descubre cómo nuestras soluciones pueden transformar tu negocio.</p>
            <ContactModal>
              <Button size="lg" className="font-bold">
                Hablemos
              </Button>
            </ContactModal>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
