
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, GraduationCap } from "lucide-react";
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
import { TrainingSubsectionForm } from "./TrainingSubsectionForm";
import type { TrainingSubsection } from "@/app/actions/training-actions";
import { deleteTrainingSubsection } from "@/app/actions/training-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export function TrainingClientPage() {
  const [subsections, setSubsections] = useState<TrainingSubsection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedSubsection, setSelectedSubsection] = useState<TrainingSubsection | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "trainingSubsections"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
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
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching training subsections in real-time: ", err);
        setError("No se pudieron cargar las subsecciones en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener will handle the update
  };

  const handleDeleteClick = (subsection: TrainingSubsection) => {
    setSelectedSubsection(subsection);
    setIsAlertOpen(true);
  };

  const handleEditClick = (subsection: TrainingSubsection) => {
    setSelectedSubsection(subsection);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedSubsection) return;

    const result = await deleteTrainingSubsection(selectedSubsection.id);

    if (result.success) {
      toast({
        title: "Subsección Eliminada",
        description: "La subsección ha sido eliminada con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar la subsección.",
      });
    }
    setIsAlertOpen(false);
    setSelectedSubsection(null);
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
          setSelectedSubsection(null);
          setIsFormOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Subsección
        </Button>
      </div>

      <TrainingSubsectionForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onFormSubmit={handleFormSubmit}
        subsection={selectedSubsection}
      />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subsections.length > 0 ? (
              subsections.map((subsection) => (
                <TableRow key={subsection.id}>
                  <TableCell className="font-medium">{subsection.title}</TableCell>
                  <TableCell className="text-muted-foreground max-w-sm truncate">{subsection.description}</TableCell>
                  <TableCell>{new Date(subsection.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(subsection)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(subsection)} className="text-red-500">
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
                  <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No hay subsecciones</h3>
                  <p className="mt-1 text-sm text-gray-500">Empieza por crear una nueva subsección de formación.</p>
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
              Esta acción no se puede deshacer. Esto eliminará permanentemente la subsección.
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

