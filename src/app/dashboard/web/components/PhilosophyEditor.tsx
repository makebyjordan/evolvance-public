
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
import { saveWebContent, type PhilosophyContent } from "@/app/actions/web-content-actions";
import { Trash2, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const philosophyPointSchema = z.object({
  icon: z.string().min(1, "El SVG del icono es requerido."),
  title: z.string().min(3, "El título es requerido."),
  description: z.string().min(10, "La descripción es requerida."),
});

const philosophySchema = z.object({
  title: z.string().min(5, "El título principal es requerido."),
  points: z.array(philosophyPointSchema).min(1, "Debe haber al menos un punto."),
});

type PhilosophyFormValues = z.infer<typeof philosophySchema>;

const defaultIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;

interface PhilosophyEditorProps {
  initialContent: PhilosophyContent | null;
}

export function PhilosophyEditor({ initialContent }: PhilosophyEditorProps) {
  const { toast } = useToast();
  
  const form = useForm<PhilosophyFormValues>({
    resolver: zodResolver(philosophySchema),
    defaultValues: initialContent || {
      title: 'Excelencia, Confianza e Innovación en Nuestro ADN',
      points: [
        { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`, title: 'Confianza Absoluta', description: 'Relaciones transparentes y comunicación constante.' },
        { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-circuit"><path d="M12 2a5.3 5.3 0 0 1 3.5 9.1c.4.5.8 1.1 1.2 1.9a5.5 5.5 0 0 1-2.6 7.4c-1.7.8-3.6.8-5.3 0a5.5 5.5 0 0 1-2.6-7.4c.4-.8.8-1.4 1.2-1.9A5.3 5.3 0 0 1 12 2Z"/><path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z"/><path d="M12 2v2"/><path d="m6.4 4.5-.9 1.3"/><path d="m17.6 4.5.9 1.3"/><path d="M21.1 10.5h-2.2"/><path d="M4.9 10.5H2.8"/><path d="m19.6 17.5-.9-1.3"/><path d="m4.4 17.5.9-1.3"/><path d="M12 20v2"/><path d="M8 14.5a2.5 2.5 0 0 0-2.5-2.5h-1a2.5 2.5 0 0 1 0-5h1A2.5 2.5 0 0 0 8 9.5"/><path d="M16 14.5a2.5 2.5 0 0 1 2.5-2.5h1a2.5 2.5 0 0 0 0-5h-1a2.5 2.5 0 0 1-2.5-2.5"/></svg>`, title: 'Autoridad por Conocimiento', description: 'Un equipo a la vanguardia para darte una ventaja competitiva decisiva.' },
        { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.9 4.2-4.3.9 3.1 3-1 4.2 3.8-2.3 3.8 2.3-1-4.2 3.1-3-4.3-.9L12 3z"/><path d="M5 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M19 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>`, title: 'Innovación Constante', description: 'No seguimos tendencias, las creamos para tu negocio.' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "points",
  });

  const onSubmit = async (values: PhilosophyFormValues) => {
    const result = await saveWebContent('philosophy', values);
    if (result.success) {
      toast({
        title: "Contenido Actualizado",
        description: "La sección de filosofía ha sido guardada.",
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
        <CardTitle>Editor de la Sección "Filosofía"</CardTitle>
        <CardDescription>Modifica el título y los pilares de la filosofía de la empresa.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Título Principal de la Sección</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Pilares de la Filosofía</h3>
              <div className="space-y-6">
                {fields.map((field, index) => {
                  return (
                  <div key={field.id} className="p-4 border rounded-lg relative space-y-4">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-3 -right-3 h-7 w-7"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    
                    <FormField
                        control={form.control}
                        name={`points.${index}.title`}
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                            <FormLabel>Título del Pilar</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                      control={form.control}
                      name={`points.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl><Textarea {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name={`points.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icono (código SVG)</FormLabel>
                          <FormControl><Textarea rows={4} placeholder="Pega el código SVG aquí" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )})}
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => append({ icon: defaultIconSVG, title: 'Nuevo Pilar', description: 'Describe este nuevo pilar fundamental.' })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Pilar
              </Button>
            </div>
            
            <Separator />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios de Filosofía'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
