
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
import { LandAdForm } from "./LandAdForm";
import type { LandAd } from "@/app/actions/land-ads-actions";
import { deleteLandAd } from "@/app/actions/land-ads-actions";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export function LandAdsClientPage() {
  const [landAds, setLandAds] = useState<LandAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedLandAd, setSelectedLandAd] = useState<LandAd | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "landAds"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const landAdsData: LandAd[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          landAdsData.push({
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
            openQuestionnaireEnabled: data.openQuestionnaireEnabled,
            openQuestionnaireTitle: data.openQuestionnaireTitle,
            openQuestionnaireItems: data.openQuestionnaireItems,
            checkboxQuestionnaireEnabled: data.checkboxQuestionnaireEnabled,
            checkboxQuestionnaireTitle: data.checkboxQuestionnaireTitle,
            checkboxQuestionnaireItems: data.checkboxQuestionnaireItems,
            contactFormEnabled: data.contactFormEnabled,
            contactFormTitle: data.contactFormTitle,
            contactFormShowName: data.contactFormShowName,
            contactFormShowPhone: data.contactFormShowPhone,
            contactFormShowEmail: data.contactFormShowEmail,
            contactFormShowTextMessage: data.contactFormShowTextMessage,
            contactFormShowInstagram: data.contactFormShowInstagram,
            contactFormShowFacebook: data.contactFormShowFacebook,
            contactFormShowLinkedIn: data.contactFormShowLinkedIn,
            contactFormShowTikTok: data.contactFormShowTikTok,
          });
        });
        setLandAds(landAdsData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching LandADS in real-time: ", err);
        setError("No se pudieron cargar los LandADS en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener will handle the update
  };

  const handleDeleteClick = (landAd: LandAd) => {
    setSelectedLandAd(landAd);
    setIsAlertOpen(true);
  };

  const handleEditClick = (landAd: LandAd) => {
    setSelectedLandAd(landAd);
    setIsFormOpen(true);
  };

  const handleViewClick = (landAd: LandAd) => {
    window.open(`/view-land-ad/${landAd.id}`, '_blank');
  };

  const confirmDelete = async () => {
    if (!selectedLandAd) return;

    const result = await deleteLandAd(selectedLandAd.id);

    if (result.success) {
      toast({
        title: "LandAD Eliminado",
        description: "El LandAD ha sido eliminado con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar el LandAD.",
      });
    }
    setIsAlertOpen(false);
    setSelectedLandAd(null);
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
          setSelectedLandAd(null);
          setIsFormOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear LandAD
        </Button>
      </div>

      <LandAdForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onFormSubmit={handleFormSubmit}
        landAd={selectedLandAd}
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
            {landAds.length > 0 ? (
              landAds.map((landAd) => (
                <TableRow key={landAd.id}>
                  <TableCell className="font-medium">{landAd.title}</TableCell>
                  <TableCell>{landAd.code}</TableCell>
                  <TableCell>{new Date(landAd.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewClick(landAd)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(landAd)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(landAd)} className="text-red-500">
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
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No hay LandADS</h3>
                  <p className="mt-1 text-sm text-gray-500">Empieza por crear un nuevo LandAD.</p>
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
              Esta acción no se puede deshacer. Esto eliminará permanentemente el LandAD.
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
