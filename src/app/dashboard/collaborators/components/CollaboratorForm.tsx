
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";
import { saveCollaborator, type Collaborator } from "@/app/actions/collaborators-actions";
import { useEffect } from "react";

const contractStatuses = [
    "A Presentar",
    "Presentado",
    "Firmado",
    "Cancelado"
] as const;

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido." }),
  phone: z.string().min(8, { message: "El teléfono es requerido." }),
  email: z.string().email({ message: "El correo no es válido." }),
  contractStatus: z.enum(contractStatuses, { required_error: "El estado del contrato es requerido." }),
  description: z.string().optional(),
});

type CollaboratorFormValues = z.infer<typeof formSchema>;

interface CollaboratorFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  collaborator: Collaborator | null;
}

export function CollaboratorForm({ isOpen, setIsOpen, onFormSubmit, collaborator }: CollaboratorFormProps) {
  const { toast } = useToast();
  const isEditing = !!collaborator;

  const form = useForm<CollaboratorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      contractStatus: "A Presentar",
      description: "",
    },
  });

  useEffect(() => {
    if (isEditing && collaborator) {
      form.reset({
        name: collaborator.name,
        phone: collaborator.phone,
        email: collaborator.email,
        contractStatus: collaborator.contractStatus as any,
        description: collaborator.description,
      });
    } else {
      form.reset({
        name: "",
        phone: "",
        email: "",
        contractStatus: "A Presentar",
        description: "",
      });
    }
  }, [isEditing, collaborator, form]);


  const onSubmit = async (values: CollaboratorFormValues) => {
    const collaboratorData = {
      ...values,
      description: values.description || "",
      id: isEditing ? collaborator!.id : undefined,
    };
    
    const result = await saveCollaborator(collaboratorData);

    if (result.success) {
      toast({
        title: `Colaborador ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: `El colaborador "${values.name}" ha sido guardado.`,
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
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Colaborador' : 'Nuevo Colaborador'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} un colaborador.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: +34 600 000 000" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Ej: john.doe@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
             <FormField
              control={form.control}
              name="contractStatus"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Estado del Contrato</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {contractStatuses.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                    <Textarea rows={5} placeholder="Añade notas o una descripción sobre el colaborador." {...field} />
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
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Colaborador')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
