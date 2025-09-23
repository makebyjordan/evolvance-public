
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";
import { saveFactura, type Factura } from "@/app/actions/facturas-actions";
import { useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, PlusCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const facturaItemSchema = z.object({
    description: z.string().min(1, "La descripción es requerida."),
    price: z.coerce.number().min(0, "El precio debe ser un número positivo."),
});

const formSchema = z.object({
    facturaNumber: z.string().min(1, "El número de factura es requerido."),
    clientName: z.string().min(1, "El nombre del cliente es requerido."),
    clientInfo: z.string().min(1, "La información del cliente es requerida."),
    date: z.date({ required_error: "La fecha es requerida." }),
    dueDate: z.date({ required_error: "La fecha de vencimiento es requerida." }),
    status: z.enum(['Borrador', 'Enviada', 'Pagada', 'Vencida', 'Cancelada']),
    items: z.array(facturaItemSchema).min(1, "Debe haber al menos un item."),
    notes: z.string().optional(),
});

type FacturaFormValues = z.infer<typeof formSchema>;

interface FacturaFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  factura: Factura | null;
}

export function FacturaForm({ isOpen, setIsOpen, onFormSubmit, factura }: FacturaFormProps) {
  const { toast } = useToast();
  const isEditing = !!factura;

  const form = useForm<FacturaFormValues>({
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });
  
  const items = form.watch("items");
  const total = items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;


  useEffect(() => {
    if (isEditing && factura) {
      form.reset({
        facturaNumber: factura.facturaNumber,
        clientName: factura.clientName,
        clientInfo: factura.clientInfo,
        date: new Date(factura.date),
        dueDate: new Date(factura.dueDate),
        status: factura.status,
        items: factura.items,
        notes: factura.notes || "",
      });
    } else {
      form.reset({
        facturaNumber: `FACT-${Date.now()}`,
        clientName: "",
        clientInfo: "",
        date: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        status: "Borrador",
        items: [{ description: "", price: 0 }],
        notes: "",
      });
    }
  }, [isEditing, factura, form]);


  const onSubmit = async (values: FacturaFormValues) => {
    const facturaData = {
      ...values,
      id: isEditing ? factura!.id : undefined,
    };
    
    const result = await saveFactura(facturaData);

    if (result.success) {
      toast({
        title: `Factura ${isEditing ? 'Actualizada' : 'Creada'}`,
        description: `La factura "${values.facturaNumber}" ha sido guardada.`,
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
      <DialogContent className="sm:max-w-4xl bg-card max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Factura' : 'Nueva Factura'}</DialogTitle>
          <DialogDescription>Rellena los campos para {isEditing ? 'actualizar' : 'crear'} una factura.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="facturaNumber" render={({ field }) => ( <FormItem><FormLabel>Nº Factura</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="clientName" render={({ field }) => ( <FormItem><FormLabel>Nombre del Cliente</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="clientInfo" render={({ field }) => ( <FormItem><FormLabel>Información del Cliente</FormLabel><FormControl><Textarea rows={3} placeholder="Dirección, CIF, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="date" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>Fecha</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP", { locale: es }) : <span>Elige una fecha</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus locale={es}/></PopoverContent></Popover><FormMessage /></FormItem>)}/>
                <FormField control={form.control} name="dueDate" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>Vencimiento</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP", { locale: es }) : <span>Elige una fecha</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus locale={es}/></PopoverContent></Popover><FormMessage /></FormItem>)}/>
                <FormField control={form.control} name="status" render={({ field }) => (<FormItem><FormLabel>Estado</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent>{['Borrador', 'Enviada', 'Pagada', 'Vencida', 'Cancelada'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
            </div>

            <div className="space-y-4">
                <FormLabel>Items</FormLabel>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-end">
                        <FormField control={form.control} name={`items.${index}.description`} render={({ field }) => (<FormItem className="flex-grow"><FormLabel className="sr-only">Descripción</FormLabel><FormControl><Input placeholder="Descripción del servicio" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                        <FormField control={form.control} name={`items.${index}.price`} render={({ field }) => (<FormItem><FormLabel className="sr-only">Precio</FormLabel><FormControl><Input type="number" step="0.01" placeholder="Precio" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => append({ description: '', price: 0 })}><PlusCircle className="mr-2 h-4 w-4" />Añadir Item</Button>
            </div>
            
            <div className="text-right text-2xl font-bold">Total: {total.toFixed(2)}€</div>

            <FormField control={form.control} name="notes" render={({ field }) => ( <FormItem><FormLabel>Notas</FormLabel><FormControl><Textarea rows={3} placeholder="Condiciones de pago, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />

            <DialogFooter className="sticky bottom-0 bg-card py-4 -mx-6 px-6 border-t"><Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancelar</Button><Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Factura')}</Button></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
