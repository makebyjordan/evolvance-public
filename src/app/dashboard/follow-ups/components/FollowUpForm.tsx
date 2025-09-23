
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
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { saveFollowUp, type FollowUp } from "@/app/actions/follow-ups-actions";
import type { Client } from "@/app/actions/clients-actions";
import { useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const followUpTypes = ["Llamada", "Email", "Reunión"] as const;
const followUpOutcomes = ["Pendiente", "Contactado", "No contesta", "Rechazado", "Positivo"] as const;

const formSchema = z.object({
  clientId: z.string().min(1, "Debes seleccionar un cliente."),
  date: z.date({ required_error: "La fecha es requerida." }),
  type: z.enum(followUpTypes, { required_error: "El tipo es requerido." }),
  outcome: z.enum(followUpOutcomes, { required_error: "El resultado es requerido." }),
  notes: z.string().min(3, { message: "Las notas son requeridas." }),
});

type FollowUpFormValues = z.infer<typeof formSchema>;

interface FollowUpFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  followUp: FollowUp | null;
  clients: Client[];
}

export function FollowUpForm({ isOpen, setIsOpen, onFormSubmit, followUp, clients }: FollowUpFormProps) {
  const { toast } = useToast();
  const isEditing = !!followUp;

  const form = useForm<FollowUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: "",
      date: new Date(),
      type: "Llamada",
      outcome: "Pendiente",
      notes: "",
    },
  });

  useEffect(() => {
    if (isEditing && followUp) {
      form.reset({
        clientId: followUp.clientId,
        date: new Date(followUp.date),
        type: followUp.type,
        outcome: followUp.outcome,
        notes: followUp.notes,
      });
    } else {
      form.reset({
        clientId: "",
        date: new Date(),
        type: "Llamada",
        outcome: "Pendiente",
        notes: "",
      });
    }
  }, [isEditing, followUp, form]);


  const onSubmit = async (values: FollowUpFormValues) => {
    const selectedClient = clients.find(c => c.id === values.clientId);
    if (!selectedClient) {
        toast({ variant: "destructive", title: "Error", description: "Cliente no encontrado." });
        return;
    }

    const followUpData = {
      ...values,
      clientName: selectedClient.name,
      date: values.date.toISOString(),
      id: isEditing ? followUp!.id : undefined,
    };
    
    const result = await saveFollowUp(followUpData);

    if (result.success) {
      toast({
        title: `Seguimiento ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: `El seguimiento ha sido guardado.`,
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
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Seguimiento' : 'Nuevo Seguimiento'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para registrar una interacción.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha del Seguimiento</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP", { locale: es }) : <span>Elige una fecha</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            locale={es}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                    {followUpTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
              control={form.control}
              name="outcome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resultado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {followUpOutcomes.map(outcome => <SelectItem key={outcome} value={outcome}>{outcome}</SelectItem>)}
                    </SelectContent>
                  </Select>
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
                    <Textarea rows={5} placeholder="Añade detalles sobre la llamada, próximos pasos, etc." {...field} />
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
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Seguimiento')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
