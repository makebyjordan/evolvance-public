
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface HtmlData {
    id: string;
    title: string;
    htmlText: string;
}

export default function ViewHtmlPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [htmlDoc, setHtmlDoc] = useState<HtmlData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
        setError("No se ha proporcionado un ID de documento.");
        setLoading(false);
        return;
    }

    const docRef = doc(db, "htmls", id);
    const unsubscribe = onSnapshot(docRef, 
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          setHtmlDoc({
            id: docSnap.id,
            title: data.title,
            htmlText: data.htmlText,
          });
          document.title = `Documento: ${data.title}`;
        } else {
          setError("No se encontró el documento HTML.");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching html document:", err);
        setError("No se pudo cargar el documento HTML.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);
  
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando documento...</p>
        </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error al Cargar el Documento</AlertTitle>
            <AlertDescription>
                <p>{error}</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!htmlDoc) {
     return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Documento no encontrado</AlertTitle>
            <AlertDescription>
                <p>El documento que buscas no existe o fue eliminado.</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <iframe
      srcDoc={htmlDoc.htmlText}
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
      title={htmlDoc.title}
    />
  );
}
