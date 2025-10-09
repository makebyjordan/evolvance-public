
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
import { useToast } from "@/hooks/use-toast";
import { saveProtocol, type Protocol } from "@/app/actions/protocols-actions";
import { useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

const protocolStepSchema = z.object({
    title: z.string().min(1, "El título del paso es requerido."),
    description: z.string().min(1, "La descripción del paso es requerida."),
});

const formSchema = z.object({
    title: z.string().min(1, "El título del protocolo es requerido."),
    steps: z.array(protocolStepSchema).min(1, "Debe haber al menos un paso."),
});

type ProtocolFormValues = z.infer<typeof formSchema>;

interface OfficeProtocolFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  protocol: Protocol | null;
}

export function OfficeProtocolForm({ isOpen, setIsOpen, onFormSubmit, protocol }: OfficeProtocolFormProps) {
  const { toast } = useToast();
  const isEditing = !!protocol;

  const form = useForm<ProtocolFormValues>({
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "steps",
  });
  
  useEffect(() => {
    if (isEditing && protocol) {
      form.reset({
        title: protocol.title,
        steps: protocol.steps,
      });
    } else {
      form.reset({
        title: "",
        steps: [{ title: "", description: "" }],
      });
    }
  }, [isEditing, protocol, form]);

  const onSubmit = async (values: ProtocolFormValues) => {
    const protocolData = {
      ...values,
      id: isEditing ? protocol!.id : undefined,
    };
    
    const result = await saveProtocol(protocolData);

    if (result.success) {
      toast({
        title: `Protocolo ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: `El protocolo "${values.title}" ha sido guardado.`,
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
    if (!open) form.reset();
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-card max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Protocolo' : 'Nuevo Protocolo'}</DialogTitle>
          <DialogDescription>Rellena los campos para {isEditing ? 'actualizar' : 'crear'} un protocolo.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => ( <FormItem><FormLabel>Título del Protocolo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />

            <div className="space-y-4">
                <FormLabel>Pasos del Protocolo</FormLabel>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-2 border p-4 rounded-md relative">
                        <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 w-7 h-7" onClick={() => remove(index)}><Trash2 className="h-4 w-4" /></Button>
                        <FormField control={form.control} name={`steps.${index}.title`} render={({ field }) => (<FormItem className="flex-grow"><FormLabel>Título del Paso {index + 1}</FormLabel><FormControl><Input placeholder="Ej: Contacto Inicial" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                        <FormField control={form.control} name={`steps.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Descripción del Paso</FormLabel><FormControl><Textarea rows={3} placeholder="Describe qué hacer en este paso..." {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => append({ title: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" />Añadir Paso</Button>
            </div>
            
            <DialogFooter className="sticky bottom-0 bg-card py-4 -mx-6 px-6 border-t"><Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancelar</Button><Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Protocolo')}</Button></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
