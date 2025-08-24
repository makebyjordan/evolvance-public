
"use client";

import { useState, useEffect } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, FileText } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import type { Proposal } from "@/app/actions/proposals-actions";
import { ProposalCard } from "./components/ProposalCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    const q = query(collection(db, "proposals"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const proposalsData: Proposal[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          proposalsData.push({
            id: doc.id,
            title: data.title,
            code: data.code,
            htmlText: data.htmlText,
            createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
          });
        });
        setProposals(proposalsData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching proposals: ", err);
        setError("No se pudieron cargar las propuestas.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-background p-4 md:p-8">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-grid-white/[0.05]" />
      
      <header className="max-w-5xl w-full mx-auto mb-8">
        <div className="flex items-center justify-between">
           <div>
              <h1 className="text-3xl font-headline text-primary">Propuestas</h1>
              <p className="text-muted-foreground mt-1">
                Introduce el código de tu propuesta para verla.
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

        {!loading && !error && proposals.length === 0 && (
          <div className="text-center py-16 border border-dashed rounded-lg">
             <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-foreground">No hay propuestas disponibles</h3>
              <p className="mt-1 text-sm text-muted-foreground">Contacta con nosotros si esperabas ver una propuesta aquí.</p>
          </div>
        )}

        {!loading && !error && proposals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
