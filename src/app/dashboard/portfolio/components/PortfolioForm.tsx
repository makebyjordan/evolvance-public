
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { savePortfolioProject, type PortfolioProject } from "@/app/actions/portfolio-actions";
import { useEffect } from "react";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  description: z.string().optional(),
  imageUrl: z.string().url({ message: "Por favor, introduce una URL de imagen válida." }),
  imageHint: z.string().optional(),
  url: z.string().url({ message: "Por favor, introduce una URL de proyecto válida." }).optional().or(z.literal('')),
});

type PortfolioFormValues = z.infer<typeof formSchema>;

interface PortfolioFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  project: PortfolioProject | null;
}

export function PortfolioForm({ isOpen, setIsOpen, onFormSubmit, project }: PortfolioFormProps) {
  const { toast } = useToast();
  const isEditing = !!project;

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      imageHint: "",
      url: "",
    },
  });

  const imageUrl = form.watch('imageUrl');

  useEffect(() => {
    if (isEditing && project) {
      form.reset({
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        imageHint: project.imageHint,
        url: project.url,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        imageUrl: "",
        imageHint: "",
        url: "",
      });
    }
  }, [isEditing, project, form]);


  const onSubmit = async (values: PortfolioFormValues) => {
    const projectData = {
      ...values,
      description: values.description || "",
      imageHint: values.imageHint || "",
      url: values.url || "",
      id: isEditing ? project!.id : undefined,
    };
    
    const result = await savePortfolioProject(projectData);

    if (result.success) {
      toast({
        title: `Proyecto ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: `El proyecto "${values.title}" ha sido guardado.`,
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
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} un proyecto del portfolio.
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
                    <Input placeholder="Nombre del proyecto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Describe brevemente el proyecto." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la Imagen</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://ejemplo.com/imagen.png" {...field} />
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
             <FormField
              control={form.control}
              name="imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pista para la Imagen (AI Hint)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: tech app" {...field} />
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
                  <FormLabel>URL del Proyecto (Opcional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://ejemplo.com/proyecto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Proyecto')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
