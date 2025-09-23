
"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import type { StoredImage } from '@/app/actions/images-actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Library, Loader2, AlertTriangle, ImageIcon as ImageIconDefault } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Skeleton } from './ui/skeleton';

interface ImageGalleryDialogProps {
  onSelectImage: (url: string) => void;
}

export function ImageGalleryDialog({ onSelectImage }: ImageGalleryDialogProps) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<StoredImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);

    const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q,
      (querySnapshot) => {
        const imagesData: StoredImage[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StoredImage));
        setImages(imagesData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching images: ", err);
        setError("No se pudieron cargar las imágenes.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [open]);

  const handleSelect = (url: string) => {
    onSelectImage(url);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="icon">
          <Library className="h-4 w-4" />
          <span className="sr-only">Seleccionar de la galería</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Seleccionar Imagen de la Galería</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto pr-4 -mr-4">
           {loading && (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ))}
             </div>
            )}
            {error && (
                <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
            )}
            {!loading && !error && images.length === 0 && (
                <div className="text-center py-12">
                     <ImageIconDefault className="mx-auto h-12 w-12 text-gray-400" />
                     <h3 className="mt-2 text-sm font-medium">No hay imágenes en la galería</h3>
                     <p className="mt-1 text-sm text-muted-foreground">Añade imágenes en la sección "Imágenes" del dashboard.</p>
                </div>
            )}
           {!loading && !error && images.length > 0 && (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image) => (
                    <button key={image.id} onClick={() => handleSelect(image.url)} className="group space-y-2 text-left focus:outline-none focus:ring-2 focus:ring-ring rounded-lg">
                        <div className="w-full aspect-video relative overflow-hidden rounded-md bg-muted">
                            <Image src={image.url} alt={image.title} fill className="object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <p className="text-sm font-medium truncate group-hover:text-primary">{image.title}</p>
                    </button>
                ))}
             </div>
           )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
