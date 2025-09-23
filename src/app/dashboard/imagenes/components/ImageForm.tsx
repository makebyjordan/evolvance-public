
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
import { saveImage, type StoredImage } from "@/app/actions/images-actions";
import { useEffect } from "react";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  url: z.string().url({ message: "Por favor, introduce una URL válida." }),
});

type ImageFormValues = z.infer<typeof formSchema>;

interface ImageFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  storedImage: StoredImage | null;
}

export function ImageForm({ isOpen, setIsOpen, onFormSubmit, storedImage }: ImageFormProps) {
  const { toast } = useToast();
  const isEditing = !!storedImage;

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const imageUrl = form.watch('url');

  useEffect(() => {
    if (isEditing && storedImage) {
      form.reset({
        title: storedImage.title,
        url: storedImage.url,
      });
    } else {
      form.reset({
        title: "",
        url: "",
      });
    }
  }, [isEditing, storedImage, form]);


  const onSubmit = async (values: ImageFormValues) => {
    const imageData = {
      ...values,
      id: isEditing ? storedImage!.id : undefined,
    };
    
    const result = await saveImage(imageData);

    if (result.success) {
      toast({
        title: `Imagen ${isEditing ? 'Actualizada' : 'Guardada'}`,
        description: `La imagen "${values.title}" ha sido guardada.`,
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
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Imagen' : 'Nueva Imagen'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'guardar'} una imagen en tu galería.
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
                    <Input placeholder="Ej: Logo de Cliente X" {...field} />
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
                  <FormLabel>URL de la Imagen</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com/imagen.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imageUrl && (
              <div className="w-full aspect-video relative rounded-md overflow-hidden bg-muted">
                 <Image src={imageUrl} alt="Vista previa" fill className="object-contain" />
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Guardar Imagen')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
