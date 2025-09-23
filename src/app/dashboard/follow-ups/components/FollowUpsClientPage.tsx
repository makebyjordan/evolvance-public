
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle } from "lucide-react";
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
import { FollowUpForm } from "./FollowUpForm";
import type { FollowUp } from "@/app/actions/follow-ups-actions";
import { deleteFollowUp } from "@/app/actions/follow-ups-actions";
import type { Client } from "@/app/actions/clients-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function FollowUpsClientPage() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Listener for follow-ups
    const qFollowUps = query(collection(db, "followUps"), orderBy("date", "desc"));
    const unsubscribeFollowUps = onSnapshot(qFollowUps, 
      (querySnapshot) => {
        const followUpsData: FollowUp[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: (data.date as Timestamp).toDate().toISOString(),
            createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
          } as FollowUp;
        });
        setFollowUps(followUpsData);
        if(!error) setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching follow-ups: ", err);
        setError("No se pudieron cargar los seguimientos.");
        setLoading(false);
      }
    );

    // Listener for clients
    const qClients = query(collection(db, "clients"), orderBy("name", "asc"));
    const unsubscribeClients = onSnapshot(qClients, 
      (querySnapshot) => {
        const clientsData: Client[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
        setClients(clientsData);
      },
      (err) => {
        console.error("Error fetching clients: ", err);
        setError((prev) => prev || "No se pudieron cargar los clientes.");
      }
    );

    return () => {
      unsubscribeFollowUps();
      unsubscribeClients();
    };
  }, [error]);

  const handleFormSubmit = () => {
    // Real-time listener will handle the update
  };

  const handleDeleteClick = (followUp: FollowUp) => {
    setSelectedFollowUp(followUp);
    setIsAlertOpen(true);
  };

  const handleEditClick = (followUp: FollowUp) => {
    setSelectedFollowUp(followUp);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedFollowUp) return;

    const result = await deleteFollowUp(selectedFollowUp.id);

    if (result.success) {
      toast({
        title: "Seguimiento Eliminado",
        description: "El seguimiento ha sido eliminado con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar el seguimiento.",
      });
    }
    setIsAlertOpen(false);
    setSelectedFollowUp(null);
  };

  if (loading) {
     return (
      <div>
        <div className="flex justify-end mb-4">
          <Skeleton className="h-10 w-44" />
        </div>
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
            <AlertTitle>Error de Conexión</AlertTitle>
            <AlertDescription>
                <p>{error}</p>
                 <p className="mt-2 text-xs">
                    Comprueba tu conexión a internet y la configuración de Firebase.
                </p>
            </AlertDescription>
        </Alert>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => {
          setSelectedFollowUp(null);
          setIsFormOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Seguimiento
        </Button>
      </div>

      <FollowUpForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onFormSubmit={handleFormSubmit}
        followUp={selectedFollowUp}
        clients={clients}
      />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {followUps.length > 0 ? (
              followUps.map((followUp) => (
                <TableRow key={followUp.id}>
                  <TableCell className="font-medium">{followUp.clientName}</TableCell>
                  <TableCell>{new Date(followUp.date).toLocaleDateString()}</TableCell>
                  <TableCell><Badge variant="secondary">{followUp.type}</Badge></TableCell>
                  <TableCell><Badge variant="outline">{followUp.outcome}</Badge></TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">{followUp.notes}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(followUp)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(followUp)} className="text-red-500">
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
                <TableCell colSpan={6} className="h-24 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No hay seguimientos</h3>
                  <p className="mt-1 text-sm text-gray-500">Empieza por crear un nuevo seguimiento.</p>
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
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el seguimiento.
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
    </>
  );
}
