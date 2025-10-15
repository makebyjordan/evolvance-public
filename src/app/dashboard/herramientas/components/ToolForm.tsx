
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
import { saveTool, type Tool } from "@/app/actions/tools-actions";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, "El título es requerido."),
  description: z.string().optional(),
  url: z.string().url("Debe ser una URL válida."),
  usage: z.string().optional(),
  notes: z.string().optional(),
});

type ToolFormValues = z.infer<typeof formSchema>;

interface ToolFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  tool: Tool | null;
}

export function ToolForm({ isOpen, setIsOpen, onFormSubmit, tool }: ToolFormProps) {
  const { toast } = useToast();
  const isEditing = !!tool;

  const form = useForm<ToolFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      usage: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (isEditing && tool) {
      form.reset({
        title: tool.title,
        description: tool.description,
        url: tool.url,
        usage: tool.usage,
        notes: tool.notes,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        url: "",
        usage: "",
        notes: "",
      });
    }
  }, [isEditing, tool, form]);


  const onSubmit = async (values: ToolFormValues) => {
    const toolData = {
      ...values,
      description: values.description || "",
      usage: values.usage || "",
      notes: values.notes || "",
      id: isEditing ? tool!.id : undefined,
    };
    
    const result = await saveTool(toolData);

    if (result.success) {
      toast({
        title: `Herramienta ${isEditing ? 'Actualizada' : 'Creada'}`,
        description: `La herramienta "${values.title}" ha sido guardada.`,
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
      <DialogContent className="sm:max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Herramienta' : 'Nueva Herramienta'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} una herramienta.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => ( <FormItem><FormLabel>Título</FormLabel><FormControl><Input placeholder="Nombre de la herramienta" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="url" render={({ field }) => ( <FormItem><FormLabel>URL</FormLabel><FormControl><Input type="url" placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="description" render={({ field }) => ( <FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea rows={3} placeholder="Describe la herramienta" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="usage" render={({ field }) => ( <FormItem><FormLabel>Uso</FormLabel><FormControl><Textarea rows={3} placeholder="¿Para qué se utiliza?" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="notes" render={({ field }) => ( <FormItem><FormLabel>Notas</FormLabel><FormControl><Textarea rows={3} placeholder="Añade notas o comentarios adicionales" {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Herramienta')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
