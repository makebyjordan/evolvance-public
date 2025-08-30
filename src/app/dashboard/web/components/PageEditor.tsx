
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveWebContent, type PageContent, type WebContentSection } from "@/app/actions/web-content-actions";
import { Separator } from "@/components/ui/separator";

const pageSchema = z.object({
  title: z.string().min(5, "El título es requerido."),
  markdownContent: z.string().min(20, "El contenido es requerido."),
});

type PageFormValues = z.infer<typeof pageSchema>;

interface PageEditorProps {
  initialContent: PageContent | null;
  pageName: string;
  sectionId: WebContentSection;
}

export function PageEditor({ initialContent, pageName, sectionId }: PageEditorProps) {
  const { toast } = useToast();
  
  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: initialContent || {
      title: pageName,
      markdownContent: `# ${pageName}\n\nEscribe aquí el contenido en formato Markdown.`,
    },
  });

  const onSubmit = async (values: PageFormValues) => {
    const result = await saveWebContent(sectionId, values);
    if (result.success) {
      toast({
        title: "Contenido Actualizado",
        description: `La página de ${pageName} ha sido guardada.`,
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
        <CardTitle>Editor de Página: {pageName}</CardTitle>
        <CardDescription>Modifica el contenido de esta página usando Markdown.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Título de la Página</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="markdownContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Contenido (Markdown)</FormLabel>
                  <FormControl>
                    <Textarea rows={15} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : `Guardar ${pageName}`}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
