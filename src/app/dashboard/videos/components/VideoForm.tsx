
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { saveVideo, type StoredVideo } from "@/app/actions/videos-actions";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  url: z.string().url({ message: "Por favor, introduce una URL válida." }),
});

type VideoFormValues = z.infer<typeof formSchema>;

interface VideoFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  storedVideo: StoredVideo | null;
}

export function VideoForm({ isOpen, setIsOpen, onFormSubmit, storedVideo }: VideoFormProps) {
  const { toast } = useToast();
  const isEditing = !!storedVideo;

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const videoUrl = form.watch('url');

  useEffect(() => {
    if (isEditing && storedVideo) {
      form.reset({
        title: storedVideo.title,
        url: storedVideo.url,
      });
    } else {
      form.reset({
        title: "",
        url: "",
      });
    }
  }, [isEditing, storedVideo, form]);


  const onSubmit = async (values: VideoFormValues) => {
    const videoData = {
      ...values,
      id: isEditing ? storedVideo!.id : undefined,
    };
    
    const result = await saveVideo(videoData);

    if (result.success) {
      toast({
        title: `Video ${isEditing ? 'Actualizado' : 'Guardado'}`,
        description: `El video "${values.title}" ha sido guardado.`,
      });
      onFormSubmit();
      handleOpenChange(false);
    } else {
      toast({
        variant: "destructive",
        title: `Error al ${isEditing ? 'actualizar' : 'crear'}`,
        description: result.error || 'Ocurrió un error desconocido.',
      });
    }
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Video' : 'Nuevo Video'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'guardar'} un video en tu galería.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Video Corporativo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL del Video</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com/video.mp4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {videoUrl && (
              <div className="w-full aspect-video relative rounded-md overflow-hidden bg-muted">
                 <video src={videoUrl} controls className="w-full h-full object-contain" />
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Guardar Video')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
