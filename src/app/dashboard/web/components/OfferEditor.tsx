"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveWebContent, type OfferContent } from "@/app/actions/web-content-actions";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const featureCardSchema = z.object({
  icon: z.string().optional(),
  title: z.string().min(1, "El título es requerido."),
});

const offerSchema = z.object({
  title: z.string().min(5, "El título principal es requerido."),
  description: z.string().min(10, "La descripción principal es requerida."),
  valueProposition: z.string().min(10, "La propuesta de valor es requerida."),
  ctaButtonText: z.string().min(3, "El texto del botón es requerido."),
  featureCards: z.array(featureCardSchema).max(4, "Solo puedes tener 4 tarjetas."),
});

type OfferFormValues = z.infer<typeof offerSchema>;

const defaultIcons = {
    'Segmentación Avanzada': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    'Análisis Predictivo': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-circuit"><path d="M12 2a5.3 5.3 0 0 1 3.5 9.1c.4.5.8 1.1 1.2 1.9a5.5 5.5 0 0 1-2.6 7.4c-1.7.8-3.6.8-5.3 0a5.5 5.5 0 0 1-2.6-7.4c.4-.8.8-1.4 1.2-1.9A5.3 5.3 0 0 1 12 2Z"/><path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z"/><path d="M12 2v2"/><path d="m6.4 4.5-.9 1.3"/><path d="m17.6 4.5.9 1.3"/><path d="M21.1 10.5h-2.2"/><path d="M4.9 10.5H2.8"/><path d="m19.6 17.5-.9-1.3"/><path d="m4.4 17.5.9-1.3"/><path d="M12 20v2"/><path d="M8 14.5a2.5 2.5 0 0 0-2.5-2.5h-1a2.5 2.5 0 0 1 0-5h1A2.5 2.5 0 0 0 8 9.5"/><path d="M16 14.5a2.5 2.5 0 0 1 2.5-2.5h1a2.5 2.5 0 0 0 0-5h-1a2.5 2.5 0 0 1-2.5-2.5"/></svg>`,
    'Automatización de Anuncios': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2"/><path d="M12 13h2"/></svg>`,
    'Optimización de Campañas': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
};
type IconKeys = keyof typeof defaultIcons;

interface OfferEditorProps {
  initialContent: OfferContent | null;
}

export function OfferEditor({ initialContent }: OfferEditorProps) {
  const { toast } = useToast();
  
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: initialContent || {
      title: 'IA y Campañas de Marketing (Ads)',
      description: 'En Evolvance integramos IA y publicidad digital para crear campañas más inteligentes y rentables. Utilizamos análisis predictivo, segmentación avanzada y automatización de anuncios en Google, Meta, LinkedIn y otras plataformas.',
      valueProposition: 'Nuestro enfoque combina creatividad + algoritmos para optimizar presupuestos, aumentar conversiones y garantizar un ROI superior.',
      ctaButtonText: 'Agenda reunión para estudiar tu caso',
      featureCards: [
        { title: 'Segmentación Avanzada', icon: defaultIcons['Segmentación Avanzada'] },
        { title: 'Análisis Predictivo', icon: defaultIcons['Análisis Predictivo'] },
        { title: 'Automatización de Anuncios', icon: defaultIcons['Automatización de Anuncios'] },
        { title: 'Optimización de Campañas', icon: defaultIcons['Optimización de Campañas'] },
      ]
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "featureCards",
  });

  const onSubmit = async (values: OfferFormValues) => {
    const result = await saveWebContent('offer', values);
    if (result.success) {
      toast({
        title: "Contenido Actualizado",
        description: "La sección de Oferta ha sido guardada.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: result.error || "Ocurrió un error desconocido.",
      });
    }
  };
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Editor de la Sección "Oferta"</CardTitle>
        <CardDescription>Modifica los textos, botón y tarjetas de la sección destacada de la home.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Título Principal</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-lg font-semibold">Descripción</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valueProposition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Propuesta de Valor</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="ctaButtonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Texto del Botón CTA</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Tarjetas de Características</h3>
              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg space-y-4">
                     <FormField
                        control={form.control}
                        name={`featureCards.${index}.title`}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Título Tarjeta {index + 1}</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                      control={form.control}
                      name={`featureCards.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icono (código SVG)</FormLabel>
                          <FormControl><Textarea rows={4} placeholder="Pega el código SVG aquí" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios de Oferta'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
