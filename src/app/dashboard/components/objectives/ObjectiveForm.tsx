
"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { saveObjective, type Objective } from "@/app/actions/objectives-actions";
import { useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

type Owner = 'sandra' | 'julian' | 'jordan';

const taskSchema = z.object({
  text: z.string().min(1, "La tarea no puede estar vacía."),
  completed: z.boolean().default(false),
});

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  description: z.string().optional(),
  notes: z.string().optional(),
  tasks: z.array(taskSchema).optional(),
});

type ObjectiveFormValues = z.infer<typeof formSchema>;

interface ObjectiveFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  objective: Objective | null;
  owner: Owner;
}

export function ObjectiveForm({ isOpen, setIsOpen, onFormSubmit, objective, owner }: ObjectiveFormProps) {
  const { toast } = useToast();
  const isEditing = !!objective;

  const form = useForm<ObjectiveFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      notes: "",
      tasks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  useEffect(() => {
    if (isEditing && objective) {
      form.reset({
        title: objective.title,
        description: objective.description,
        notes: objective.notes,
        tasks: objective.tasks,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        notes: "",
        tasks: [{ text: "", completed: false }],
      });
    }
  }, [isEditing, objective, form]);


  const onSubmit = async (values: ObjectiveFormValues) => {
    const objectiveData = {
      ...values,
      owner,
      description: values.description || "",
      notes: values.notes || "",
      tasks: values.tasks || [],
      id: isEditing ? objective!.id : undefined,
    };
    
    const result = await saveObjective(objectiveData);

    if (result.success) {
      toast({
        title: `Objetivo ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: `El objetivo "${values.title}" ha sido guardado.`,
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
      <DialogContent className="sm:max-w-2xl bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Objetivo' : 'Nuevo Objetivo'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} un objetivo para <span className="capitalize font-bold">{owner}</span>.
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
                    <Input placeholder="Ej: Mejorar captación de leads" {...field} />
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
                    <Textarea rows={3} placeholder="Describe el objetivo general." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Añade notas o comentarios adicionales." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
                <FormLabel>Tareas</FormLabel>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                        <FormField
                            control={form.control}
                            name={`tasks.${index}.completed`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`tasks.${index}.text`}
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl><Input placeholder="Describe la tarea" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => append({ text: '', completed: false })}>
                    <PlusCircle className="mr-2 h-4 w-4" />Añadir Tarea
                </Button>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Objetivo')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
