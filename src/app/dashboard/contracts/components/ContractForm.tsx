
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
import { saveContract, type Contract } from "@/app/actions/contracts-actions";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  section: z.string().min(2, { message: "La sección es requerida." }),
  htmlText: z.string().min(10, { message: "El contenido es requerido." }),
});

type ContractFormValues = z.infer<typeof formSchema>;

interface ContractFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: () => void;
  contractDocument: Contract | null;
  existingSections: string[];
}

export function ContractForm({ isOpen, setIsOpen, onFormSubmit, contractDocument, existingSections }: ContractFormProps) {
  const { toast } = useToast();
  const isEditing = !!contractDocument;

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      section: "",
      htmlText: "",
    },
  });

  useEffect(() => {
    if (isEditing && contractDocument) {
      form.reset({
        title: contractDocument.title,
        section: contractDocument.section,
        htmlText: contractDocument.htmlText,
      });
    } else {
      form.reset({
        title: "",
        section: "",
        htmlText: "",
      });
    }
  }, [isEditing, contractDocument, form]);


  const onSubmit = async (values: ContractFormValues) => {
    const contractData = {
      ...values,
      id: isEditing ? contractDocument!.id : undefined,
    };
    
    const result = await saveContract(contractData);

    if (result.success) {
      toast({
        title: `Contrato ${isEditing ? 'Actualizado' : 'Creado'}`,
        description: `El contrato "${values.title}" ha sido guardado.`,
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
  
  const sectionsDatalistId = "sections-list-contracts";

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Contrato' : 'Nuevo Contrato'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} una plantilla de contrato.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: Contrato de Colaboración" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Sección</FormLabel>
                     <FormControl>
                        <Input list={sectionsDatalistId} placeholder="Elige o crea una sección" {...field} />
                    </FormControl>
                    <datalist id={sectionsDatalistId}>
                        {existingSections.map(section => (
                            <option key={section} value={section} />
                        ))}
                    </datalist>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="htmlText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido HTML</FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="Escribe el contenido HTML del contrato aquí." {...field} />
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
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Contrato')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
