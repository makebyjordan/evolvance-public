
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, FileText } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import type { Presentation } from "@/app/actions/presentations-actions";
import { PresentationCard } from "./components/PresentationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PresentationsPage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    const q = query(collection(db, "presentations"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const presentationsData: Presentation[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          presentationsData.push({
            id: doc.id,
            title: data.title,
            code: data.code,
            htmlText: data.htmlText,
            createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
          });
        });
        setPresentations(presentationsData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching presentations: ", err);
        setError("No se pudieron cargar las presentaciones.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-background p-4 md:p-8">
      
      <header className="max-w-5xl w-full mx-auto mb-8">
        <div className="flex items-center justify-between">
           <div>
              <h1 className="text-3xl font-headline text-primary">Presentaciones</h1>
              <p className="text-muted-foreground mt-1">
                Introduce el código de una presentación para verla.
              </p>
           </div>
            <Button asChild variant="outline">
              <Link href="/client-portal">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Portal
              </Link>
            </Button>
        </div>
      </header>
      
      <main className="max-w-5xl w-full mx-auto">
        {loading && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
           </div>
        )}

        {error && (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error de Conexión</AlertTitle>
                <AlertDescription>
                    <p>{error}</p>
                    <p className="mt-2 text-xs">
                        Comprueba tu conexión a internet y la configuración.
                    </p>
                </AlertDescription>
            </Alert>
        )}

        {!loading && !error && presentations.length === 0 && (
          <div className="text-center py-16 border border-dashed rounded-lg">
             <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No hay presentaciones disponibles</h3>
              <p className="mt-1 text-sm text-muted-foreground">Contacta con nosotros si esperabas ver una presentación aquí.</p>
          </div>
        )}

        {!loading && !error && presentations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentations.map((presentation) => (
              <PresentationCard key={presentation.id} presentation={presentation} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
