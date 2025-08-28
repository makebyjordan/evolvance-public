
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
  section: z.string().min(2, { message: "La sección es requerida." }),
  htmlText: z.string().min(10, { message: "El contenido es requerido." }),
});

type HtmlFormValues = z.infer<typeof formSchema>;
type Owner = 'sandra' | 'julian' | 'jordan';

interface HtmlFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  htmlDocument: Html | null;
  existingSections: string[];
  owner: Owner;
}

export function HtmlForm({ isOpen, setIsOpen, onFormSubmit, htmlDocument, existingSections, owner }: HtmlFormProps) {
  const { toast } = useToast();
  const isEditing = !!htmlDocument;

  const form = useForm<HtmlFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      section: "",
      htmlText: "",
    },
  });

  useEffect(() => {
    if (isEditing && htmlDocument) {
      form.reset({
        title: htmlDocument.title,
        section: htmlDocument.section,
        htmlText: htmlDocument.htmlText,
      });
    } else {
      form.reset({
        title: "",
        section: "",
        htmlText: "",
      });
    }
  }, [isEditing, htmlDocument, form]);


  const onSubmit = async (values: HtmlFormValues) => {
    const htmlData = {
      ...values,
      owner: owner,
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
  
  const sectionsDatalistId = "sections-list";

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar HTML' : 'Nuevo HTML'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} un documento HTML para <span className="capitalize font-bold">{owner}</span>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: Plantilla de correo" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Sección</FormLabel>
                     <FormControl>
                        <Input list={sectionsDatalistId} placeholder="Elige o crea una sección" {...field} />
                    </FormControl>
                    <datalist id={sectionsDatalistId}>
                        {existingSections.map(section => (
                            <option key={section} value={section} />
                        ))}
                    </datalist>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
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
