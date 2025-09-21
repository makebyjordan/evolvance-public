
"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { savePresentation, type Presentation } from "@/app/actions/presentations-actions";
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2 } from "lucide-react";

const featureCardSchema = z.object({
  icon: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

const mediaGridCardSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  ctaText: z.string().optional(),
  ctaUrl: z.string().optional(),
});


const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  code: z.string().min(2, { message: "El código es requerido." }),
  htmlText: z.string().optional(),
  heroEnabled: z.boolean().default(false),
  heroTitle: z.string().optional(),
  heroDescription: z.string().optional(),
  heroCtaText: z.string().optional(),
  heroCtaUrl: z.string().optional(),
  heroImageUrl: z.string().optional(),
  featureSectionEnabled: z.boolean().default(false),
  featureSectionTitle: z.string().optional(),
  featureSectionDescription: z.string().optional(),
  featureSectionCtaText: z.string().optional(),
  featureSectionCtaUrl: z.string().optional(),
  featureSectionCards: z.array(featureCardSchema).optional(),
  mediaGridSectionEnabled: z.boolean().default(false),
  mediaGridSectionCards: z.array(mediaGridCardSchema).optional(),
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
      featureSectionEnabled: false,
      featureSectionTitle: "",
      featureSectionDescription: "",
      featureSectionCtaText: "",
      featureSectionCtaUrl: "",
      featureSectionCards: [],
      mediaGridSectionEnabled: false,
      mediaGridSectionCards: [],
    },
  });
  
  const heroEnabled = form.watch("heroEnabled");
  const featureSectionEnabled = form.watch("featureSectionEnabled");
  const mediaGridSectionEnabled = form.watch("mediaGridSectionEnabled");

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control: form.control,
    name: "featureSectionCards",
  });

  const { fields: mediaGridFields, append: appendMediaGrid, remove: removeMediaGrid } = useFieldArray({
    control: form.control,
    name: "mediaGridSectionCards",
  });

  useEffect(() => {
    if (isEditing && presentation) {
      form.reset({
        title: presentation.title,
        code: presentation.code,
        htmlText: presentation.htmlText || "",
        heroEnabled: presentation.heroEnabled || false,
        heroTitle: presentation.heroTitle || "",
        heroDescription: presentation.heroDescription || "",
        heroCtaText: presentation.heroCtaText || "",
        heroCtaUrl: presentation.heroCtaUrl || "",
        heroImageUrl: presentation.heroImageUrl || "",
        featureSectionEnabled: presentation.featureSectionEnabled || false,
        featureSectionTitle: presentation.featureSectionTitle || "",
        featureSectionDescription: presentation.featureSectionDescription || "",
        featureSectionCtaText: presentation.featureSectionCtaText || "",
        featureSectionCtaUrl: presentation.featureSectionCtaUrl || "",
        featureSectionCards: presentation.featureSectionCards || [],
        mediaGridSectionEnabled: presentation.mediaGridSectionEnabled || false,
        mediaGridSectionCards: presentation.mediaGridSectionCards || [],
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
        featureSectionEnabled: false,
        featureSectionTitle: "",
        featureSectionDescription: "",
        featureSectionCtaText: "",
        featureSectionCtaUrl: "",
        featureSectionCards: [],
        mediaGridSectionEnabled: false,
        mediaGridSectionCards: [],
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
      <DialogContent className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto">
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
            
            <Separator />
            
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
            
            <Separator />
            
             <FormField
                control={form.control}
                name="featureSectionEnabled"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>Activar Sección de Características</FormLabel>
                        <FormDescription>
                        Añade una sección con título, texto y tarjetas (estilo IA &amp; Ads).
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

            {featureSectionEnabled && (
                <div className="space-y-4 p-4 border rounded-md">
                     <FormField
                        control={form.control}
                        name="featureSectionTitle"
                        render={({ field }) => (
                            <FormItem><FormLabel>Título de la Sección</FormLabel><FormControl><Input placeholder="Título principal de la sección" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="featureSectionDescription"
                        render={({ field }) => (
                            <FormItem><FormLabel>Descripción de la Sección</FormLabel><FormControl><Textarea placeholder="Texto descriptivo de la sección" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                    />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="featureSectionCtaText"
                            render={({ field }) => (
                                <FormItem><FormLabel>Texto del Botón CTA</FormLabel><FormControl><Input placeholder="Ej: Contactar" {...field} /></FormControl><FormMessage /></FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="featureSectionCtaUrl"
                            render={({ field }) => (
                                <FormItem><FormLabel>URL del Botón CTA</FormLabel><FormControl><Input placeholder="https://ejemplo.com/contacto" {...field} /></FormControl><FormMessage /></FormItem>
                            )}
                        />
                    </div>
                    <Separator className="my-6" />
                    <div>
                        <h3 className="text-lg font-medium mb-2">Tarjetas de Características</h3>
                        {featureFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg relative space-y-4 mb-4">
                            <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-3 -right-3 h-7 w-7"
                            onClick={() => removeFeature(index)}
                            >
                            <Trash2 className="h-4 w-4" />
                            </Button>
                            <FormField
                            control={form.control}
                            name={`featureSectionCards.${index}.icon`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Icono (SVG)</FormLabel>
                                <FormControl><Textarea rows={3} placeholder="Pega el código SVG del icono" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name={`featureSectionCards.${index}.title`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Título de la Tarjeta</FormLabel>
                                <FormControl><Input placeholder="Título de la característica" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                             <FormField
                            control={form.control}
                            name={`featureSectionCards.${index}.description`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Descripción de la Tarjeta</FormLabel>
                                <FormControl><Textarea rows={2} placeholder="Descripción de la característica" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        ))}
                        <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={() => appendFeature({ icon: "", title: "", description: "" })}
                        >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir Tarjeta de Característica
                        </Button>
                    </div>
                </div>
            )}
             <Separator />

             <FormField
                control={form.control}
                name="mediaGridSectionEnabled"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>Activar Sección de Tarjetas Multimedia</FormLabel>
                        <FormDescription>
                        Añade una cuadrícula de tarjetas con imagen, video, texto y CTA.
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

             {mediaGridSectionEnabled && (
                <div className="space-y-4 p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2">Tarjetas Multimedia</h3>
                    {mediaGridFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg relative space-y-4 mb-4">
                            <Button type="button" variant="destructive" size="icon" className="absolute -top-3 -right-3 h-7 w-7" onClick={() => removeMediaGrid(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <FormField control={form.control} name={`mediaGridSectionCards.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Título</FormLabel><FormControl><Input placeholder="Título de la tarjeta" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name={`mediaGridSectionCards.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea placeholder="Descripción de la tarjeta" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name={`mediaGridSectionCards.${index}.imageUrl`} render={({ field }) => (<FormItem><FormLabel>URL de Imagen</FormLabel><FormControl><Input placeholder="https://ejemplo.com/imagen.jpg" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name={`mediaGridSectionCards.${index}.videoUrl`} render={({ field }) => (<FormItem><FormLabel>URL de Video (YouTube, Vimeo, etc.)</FormLabel><FormControl><Input placeholder="https://youtube.com/embed/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <FormField control={form.control} name={`mediaGridSectionCards.${index}.ctaText`} render={({ field }) => (<FormItem><FormLabel>Texto del Botón CTA</FormLabel><FormControl><Input placeholder="Ej: Ver Proyecto" {...field} /></FormControl><FormMessage /></FormItem>)} />
                               <FormField control={form.control} name={`mediaGridSectionCards.${index}.ctaUrl`} render={({ field }) => (<FormItem><FormLabel>URL del Botón CTA</FormLabel><FormControl><Input placeholder="https://ejemplo.com/proyecto" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        </div>
                    ))}
                    <Button type="button" variant="outline" className="mt-2" onClick={() => appendMediaGrid({ title: "", description: "", imageUrl: "", videoUrl: "", ctaText: "", ctaUrl: "" })}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir Tarjeta Multimedia
                    </Button>
                </div>
             )}


            <Separator />

            <FormField
              control={form.control}
              name="htmlText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido HTML (Precios, etc.)</FormLabel>
                   <FormDescription>
                    Pega aquí el código HTML para secciones personalizadas, como tablas de precios.
                  </FormDescription>
                  <FormControl>
                    <Textarea rows={10} placeholder="Pega el código HTML aquí..." {...field} />
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

    