
"use client";

import { useState, useEffect } from 'react';
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
import type { Presentation } from '@/app/actions/presentations-actions';
import { InteractiveCard } from '@/components/interactive-card';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';

// Helper component to safely render SVG
function SvgRenderer({ svgString, className }: { svgString: string, className: string }) {
    if (!svgString || typeof svgString !== 'string') return null;
    const modifiedSvgString = svgString.replace('<svg', `<svg class="${className}"`);
    return <div dangerouslySetInnerHTML={{ __html: modifiedSvgString }} />;
}

const defaultIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2z"></polygon></svg>`;


function HeroSection({ presentation }: { presentation: Presentation }) {
    if (!presentation.heroEnabled || !presentation.heroImageUrl) return null;

    return (
        <section className="relative text-primary-foreground h-screen flex items-center justify-center">
            <Image
                src={presentation.heroImageUrl}
                alt={presentation.heroTitle || 'Fondo de la presentación'}
                fill
                className="object-cover"
                quality={100}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="container mx-auto px-6 py-20 text-center relative z-10">
                <FadeIn>
                    {presentation.heroTitle && (
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{presentation.heroTitle}</h1>
                    )}
                    {presentation.heroDescription && (
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/80">{presentation.heroDescription}</p>
                    )}
                    {presentation.heroCtaText && presentation.heroCtaUrl && (
                        <Button asChild size="lg" variant="secondary" className="font-bold">
                            <Link href={presentation.heroCtaUrl} target='_blank'>{presentation.heroCtaText}</Link>
                        </Button>
                    )}
                </FadeIn>
            </div>
        </section>
    );
}

function FeatureSection({ presentation }: { presentation: Presentation }) {
    if (!presentation.featureSectionEnabled) return null;

    return (
        <section className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <FadeIn>
                        <div className="text-left">
                            {presentation.featureSectionTitle && (
                                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                                    {presentation.featureSectionTitle}
                                </h2>
                            )}
                            {presentation.featureSectionDescription && (
                                <p className="mt-4 text-lg text-muted-foreground">
                                    {presentation.featureSectionDescription}
                                </p>
                            )}
                            {presentation.featureSectionCtaText && presentation.featureSectionCtaUrl && (
                                <div className="mt-8 text-center lg:text-left">
                                     <Button asChild size="lg">
                                        <Link href={presentation.featureSectionCtaUrl}>{presentation.featureSectionCtaText}</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </FadeIn>
                    {presentation.featureSectionCards && presentation.featureSectionCards.length > 0 && (
                        <FadeIn delay={0.2}>
                            <div className="grid grid-cols-2 gap-6">
                                {presentation.featureSectionCards.map((card, index) => (
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

function MediaGridSection({ presentation }: { presentation: Presentation }) {
  if (!presentation.mediaGridSectionEnabled || !presentation.mediaGridSectionCards || presentation.mediaGridSectionCards.length === 0) return null;

  return (
    <section className="py-20 sm:py-32 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {presentation.mediaGridSectionCards.map((card, index) => (
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

function PricingHtmlSection({ htmlContent }: { htmlContent: string | undefined }) {
  if (!htmlContent) return null;

  const adaptedHtml = htmlContent
      .replace(/class="/g, 'class="')
       // Replace card-like divs with ShadCN Card component classes
      .replace(/border-slate-200 rounded-2xl/g, 'bg-card border border-border rounded-lg')
      // Replace text colors
      .replace(/text-slate-900/g, 'text-foreground')
      .replace(/text-slate-500/g, 'text-muted-foreground')
      .replace(/text-slate-600/g, 'text-muted-foreground')
      .replace(/text-slate-800/g, 'text-secondary-foreground')
      // Replace button-like links
      .replace(/bg-slate-100/g, 'bg-secondary')
      .replace(/hover:bg-slate-200/g, 'hover:bg-secondary/80')
      // Replace icons
      .replace(/text-indigo-500/g, 'text-primary');

  return (
    <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div dangerouslySetInnerHTML={{ __html: adaptedHtml }} />
            </div>
        </div>
    </section>
  );
}

export default function ViewPresentationPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
        setError("No se ha proporcionado un ID de presentación.");
        setLoading(false);
        return;
    }

    const docRef = doc(db, "presentations", id);
    const unsubscribe = onSnapshot(docRef, 
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          setPresentation({
            id: docSnap.id,
            ...data
          } as Presentation);
          document.title = `Presentación: ${data.title}`;
        } else {
          setError("No se encontró la presentación.");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching presentation:", err);
        setError("No se pudo cargar la presentación.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);
  
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando presentación...</p>
        </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error al Cargar la Presentación</AlertTitle>
            <AlertDescription>
                <p>{error}</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!presentation) {
     return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Presentación no encontrada</AlertTitle>
            <AlertDescription>
                <p>La presentación que buscas no existe o fue eliminada.</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="bg-background text-foreground">
        <Header />
        <main>
            <HeroSection presentation={presentation} />
            <FeatureSection presentation={presentation} />
            <MediaGridSection presentation={presentation} />
            <PricingHtmlSection htmlContent={presentation.htmlText} />
             <section className="bg-card">
                <div className="container mx-auto px-6 py-20 text-center">
                    <FadeIn>
                        <h3 className="text-3xl font-bold mb-4 text-foreground">¿Interesado?</h3>
                        <p className="max-w-xl mx-auto mb-6 text-muted-foreground">Contáctanos para una evaluación inicial y descubre cómo nuestras soluciones pueden transformar tu negocio.</p>
                        <ContactModal>
                            <Button size="lg" className="font-bold">
                                Hablemos
                            </Button>
                        </ContactModal>
                    </FadeIn>
                </div>
            </section>
        </main>
        <Footer />
    </div>
  );
}

    