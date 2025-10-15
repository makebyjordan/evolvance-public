
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveAIModel, type AIModel } from "@/app/actions/ias-actions";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  title: z.string().min(2, "El título es requerido."),
  description: z.string().optional(),
  url: z.string().url("Debe ser una URL válida."),
  profile: z.string().min(2, "El perfil es requerido."),
  price: z.coerce.number().min(0, "El precio debe ser positivo."),
  paymentDay: z.coerce.number().min(1, "El día debe ser entre 1 y 31.").max(31, "El día debe ser entre 1 y 31."),
  type: z.string().min(1, "El tipo es requerido."),
  featured: z.boolean().default(false),
});

type IaFormValues = z.infer<typeof formSchema>;

interface IaFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  iaModel: AIModel | null;
  existingTypes: string[];
}

export function IaForm({ isOpen, setIsOpen, onFormSubmit, iaModel, existingTypes }: IaFormProps) {
  const { toast } = useToast();
  const isEditing = !!iaModel;

  const form = useForm<IaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      profile: "",
      price: 0,
      paymentDay: 1,
      type: "General",
      featured: false,
    },
  });

  useEffect(() => {
    if (isEditing && iaModel) {
      form.reset({
        title: iaModel.title,
        description: iaModel.description,
        url: iaModel.url,
        profile: iaModel.profile,
        price: iaModel.price,
        paymentDay: iaModel.paymentDay,
        type: iaModel.type,
        featured: iaModel.featured,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        url: "",
        profile: "",
        price: 0,
        paymentDay: 1,
        type: "General",
        featured: false,
      });
    }
  }, [isEditing, iaModel, form]);


  const onSubmit = async (values: IaFormValues) => {
    const iaData = {
      ...values,
      description: values.description || "",
      id: isEditing ? iaModel!.id : undefined,
    };
    
    const result = await saveAIModel(iaData);

    if (result.success) {
      toast({
        title: `IA ${isEditing ? 'Actualizada' : 'Creada'}`,
        description: `La IA "${values.title}" ha sido guardada.`,
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
  
  const typesDatalistId = "types-list-ias";

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar IA' : 'Nueva IA'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} una herramienta de IA.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => ( <FormItem><FormLabel>Título</FormLabel><FormControl><Input placeholder="Nombre de la IA" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="description" render={({ field }) => ( <FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea rows={3} placeholder="Describe la IA" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="url" render={({ field }) => ( <FormItem><FormLabel>URL</FormLabel><FormControl><Input type="url" placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>)} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="profile" render={({ field }) => ( <FormItem><FormLabel>Perfil</FormLabel><FormControl><Input placeholder="Cuenta o usuario" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="price" render={({ field }) => ( <FormItem><FormLabel>Precio (€/mes)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="paymentDay" render={({ field }) => ( <FormItem><FormLabel>Día de Pago</FormLabel><FormControl><Input type="number" min="1" max="31" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                   <FormControl>
                      <Input list={typesDatalistId} placeholder="Elige o crea un tipo" {...field} />
                  </FormControl>
                  <datalist id={typesDatalistId}>
                      {existingTypes.map(type => <option key={type} value={type} />)}
                  </datalist>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
             <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                         <div className="space-y-1 leading-none">
                            <FormLabel>Destacado</FormLabel>
                            <FormDescription>
                                Marca esta opción si quieres destacar esta IA.
                            </FormDescription>
                        </div>
                    </FormItem>
                )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear IA')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
