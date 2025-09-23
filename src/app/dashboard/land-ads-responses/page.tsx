
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Database, Users2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export interface LandAdResponse {
  id: string;
  landAdId: string;
  landAdTitle?: string;
  responses: { question: string; answer: string }[];
  createdAt: any;
}

export default function LandAdResponsesPage() {
  const [responses, setResponses] = useState<LandAdResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "landAdResponses"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const responsesData: LandAdResponse[] = [];
      const landAdPromises: Promise<void>[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const responseItem: LandAdResponse = {
          id: doc.id,
          landAdId: data.landAdId,
          responses: data.responses,
          createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
        };

        // Fetch landAd title
        const landAdRef = doc(db, "landAds", data.landAdId);
        const promise = onSnapshot(landAdRef, (landAdSnap) => {
            if (landAdSnap.exists()) {
                responseItem.landAdTitle = landAdSnap.data().title || 'Sin Título';
            } else {
                responseItem.landAdTitle = 'LandAD Eliminado';
            }
        });
        // Note: This onSnapshot inside a loop is not ideal for performance but works for this case.
        // A better approach for larger scale would be to fetch all landADs once.
        
        responsesData.push(responseItem);
      });

      setResponses(responsesData);
      setLoading(false);

    }, (err) => {
      console.error("Error fetching LandAd responses in real-time: ", err);
      setError("No se pudieron cargar las respuestas.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error de Conexión</AlertTitle>
        <AlertDescription>
          <p>{error}</p>
          <p className="mt-2 text-xs">Comprueba tu conexión a internet y la configuración de Firebase.</p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
             <div className="flex items-center gap-4">
                <Users2 className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl font-headline">Clientes de LandADS</CardTitle>
                    <CardDescription>
                        Visualiza todas las respuestas y datos enviados por los usuarios a través de tus LandADS.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="pt-6">
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>LandAD</TableHead>
                            <TableHead>Respuestas</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {responses.length > 0 ? (
                        responses.map((response) => (
                            <TableRow key={response.id}>
                                <TableCell>{new Date(response.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{response.landAdTitle || "Cargando..."}</Badge>
                                </TableCell>
                                <TableCell>
                                     <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Ver {response.responses.length} respuestas</AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    {response.responses.map((r, index) => (
                                                        <li key={index}>
                                                            <strong className="text-foreground">{r.question}:</strong> {r.answer}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </TableCell>
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="h-24 text-center">
                                <Database className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No hay respuestas todavía</h3>
                                <p className="mt-1 text-sm text-gray-500">Cuando un usuario envíe datos desde un LandAD, aparecerán aquí.</p>
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
