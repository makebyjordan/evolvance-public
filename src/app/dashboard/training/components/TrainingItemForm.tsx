
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveTrainingItem, type TrainingItem } from "@/app/actions/training-items-actions";
import { type TrainingSubsection } from "@/app/actions/training-actions";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  description: z.string().optional(),
  url: z.string().url({ message: "Por favor, introduce una URL válida." }),
  subsectionId: z.string({ required_error: "Debes seleccionar una subsección." }),
});

type TrainingItemFormValues = z.infer<typeof formSchema>;

interface TrainingItemFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  trainingItem: TrainingItem | null;
  subsections: TrainingSubsection[];
}

export function TrainingItemForm({ isOpen, setIsOpen, onFormSubmit, trainingItem, subsections }: TrainingItemFormProps) {
  const { toast } = useToast();
  const isEditing = !!trainingItem;

  const form = useForm<TrainingItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      subsectionId: "",
    },
  });

  useEffect(() => {
    if (isEditing && trainingItem) {
      form.reset({
        title: trainingItem.title,
        description: trainingItem.description,
        url: trainingItem.url,
        subsectionId: trainingItem.subsectionId,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        url: "",
        subsectionId: "",
      });
    }
  }, [isEditing, trainingItem, form]);


  const onSubmit = async (values: TrainingItemFormValues) => {
    const itemData = {
      ...values,
      description: values.description || "",
      id: isEditing ? trainingItem!.id : undefined,
    };
    
    const result = await saveTrainingItem(itemData);

    if (result.success) {
      toast({
        title: `Formación ${isEditing ? 'Actualizada' : 'Creada'}`,
        description: `La formación "${values.title}" ha sido guardada.`,
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
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Formación' : 'Nueva Formación'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} una formación.
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
                    <Input placeholder="Ej: Curso de React Avanzado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subsectionId"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Subsección</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una subsección" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {subsections.length > 0 ? subsections.map(subsection => (
                                <SelectItem key={subsection.id} value={subsection.id}>{subsection.title}</SelectItem>
                            )) : <SelectItem value="" disabled>Crea una subsección primero</SelectItem>}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enlace (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com/curso" {...field} />
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
                    <Textarea rows={5} placeholder="Añade una breve descripción de la formación." {...field} />
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
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Formación')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
