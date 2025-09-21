
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, Eye, AlertTriangle } from "lucide-react";
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
import { PresentationForm } from "./PresentationForm";
import type { Presentation } from "@/app/actions/presentations-actions";
import { deletePresentation } from "@/app/actions/presentations-actions";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export function PresentationsClientPage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedPresentation, setSelectedPresentation] = useState<Presentation | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "presentations"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const presentationsData: Presentation[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          presentationsData.push({
            id: doc.id,
            title: data.title,
            code: data.code,
            htmlText: data.htmlText,
            createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
            // --- ALL fields should be loaded here ---
            heroEnabled: data.heroEnabled,
            heroTitle: data.heroTitle,
            heroDescription: data.heroDescription,
            heroCtaText: data.heroCtaText,
            heroCtaUrl: data.heroCtaUrl,
            heroImageUrl: data.heroImageUrl,
            featureSectionEnabled: data.featureSectionEnabled,
            featureSectionTitle: data.featureSectionTitle,
            featureSectionDescription: data.featureSectionDescription,
            featureSectionCtaText: data.featureSectionCtaText,
            featureSectionCtaUrl: data.featureSectionCtaUrl,
            featureSectionCards: data.featureSectionCards,
            iconListSectionEnabled: data.iconListSectionEnabled,
            iconListSectionDescription: data.iconListSectionDescription,
            iconListSectionItems: data.iconListSectionItems,
            mediaGridSectionEnabled: data.mediaGridSectionEnabled,
            mediaGridSectionCards: data.mediaGridSectionCards,
            pricingSectionEnabled: data.pricingSectionEnabled,
            pricingSectionCards: data.pricingSectionCards,
            fullWidthMediaSectionEnabled: data.fullWidthMediaSectionEnabled,
            fullWidthMediaSectionTitle: data.fullWidthMediaSectionTitle,
            fullWidthMediaSectionDescription: data.fullWidthMediaSectionDescription,
            fullWidthMediaSectionImageUrl: data.fullWidthMediaSectionImageUrl,
            fullWidthMediaSectionVideoUrl: data.fullWidthMediaSectionVideoUrl,
            faqSectionEnabled: data.faqSectionEnabled,
            faqSectionItems: data.faqSectionItems,
          });
        });
        setPresentations(presentationsData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching presentations in real-time: ", err);
        setError("No se pudieron cargar las presentaciones en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener will handle the update
  };

  const handleDeleteClick = (presentation: Presentation) => {
    setSelectedPresentation(presentation);
    setIsAlertOpen(true);
  };

  const handleEditClick = (presentation: Presentation) => {
    setSelectedPresentation(presentation);
    setIsFormOpen(true);
  };

  const handleViewClick = (presentation: Presentation) => {
    window.open(`/view-presentation/${presentation.id}`, '_blank');
  };

  const confirmDelete = async () => {
    if (!selectedPresentation) return;

    const result = await deletePresentation(selectedPresentation.id);

    if (result.success) {
      toast({
        title: "Presentación Eliminada",
        description: "La presentación ha sido eliminada con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar la presentación.",
      });
    }
    setIsAlertOpen(false);
    setSelectedPresentation(null);
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
          setSelectedPresentation(null);
          setIsFormOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Presentación
        </Button>
      </div>

      <PresentationForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onFormSubmit={handleFormSubmit}
        presentation={selectedPresentation}
      />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {presentations.length > 0 ? (
              presentations.map((presentation) => (
                <TableRow key={presentation.id}>
                  <TableCell className="font-medium">{presentation.title}</TableCell>
                  <TableCell>{presentation.code}</TableCell>
                  <TableCell>{new Date(presentation.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewClick(presentation)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(presentation)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(presentation)} className="text-red-500">
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
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No hay presentaciones</h3>
                  <p className="mt-1 text-sm text-gray-500">Empieza por crear una nueva presentación.</p>
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
              Esta acción no se puede deshacer. Esto eliminará permanentemente la presentación.
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
