
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, FileUp } from "lucide-react";
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
import { PresupuestoForm } from "./PresupuestoForm";
import type { Presupuesto } from "@/app/actions/presupuestos-actions";
import { deletePresupuesto } from "@/app/actions/presupuestos-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CreateFacturaDialog } from "./CreateFacturaDialog";

export function PresupuestosClientPage() {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isCreateFacturaOpen, setIsCreateFacturaOpen] = useState(false);
  const [selectedPresupuesto, setSelectedPresupuesto] = useState<Presupuesto | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "presupuestos"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const presupuestosData: Presupuesto[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                date: (data.date as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
                createdAt: (data.createdAt as Timestamp)?.toDate().toISOString(),
                updatedAt: (data.updatedAt as Timestamp)?.toDate().toISOString(),
            } as Presupuesto
        });
        setPresupuestos(presupuestosData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching presupuestos in real-time: ", err);
        setError("No se pudieron cargar los presupuestos en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener handles update
  };

  const handleDeleteClick = (presupuesto: Presupuesto) => {
    setSelectedPresupuesto(presupuesto);
    setIsAlertOpen(true);
  };

  const handleEditClick = (presupuesto: Presupuesto) => {
    setSelectedPresupuesto(presupuesto);
    setIsFormOpen(true);
  };
  
  const handleCreateFacturaClick = (presupuesto: Presupuesto) => {
    setSelectedPresupuesto(presupuesto);
    setIsCreateFacturaOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPresupuesto) return;
    const result = await deletePresupuesto(selectedPresupuesto.id);
    if (result.success) {
      toast({ title: "Presupuesto Eliminado" });
    } else {
      toast({ variant: "destructive", title: "Error al Eliminar", description: result.error });
    }
    setIsAlertOpen(false);
    setSelectedPresupuesto(null);
  };

  const formatCurrency = (amount: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);

  if (loading) {
     return (
      <div>
        <div className="flex justify-end mb-4"><Skeleton className="h-10 w-48" /></div>
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
        <Button onClick={() => { setSelectedPresupuesto(null); setIsFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" />Crear Presupuesto
        </Button>
      </div>

      <PresupuestoForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} onFormSubmit={handleFormSubmit} presupuesto={selectedPresupuesto} />
      {selectedPresupuesto && <CreateFacturaDialog isOpen={isCreateFacturaOpen} setIsOpen={setIsCreateFacturaOpen} presupuesto={selectedPresupuesto} />}
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader><TableRow><TableHead>Nº Presupuesto</TableHead><TableHead>Cliente</TableHead><TableHead>Fecha</TableHead><TableHead>Total</TableHead><TableHead>Estado</TableHead><TableHead className="text-right">Acciones</TableHead></TableRow></TableHeader>
          <TableBody>
            {presupuestos.length > 0 ? (
              presupuestos.map((presupuesto) => (
                <TableRow key={presupuesto.id}>
                  <TableCell className="font-medium">{presupuesto.presupuestoNumber}</TableCell>
                  <TableCell>{presupuesto.clientName}</TableCell>
                  <TableCell>{new Date(presupuesto.date).toLocaleDateString()}</TableCell>
                  <TableCell>{formatCurrency(presupuesto.total)}</TableCell>
                  <TableCell><Badge variant="outline">{presupuesto.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Abrir menú</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleCreateFacturaClick(presupuesto)}><FileUp className="mr-2 h-4 w-4" />Crear Factura</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(presupuesto)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(presupuesto)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={6} className="h-24 text-center"><FileText className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-medium">No hay presupuestos</h3><p className="mt-1 text-sm text-gray-500">Empieza por crear un nuevo presupuesto.</p></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>¿Estás seguro?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente el presupuesto.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
