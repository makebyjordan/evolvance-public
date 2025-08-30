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
import { ShieldCheck, BrainCircuit, Sparkles, Zap, Lightbulb, Trash2, PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const iconMap: { [key: string]: React.ElementType } = {
  ShieldCheck: ShieldCheck,
  BrainCircuit: BrainCircuit,
  Sparkles: Sparkles,
  Zap: Zap,
  Lightbulb: Lightbulb,
};

const iconOptions = Object.keys(iconMap);

const philosophyPointSchema = z.object({
  icon: z.string().min(1, "El icono es requerido."),
  title: z.string().min(3, "El título es requerido."),
  description: z.string().min(10, "La descripción es requerida."),
});

const philosophySchema = z.object({
  title: z.string().min(5, "El título principal es requerido."),
  points: z.array(philosophyPointSchema).min(1, "Debe haber al menos un punto."),
});

type PhilosophyFormValues = z.infer<typeof philosophySchema>;

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
        { icon: 'ShieldCheck', title: 'Confianza Absoluta', description: 'Relaciones transparentes y comunicación constante.' },
        { icon: 'BrainCircuit', title: 'Autoridad por Conocimiento', description: 'Un equipo a la vanguardia para darte una ventaja competitiva decisiva.' },
        { icon: 'Sparkles', title: 'Innovación Constante', description: 'No seguimos tendencias, las creamos para tu negocio.' },
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
                  const Icon = iconMap[form.watch(`points.${index}.icon`)] || Zap;
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
                            name={`points.${index}.icon`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icono</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue /></SelectValue>
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
                      name={`points.${index}.description`}
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
                onClick={() => append({ icon: 'Lightbulb', title: 'Nuevo Pilar', description: 'Describe este nuevo pilar fundamental.' })}
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
