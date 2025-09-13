
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, ExternalLink } from "lucide-react";
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
import { TrainingItemForm } from "./TrainingItemForm";
import type { TrainingItem } from "@/app/actions/training-items-actions";
import { deleteTrainingItem } from "@/app/actions/training-items-actions";
import type { TrainingSubsection } from "@/app/actions/training-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function TrainingItemsClientPage() {
  const [items, setItems] = useState<TrainingItem[]>([]);
  const [subsections, setSubsections] = useState<TrainingSubsection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TrainingItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const qItems = query(collection(db, "trainingItems"), orderBy("createdAt", "desc"));
    const unsubscribeItems = onSnapshot(qItems, 
      (querySnapshot) => {
        const itemsData: TrainingItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          itemsData.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            url: data.url,
            subsectionId: data.subsectionId,
            createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
          });
        });
        setItems(itemsData);
        if(!error) setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching training items: ", err);
        setError("No se pudieron cargar las formaciones.");
        setLoading(false);
      }
    );
    
    const qSubsections = query(collection(db, "trainingSubsections"), orderBy("title", "asc"));
    const unsubscribeSubsections = onSnapshot(qSubsections,
      (querySnapshot) => {
        const subsectionsData: TrainingSubsection[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          subsectionsData.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
          });
        });
        setSubsections(subsectionsData);
      },
       (err) => {
        console.error("Error fetching subsections: ", err);
        setError("No se pudieron cargar las subsecciones.");
        setLoading(false);
      }
    );


    return () => {
        unsubscribeItems();
        unsubscribeSubsections();
    };
  }, [error]);

  const handleFormSubmit = () => {
    // Real-time listener will handle the update
  };

  const handleDeleteClick = (item: TrainingItem) => {
    setSelectedItem(item);
    setIsAlertOpen(true);
  };

  const handleEditClick = (item: TrainingItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;

    const result = await deleteTrainingItem(selectedItem.id);

    if (result.success) {
      toast({
        title: "Formación Eliminada",
        description: "La formación ha sido eliminada con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar la formación.",
      });
    }
    setIsAlertOpen(false);
    setSelectedItem(null);
  };
  
  const getSubsectionName = (subsectionId: string) => {
    const subsection = subsections.find(s => s.id === subsectionId);
    return subsection ? subsection.title : 'Sin subsección';
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
          setSelectedItem(null);
          setIsFormOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Formación
        </Button>
      </div>

      <TrainingItemForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onFormSubmit={handleFormSubmit}
        trainingItem={selectedItem}
        subsections={subsections}
      />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Subsección</TableHead>
              <TableHead>Enlace</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{getSubsectionName(item.subsectionId)}</Badge>
                  </TableCell>
                   <TableCell>
                     <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visitar
                     </a>
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
                        <DropdownMenuItem onClick={() => handleEditClick(item)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(item)} className="text-red-500">
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
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No hay formaciones</h3>
                  <p className="mt-1 text-sm text-gray-500">Empieza por crear una nueva formación.</p>
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
              Esta acción no se puede deshacer. Esto eliminará permanentemente la formación.
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
