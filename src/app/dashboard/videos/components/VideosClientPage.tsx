
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { VideoForm } from "./VideoForm";
import type { StoredVideo } from "@/app/actions/videos-actions";
import { deleteVideo } from "@/app/actions/videos-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export function VideosClientPage() {
  const [videos, setVideos] = useState<StoredVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<StoredVideo | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const videosData: StoredVideo[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          videosData.push({
            id: doc.id,
            title: data.title,
            url: data.url,
            createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
          });
        });
        setVideos(videosData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching videos in real-time: ", err);
        setError("No se pudieron cargar los videos en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener handles update
  };

  const handleDeleteClick = (video: StoredVideo) => {
    setSelectedVideo(video);
    setIsAlertOpen(true);
  };

  const handleEditClick = (video: StoredVideo) => {
    setSelectedVideo(video);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedVideo) return;

    const result = await deleteVideo(selectedVideo.id);

    if (result.success) {
      toast({
        title: "Video Eliminado",
        description: "El video ha sido eliminado con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar el video.",
      });
    }
    setIsAlertOpen(false);
    setSelectedVideo(null);
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
        <Button onClick={() => { setSelectedVideo(null); setIsFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" />Añadir Video
        </Button>
      </div>

      <VideoForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} onFormSubmit={handleFormSubmit} storedVideo={selectedVideo} />
      
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden group">
                    <CardHeader className="p-0 relative">
                       <div className="absolute top-2 right-2 z-10">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEditClick(video)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteClick(video)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                       </div>
                        <div className="aspect-video relative w-full bg-muted flex items-center justify-center text-muted-foreground">
                           <Video className="w-12 h-12" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-base truncate">{video.title}</CardTitle>
                    </CardContent>
                </Card>
            ))}
        </div>
      ) : (
         <div className="text-center py-16 border border-dashed rounded-lg">
            <Video className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium">No hay videos</h3>
            <p className="mt-1 text-sm text-muted-foreground">Empieza por añadir un nuevo video a tu galería.</p>
        </div>
      )}


      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>¿Estás seguro?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente el video.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
