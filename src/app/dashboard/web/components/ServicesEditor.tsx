
"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveWebContent, type ServicesContent } from "@/app/actions/web-content-actions";
import { Bot, Megaphone, View, CalendarCheck, Zap, Lightbulb, Trash2, PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const iconMap: { [key: string]: React.ElementType } = {
  Bot: Bot,
  Megaphone: Megaphone,
  View: View,
  CalendarCheck: CalendarCheck,
  Zap: Zap,
  Lightbulb: Lightbulb
};

const iconOptions = Object.keys(iconMap);

const serviceItemSchema = z.object({
  icon: z.string().min(1, "El icono es requerido."),
  title: z.string().min(3, "El título es requerido."),
  description: z.string().min(10, "La descripción es requerida."),
});

const servicesSchema = z.object({
  title: z.string().min(5, "El título principal es requerido."),
  items: z.array(serviceItemSchema).min(1, "Debe haber al menos un servicio."),
});

type ServicesFormValues = z.infer<typeof servicesSchema>;

interface ServicesEditorProps {
  initialContent: ServicesContent | null;
}

export function ServicesEditor({ initialContent }: ServicesEditorProps) {
  const { toast } = useToast();
  
  const form = useForm<ServicesFormValues>({
    resolver: zodResolver(servicesSchema),
    defaultValues: initialContent || {
      title: 'Un Universo de Soluciones a tu Medida',
      items: [
        { icon: 'Bot', title: 'IA y Automatización', description: 'Eleva tu eficiencia con chatbots inteligentes, asistentes de voz y automatización integral de procesos.' },
        { icon: 'Megaphone', title: 'Marketing y Gestión de Redes', description: 'Conquista tu mercado digital con estrategias de contenido, SEO y campañas de ads que convierten.' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = async (values: ServicesFormValues) => {
    const result = await saveWebContent('services', values);
    if (result.success) {
      toast({
        title: "Contenido Actualizado",
        description: "La sección de servicios ha sido guardada.",
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
        <CardTitle>Editor de la Sección "Servicios"</CardTitle>
        <CardDescription>Modifica el título y los servicios que se muestran en la página principal.</CardDescription>
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
              <h3 className="text-lg font-semibold mb-4">Items de Servicios</h3>
              <div className="space-y-6">
                {fields.map((field, index) => {
                  const Icon = iconMap[form.watch(`items.${index}.icon`)] || Zap;
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
                    <div className="flex items-center gap-4">
                        <Icon className="w-8 h-8 text-primary" />
                        <FormField
                            control={form.control}
                            name={`items.${index}.title`}
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                <FormLabel>Título del Servicio</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`items.${index}.icon`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icono</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {iconOptions.map(iconName => (
                                        <SelectItem key={iconName} value={iconName}>{iconName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                            />
                    </div>
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl><Textarea {...field} /></FormControl>
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
                onClick={() => append({ icon: 'Zap', title: 'Nuevo Servicio', description: 'Describe este nuevo servicio increíble.' })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Servicio
              </Button>
            </div>
            
            <Separator />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios de Servicios'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
