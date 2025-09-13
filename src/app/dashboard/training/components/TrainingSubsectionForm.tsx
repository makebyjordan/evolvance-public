
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
import { saveTrainingSubsection, type TrainingSubsection } from "@/app/actions/training-actions";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  description: z.string().optional(),
});

type TrainingSubsectionFormValues = z.infer<typeof formSchema>;

interface TrainingSubsectionFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  subsection: TrainingSubsection | null;
}

export function TrainingSubsectionForm({ isOpen, setIsOpen, onFormSubmit, subsection }: TrainingSubsectionFormProps) {
  const { toast } = useToast();
  const isEditing = !!subsection;

  const form = useForm<TrainingSubsectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isEditing && subsection) {
      form.reset({
        title: subsection.title,
        description: subsection.description,
      });
    } else {
      form.reset({
        title: "",
        description: "",
      });
    }
  }, [isEditing, subsection, form]);


  const onSubmit = async (values: TrainingSubsectionFormValues) => {
    const subsectionData = {
      ...values,
      description: values.description || "",
      id: isEditing ? subsection!.id : undefined,
    };
    
    const result = await saveTrainingSubsection(subsectionData);

    if (result.success) {
      toast({
        title: `Subsección ${isEditing ? 'Actualizada' : 'Creada'}`,
        description: `La subsección "${values.title}" ha sido guardada.`,
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
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Subsección' : 'Nueva Subsección'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} una subsección de formación.
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
                    <Input placeholder="Ej: Introducción a la IA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Añade una breve descripción de la subsección." {...field} />
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
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Subsección')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
