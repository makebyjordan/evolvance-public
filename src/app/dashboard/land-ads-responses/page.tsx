
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp, getDocs } from "firebase/firestore";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Database, Users2, MoreHorizontal, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteLandAdResponse } from "@/app/actions/land-ads-responses-actions";

export interface LandAdResponse {
  id: string;
  landAdId: string;
  landAdTitle?: string; // This will be populated from the landAdsMap
  responses: { question: string; answer: string }[];
  createdAt: any;
}

export default function LandAdResponsesPage() {
  const [responses, setResponses] = useState<LandAdResponse[]>([]);
  const [landAdsMap, setLandAdsMap] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<LandAdResponse | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLandAdsAndResponses = async () => {
      try {
        // 1. Fetch all LandADs once to create a map of ID -> Title
        const landAdsQuery = query(collection(db, "landAds"));
        const landAdsSnapshot = await getDocs(landAdsQuery);
        const adsMap = new Map<string, string>();
        landAdsSnapshot.forEach((doc) => {
          adsMap.set(doc.id, doc.data().title || 'Sin Título');
        });
        setLandAdsMap(adsMap);

        // 2. Set up the real-time listener for responses
        const responsesQuery = query(collection(db, "landAdResponses"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(responsesQuery, (querySnapshot) => {
          const responsesData: LandAdResponse[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            responsesData.push({
              id: doc.id,
              landAdId: data.landAdId,
              responses: data.responses,
              createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
            });
          });
          setResponses(responsesData);
          setLoading(false);
        }, (err) => {
            console.error("Error fetching LandAd responses in real-time: ", err);
            setError("No se pudieron cargar las respuestas en tiempo real.");
            setLoading(false);
        });

        return unsubscribe;

      } catch (err) {
        console.error("Error fetching initial data: ", err);
        setError("No se pudieron cargar los datos iniciales.");
        setLoading(false);
      }
    };

    const unsubscribePromise = fetchLandAdsAndResponses();

    return () => {
      unsubscribePromise.then(unsubscribe => unsubscribe && unsubscribe());
    };
  }, []);
  
  const getLandAdTitle = (landAdId: string) => {
    return landAdsMap.get(landAdId) || 'LandAD Eliminado o Desconocido';
  };

  const handleDeleteClick = (response: LandAdResponse) => {
    setSelectedResponse(response);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedResponse) return;

    const result = await deleteLandAdResponse(selectedResponse.id);

    if (result.success) {
      toast({
        title: "Respuesta Eliminada",
        description: "La respuesta del usuario ha sido eliminada con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar la respuesta.",
      });
    }
    setIsAlertOpen(false);
    setSelectedResponse(null);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="mb-8">
            <CardHeader>
                 <div className="flex items-center gap-4">
                    <Users2 className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Clientes de LandADS</CardTitle>
                        <CardDescription>
                            <Skeleton className="h-4 w-96" />
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <Card>
            <CardContent className="pt-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-10 w-full mt-2" />
                <Skeleton className="h-10 w-full mt-2" />
                 <Skeleton className="h-10 w-full mt-2" />
            </CardContent>
        </Card>
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
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {responses.length > 0 ? (
                        responses.map((response) => (
                            <TableRow key={response.id}>
                                <TableCell>{new Date(response.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{getLandAdTitle(response.landAdId)}</Badge>
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
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                          <span className="sr-only">Abrir menú</span>
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleDeleteClick(response)} className="text-red-500">
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Eliminar
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
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
       <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la respuesta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
