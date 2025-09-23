
"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { FadeIn } from '@/components/fade-in';
import { ContactModal } from '@/components/contact-modal';
import type { LandAd, CheckboxQuestionItem } from '@/app/actions/land-ads-actions';
import { InteractiveCard } from '@/components/interactive-card';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { saveLandAdResponse } from '@/app/actions/land-ads-responses-actions';
import { useToast } from '@/hooks/use-toast';

// Helper component to safely render SVG
function SvgRenderer({ svgString, className }: { svgString: string, className: string }) {
    if (!svgString || typeof svgString !== 'string') return null;
    const modifiedSvgString = svgString.replace('<svg', `<svg class="${className}"`);
    return <div dangerouslySetInnerHTML={{ __html: modifiedSvgString }} />;
}

const defaultIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2z"></polygon></svg>`;


function HeroSection({ landAd }: { landAd: LandAd }) {
    if (!landAd.heroEnabled || !landAd.heroImageUrl) return null;

    return (
        <section className="relative text-primary-foreground h-screen flex items-center justify-center">
            <Image
                src={landAd.heroImageUrl}
                alt={landAd.heroTitle || 'Fondo del LandAD'}
                fill
                className="object-cover"
                quality={100}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="container mx-auto px-6 py-20 text-center relative z-10">
                <FadeIn>
                    {landAd.heroTitle && (
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{landAd.heroTitle}</h1>
                    )}
                    {landAd.heroDescription && (
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/80">{landAd.heroDescription}</p>
                    )}
                    {landAd.heroCtaText && landAd.heroCtaUrl && (
                        <Button asChild size="lg" variant="secondary" className="font-bold">
                            <Link href={landAd.heroCtaUrl} target='_blank'>{landAd.heroCtaText}</Link>
                        </Button>
                    )}
                </FadeIn>
            </div>
        </section>
    );
}

function FeatureSection({ landAd }: { landAd: LandAd }) {
    if (!landAd.featureSectionEnabled) return null;

    return (
        <section className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <FadeIn>
                        <div className="text-left">
                            {landAd.featureSectionTitle && (
                                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                                    {landAd.featureSectionTitle}
                                </h2>
                            )}
                            {landAd.featureSectionDescription && (
                                <p className="mt-4 text-lg text-muted-foreground">
                                    {landAd.featureSectionDescription}
                                </p>
                            )}
                            {landAd.featureSectionCtaText && landAd.featureSectionCtaUrl && (
                                <div className="mt-8 text-center lg:text-left">
                                     <Button asChild size="lg">
                                        <Link href={landAd.featureSectionCtaUrl}>{landAd.featureSectionCtaText}</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </FadeIn>
                    {landAd.featureSectionCards && landAd.featureSectionCards.length > 0 && (
                        <FadeIn delay={0.2}>
                            <div className="grid grid-cols-2 gap-6">
                                {landAd.featureSectionCards.map((card, index) => (
                                    <div className="card-animated-border" key={index}>
                                        <InteractiveCard className="h-full text-center p-4 card-gradient-hover">
                                            <CardHeader className="p-2">
                                                {card.icon && (
                                                    <div className="flex justify-center mb-3">
                                                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                                            <SvgRenderer svgString={card.icon || defaultIconSVG} className="w-8 h-8 text-primary" />
                                                        </div>
                                                    </div>
                                                )}
                                                {card.title && <CardTitle className="text-base font-bold">{card.title}</CardTitle>}
                                                 {card.description && <p className="text-sm text-muted-foreground mt-2">{card.description}</p>}
                                            </CardHeader>
                                        </InteractiveCard>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    )}
                </div>
            </div>
        </section>
    );
}

function IconListSection({ landAd }: { landAd: LandAd }) {
  if (!landAd.iconListSectionEnabled || !landAd.iconListSectionItems || landAd.iconListSectionItems.length === 0) return null;

  return (
    <section className="py-20 sm:py-32 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          {landAd.iconListSectionDescription && (
            <p className="text-center text-muted-foreground mb-12">{landAd.iconListSectionDescription}</p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {landAd.iconListSectionItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-muted-foreground">
                <SvgRenderer svgString={item.icon || ''} className="w-6 h-6" />
                <span className="font-medium">{item.title}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}


function MediaGridSection({ landAd }: { landAd: LandAd }) {
  if (!landAd.mediaGridSectionEnabled || !landAd.mediaGridSectionCards || landAd.mediaGridSectionCards.length === 0) return null;

  return (
    <section className="py-20 sm:py-32 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landAd.mediaGridSectionCards.map((card, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="card-animated-border h-full">
                <Card className="h-full flex flex-col overflow-hidden">
                    {(card.videoUrl || card.imageUrl) && (
                        <div className="aspect-video relative w-full">
                            {card.videoUrl ? (
                                <iframe
                                    src={card.videoUrl}
                                    title={card.title || 'Video'}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            ) : card.imageUrl && (
                                <Image
                                    src={card.imageUrl}
                                    alt={card.title || 'Imagen de la tarjeta'}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                    )}
                  <CardHeader>
                    {card.title && <CardTitle>{card.title}</CardTitle>}
                    {card.description && <CardDescription>{card.description}</CardDescription>}
                  </CardHeader>
                  {(card.ctaText && card.ctaUrl) && (
                    <CardFooter className="mt-auto">
                        <Button asChild>
                            <Link href={card.ctaUrl}>{card.ctaText}</Link>
                        </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingHtmlSection({ landAd }: { landAd: LandAd }) {
  if (!landAd.pricingSectionEnabled || !landAd.pricingSectionCards || landAd.pricingSectionCards.length === 0) return null;

  const adaptHtml = (html: string) => {
    if (!html) return '';
    return html
      .replace(/class="/g, 'class="')
      .replace(/border-slate-200 rounded-2xl/g, 'bg-card border border-border rounded-lg')
      .replace(/text-slate-900/g, 'text-foreground')
      .replace(/text-slate-500/g, 'text-muted-foreground')
      .replace(/text-slate-600/g, 'text-muted-foreground')
      .replace(/text-slate-800/g, 'text-secondary-foreground')
      .replace(/bg-slate-100/g, 'bg-secondary')
      .replace(/hover:bg-slate-200/g, 'hover:bg-secondary/80')
      .replace(/text-indigo-500/g, 'text-primary');
  };

  return (
    <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {landAd.pricingSectionCards.map((card, index) => (
                    <div key={index} dangerouslySetInnerHTML={{ __html: adaptHtml(card.htmlContent) }} />
                ))}
            </div>
        </div>
    </section>
  );
}

function FullWidthMediaSection({ landAd }: { landAd: LandAd }) {
  if (!landAd.fullWidthMediaSectionEnabled) return null;

  const hasMedia = landAd.fullWidthMediaSectionImageUrl || landAd.fullWidthMediaSectionVideoUrl;

  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      {landAd.fullWidthMediaSectionVideoUrl && (
        <video
          src={landAd.fullWidthMediaSectionVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}
      {landAd.fullWidthMediaSectionImageUrl && !landAd.fullWidthMediaSectionVideoUrl && (
        <Image
          src={landAd.fullWidthMediaSectionImageUrl}
          alt={landAd.fullWidthMediaSectionTitle || 'Fondo de sección'}
          fill
          className="object-cover"
        />
      )}
       <div className="absolute inset-0 bg-black/60" />
       <div className="container mx-auto px-6 py-20 relative z-10">
         <FadeIn>
           {landAd.fullWidthMediaSectionTitle && (
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{landAd.fullWidthMediaSectionTitle}</h2>
           )}
           {landAd.fullWidthMediaSectionDescription && (
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">{landAd.fullWidthMediaSectionDescription}</p>
           )}
         </FadeIn>
       </div>
    </section>
  )
}

function FaqSection({ landAd }: { landAd: LandAd }) {
  if (!landAd.faqSectionEnabled || !landAd.faqSectionItems || landAd.faqSectionItems.length === 0) return null;

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
            Preguntas Frecuentes
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 bg-card p-6 rounded-lg">
            <Accordion type="single" collapsible className="w-full">
              {landAd.faqSectionItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left font-bold text-lg">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function OpenQuestionnaireSection({ landAd }: { landAd: LandAd }) {
    if (!landAd.openQuestionnaireEnabled || !landAd.openQuestionnaireItems || landAd.openQuestionnaireItems.length === 0) return null;

    return (
        <section className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <FadeIn>
                    {landAd.openQuestionnaireTitle && (
                        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">
                            {landAd.openQuestionnaireTitle}
                        </h2>
                    )}
                    <Card className="p-6">
                        <CardContent className="pt-6 space-y-6">
                            {landAd.openQuestionnaireItems.map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <Label htmlFor={`open-q-${index}`} className="text-lg">{item.question}</Label>
                                    <Textarea id={`open-q-${index}`} name={`open-q-${index}`} placeholder="Tu respuesta..." required />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </FadeIn>
            </div>
        </section>
    );
}

function CheckboxQuestionnaireSection({ landAd }: { landAd: LandAd }) {
    if (!landAd.checkboxQuestionnaireEnabled || !landAd.checkboxQuestionnaireItems || landAd.checkboxQuestionnaireItems.length === 0) return null;

    return (
        <section className="py-20 sm:py-32 bg-card/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <FadeIn>
                    {landAd.checkboxQuestionnaireTitle && (
                        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">
                            {landAd.checkboxQuestionnaireTitle}
                        </h2>
                    )}
                    <Card className="p-6">
                        <CardContent className="pt-6 space-y-8">
                            {landAd.checkboxQuestionnaireItems.map((item, qIndex) => (
                                <div key={qIndex} className="space-y-4">
                                    <Label className="text-lg font-semibold">{item.question}</Label>
                                    <div className="space-y-2 pl-2">
                                        {item.options.map((option, oIndex) => (
                                            <div key={oIndex} className="flex items-center space-x-2">
                                                <Checkbox id={`check-q${qIndex}-o${oIndex}`} name={`check-q-${qIndex}`} value={option.label} />
                                                <Label htmlFor={`check-q${qIndex}-o${oIndex}`} className="font-normal">
                                                    {option.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </FadeIn>
            </div>
        </section>
    );
}

function ContactFormSection({ landAd }: { landAd: LandAd }) {
    if (!landAd.contactFormEnabled) return null;
    
    const formFields = [
        { name: "Nombre", show: landAd.contactFormShowName, type: 'text' },
        { name: "Teléfono", show: landAd.contactFormShowPhone, type: 'tel' },
        { name: "Email", show: landAd.contactFormShowEmail, type: 'email' },
        { name: "Mensaje", show: landAd.contactFormShowTextMessage, type: 'textarea' },
        { name: "Instagram", show: landAd.contactFormShowInstagram, type: 'text' },
        { name: "Facebook", show: landAd.contactFormShowFacebook, type: 'text' },
        { name: "LinkedIn", show: landAd.contactFormShowLinkedIn, type: 'text' },
        { name: "TikTok", show: landAd.contactFormShowTikTok, type: 'text' },
    ];

    const visibleFields = formFields.filter(field => field.show);
    if (visibleFields.length === 0) return null;

    return (
        <section className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <FadeIn>
                    {landAd.contactFormTitle && (
                        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">
                            {landAd.contactFormTitle}
                        </h2>
                    )}
                    <Card className="p-6">
                        <CardContent className="pt-6 space-y-6">
                            {visibleFields.map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <Label htmlFor={field.name} className="text-lg">{field.name}</Label>
                                    {field.type === 'textarea' ? (
                                        <Textarea id={field.name} name={field.name} placeholder={`Tu ${field.name.toLowerCase()}...`} required />
                                    ) : (
                                        <Input id={field.name} name={field.name} type={field.type || 'text'} placeholder={`Tu ${field.name.toLowerCase()}...`} required />
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </FadeIn>
            </div>
        </section>
    );
}

export default function ViewLandAdPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [landAd, setLandAd] = useState<LandAd | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) {
        setError("No se ha proporcionado un ID.");
        setLoading(false);
        return;
    }

    const docRef = doc(db, "landAds", id);
    const unsubscribe = onSnapshot(docRef, 
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          setLandAd({
            id: docSnap.id,
            ...data
          } as LandAd);
          document.title = `LandAD: ${data.title}`;
        } else {
          setError("No se encontró el LandAD.");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching LandAD:", err);
        setError("No se pudo cargar el LandAD.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const responses: { question: string; answer: string }[] = [];

    // Process open questions
    landAd?.openQuestionnaireItems?.forEach((item, index) => {
        const answer = formData.get(`open-q-${index}`) as string;
        if (answer) {
            responses.push({ question: item.question, answer });
        }
    });

    // Process checkbox questions
    landAd?.checkboxQuestionnaireItems?.forEach((item: CheckboxQuestionItem, qIndex: number) => {
        const checkedOptions = formData.getAll(`check-q-${qIndex}`).join(', ');
        if (checkedOptions) {
            responses.push({ question: item.question, answer: checkedOptions });
        }
    });
    
    // Process contact form fields
    const contactFields = ["Nombre", "Teléfono", "Email", "Mensaje", "Instagram", "Facebook", "LinkedIn", "TikTok"];
    contactFields.forEach(field => {
        const answer = formData.get(field) as string;
        if (answer) {
            responses.push({ question: field, answer });
        }
    });

    if (responses.length === 0) {
        toast({
            variant: "destructive",
            title: "Formulario vacío",
            description: "Por favor, rellena al menos un campo antes de enviar.",
        });
        setIsSubmitting(false);
        return;
    }

    const result = await saveLandAdResponse(landAd!.id, responses);

    if (result.success) {
        toast({
            title: "¡Gracias!",
            description: "Tus datos han sido enviados con éxito.",
        });
        form.reset();
    } else {
        toast({
            variant: "destructive",
            title: "Error al enviar",
            description: result.error || "No se pudieron guardar tus datos. Inténtalo de nuevo.",
        });
    }
    setIsSubmitting(false);
  };
  
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando LandAD...</p>
        </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error al Cargar</AlertTitle>
            <AlertDescription>
                <p>{error}</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!landAd) {
     return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>LandAD no encontrado</AlertTitle>
            <AlertDescription>
                <p>La página que buscas no existe o fue eliminada.</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  const hasInteractiveContent = landAd.openQuestionnaireEnabled || landAd.checkboxQuestionnaireEnabled || landAd.contactFormEnabled;

  return (
    <div className="bg-background text-foreground">
        <Header />
        <main>
          <form onSubmit={handleSubmit}>
              <HeroSection landAd={landAd} />
              {landAd.htmlText && (
                  <section className="py-20 sm:py-32">
                      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                          <article className="prose dark:prose-invert prose-lg max-w-4xl mx-auto">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {landAd.htmlText}
                              </ReactMarkdown>
                          </article>
                      </div>
                  </section>
              )}
              <FeatureSection landAd={landAd} />
              <IconListSection landAd={landAd} />
              <MediaGridSection landAd={landAd} />
              <PricingHtmlSection landAd={landAd} />
              <FullWidthMediaSection landAd={landAd} />
              <FaqSection landAd={landAd} />
              
              <OpenQuestionnaireSection landAd={landAd} />
              <CheckboxQuestionnaireSection landAd={landAd} />
              <ContactFormSection landAd={landAd} />

              {hasInteractiveContent && (
                  <section className="py-20 sm:py-32">
                      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                          <Button type="submit" size="lg" disabled={isSubmitting}>
                              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enviando...</> : 'Enviar Datos'}
                          </Button>
                      </div>
                  </section>
              )}

               <section className="py-20 sm:py-32">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                      <FadeIn>
                      <div className="card-animated-border">
                          <InteractiveCard className="card-gradient-hover bg-card border border-primary/30 rounded-lg p-8 md:p-12 text-center">
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
                          </InteractiveCard>
                      </div>
                      </FadeIn>
                  </div>
              </section>
            </form>
        </main>
        <Footer />
    </div>
  );
}
