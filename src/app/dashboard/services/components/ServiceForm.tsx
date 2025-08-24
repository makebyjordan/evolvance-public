
"use client";

import { useForm, useWatch } from "react-hook-form";
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
import { saveService, type Service } from "@/app/actions/services-actions";
import { useEffect } from "react";

const serviceTypes = [
    "Consultoría",
    "Desarrollo",
    "Marketing",
    "Mantenimiento",
    "Diseño",
    "Formación"
] as const;

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido." }),
  salePrice: z.coerce.number().min(0, { message: "El precio de venta debe ser positivo." }),
  costPrice: z.coerce.number().min(0, { message: "El precio de costo debe ser positivo." }),
  type: z.enum(serviceTypes, { required_error: "El tipo de servicio es requerido." }),
  estimatedTime: z.string().min(2, { message: "El tiempo estimado es requerido." }),
  description: z.string().optional(),
});

type ServiceFormValues = z.infer<typeof formSchema>;

interface ServiceFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  service: Service | null;
}

export function ServiceForm({ isOpen, setIsOpen, onFormSubmit, service }: ServiceFormProps) {
  const { toast } = useToast();
  const isEditing = !!service;

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      salePrice: 0,
      costPrice: 0,
      type: "Consultoría",
      estimatedTime: "",
      description: "",
    },
  });

  const salePrice = useWatch({ control: form.control, name: "salePrice" });
  const costPrice = useWatch({ control: form.control, name: "costPrice" });
  const benefit = !isNaN(salePrice) && !isNaN(costPrice) ? salePrice - costPrice : 0;


  useEffect(() => {
    if (isEditing && service) {
      form.reset({
        name: service.name,
        salePrice: service.salePrice,
        costPrice: service.costPrice,
        type: service.type as any,
        estimatedTime: service.estimatedTime,
        description: service.description,
      });
    } else {
      form.reset({
        name: "",
        salePrice: 0,
        costPrice: 0,
        type: "Consultoría",
        estimatedTime: "",
        description: "",
      });
    }
  }, [isEditing, service, form]);


  const onSubmit = async (values: ServiceFormValues) => {
    const serviceData = {
      ...values,
      description: values.description || "",
      id: isEditing ? service!.id : undefined,
    };
    
    const result = await saveService(serviceData);

    if (result.success) {
      toast({
        title: `Servicio ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: `El servicio "${values.name}" ha sido guardado.`,
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
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Servicio' : 'Nuevo Servicio'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} un servicio.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Servicio</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Desarrollo de App Móvil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio Venta</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="costPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio Costo</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel>Beneficio</FormLabel>
                    <FormControl>
                        <Input type="text" readOnly disabled value={`${benefit.toFixed(2)}€`} className="font-bold" />
                    </FormControl>
                </FormItem>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un tipo" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {serviceTypes.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="estimatedTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiempo Estimado</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: 2 semanas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Describe el servicio, qué incluye, etc." {...field} />
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
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Servicio')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
