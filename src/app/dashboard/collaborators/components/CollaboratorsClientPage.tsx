
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, FileSignature, FileCog, Upload, File, FileSymlink, Eye } from "lucide-react";
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
import { CollaboratorForm } from "./CollaboratorForm";
import type { Collaborator } from "@/app/actions/collaborators-actions";
import { deleteCollaborator } from "@/app/actions/collaborators-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UploadPdfForm } from "./UploadPdfForm";

export function CollaboratorsClientPage() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "collaborators"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const collaboratorsData: Collaborator[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          collaboratorsData.push({
            id: doc.id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            contractStatus: data.contractStatus,
            description: data.description,
            createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
            contractHtml: data.contractHtml || undefined,
            contractPdfUrl: data.contractPdfUrl || undefined,
          });
        });
        setCollaborators(collaboratorsData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching collaborators in real-time: ", err);
        setError("No se pudieron cargar los colaboradores en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener will handle the update
  };

  const handleDeleteClick = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsAlertOpen(true);
  };

  const handleEditClick = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsFormOpen(true);
  };
  
  const handleContractClick = (collaboratorId: string) => {
    router.push(`/dashboard/contracts/${collaboratorId}`);
  };

  const handleViewClick = (collaboratorId: string) => {
    window.open(`/dashboard/contracts/${collaboratorId}`, '_blank');
  };

  const handleUploadClick = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsUploadFormOpen(true);
  };

  const handleViewPdfClick = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };

  const confirmDelete = async () => {
    if (!selectedCollaborator) return;

    const result = await deleteCollaborator(selectedCollaborator.id);

    if (result.success) {
      toast({
        title: "Colaborador Eliminado",
        description: "El colaborador ha sido eliminado con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar el colaborador.",
      });
    }
    setIsAlertOpen(false);
    setSelectedCollaborator(null);
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
      <div className="flex justify-end mb-4 gap-2">
        <Button variant="outline" asChild>
          <Link href="/dashboard/contracts">
             <FileCog className="mr-2 h-4 w-4" />
            Gestionar Plantillas
          </Link>
        </Button>
        <Button onClick={() => {
          setSelectedCollaborator(null);
          setIsFormOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Colaborador
        </Button>
      </div>

      <CollaboratorForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onFormSubmit={handleFormSubmit}
        collaborator={selectedCollaborator}
      />

       <UploadPdfForm
        isOpen={isUploadFormOpen}
        setIsOpen={setIsUploadFormOpen}
        collaborator={selectedCollaborator}
      />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado Contrato</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collaborators.length > 0 ? (
              collaborators.map((collaborator) => (
                <TableRow key={collaborator.id}>
                  <TableCell className="font-medium">{collaborator.name}</TableCell>
                  <TableCell>{collaborator.email}</TableCell>
                   <TableCell>{collaborator.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{collaborator.contractStatus}</Badge>
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
                         <DropdownMenuItem onClick={() => handleViewClick(collaborator.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleContractClick(collaborator.id)}>
                          <FileSignature className="mr-2 h-4 w-4" />
                          Gestionar Contrato HTML
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUploadClick(collaborator)}>
                            <Upload className="mr-2 h-4 w-4" />
                            Subir Contrato PDF
                        </DropdownMenuItem>
                         {collaborator.contractPdfUrl && (
                            <DropdownMenuItem onClick={() => handleViewPdfClick(collaborator.contractPdfUrl!)}>
                                <FileSymlink className="mr-2 h-4 w-4" />
                                Ver Contrato PDF
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleEditClick(collaborator)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(collaborator)} className="text-red-500">
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
                <TableCell colSpan={5} className="h-24 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No hay colaboradores</h3>
                  <p className="mt-1 text-sm text-gray-500">Empieza por crear un nuevo colaborador.</p>
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
              Esta acción no se puede deshacer. Esto eliminará permanentemente el colaborador.
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
