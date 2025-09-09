
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/fade-in";

export default function MarketingPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-20 md:py-32">

        {/* Section 1: Social Media Ads Intro */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn className="md:order-2">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">SEM: Conecta con tu Audiencia</h2>
                    <p className="mt-4 text-muted-foreground">La publicidad en plataformas como <strong>Facebook, Instagram, TikTok y YouTube</strong> es un pilar fundamental. Con miles de millones de usuarios, estas redes nos permiten segmentar y alcanzar a tu cliente ideal de una forma muy directa y visual.</p>
                    <p className="mt-4 text-muted-foreground">Las plataformas de Meta y Google Ads son herramientas poderosas para dar a conocer tu marca. Su principal ventaja radica en la <strong>eficiencia a corto plazo y un costo accesible</strong>. A través de ellas, podemos potenciar el reconocimiento de tu marca, dirigir tráfico a tu web y aumentar las ventas.</p>
                </div>
            </FadeIn>
             <FadeIn className="md:order-1">
                {/* Placeholder for image */}
                <div className="w-full h-80 bg-card rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Aquí va una imagen</p>
                </div>
            </FadeIn>
        </section>

        {/* Section 2: Quote */}
        <section className="text-center py-20 md:py-28">
            <FadeIn>
                <p className="text-4xl md:text-5xl font-medium text-foreground">«Hacer marketing es decirle al mundo que eres una estrella de rock»</p>
            </FadeIn>
        </section>

        {/* Section 3: Social Media Quality */}
         <section className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold text-primary">Campañas de Calidad y Transparentes</h3>
                    <p className="mt-4 text-muted-foreground">El mundo de la <strong>publicidad digital</strong> puede ser complejo, pero nuestro equipo está aquí para simplificarlo. Te guiaremos en cada paso, asegurándonos de que comprendas el proceso.</p>
                    <p className="mt-4 text-muted-foreground">Muchas empresas no aprovechan todo el potencial de plataformas como <strong>Meta Ads y TikTok Ads</strong>, que ofrecen resultados excelentes. Estas se complementan a la perfección con la red de <strong>Google Ads</strong>, incluyendo YouTube, para crear una estrategia publicitaria integral.</p>
                </div>
            </FadeIn>
            <FadeIn>
                 <div className="w-full h-80 bg-card rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Aquí va otra imagen</p>
                </div>
            </FadeIn>
        </section>

        {/* Section 4: Campaign design and brand image */}
        <section className="py-20 md:py-28">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-primary">Diseño Preciso de Campañas y Mejora de Imagen de Marca</h3>
                <p className="mt-4 text-muted-foreground">Una campaña publicitaria exitosa es la base de todo. Definimos contigo los objetivos y la estrategia de pago más adecuada para tus necesidades.</p>
                <p className="mt-4 text-muted-foreground">En <strong>Evol-vance</strong>, la transparencia es una prioridad. Te proporcionaremos informes claros sobre el rendimiento de tus campañas.</p>
                <p className="mt-4 text-muted-foreground">Diseñamos <strong>creatividades y textos personalizados</strong>, analizamos <strong>hashtags relevantes</strong> y monitorizamos las interacciones para <strong>aumentar tus seguidores y la notoriedad</strong>. Optimizamos constantemente para garantizar la <strong>máxima rentabilidad</strong>.</p>
            </div>
           </FadeIn>
        </section>

        {/* Section 4.5: Web Analytics */}
        <section className="py-10 md:py-20">
           <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-primary">La Clave del Éxito: Analítica Web</h3>
                <p className="mt-4 text-muted-foreground">Una estrategia digital estaría incompleta sin una medición precisa. La <strong>analítica web</strong> es la herramienta que nos permite entender el comportamiento de los usuarios y medir el verdadero impacto de nuestras acciones.</p>
                <p className="mt-4 text-muted-foreground">Analizar métricas clave como el <strong>CTR, el CPA o el ROI</strong>, nos proporciona datos cruciales para <strong>tomar decisiones informadas</strong>. Integramos la analítica en cada campaña para optimizar continuamente la inversión y asegurar resultados transparentes.</p>
            </div>
            </FadeIn>
        </section>

        {/* Section: ADS Campaign Services */}
        <section className="py-20 md:py-28">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center">
                  <h3 className="text-3xl font-bold mb-8 text-primary">Nuestros Servicios de Campañas de ADS</h3>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="max-w-3xl mx-auto space-y-4">
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b-0">
                      <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md">
                        <AccordionTrigger className="w-full text-left p-6 flex justify-between items-center hover:no-underline">
                            <span className="text-lg font-medium text-foreground">Campaña Básica (1-2 objetivos)</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Definición de 1 a 2 objetivos claros (tráfico, leads o ventas).</li>
                                <li>Creación y configuración de campañas en Meta Ads o Google Ads.</li>
                                <li>Diseño de piezas gráficas personalizadas.</li>
                                <li>Segmentación de audiencia básica.</li>
                                <li>Optimización semanal de anuncios.</li>
                                <li>Informe mensual con resultados clave y recomendaciones.</li>
                            </ul>
                        </AccordionContent>
                      </div>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b-0">
                      <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md mt-4">
                        <AccordionTrigger className="w-full text-left p-6 flex justify-between items-center hover:no-underline">
                            <span className="text-lg font-medium text-foreground">Campaña Completa (funnels + retargeting)</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Estrategia integral con embudos de conversión (funnels).</li>
                                <li>Configuración de campañas de remarketing para recuperar clientes.</li>
                                <li>Creación de landing pages optimizadas.</li>
                                <li>Desarrollo de creatividades avanzadas: imágenes, videos y copies.</li>
                                <li>Integración con herramientas de automatización y CRM.</li>
                                <li>Optimización continua basada en datos.</li>
                                <li>Reporte detallado con métricas de conversión, ROI y recomendaciones.</li>
                            </ul>
                        </AccordionContent>
                      </div>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b-0">
                       <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md mt-4">
                        <AccordionTrigger className="w-full text-left p-6 flex justify-between items-center hover:no-underline">
                            <span className="text-lg font-medium text-foreground">Campaña Multicanal (Meta + Google)</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Estrategia 360° en múltiples plataformas: Meta, Google, YouTube y Display.</li>
                                <li>Gestión de varios objetivos simultáneos (branding, tráfico, leads y ventas).</li>
                                <li>Integración avanzada de funnels, retargeting y lookalike audiences.</li>
                                <li>Creación de contenidos dinámicos: videos, carruseles y anuncios interactivos.</li>
                                <li>Test A/B constante para maximizar resultados.</li>
                                <li>Panel de control personalizado en tiempo real con métricas clave.</li>
                                <li>Reuniones estratégicas mensuales para ajustar la inversión y optimizar el ROI.</li>
                            </ul>
                        </AccordionContent>
                       </div>
                    </AccordionItem>
                </Accordion>
              </div>
            </FadeIn>
        </section>
      </main>
    </div>
  );
}
