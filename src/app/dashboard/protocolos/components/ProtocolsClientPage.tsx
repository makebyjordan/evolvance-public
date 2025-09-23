
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, Eye } from "lucide-react";
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
import { ProtocolForm } from "./ProtocolForm";
import type { Protocol } from "@/app/actions/protocols-actions";
import { deleteProtocol } from "@/app/actions/protocols-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export function ProtocolsClientPage() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "protocols"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const protocolsData: Protocol[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: (data.createdAt as Timestamp)?.toDate().toISOString(),
                updatedAt: (data.updatedAt as Timestamp)?.toDate().toISOString(),
            } as Protocol;
        });
        setProtocols(protocolsData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching protocols in real-time: ", err);
        setError("No se pudieron cargar los protocolos en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener handles update
  };

  const handleDeleteClick = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    setIsAlertOpen(true);
  };

  const handleEditClick = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    setIsFormOpen(true);
  };
  
  const handleViewClick = (protocol: Protocol) => {
    // For now, we can just log it or maybe open a view-only dialog in the future.
    console.log("Viewing protocol:", protocol);
    setSelectedProtocol(protocol);
    // You could open a view-only version of the form here
    // For simplicity, we just log it. A proper view page could be /view-protocol/[id]
  };

  const confirmDelete = async () => {
    if (!selectedProtocol) return;
    const result = await deleteProtocol(selectedProtocol.id);
    if (result.success) {
      toast({ title: "Protocolo Eliminado", description: "El protocolo ha sido eliminado con éxito." });
    } else {
      toast({ variant: "destructive", title: "Error al Eliminar", description: result.error || "No se pudo eliminar el protocolo." });
    }
    setIsAlertOpen(false);
    setSelectedProtocol(null);
  };

  if (loading) {
     return (
      <div>
        <div className="flex justify-end mb-4"><Skeleton className="h-10 w-44" /></div>
        <div className="border rounded-lg p-4 space-y-2"><Skeleton className="h-12 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
      </div>
    );
  }

  if (error) {
     return (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" /><AlertTitle>Error de Conexión</AlertTitle>
            <AlertDescription><p>{error}</p><p className="mt-2 text-xs">Comprueba tu conexión a internet y la configuración de Firebase.</p></AlertDescription>
        </Alert>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => { setSelectedProtocol(null); setIsFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" />Crear Protocolo
        </Button>
      </div>

      <ProtocolForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} onFormSubmit={handleFormSubmit} protocol={selectedProtocol} />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader><TableRow><TableHead>Título</TableHead><TableHead>Nº de Pasos</TableHead><TableHead>Fecha Creación</TableHead><TableHead className="text-right">Acciones</TableHead></TableRow></TableHeader>
          <TableBody>
            {protocols.length > 0 ? (
              protocols.map((protocol) => (
                <TableRow key={protocol.id}>
                  <TableCell className="font-medium">{protocol.title}</TableCell>
                  <TableCell>{protocol.steps?.length || 0}</TableCell>
                  <TableCell>{new Date(protocol.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Abrir menú</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(protocol)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(protocol)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={4} className="h-24 text-center"><FileText className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-medium">No hay protocolos</h3><p className="mt-1 text-sm text-gray-500">Empieza por crear un nuevo protocolo.</p></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>¿Estás seguro?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente el protocolo.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
