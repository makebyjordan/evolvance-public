
"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProposalData {
    id: string;
    title: string;
    htmlText: string;
}

export default function ViewProposalPage({ params }: { params: { id: string } }) {
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) {
        setError("No se ha proporcionado un ID de propuesta.");
        setLoading(false);
        return;
    }

    const docRef = doc(db, "proposals", params.id);
    const unsubscribe = onSnapshot(docRef, 
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          setProposal({
            id: docSnap.id,
            title: data.title,
            htmlText: data.htmlText,
          });
          document.title = `Propuesta: ${data.title}`;
        } else {
          setError("No se encontró la propuesta.");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching proposal:", err);
        setError("No se pudo cargar la propuesta.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [params.id]);
  
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando propuesta...</p>
        </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error al Cargar la Propuesta</AlertTitle>
            <AlertDescription>
                <p>{error}</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!proposal) {
     return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Propuesta no encontrada</AlertTitle>
            <AlertDescription>
                <p>La propuesta que buscas no existe o fue eliminada.</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <iframe
      srcDoc={proposal.htmlText}
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
      title={proposal.title}
    />
  );
}
