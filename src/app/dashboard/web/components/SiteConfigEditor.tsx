
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
import { saveWebContent, type SiteConfigContent } from "@/app/actions/web-content-actions";
import { Trash2, PlusCircle, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const socialLinkSchema = z.object({
  url: z.string().url("Debe ser una URL válida."),
  iconSvg: z.string().min(1, "El SVG del icono es requerido."),
});

const siteConfigSchema = z.object({
  logoSvg: z.string().min(1, "El SVG del logo es requerido."),
  socialLinks: z.array(socialLinkSchema),
});

type SiteConfigFormValues = z.infer<typeof siteConfigSchema>;

const defaultLogoSvg = `<svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="10" fill="none" /></svg>`;
const defaultSocialIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3 7.1 0 .8-.4 1.5-.9 2.2-1.1 1.4-2.6 2.3-4.2 3.1-3.1 1.5-5.3 2.5-8.5 2.5-2.2 0-3.6-.4-5.2-1.2-1.9-.9-3.2-2.3-4.3-4.1-1.1-1.8-1.2-3.3-1-4.6 0-1.1.4-2.1 1.1-3.2 1.3-2 2.8-3.4 4.6-4.8 2.5-1.9 4.2-3.3 7.1-5.3 1.1-.8 2.3-1.5 3.6-2.2.5-.3 1.1-.5 1.7-.5.9 0 1.5.5 1.5 1.5Z"/></svg>`;


interface SiteConfigEditorProps {
  initialContent: SiteConfigContent | null;
}

export function SiteConfigEditor({ initialContent }: SiteConfigEditorProps) {
  const { toast } = useToast();
  
  const form = useForm<SiteConfigFormValues>({
    resolver: zodResolver(siteConfigSchema),
    defaultValues: initialContent || {
      logoSvg: defaultLogoSvg,
      socialLinks: [
        { url: 'https://twitter.com', iconSvg: defaultSocialIconSvg },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const onSubmit = async (values: SiteConfigFormValues) => {
    const result = await saveWebContent('siteConfig', values);
    if (result.success) {
      toast({
        title: "Configuración Actualizada",
        description: "La configuración general del sitio ha sido guardada.",
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
        <CardTitle>Editor de Configuración General</CardTitle>
        <CardDescription>Gestiona el logo y los enlaces a redes sociales de tu sitio web.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <FormField
              control={form.control}
              name="logoSvg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Logo (código SVG)</FormLabel>
                   <FormControl>
                    <Textarea rows={5} placeholder="Pega el código SVG de tu logo aquí" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces a Redes Sociales</h3>
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
                      name={`socialLinks.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL del Perfil Social</FormLabel>
                          <FormControl><Input {...field} placeholder="https://..." /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`socialLinks.${index}.iconSvg`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icono (código SVG)</FormLabel>
                          <FormControl><Textarea rows={4} placeholder="Pega el código SVG del icono aquí" {...field} /></FormControl>
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
                onClick={() => append({ url: '', iconSvg: defaultSocialIconSvg })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Red Social
              </Button>
            </div>
            
            <Separator />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Configuración'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
