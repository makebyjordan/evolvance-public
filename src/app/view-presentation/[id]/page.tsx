
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

interface PresentationData {
    id: string;
    title: string;
    htmlText: string;
    heroEnabled?: boolean;
    heroTitle?: string;
    heroDescription?: string;
    heroCtaText?: string;
    heroCtaUrl?: string;
    heroImageUrl?: string;
}

function HeroSection({ presentation }: { presentation: PresentationData }) {
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


export default function ViewPresentationPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [presentation, setPresentation] = useState<PresentationData | null>(null);
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
          } as PresentationData);
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
            <article className="prose dark:prose-invert prose-lg max-w-4xl mx-auto py-16 px-4"
                dangerouslySetInnerHTML={{ __html: presentation.htmlText }}
             />
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
