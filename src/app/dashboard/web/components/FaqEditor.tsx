
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
import { saveWebContent, type FaqContent } from "@/app/actions/web-content-actions";
import { Trash2, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const faqItemSchema = z.object({
  question: z.string().min(10, "La pregunta es requerida."),
  answer: z.string().min(10, "La respuesta es requerida."),
});

const faqSchema = z.object({
  title: z.string().min(5, "El título principal es requerido."),
  items: z.array(faqItemSchema),
});

type FaqFormValues = z.infer<typeof faqSchema>;

interface FaqEditorProps {
  initialContent: FaqContent | null;
}

export function FaqEditor({ initialContent }: FaqEditorProps) {
  const { toast } = useToast();
  
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: initialContent || {
      title: 'Preguntas Frecuentes',
      items: [
        { question: '¿Qué tipo de empresas pueden beneficiarse?', answer: 'Trabajamos con una amplia gama de empresas, desde startups innovadoras hasta corporaciones consolidadas.' },
        { question: '¿Cómo es el proceso de trabajo?', answer: 'Comenzamos con una sesión estratégica para entender a fondo tus necesidades y objetivos.' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = async (values: FaqFormValues) => {
    const result = await saveWebContent('faq', values);
    if (result.success) {
      toast({
        title: "Contenido Actualizado",
        description: "La sección de Preguntas Frecuentes ha sido guardada.",
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
        <CardTitle>Editor de la Sección "Preguntas Frecuentes"</CardTitle>
        <CardDescription>Modifica el título y las preguntas y respuestas que se muestran en la página.</CardDescription>
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
              <h3 className="text-lg font-semibold mb-4">Preguntas y Respuestas</h3>
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
                    <FormField
                      control={form.control}
                      name={`items.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pregunta</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.answer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Respuesta</FormLabel>
                          <FormControl><Textarea rows={3} {...field} /></FormControl>
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
                onClick={() => append({ question: '¿Nueva pregunta?', answer: 'Una respuesta clara y concisa.' })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Pregunta
              </Button>
            </div>
            
            <Separator />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios de FAQ'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
