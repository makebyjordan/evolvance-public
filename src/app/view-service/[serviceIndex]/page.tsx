
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ServiceData {
    id: string;
    name: string;
    htmlBody: string;
}

export default function ViewServicePage() {
  const params = useParams();
  const serviceIndex = Array.isArray(params.serviceIndex) ? params.serviceIndex[0] : params.serviceIndex;
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adaptedHtml, setAdaptedHtml] = useState<string>('');


  useEffect(() => {
    if (!serviceIndex) {
        setError("No se ha proporcionado un ID de servicio.");
        setLoading(false);
        return;
    }

    const docRef = doc(db, "services", serviceIndex);
    const unsubscribe = onSnapshot(docRef, 
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          setService({
            id: docSnap.id,
            name: data.name,
            htmlBody: data.htmlBody,
          });
          document.title = `Servicio: ${data.name}`;
        } else {
          setError("No se encontró el servicio.");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching service:", err);
        setError("No se pudo cargar el servicio.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [serviceIndex]);
  
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando servicio...</p>
        </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error al Cargar el Servicio</AlertTitle>
            <AlertDescription>
                <p>{error}</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!service) {
     return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Servicio no encontrado</AlertTitle>
            <AlertDescription>
                <p>El servicio que buscas no existe o fue eliminado.</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <iframe
      srcDoc={adaptedHtml || service.htmlBody} // Fallback to original if adaptation fails
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
      title={service.name}
    />
  );
}

