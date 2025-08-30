
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
import { saveWebContent, type TimelineContent } from "@/app/actions/web-content-actions";
import { Trash2, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const timelineEventSchema = z.object({
  year: z.string().min(1, "El año/etiqueta es requerido."),
  title: z.string().min(3, "El título es requerido."),
  description: z.string().min(10, "La descripción es requerida."),
});

const timelineSchema = z.object({
  title: z.string().min(5, "El título principal es requerido."),
  events: z.array(timelineEventSchema).min(1, "Debe haber al menos un evento."),
});

type TimelineFormValues = z.infer<typeof timelineSchema>;

interface TimelineEditorProps {
  initialContent: TimelineContent | null;
}

export function TimelineEditor({ initialContent }: TimelineEditorProps) {
  const { toast } = useToast();
  
  const form = useForm<TimelineFormValues>({
    resolver: zodResolver(timelineSchema),
    defaultValues: initialContent || {
      title: 'Nuestra Trayectoria: Innovación Paso a Paso',
      events: [
        { year: '2022', title: 'Puesta en Marcha', description: 'Nace Evol-vance con la misión de integrar tecnologías emergentes.' },
        { year: 'Hoy', title: 'Momento Actual', description: 'Consolidados como referentes, expandimos nuestros servicios.' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "events",
  });

  const onSubmit = async (values: TimelineFormValues) => {
    const result = await saveWebContent('timeline', values);
    if (result.success) {
      toast({
        title: "Contenido Actualizado",
        description: "La sección de trayectoria ha sido guardada.",
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
        <CardTitle>Editor de la Sección "Trayectoria"</CardTitle>
        <CardDescription>Modifica el título y los eventos de la línea de tiempo.</CardDescription>
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
              <h3 className="text-lg font-semibold mb-4">Eventos de la Trayectoria</h3>
              <div className="space-y-6">
                {fields.map((field, index) => (
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name={`events.${index}.year`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Año o Etiqueta</FormLabel>
                                <FormControl><Input {...field} placeholder="Ej: 2024 o Hoy"/></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`events.${index}.title`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                <FormLabel>Título del Evento</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                      control={form.control}
                      name={`events.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl><Textarea {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => append({ year: 'Futuro', title: 'Nuevo Hito', description: 'Describe aquí el próximo gran paso.' })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Evento
              </Button>
            </div>
            
            <Separator />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios de Trayectoria'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
