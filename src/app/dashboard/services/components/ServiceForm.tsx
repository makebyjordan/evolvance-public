
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
import { useEffect, useRef, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";

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
  image: z.any().optional(),
});

type ServiceFormValues = z.infer<typeof formSchema>;

interface ServiceFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  service: Service | null;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Servicio')}
    </Button>
  );
}

export function ServiceForm({ isOpen, setIsOpen, service }: ServiceFormProps) {
  const { toast } = useToast();
  const isEditing = !!service;
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(service?.imageUrl || null);
  
  const [state, formAction] = useActionState(saveService, { success: false, message: '' });

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
       setImagePreview(service.imageUrl || null);
    } else {
      form.reset({
        name: "",
        salePrice: 0,
        costPrice: 0,
        type: "Consultoría",
        estimatedTime: "",
        description: "",
      });
      setImagePreview(null);
    }
  }, [isEditing, service, form]);

  useEffect(() => {
    if (state.success) {
      toast({
        title: `Servicio ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: state.message,
      });
      handleOpenChange(false);
    } else if (state.message && !state.success) {
       toast({
        variant: "destructive",
        title: `Error al ${isEditing ? 'actualizar' : 'crear'}`,
        description: state.error || 'Ocurrió un error desconocido.',
      });
    }
  }, [state, isEditing, toast]);
  
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      setImagePreview(null);
    }
    setIsOpen(open);
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(service?.imageUrl || null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Servicio' : 'Nuevo Servicio'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} un servicio.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form ref={formRef} action={formAction} className="space-y-4">
             {isEditing && <input type="hidden" name="id" value={service.id} />}
             <input type="hidden" name="currentImageUrl" value={service?.imageUrl || ''} />

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
                        <Select onValueChange={field.onChange} defaultValue={field.value} name={field.name}>
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
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen del Servicio</FormLabel>
                  <FormControl>
                    <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                            field.onChange(e.target.files);
                            handleImageChange(e);
                        }}
                     />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {imagePreview && (
              <div className="mt-4">
                <FormLabel>Vista Previa</FormLabel>
                <div className="mt-2 relative w-full h-48 rounded-md overflow-hidden border">
                    <Image src={imagePreview} alt="Vista previa de la imagen" layout="fill" objectFit="cover" />
                </div>
              </div>
            )}

            <DialogFooter className="sticky bottom-0 bg-card py-4 -mx-6 px-6 border-t">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
              <SubmitButton isEditing={isEditing} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
