
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { saveWebContent, type ServicePagesConfig } from "@/app/actions/web-content-actions";

const servicePagesSchema = z.object({
  iaPageTitle: z.string().min(5, "El título es requerido."),
  marketingPageTitle: z.string().min(5, "El título es requerido."),
  softwarePageTitle: z.string().min(5, "El título es requerido."),
  vrPageTitle: z.string().min(5, "El título es requerido."),
});

type ServicePagesFormValues = z.infer<typeof servicePagesSchema>;

interface ServicePagesEditorProps {
  initialContent: ServicePagesConfig | null;
}

export function ServicePagesEditor({ initialContent }: ServicePagesEditorProps) {
  const { toast } = useToast();
  
  const form = useForm<ServicePagesFormValues>({
    resolver: zodResolver(servicePagesSchema),
    defaultValues: initialContent || {
      iaPageTitle: 'Inteligencia Artificial y Automatizaciones',
      marketingPageTitle: 'Marketing Digital',
      softwarePageTitle: 'Software y Ciberseguridad',
      vrPageTitle: 'Ayúdate de la realidad virtual',
    },
  });

  const onSubmit = async (values: ServicePagesFormValues) => {
    const result = await saveWebContent('servicePagesConfig', values);
    if (result.success) {
      toast({
        title: "Títulos Actualizados",
        description: "Los títulos de las páginas de servicio han sido guardados.",
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
    <Card>
      <CardHeader>
        <CardTitle>Editor de Títulos de Páginas de Servicio</CardTitle>
        <CardDescription>Modifica los títulos que se muestran en la lista de páginas de servicio.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="iaPageTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título Página IA</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketingPageTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título Página Marketing</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="softwarePageTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título Página Software</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vrPageTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título Página Realidad Virtual</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Títulos'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
