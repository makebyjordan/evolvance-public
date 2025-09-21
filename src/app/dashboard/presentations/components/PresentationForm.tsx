
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
import { savePresentation, type Presentation } from "@/app/actions/presentations-actions";
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  code: z.string().min(2, { message: "El código es requerido." }),
  htmlText: z.string().min(10, { message: "El contenido es requerido." }),
  heroEnabled: z.boolean().default(false),
  heroTitle: z.string().optional(),
  heroDescription: z.string().optional(),
  heroCtaText: z.string().optional(),
  heroCtaUrl: z.string().optional(),
  heroImageUrl: z.string().optional(),
});

type PresentationFormValues = z.infer<typeof formSchema>;

interface PresentationFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  presentation: Presentation | null;
}

export function PresentationForm({ isOpen, setIsOpen, onFormSubmit, presentation }: PresentationFormProps) {
  const { toast } = useToast();
  const isEditing = !!presentation;

  const form = useForm<PresentationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
      htmlText: "",
      heroEnabled: false,
      heroTitle: "",
      heroDescription: "",
      heroCtaText: "",
      heroCtaUrl: "",
      heroImageUrl: "",
    },
  });
  
  const heroEnabled = form.watch("heroEnabled");

  useEffect(() => {
    if (isEditing && presentation) {
      form.reset({
        title: presentation.title,
        code: presentation.code,
        htmlText: presentation.htmlText,
        heroEnabled: presentation.heroEnabled || false,
        heroTitle: presentation.heroTitle || "",
        heroDescription: presentation.heroDescription || "",
        heroCtaText: presentation.heroCtaText || "",
        heroCtaUrl: presentation.heroCtaUrl || "",
        heroImageUrl: presentation.heroImageUrl || "",
      });
    } else {
      form.reset({
        title: "",
        code: "",
        htmlText: "",
        heroEnabled: false,
        heroTitle: "",
        heroDescription: "",
        heroCtaText: "",
        heroCtaUrl: "",
        heroImageUrl: "",
      });
    }
  }, [isEditing, presentation, form]);


  const onSubmit = async (values: PresentationFormValues) => {
    const presentationData = {
      ...values,
      id: isEditing ? presentation!.id : undefined,
    };
    
    const result = await savePresentation(presentationData);

    if (result.success) {
      toast({
        title: `Presentación ${isEditing ? 'Actualizada' : 'Creada'}`,
        description: `La presentación "${values.title}" ha sido guardada.`,
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
      <DialogContent className="sm:max-w-2xl bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Presentación' : 'Nueva Presentación'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} una presentación.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: Presentación de Servicios" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: PRES-001" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
             <FormField
                control={form.control}
                name="heroEnabled"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>Activar Sección Hero</FormLabel>
                        <FormDescription>
                        Añade una cabecera con imagen y CTA a la presentación.
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    </FormItem>
                )}
             />

            {heroEnabled && (
              <div className="space-y-4 p-4 border rounded-md">
                <FormField
                  control={form.control}
                  name="heroTitle"
                  render={({ field }) => (
                    <FormItem><FormLabel>Título del Hero (H1)</FormLabel><FormControl><Input placeholder="El titular principal" {...field} /></FormControl><FormMessage /></FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="heroDescription"
                  render={({ field }) => (
                    <FormItem><FormLabel>Descripción del Hero</FormLabel><FormControl><Textarea placeholder="Una descripción que enganche" {...field} /></FormControl><FormMessage /></FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="heroImageUrl"
                  render={({ field }) => (
                    <FormItem><FormLabel>URL de la Imagen de Fondo</FormLabel><FormControl><Input placeholder="https://ejemplo.com/imagen.jpg" {...field} /></FormControl><FormMessage /></FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="heroCtaText"
                    render={({ field }) => (
                      <FormItem><FormLabel>Texto del Botón CTA</FormLabel><FormControl><Input placeholder="Ej: Saber más" {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="heroCtaUrl"
                    render={({ field }) => (
                      <FormItem><FormLabel>URL del Botón CTA</FormLabel><FormControl><Input placeholder="https://ejemplo.com/destino" {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="htmlText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido HTML Principal</FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="Escribe el contenido de la presentación aquí. Puedes usar HTML." {...field} />
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
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Presentación')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
