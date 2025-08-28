
"use client";

import { useForm } from "react-hook-form";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveHtml, type Html } from "@/app/actions/htmls-actions";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  htmlText: z.string().min(10, { message: "El contenido es requerido." }),
});

type HtmlFormValues = z.infer<typeof formSchema>;

interface HtmlFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  htmlDocument: Html | null;
}

export function HtmlForm({ isOpen, setIsOpen, onFormSubmit, htmlDocument }: HtmlFormProps) {
  const { toast } = useToast();
  const isEditing = !!htmlDocument;

  const form = useForm<HtmlFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      htmlText: "",
    },
  });

  useEffect(() => {
    if (isEditing && htmlDocument) {
      form.reset({
        title: htmlDocument.title,
        htmlText: htmlDocument.htmlText,
      });
    } else {
      form.reset({
        title: "",
        htmlText: "",
      });
    }
  }, [isEditing, htmlDocument, form]);


  const onSubmit = async (values: HtmlFormValues) => {
    const htmlData = {
      ...values,
      id: isEditing ? htmlDocument!.id : undefined,
    };
    
    const result = await saveHtml(htmlData);

    if (result.success) {
      toast({
        title: `Documento HTML ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: `El documento "${values.title}" ha sido guardado.`,
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
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar HTML' : 'Nuevo HTML'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} un documento HTML.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Plantilla de correo electrónico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="htmlText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido HTML</FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="Escribe el contenido HTML aquí." {...field} />
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
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear HTML')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
