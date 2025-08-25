
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
import { saveInvoiceIn, type InvoiceIn } from "@/app/actions/invoices-in-actions";
import { saveInvoiceOut, type InvoiceOut } from "@/app/actions/invoices-out-actions";
import { useEffect, useState } from "react";
import { useActionState, useFormStatus } from "react-dom";
import Link from 'next/link';

const vatTypes = [
    { label: "21%", value: 21 },
    { label: "10%", value: 10 },
    { label: "4%", value: 4 },
] as const;

const formSchema = z.object({
  companyName: z.string().min(2, { message: "El nombre de la empresa es requerido." }),
  phone: z.string().min(8, { message: "El teléfono es requerido." }),
  address: z.string().min(5, { message: "La dirección es requerida." }),
  email: z.string().email({ message: "El correo no es válido." }),
  location: z.string().min(2, { message: "La localización es requerida." }),
  total: z.coerce.number().min(0, { message: "El total debe ser positivo." }),
  vatType: z.coerce.number().refine(val => [21, 10, 4].includes(val), { message: "Tipo de IVA no válido" }),
  description: z.string().optional(),
  file: z.instanceof(File).optional(),
});

type InvoiceFormValues = z.infer<typeof formSchema>;
type InvoiceType = InvoiceIn | InvoiceOut | null;

interface InvoiceFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  invoice: InvoiceType;
  invoiceType: "in" | "out";
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Factura')}
        </Button>
    );
}

export function InvoiceForm({ isOpen, setIsOpen, onFormSubmit, invoice, invoiceType }: InvoiceFormProps) {
    const { toast } = useToast();
    const isEditing = !!invoice;
    const formRef = useState<HTMLFormElement>(null);

    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            phone: "",
            address: "",
            email: "",
            location: "",
            total: 0,
            vatType: 21,
            description: "",
            file: undefined,
        },
    });
    
    const total = useWatch({ control: form.control, name: "total" });
    const vatType = useWatch({ control: form.control, name: "vatType" });
    const taxableBase = !isNaN(total) && !isNaN(vatType) ? total / (1 + vatType / 100) : 0;
    const vatAmount = !isNaN(total) ? total - taxableBase : 0;


    useEffect(() => {
        if (isEditing && invoice) {
        form.reset({
            companyName: invoice.companyName,
            phone: invoice.phone,
            address: invoice.address,
            email: invoice.email,
            location: invoice.location,
            total: invoice.total,
            vatType: invoice.vatType,
            description: invoice.description,
            file: undefined,
        });
        } else {
        form.reset({
            companyName: "",
            phone: "",
            address: "",
            email: "",
            location: "",
            total: 0,
            vatType: 21,
            description: "",
            file: undefined,
        });
        }
    }, [isEditing, invoice, form]);

    const handleFormAction = async (data: FormData) => {
        const action = invoiceType === 'in' ? saveInvoiceIn : saveInvoiceOut;
        const result = await action(data, invoice?.id || null);

        if (result.success) {
            toast({
                title: `Factura ${isEditing ? 'Actualizada' : 'Creada'}`,
                description: `La factura ha sido guardada.`,
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
        <DialogContent className="sm:max-w-[700px] bg-card max-h-screen overflow-y-auto">
            <DialogHeader>
            <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar' : 'Nueva'} Factura ({invoiceType === 'in' ? 'IN' : 'OUT'})</DialogTitle>
            <DialogDescription>
                Rellena los campos para {isEditing ? 'actualizar' : 'crear'} una factura.
            </DialogDescription>
            </DialogHeader>
            <Form {...form}>
            <form action={handleFormAction} ref={formRef} className="space-y-4">
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nombre de la Empresa</FormLabel>
                        <FormControl>
                            <Input placeholder="Ej: Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input placeholder="Ej: +34 600000000" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="Ej: contacto@acme.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Dirección</FormLabel><FormControl><Input placeholder="Ej: C/ Falsa 123" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="location" render={({ field }) => (
                        <FormItem><FormLabel>Localización</FormLabel><FormControl><Input placeholder="Ej: Madrid, España" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="total" render={({ field }) => (
                        <FormItem><FormLabel>Total Factura (€)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="vatType" render={({ field }) => (
                        <FormItem><FormLabel>Tipo de IVA</FormLabel>
                        <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Selecciona un tipo" /></SelectTrigger></FormControl>
                            <SelectContent>{vatTypes.map(type => ( <SelectItem key={type.value} value={String(type.value)}>{type.label}</SelectItem>))}</SelectContent>
                        </Select><FormMessage /></FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem>
                        <FormLabel>Base Imponible (€)</FormLabel>
                        <FormControl><Input type="text" readOnly disabled value={taxableBase.toFixed(2)} className="font-bold" /></FormControl>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Cantidad de IVA (€)</FormLabel>
                        <FormControl><Input type="text" readOnly disabled value={vatAmount.toFixed(2)} className="font-bold" /></FormControl>
                    </FormItem>
                </div>

                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea rows={4} placeholder="Añade una descripción sobre la factura." {...field} /></FormControl><FormMessage /></FormItem>
                )}/>

                <FormField control={form.control} name="file" render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                        <FormLabel>Archivo Factura (PDF, JPG, PNG)</FormLabel>
                        <FormControl>
                            <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => onChange(e.target.files?.[0])} {...rest} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                 {isEditing && invoice?.fileUrl && (
                    <div className="text-sm">
                        <p>Archivo actual: <Button asChild variant="link" className="p-0 h-auto"><Link href={invoice.fileUrl} target="_blank" rel="noopener noreferrer">Ver/Descargar</Link></Button></p>
                        <p className="text-muted-foreground text-xs">Sube un nuevo archivo para reemplazar el existente.</p>
                    </div>
                )}
            
                <DialogFooter className="sticky bottom-0 bg-card py-4 -mx-6 px-6 border-t">
                    <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        {isEditing ? 'Guardar Cambios' : 'Crear Factura'}
                    </Button>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
        </Dialog>
    );
}
