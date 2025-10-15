
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { saveFirebaseProject, type FirebaseProject } from "@/app/actions/firebase-projects-actions";
import { useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const projectTypes = ['cliente', 'interno', 'startup', 'test', 'partner'] as const;
const projectStatuses = ['Desarrollando', 'Testing', 'Cambios', 'Presentado', 'Finalizando', 'Acabado'] as const;

const formSchema = z.object({
  title: z.string().min(2, "El título es requerido."),
  description: z.string().optional(),
  account: z.string().min(2, "La cuenta es requerida."),
  url: z.string().url("Debe ser una URL válida."),
  type: z.enum(projectTypes),
  deliveryDate: z.date().optional(),
  status: z.enum(projectStatuses),
}).refine(data => {
    if (['cliente', 'startup', 'partner'].includes(data.type)) {
        return !!data.deliveryDate;
    }
    return true;
}, {
    message: "La fecha de entrega es requerida para este tipo de proyecto.",
    path: ["deliveryDate"],
});


type ProjectFormValues = z.infer<typeof formSchema>;

interface FirebaseProjectFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  project: FirebaseProject | null;
}

export function FirebaseProjectForm({ isOpen, setIsOpen, onFormSubmit, project }: FirebaseProjectFormProps) {
  const { toast } = useToast();
  const isEditing = !!project;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
  });

  const projectType = form.watch("type");
  const showDeliveryDate = ['cliente', 'startup', 'partner'].includes(projectType);

  useEffect(() => {
    if (isEditing && project) {
      form.reset({
        ...project,
        deliveryDate: project.deliveryDate ? new Date(project.deliveryDate) : undefined,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        account: "",
        url: "",
        type: "interno",
        deliveryDate: undefined,
        status: "Desarrollando",
      });
    }
  }, [isEditing, project, form]);


  const onSubmit = async (values: ProjectFormValues) => {
    const projectData = {
      ...values,
      id: isEditing ? project!.id : undefined,
    };
    
    const result = await saveFirebaseProject(projectData);

    if (result.success) {
      toast({
        title: `Proyecto ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: `El proyecto "${values.title}" ha sido guardado.`,
      });
      onFormSubmit();
      handleOpenChange(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: result.error || 'Ocurrió un error.',
      });
    }
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) form.reset();
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
          <DialogDescription>Rellena los campos para {isEditing ? 'actualizar' : 'crear'} un proyecto.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => ( <FormItem><FormLabel>Título</FormLabel><FormControl><Input placeholder="Nombre del proyecto" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="account" render={({ field }) => ( <FormItem><FormLabel>Cuenta</FormLabel><FormControl><Input placeholder="ID o nombre de cuenta" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="url" render={({ field }) => ( <FormItem><FormLabel>URL</FormLabel><FormControl><Input type="url" placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="description" render={({ field }) => ( <FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea rows={3} placeholder="Describe el proyecto" {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="type" render={({ field }) => (<FormItem><FormLabel>Tipo</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent>{projectTypes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="status" render={({ field }) => (<FormItem><FormLabel>Estado</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent>{projectStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
            </div>

            {showDeliveryDate && (
                 <FormField control={form.control} name="deliveryDate" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>Fecha Prevista de Entrega</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP", { locale: es }) : <span>Elige una fecha</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus locale={es}/></PopoverContent></Popover><FormMessage /></FormItem>)}/>
            )}

            <DialogFooter className="sticky bottom-0 bg-card py-4 -mx-6 px-6 border-t"><Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancelar</Button><Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Proyecto')}</Button></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
