
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
import { saveOfficeSection, type OfficeSection } from "@/app/actions/office-sections-actions";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  path: z.string().min(2, { message: "La ruta es requerida." }).startsWith('/', { message: "La ruta debe empezar con /"}),
  icon: z.string().min(2, { message: "El nombre del icono es requerido." }),
});

type OfficeSectionFormValues = z.infer<typeof formSchema>;

interface OfficeSectionFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  section: OfficeSection | null;
}

export function OfficeSectionForm({ isOpen, setIsOpen, onFormSubmit, section }: OfficeSectionFormProps) {
  const { toast } = useToast();
  const isEditing = !!section;

  const form = useForm<OfficeSectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      path: "",
      icon: "",
    },
  });

  useEffect(() => {
    if (isEditing && section) {
      form.reset({
        title: section.title,
        path: section.path,
        icon: section.icon,
      });
    } else {
      form.reset({
        title: "",
        path: "/office/",
        icon: "FileText",
      });
    }
  }, [isEditing, section, form]);


  const onSubmit = async (values: OfficeSectionFormValues) => {
    const sectionData = {
      ...values,
      id: isEditing ? section!.id : undefined,
    };
    
    const result = await saveOfficeSection(sectionData);

    if (result.success) {
      toast({
        title: `Sección ${isEditing ? 'Actualizada' : 'Creada'}`,
        description: `La sección "${values.title}" ha sido guardada.`,
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
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Sección' : 'Nueva Sección'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para la sección del dashboard de oficina.
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
                    <Input placeholder="Ej: Mis Tareas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruta</FormLabel>
                  <FormControl>
                    <Input placeholder="/office/tasks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icono (de Lucide)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: CheckSquare" {...field} />
                  </FormControl>
                   <FormDescription>
                    Busca el nombre del icono en <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">lucide.dev/icons</a>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Sección')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
