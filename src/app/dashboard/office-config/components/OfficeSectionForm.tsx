
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { saveOfficeSection, type OfficeSection } from "@/app/actions/office-sections-actions";
import { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  type: z.enum(['link', 'title'], { required_error: "Debes seleccionar un tipo."}),
  path: z.string().optional(),
  icon: z.string().optional(),
}).refine(data => {
    if (data.type === 'link') {
        return !!data.path && data.path.startsWith('/') && !!data.icon;
    }
    return true;
}, {
    message: "La ruta y el icono son requeridos para un enlace.",
    path: ['path'],
}).refine(data => {
    if (data.type === 'link') {
        return !!data.icon;
    }
    return true;
}, {
    message: "El icono es requerido para un enlace.",
    path: ['icon'],
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
      type: "link",
      path: "",
      icon: "",
    },
  });

  const type = form.watch("type");

  useEffect(() => {
    if (isEditing && section) {
      form.reset({
        title: section.title,
        type: section.type,
        path: section.path || "",
        icon: section.icon || "",
      });
    } else {
      form.reset({
        title: "",
        type: "link",
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
        description: `El elemento "${values.title}" ha sido guardado.`,
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
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Elemento' : 'Nuevo Elemento del Menú'}</DialogTitle>
          <DialogDescription>
            Crea un enlace o un título para agrupar secciones en el menú de oficina.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>Tipo de elemento</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                        >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="link" />
                            </FormControl>
                            <FormLabel className="font-normal">Enlace</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="title" />
                            </FormControl>
                            <FormLabel className="font-normal">Título de Grupo</FormLabel>
                        </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder={type === 'link' ? "Ej: Mis Tareas" : "Ej: General"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === 'link' && (
                <>
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
                </>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Elemento')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
