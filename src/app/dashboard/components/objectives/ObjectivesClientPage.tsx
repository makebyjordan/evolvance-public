
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, Target } from "lucide-react";
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
import { ObjectiveForm } from "./ObjectiveForm";
import type { Objective } from "@/app/actions/objectives-actions";
import { deleteObjective } from "@/app/actions/objectives-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

type Owner = 'sandra' | 'julian' | 'jordan';

interface ObjectivesClientPageProps {
  owner: Owner;
}

export function ObjectivesClientPage({ owner }: ObjectivesClientPageProps) {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState<Objective | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(
      collection(db, "objectives"), 
      where("owner", "==", owner),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const objectivesData: Objective[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          objectivesData.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            notes: data.notes,
            tasks: data.tasks,
            owner: data.owner,
            createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
          });
        });
        setObjectives(objectivesData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching objectives in real-time: ", err);
        setError("No se pudieron cargar los objetivos en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [owner]);
  
  const handleFormSubmit = () => {
    // Real-time listener will handle the update
  };

  const handleDeleteClick = (objective: Objective) => {
    setSelectedObjective(objective);
    setIsAlertOpen(true);
  };

  const handleEditClick = (objective: Objective) => {
    setSelectedObjective(objective);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedObjective) return;

    const result = await deleteObjective(selectedObjective.id, owner);

    if (result.success) {
      toast({
        title: "Objetivo Eliminado",
        description: "El objetivo ha sido eliminado con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar el objetivo.",
      });
    }
    setIsAlertOpen(false);
    setSelectedObjective(null);
  };
  
   const calculateProgress = (tasks: { completed: boolean }[] | undefined) => {
    if (!tasks || tasks.length === 0) {
      return 0;
    }
    const completedTasks = tasks.filter(task => task.completed).length;
    return (completedTasks / tasks.length) * 100;
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
          setSelectedObjective(null);
          setIsFormOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Objetivo
        </Button>
      </div>

      <ObjectiveForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onFormSubmit={handleFormSubmit}
        objective={selectedObjective}
        owner={owner}
      />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Título</TableHead>
              <TableHead className="w-[50%]">Progreso</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {objectives.length > 0 ? (
              objectives.map((objective) => (
                <TableRow key={objective.id}>
                  <TableCell className="font-medium">{objective.title}</TableCell>
                   <TableCell>
                    <div className="flex items-center gap-2">
                        <Progress value={calculateProgress(objective.tasks)} className="w-[60%]" />
                        <span className="text-xs text-muted-foreground">{`${Math.round(calculateProgress(objective.tasks))}%`}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(objective.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(objective)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(objective)} className="text-red-500">
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
                  <Target className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No hay objetivos</h3>
                  <p className="mt-1 text-sm text-gray-500">Empieza por crear un nuevo objetivo para <span className="font-bold capitalize">{owner}</span>.</p>
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
              Esta acción no se puede deshacer. Esto eliminará permanentemente el objetivo.
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
