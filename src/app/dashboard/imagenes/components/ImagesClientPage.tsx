
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ImageForm } from "./ImageForm";
import type { StoredImage } from "@/app/actions/images-actions";
import { deleteImage } from "@/app/actions/images-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import Image from 'next/image';

export function ImagesClientPage() {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StoredImage | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const imagesData: StoredImage[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          imagesData.push({
            id: doc.id,
            title: data.title,
            url: data.url,
            createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
          });
        });
        setImages(imagesData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching images in real-time: ", err);
        setError("No se pudieron cargar las imágenes en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener handles update
  };

  const handleDeleteClick = (image: StoredImage) => {
    setSelectedImage(image);
    setIsAlertOpen(true);
  };

  const handleEditClick = (image: StoredImage) => {
    setSelectedImage(image);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedImage) return;

    const result = await deleteImage(selectedImage.id);

    if (result.success) {
      toast({
        title: "Imagen Eliminada",
        description: "La imagen ha sido eliminada con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar la imagen.",
      });
    }
    setIsAlertOpen(false);
    setSelectedImage(null);
  };
  
  if (loading) {
     return (
      <div>
        <div className="flex justify-end mb-4">
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
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
        <Button onClick={() => { setSelectedImage(null); setIsFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" />Añadir Imagen
        </Button>
      </div>

      <ImageForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} onFormSubmit={handleFormSubmit} storedImage={selectedImage} />
      
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
                <Card key={image.id} className="overflow-hidden group">
                    <CardHeader className="p-0 relative">
                       <div className="absolute top-2 right-2 z-10">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEditClick(image)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteClick(image)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                       </div>
                        <div className="aspect-video relative w-full bg-muted">
                           <Image src={image.url} alt={image.title} fill className="object-cover transition-transform group-hover:scale-105" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-base truncate">{image.title}</CardTitle>
                    </CardContent>
                </Card>
            ))}
        </div>
      ) : (
         <div className="text-center py-16 border border-dashed rounded-lg">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium">No hay imágenes</h3>
            <p className="mt-1 text-sm text-muted-foreground">Empieza por añadir una nueva imagen a tu galería.</p>
        </div>
      )}


      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>¿Estás seguro?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente la imagen.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
