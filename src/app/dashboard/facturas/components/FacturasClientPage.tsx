
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, Printer } from "lucide-react";
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
import { FacturaForm } from "./FacturaForm";
import type { Factura } from "@/app/actions/facturas-actions";
import { deleteFactura } from "@/app/actions/facturas-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function FacturasClientPage() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "facturas"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const facturasData: Factura[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                date: (data.date as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
                dueDate: (data.dueDate as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
                createdAt: (data.createdAt as Timestamp)?.toDate().toISOString(),
                updatedAt: (data.updatedAt as Timestamp)?.toDate().toISOString(),
            } as Factura
        });
        setFacturas(facturasData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching facturas in real-time: ", err);
        setError("No se pudieron cargar las facturas en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener handles update
  };

  const handleDeleteClick = (factura: Factura) => {
    setSelectedFactura(factura);
    setIsAlertOpen(true);
  };

  const handleEditClick = (factura: Factura) => {
    setSelectedFactura(factura);
    setIsFormOpen(true);
  };
  
  const handlePrintClick = (factura: Factura) => {
    window.open(`/print/factura/${factura.id}`, '_blank');
  };

  const confirmDelete = async () => {
    if (!selectedFactura) return;

    const result = await deleteFactura(selectedFactura.id);

    if (result.success) {
      toast({
        title: "Factura Eliminada",
        description: "La factura ha sido eliminada con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar la factura.",
      });
    }
    setIsAlertOpen(false);
    setSelectedFactura(null);
  };

  const formatCurrency = (amount: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);

  if (loading) {
     return (
      <div>
        <div className="flex justify-end mb-4"><Skeleton className="h-10 w-40" /></div>
        <div className="border rounded-lg p-4 space-y-2"><Skeleton className="h-12 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
      </div>
    );
  }

  if (error) {
     return (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error de Conexión</AlertTitle>
            <AlertDescription><p>{error}</p><p className="mt-2 text-xs">Comprueba tu conexión a internet y la configuración de Firebase.</p></AlertDescription>
        </Alert>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => { setSelectedFactura(null); setIsFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" />Crear Factura
        </Button>
      </div>

      <FacturaForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} onFormSubmit={handleFormSubmit} factura={selectedFactura} />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader><TableRow><TableHead>Nº Factura</TableHead><TableHead>Cliente</TableHead><TableHead>Fecha</TableHead><TableHead>Total</TableHead><TableHead>Estado</TableHead><TableHead className="text-right">Acciones</TableHead></TableRow></TableHeader>
          <TableBody>
            {facturas.length > 0 ? (
              facturas.map((factura) => (
                <TableRow key={factura.id}>
                  <TableCell className="font-medium">{factura.facturaNumber}</TableCell>
                  <TableCell>{factura.clientName}</TableCell>
                  <TableCell>{new Date(factura.date).toLocaleDateString()}</TableCell>
                  <TableCell>{formatCurrency(factura.total)}</TableCell>
                  <TableCell><Badge variant="outline">{factura.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Abrir menú</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <DropdownMenuItem onClick={() => handlePrintClick(factura)}><Printer className="mr-2 h-4 w-4" />Imprimir</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(factura)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(factura)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={6} className="h-24 text-center"><FileText className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-medium">No hay facturas</h3><p className="mt-1 text-sm text-gray-500">Empieza por crear una nueva factura.</p></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>¿Estás seguro?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente la factura.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
