
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
import { saveClient, type Client } from "@/app/actions/clients-actions";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido." }),
  phone: z.string().min(8, { message: "El teléfono es requerido." }),
  email: z.string().email({ message: "El correo no es válido." }),
  description: z.string().optional(),
  source: z.string().optional(),
});

type ClientFormValues = z.infer<typeof formSchema>;

interface ClientFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  client: Client | null;
}

export function ClientForm({ isOpen, setIsOpen, onFormSubmit, client }: ClientFormProps) {
  const { toast } = useToast();
  const isEditing = !!client;

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      description: "",
      source: "",
    },
  });

  useEffect(() => {
    if (isEditing && client) {
      form.reset({
        name: client.name,
        phone: client.phone,
        email: client.email,
        description: client.description,
        source: client.source,
      });
    } else {
      form.reset({
        name: "",
        phone: "",
        email: "",
        description: "",
        source: "",
      });
    }
  }, [isEditing, client, form]);


  const onSubmit = async (values: ClientFormValues) => {
    const clientData = {
      ...values,
      description: values.description || "",
      source: values.source || "",
      id: isEditing ? client.id : undefined,
    };
    
    const result = await saveClient(clientData);

    if (result.success) {
      toast({
        title: `Cliente ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: `El cliente "${values.name}" ha sido guardado.`,
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
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} un cliente.
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
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuente</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Referencia, LinkedIn, etc." {...field} />
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
                    <Textarea rows={5} placeholder="Añade notas o una descripción sobre el cliente." {...field} />
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
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Cliente')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
