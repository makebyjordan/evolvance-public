
"use client";

import { FadeIn } from './fade-in';
import { Card } from './ui/card';
import { useEffect, useState } from 'react';

export default function Location() {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // El API key se lee desde las variables de entorno del cliente
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    setApiKey(key);
  }, []);

  const mapSrc = apiKey 
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Evolvance,C.+Astronom%C3%ADa,+1,+Torre+2,+41015+Sevilla`
    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12678.85406087799!2d-6.009710842777508!3d37.4187063428983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126dd331551809%3A0xad52155f5536551!2sEvolvance!5e0!3m2!1ses!2ses!4v1700671373516!5m2!1ses!2ses";

  return (
    <section id="location" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Visítanos
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Encuéntranos en el corazón tecnológico y empresarial de Sevilla.
            </p>
          </div>
          <div className="mt-12 card-animated-border">
            <Card className="overflow-hidden">
                 <div className="aspect-video w-full">
                    <iframe
                        src={mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa de ubicación de Evolvance"
                    ></iframe>
                </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
