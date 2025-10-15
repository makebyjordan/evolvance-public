
"use client";

import { useState, useEffect, useMemo } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { IaForm } from "./IaForm";
import type { AIModel } from "@/app/actions/ias-actions";
import { deleteAIModel } from "@/app/actions/ias-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function IasClientPage() {
  const [ias, setIas] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedIa, setSelectedIa] = useState<AIModel | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "ias"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const iasData: AIModel[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          iasData.push({
            id: doc.id,
            ...data
          } as AIModel);
        });
        setIas(iasData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching IAs in real-time: ", err);
        setError("No se pudieron cargar las IAs en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  
  const existingTypes = useMemo(() => {
    const types = new Set(ias.map(h => h.type));
    const defaultTypes = ["General", "Imagen", "Video"];
    return Array.from(new Set([...defaultTypes, ...Array.from(types)]));
  }, [ias]);


  const handleFormSubmit = () => {
    // Real-time listener will handle the update
  };

  const handleDeleteClick = (ia: AIModel) => {
    setSelectedIa(ia);
    setIsAlertOpen(true);
  };

  const handleEditClick = (ia: AIModel) => {
    setSelectedIa(ia);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedIa) return;
    const result = await deleteAIModel(selectedIa.id);
    if (result.success) {
      toast({ title: "IA Eliminada", description: "La herramienta de IA ha sido eliminada." });
    } else {
      toast({ variant: "destructive", title: "Error al Eliminar", description: result.error });
    }
    setIsAlertOpen(false);
    setSelectedIa(null);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };


  if (loading) {
     return (
      <div>
        <div className="flex justify-end mb-4"><Skeleton className="h-10 w-36" /></div>
        <div className="border rounded-lg p-4 space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
     return (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription><p>{error}</p></AlertDescription>
        </Alert>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => { setSelectedIa(null); setIsFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" />Crear IA
        </Button>
      </div>

      <IaForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} onFormSubmit={handleFormSubmit} iaModel={selectedIa} existingTypes={existingTypes} />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Precio/Mes</TableHead>
              <TableHead>Día Pago</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ias.length > 0 ? (
              ias.map((ia) => (
                <TableRow key={ia.id}>
                  <TableCell className="font-medium flex items-center gap-2">{ia.title} {ia.featured && <Star className="h-4 w-4 text-yellow-500" />}</TableCell>
                  <TableCell><Badge variant="outline">{ia.type}</Badge></TableCell>
                  <TableCell>{formatCurrency(ia.price)}</TableCell>
                  <TableCell>{ia.paymentDay}</TableCell>
                   <TableCell>
                    <a href={ia.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                      <ExternalLink className="mr-1 h-4 w-4" /> Visitar
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Abrir menú</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(ia)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(ia)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium">No hay IAs</h3>
                  <p className="mt-1 text-sm text-gray-500">Empieza por crear una nueva IA.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer. Se eliminará permanentemente la IA.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
